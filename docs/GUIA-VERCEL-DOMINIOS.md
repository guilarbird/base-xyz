# 🌐 Guia de Configuração - Vercel Domínios

**Objetivo:** Configurar os projetos no Vercel para usar os domínios corretos.

---

## 📋 Estrutura Final

| Domínio | Projeto Vercel | Conteúdo |
| :--- | :--- | :--- |
| `base-xyz.com` | (não hospeda no Vercel) | Circle (via CNAME) |
| `base-coins.com` | `coins-xyz-diligence` | Investor DD |
| `guilarbird/base-xyz` | `base-xyz-automation` | Automações (opcional) |

---

## 🔧 Configuração Passo a Passo

### 1. Projeto Investor DD (`base-coins.com`)

**Projeto atual:** `coins-xyz-diligence`  
**Novo domínio:** `base-coins.com`

#### Passos:

1.  **Acesse o projeto no Vercel:**
    - Vá em [vercel.com/coins-brasil/coins-xyz-diligence](https://vercel.com/coins-brasil/coins-xyz-diligence)

2.  **Adicione o novo domínio:**
    - Vá em **Settings → Domains**
    - Clique em **Add Domain**
    - Digite: `base-coins.com`
    - Clique em **Add**

3.  **Adicione o subdomínio www:**
    - Repita o processo para `www.base-coins.com`
    - O Vercel vai redirecionar automaticamente para a versão sem www

4.  **Remova o domínio antigo (opcional):**
    - Se `base-xyz.com` estiver configurado neste projeto, remova-o
    - Vá em **Settings → Domains**
    - Clique nos 3 pontinhos ao lado de `base-xyz.com`
    - Clique em **Remove**

---

### 2. Projeto Automações (`guilarbird/base-xyz`)

**Repositório:** `guilarbird/base-xyz`  
**Novo projeto:** `base-xyz-automation` (sugestão)

#### Passos:

1.  **Importe o repositório:**
    - Vá em [vercel.com/new](https://vercel.com/new)
    - Clique em **Import Git Repository**
    - Selecione `guilarbird/base-xyz`
    - Clique em **Import**

2.  **Configure o projeto:**
    - **Project Name:** `base-xyz-automation`
    - **Framework Preset:** `Other`
    - **Build Command:** (deixe vazio)
    - **Output Directory:** (deixe vazio)
    - **Install Command:** `npm install`

3.  **Adicione variáveis de ambiente:**
    - Vá em **Settings → Environment Variables**
    - Adicione:
      - `CIRCLE_API_TOKEN` = (seu token do Circle)
      - `CIRCLE_COMMUNITY_ID` = (seu community ID)

4.  **Deploy:**
    - Clique em **Deploy**
    - Aguarde o build (1-2 minutos)

5.  **Domínio (opcional):**
    - Se quiser um domínio para as Edge Functions, adicione:
      - `api.base-xyz.com` (requer configuração no DNS)
    - Ou use o domínio padrão do Vercel: `base-xyz-automation.vercel.app`

---

## 🔄 Fluxo de Deploy

### Investor DD (`base-coins.com`)

1.  Você edita o código no repositório atual
2.  Faz commit e push
3.  Vercel detecta e faz deploy automaticamente
4.  Site atualizado em `base-coins.com`

### Automações (`guilarbird/base-xyz`)

1.  Você edita conteúdo em `content/posts/`
2.  Faz commit e push no GitHub
3.  Vercel detecta e faz deploy
4.  Edge Functions ficam disponíveis em `base-xyz-automation.vercel.app/api/`

---

## 🚨 Verificação

### Verificar `base-coins.com`

1.  Acesse: [https://base-coins.com](https://base-coins.com)
2.  Deve mostrar o Investor DD
3.  Verifique o SSL (cadeado verde)

### Verificar Edge Functions

1.  Acesse: `https://base-xyz-automation.vercel.app/api/webhooks/circle`
2.  Deve retornar: `Method not allowed` (correto, pois só aceita POST)

---

## 📚 Recursos

- [Documentação do Vercel - Domínios](https://vercel.com/docs/projects/domains)
- [Documentação do Vercel - Edge Functions](https://vercel.com/docs/functions/edge-functions)

---

**Preparado por:** Manus AI  
**Versão:** 1.0
