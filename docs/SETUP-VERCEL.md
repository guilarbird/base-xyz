# 🚀 Setup Vercel - Base XYZ

**Guia completo para configurar o deploy automático no Vercel**

---

## 📋 Pré-requisitos

- Conta no Vercel (gratuita)
- Repositório GitHub criado: `https://github.com/guilarbird/base-xyz`
- API Token do Circle
- Community ID do Circle

---

## 🔧 Passo a Passo

### 1. Conectar Repositório ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Selecione **"Import Git Repository"**
4. Escolha o repositório `guilarbird/base-xyz`
5. Clique em **"Import"**

### 2. Configurar Build Settings

Na tela de configuração do projeto:

**Framework Preset:** `Other`

**Build Command:** (deixe vazio)

**Output Directory:** (deixe vazio)

**Install Command:** `npm install`

### 3. Configurar Environment Variables

Clique em **"Environment Variables"** e adicione:

| Nome | Valor | Onde Encontrar |
| :--- | :--- | :--- |
| `CIRCLE_API_TOKEN` | `Token abc123...` | Circle → Settings → API |
| `CIRCLE_COMMUNITY_ID` | `123456` | Circle → Settings → General |

**Importante:** Marque as variáveis como disponíveis para:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. Deploy Inicial

1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Seu projeto estará disponível em: `https://base-xyz.vercel.app`

---

## 🌐 Configurar Domínio Personalizado (base-xyz.com)

### Opção A: Domínio Principal

Se você quer que `base-xyz.com` aponte diretamente para o Vercel:

1. No Vercel, vá em **Settings → Domains**
2. Adicione o domínio: `base-xyz.com`
3. O Vercel vai pedir para configurar DNS:

**No seu provedor de DNS (Google Domains, Cloudflare, etc.):**

Adicione um registro `A`:
```
Type: A
Name: @
Value: 76.76.21.21
```

Adicione um registro `CNAME`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Aguarde propagação (5-30 minutos)

### Opção B: Subdomínio

Se você quer manter a landing page em `base-xyz.com` e usar `app.base-xyz.com` para a comunidade:

1. No Vercel, adicione o domínio: `app.base-xyz.com`
2. Configure DNS:

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

---

## ⚙️ Configurar Edge Functions

As Edge Functions em `/api` já estão prontas. Após o deploy, elas estarão disponíveis em:

- `https://base-xyz.vercel.app/api/webhooks/circle`
- `https://base-xyz.vercel.app/api/publish/post`

### Configurar Webhook no Circle

1. Acesse Circle → Settings → Webhooks
2. Clique em **"Add Webhook"**
3. Preencha:
   - **URL:** `https://base-xyz.vercel.app/api/webhooks/circle`
   - **Events:** Selecione os eventos que você quer receber
   - **Secret:** (opcional, para validar assinaturas)
4. Salve

Agora, sempre que algo acontecer no Circle, o Vercel receberá uma notificação!

---

## 🔄 Deploy Automático

Após a configuração inicial, todo push para a branch `main` no GitHub dispara um deploy automático no Vercel.

**Fluxo:**
1. Você edita um arquivo no GitHub (ou faz commit local + push)
2. Vercel detecta a mudança
3. Faz build e deploy automaticamente
4. Seu site é atualizado em ~1 minuto

---

## 🧪 Testar Localmente

Para testar as Edge Functions localmente:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Linkar projeto
vercel link

# Baixar variáveis de ambiente
vercel env pull

# Rodar localmente
vercel dev
```

Acesse: `http://localhost:3000/api/webhooks/circle`

---

## 📊 Monitoramento

### Logs em Tempo Real

1. No Vercel, vá em **Deployments**
2. Clique no último deployment
3. Vá em **Functions**
4. Veja os logs de cada Edge Function

### Métricas

1. No Vercel, vá em **Analytics**
2. Veja:
   - Número de requests
   - Tempo de resposta
   - Erros

---

## 🚨 Troubleshooting

### Edge Function retorna 500

- Verifique os logs no Vercel
- Confirme que as variáveis de ambiente estão configuradas
- Teste localmente com `vercel dev`

### Webhook não está sendo recebido

- Confirme que a URL está correta no Circle
- Verifique se o domínio está acessível publicamente
- Veja os logs no Vercel para confirmar se a requisição chegou

### Deploy falha

- Verifique se `package.json` está correto
- Confirme que não há erros de sintaxe no código
- Veja os logs de build no Vercel

---

## 📚 Recursos

- [Documentação do Vercel](https://vercel.com/docs)
- [Edge Functions](https://vercel.com/docs/functions/edge-functions)
- [Variáveis de Ambiente](https://vercel.com/docs/projects/environment-variables)
- [Domínios Personalizados](https://vercel.com/docs/projects/domains)

---

**Preparado por:** Manus AI  
**Versão:** 1.0
