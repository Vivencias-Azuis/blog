import { NextResponse } from 'next/server'

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_EBOOK_ENDPOINT || 'https://formspree.io/f/xldqvepq'

export async function POST(request: Request) {
  try {
    const form = await request.formData()

    const gotcha = String(form.get('_gotcha') || '')
    if (gotcha) {
      return NextResponse.json({ ok: true })
    }

    const email = String(form.get('email') || '').trim()
    if (!email) {
      return NextResponse.json({ ok: false, message: 'E-mail é obrigatório.' }, { status: 400 })
    }

    const nome = String(form.get('nome') || '').trim()

    const body = new FormData()
    body.set('email', email)
    if (nome) body.set('nome', nome)
    body.set('tipo', 'ebook-primeiros-30-dias')
    body.set('origem', 'popup-home')
    body.set('_replyto', email)
    body.set('_subject', 'E-book - Guia Prático: Primeiros 30 Dias Após o Diagnóstico (1º capítulo)')

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json' }
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, message: 'Falha ao enviar.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, message: 'Falha de conexão ao enviar.' }, { status: 500 })
  }
}

