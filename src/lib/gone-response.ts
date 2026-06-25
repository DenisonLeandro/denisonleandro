export function goneResponse() {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>410 - Página removida permanentemente</title></head><body><h1>410 Gone</h1><p>Esta URL pertencia a uma versão anterior do site e foi removida permanentemente.</p><p><a href="https://denisonleandro.adv.br/">Ir para a página inicial</a></p></body></html>`;
  return new Response(html, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
