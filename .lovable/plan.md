# Auditoria de URLs antigas — Relatório

Testei todas as URLs solicitadas com `User-Agent: Googlebot` direto no domínio oficial `https://denisonleandro.adv.br`. **O comportamento já está correto em todos os casos** — nenhuma URL antiga abre a home, e todas as páginas novas continuam respondendo 200.

## Resultado

| URL testada | Status HTTP | Ação tomada | Observação |
|---|---|---|---|
| `/wp-admin/` | **410** | Nenhuma | Já bloqueada (rota `wp-admin.$.ts`) |
| `/wp-content/` | **410** | Nenhuma | Já bloqueada |
| `/wp-includes/` | **410** | Nenhuma | Já bloqueada |
| `/category/` | **410** | Nenhuma | Já bloqueada |
| `/tag/` | **410** | Nenhuma | Já bloqueada |
| `/author/` | **410** | Nenhuma | Já bloqueada |
| `/feed/` | **410** | Nenhuma | Já bloqueada |
| `/comments/` | **410** | Nenhuma | Já bloqueada |
| `/xmlrpc.php` | **410** | Nenhuma | Já bloqueada (GET e POST) |
| `/wp-json/` | **410** | Nenhuma | Já bloqueada |
| `/1635-2/` | 307 → **404** | Nenhuma | Redirect só remove a barra final; resultado final é 404 real. Google trata como removida. |
| `/noticias/` | 307 → **200** | Nenhuma | É página válida do site novo (lista de notícias); redirect apenas tira a barra final. |
| `/teste-url-inexistente-123` | **404** | Nenhuma | 404 real para qualquer URL inexistente |
| `/` | **200** | Nenhuma | Home funcionando |
| `/escritorio` | **200** | Nenhuma | OK |
| `/areas-de-atuacao` | **200** | Nenhuma | OK |
| `/contato` | **200** | Nenhuma | OK |

## Conclusão

- Todas as URLs típicas de WordPress retornam **410 Gone** com `X-Robots-Tag: noindex, nofollow` — sinal mais forte que 404 para o Google remover do índice.
- URLs antigas tipo slug numérico do WP (ex.: `/1635-2/`) terminam em **404 real**, não abrem a home.
- URLs inventadas retornam **404 real**.
- Nenhuma URL antiga está sendo redirecionada para a home.
- Nenhum 301 foi criado porque você não forneceu mapeamento de URL antiga → nova equivalente. Se tiver essa lista, posso adicionar 301s pontuais.
- Nenhuma alteração de código é necessária. Nenhuma alteração visual.

## Próximo passo no Search Console

Para acelerar a remoção dos links antigos:
1. Search Console → **Remoções** → "Nova solicitação" → use os prefixos `/wp-admin/`, `/wp-content/`, `/category/`, `/tag/`, `/author/`, `/feed`, `/wp-json/`, `/xmlrpc.php`.
2. Reenviar `https://denisonleandro.adv.br/sitemap.xml` em **Sitemaps**.

Se aprovar este plano, eu apenas confirmo o relatório acima — **não há código a alterar**. Se preferir que eu também faça `/1635-2/` (e padrões parecidos) responder 410 direto sem o 307 intermediário, me avise e eu adiciono uma rota catch-all para esse padrão.
