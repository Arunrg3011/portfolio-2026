import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

let Resend;
try { Resend = require('resend').Resend; } catch {}

const DAILY_LIMIT = 3;

function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // ── Rate limit: max 3 per IP per day ──────────────────────────
  const ip = getIP(request);
  if (supabase) {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('ip', ip)
      .gte('created_at', dayStart.toISOString());

    if (count >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: `Too many messages. You can send up to ${DAILY_LIMIT} messages per day.` },
        { status: 429 }
      );
    }
  }

  try {
    // Save to Supabase if configured (include ip for rate limiting)
    if (supabase) {
      const { error: dbError } = await supabase.from('inquiries').insert([{ name, email, message, ip }]);
      if (dbError) {
        console.error('Supabase insert error:', dbError);
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'rgarun111@gmail.com';
    let emailSent = false;

    // 1. Try Resend if API key is provided
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && Resend) {
      try {
        const resend = new Resend(apiKey);
        const { error: emailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
          to: adminEmail,
          replyTo: email,
          subject: `New message from ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#fff;padding:32px;border-radius:12px">
              <h2 style="color:#ff6b1a;margin:0 0 24px">New Contact Form Submission</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#999;width:80px">From</td><td style="padding:8px 0;color:#fff">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#999">Email</td><td style="padding:8px 0;color:#ff6b1a"><a href="mailto:${email}" style="color:#ff6b1a">${email}</a></td></tr>
              </table>
              <hr style="border:1px solid #222;margin:20px 0"/>
              <p style="color:#ccc;line-height:1.7;white-space:pre-wrap">${message}</p>
            </div>
          `,
        });

        if (!emailError) {
          emailSent = true;
        } else {
          console.error('Resend error:', emailError);
        }
      } catch (rErr) {
        console.error('Resend exception:', rErr);
      }
    }

    // 2. If Resend not used or failed, use FormSubmit to deliver to adminEmail directly
    if (!emailSent && adminEmail) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio message from ${name}`,
            _template: 'table',
          }),
        });

        if (fsRes.ok) {
          emailSent = true;
        } else {
          console.error('FormSubmit responded with:', fsRes.status);
        }
      } catch (fsErr) {
        console.error('FormSubmit delivery error:', fsErr);
      }
    }

    return NextResponse.json({ success: true, emailSent, mailto: adminEmail });
  } catch (err) {
    console.error('Contact API error:', err);
    const adminEmail = process.env.ADMIN_EMAIL || 'rgarun111@gmail.com';
    return NextResponse.json({ success: true, mailto: adminEmail });
  }
}
