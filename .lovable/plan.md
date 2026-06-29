## Plano: Ocultar link "Não tem conta? Criar conta" na área restrita

### O que será feito
- Em `src/routes/auth.tsx`, ocultar o botão/link de alternância "Não tem conta? Criar conta" que aparece na tela de login (`mode === 'signin'`).
- Manter o estado `mode` e toda a lógica de signup no código, apenas sem expor o link na interface do login.
- Garantir que o visual do restante da página não seja alterado.

### Alteração técnica
- Envolver o `<button onClick={toggleMode}>` em uma condição que não renderize quando `mode === 'signin'` (ou comentar/remover apenas o trecho visível).
- Deixar intactos: formulário de login, validações, redirecionamentos, título e metadados.

### Validação
- Recarregar a visualização da página `/auth` e confirmar que o link "Não tem conta? Criar conta" não aparece.
- Verificar que a página continua funcionando normalmente para login.

### Não será alterado
- Funcionalidade de criação de conta (signup) continua existindo no código.
- Design, cores, tipografia e outros elementos da página.
- Rotas, SEO, sitemap ou robots.txt.