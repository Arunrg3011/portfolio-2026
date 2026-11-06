import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { supabase } from '@/lib/supabase';
import { PROJECTS } from '@/app/work/content';

async function isAdmin() {
  const store = await cookies();
  const token = store.get('admin_token')?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request, { params }) {
  const { id } = await params;
  
  if (supabase) {
    try {
      const { data: work, error } = await supabase
        .from('works')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && work) return NextResponse.json(work);
    } catch {
      // Database query failed, check static projects fallback
    }
  }

  const staticProject = PROJECTS.find((p) => p.id === id || p.title.toLowerCase() === id.toLowerCase());
  if (staticProject) {
    return NextResponse.json({
      id: staticProject.id,
      title: staticProject.title,
      category: staticProject.category,
      description: staticProject.description,
      services: staticProject.tech.split('·').map(s => s.trim()),
      tech: staticProject.tech,
      live_url: staticProject.demo,
      github_url: staticProject.github,
      client: "Arun R. G.",
      year: "2025–2026",
      status: staticProject.status,
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PATCH(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const { data: work, error } = await supabase
    .from('works')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(work);
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const { error } = await supabase.from('works').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
