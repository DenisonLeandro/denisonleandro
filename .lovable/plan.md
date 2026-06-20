## Objetivo
Reexecutar o build de produção e confirmar que o erro relacionado ao `@supabase/supabase-js` foi resolvido após a instalação do pacote.

## Passos
1. Executar `bun run build` no ambiente de produção.
2. Verificar o output do build:
   - Confirmar ausência da mensagem de erro sobre `base-js` em `/dev-server/src/integrations/supabase/client.ts`.
   - Confirmar que o build sai com exit code 0.
3. Informar o resultado ao usuário (sucesso ou novo erro).

## Nota técnica
O erro anterior (`base-js` externalization / unresolved module) foi causado pela ausência do pacote `@supabase/supabase-js`, que foi instalado na etapa anterior. Este plano apenas valida se a instalação corrigiu o problema de build.