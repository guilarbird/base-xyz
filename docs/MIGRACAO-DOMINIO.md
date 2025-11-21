# 🌐 Guia de Migração: base-xyz.com para Experiência Circle

**Objetivo:** Migrar o domínio `base-xyz.com` para hospedar a experiência completa da comunidade, integrando a landing page atual com o dashboard de automação.

---

## 📈 Estado Atual

- **`base-xyz.com`**: Aponta para uma landing page no Vercel (`coins-xyz-diligence`).
- **`coins-renda-extra.circle.so`**: Hospeda a comunidade Circle.
- **`guilarbird/base-xyz`**: Novo repositório GitHub com automações.

---

## 🎯 Visão Futura

- **`base-xyz.com`**: Landing page principal + Dashboard Admin.
- **`app.base-xyz.com`**: Redireciona para a comunidade no Circle.
- **`api.base-xyz.com`**: Endpoints das Edge Functions (webhooks, etc.).

---

## 🗺️ Plano de Migração

### Fase 1: Unificar Projetos no Vercel

1.  **Importar o novo repositório:**
    - No Vercel, importe o repositório `guilarbird/base-xyz` como um novo projeto.
    - Nome do projeto: `base-xyz-automation` (sugestão).

2.  **Migrar a landing page atual:**
    - Copie os arquivos da landing page (`coins-xyz-diligence`) para dentro do repositório `guilarbird/base-xyz`.
    - Crie uma pasta `landing/` para organizar.

3.  **Configurar o Vercel para monorepo:**
    - No `vercel.json`, configure os diferentes diretórios:
      ```json
      {
        "builds": [
          { "src": "landing/package.json", "use": "@vercel/next" },
          { "src": "api/**/*.js", "use": "@vercel/node" }
        ]
      }
      ```

### Fase 2: Configurar Domínios e Subdomínios

1.  **Domínio principal (`base-xyz.com`):**
    - No Vercel, vá em **Settings → Domains** do projeto unificado.
    - Adicione `base-xyz.com` e `www.base-xyz.com`.
    - Configure o DNS para apontar para o Vercel (registro A e CNAME).

2.  **Subdomínio da comunidade (`app.base-xyz.com`):**
    - No seu provedor de DNS, crie um registro `CNAME`:
      ```
      Type: CNAME
      Name: app
      Value: coins-renda-extra.circle.so
      ```
    - **No Circle:** Vá em **Settings → Custom Domain** e adicione `app.base-xyz.com`.

3.  **Subdomínio da API (`api.base-xyz.com`):**
    - No Vercel, adicione o domínio `api.base-xyz.com` ao projeto.
    - Configure DNS com um `CNAME` apontando para `cname.vercel-dns.com`.

### Fase 3: Publicar Conteúdos Iniciais

1.  **Conteúdo do QG:**
    - Crie o arquivo `content/posts/qg-boas-vindas.md` com o conteúdo que já preparei.
    - Faça commit e push. A GitHub Action publicará automaticamente no Circle.

2.  **Documentação das Trilhas:**
    - Os guias `TRILHA-CREATOR.md` e `TRILHA-BUILDER.md` podem ser publicados em um espaço `#Guias` ou `#Documentação` na comunidade.

### Fase 4: Testes e Validação

1.  **Acesse `base-xyz.com`:** Deve mostrar a landing page.
2.  **Acesse `app.base-xyz.com`:** Deve redirecionar para a comunidade Circle.
3.  **Teste um webhook:** Crie um post no Circle e veja se a Edge Function em `api.base-xyz.com` recebe a notificação (verifique os logs no Vercel).
4.  **Teste a publicação automática:** Faça um commit em um arquivo de conteúdo e veja se o post aparece no Circle.

---

## 🚀 Resultado Final

- **Experiência unificada:** Tudo sob o domínio `base-xyz.com`.
- **Automação completa:** Gestão de conteúdo via Git.
- **Escalabilidade:** Infraestrutura serverless que cresce com a comunidade.
- **Controle total:** Você tem o código e a infraestrutura em suas mãos.

Este plano garante uma migração suave, sem downtime, e prepara a Base XYZ para o futuro.
