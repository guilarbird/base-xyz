# 🚀 Guia de Configuração - Google Cloud DNS

**Objetivo:** Configurar os domínios `base-xyz.com` e `base-coins.com` no Google Cloud DNS para a nova infraestrutura.

---

## 📋 Pré-requisitos

- Acesso ao Google Cloud Console
- Permissão para editar zonas DNS
- `gcloud` CLI instalado e autenticado (ou acesso ao Cloud Shell)

---

## 🗺️ Plano de Ação

### Fase 1: Liberar `base-xyz.com`

Vamos mover o Investor DD para `base-coins.com` e apontar `base-xyz.com` para o Circle.

### Fase 2: Configurar `base-coins.com`

Vamos apontar `base-coins.com` para o Vercel, onde o Investor DD será hospedado.

---

## ⚙️ Comandos para Cloud Shell

Copie e cole os seguintes comandos no seu Cloud Shell. Eles são idempotentes (seguros para rodar múltiplas vezes).

### 1. Configurar Variáveis de Ambiente

```bash
# Defina o ID do seu projeto
PROJECT_ID="seu-projeto-id" # Substitua pelo seu Project ID

# Defina os nomes das zonas DNS
ZONE_XYZ="base-xyz-com"
ZONE_COINS="base-coins-com"

# Defina os domínios
DOMAIN_XYZ="base-xyz.com."
DOMAIN_COINS="base-coins.com."

# IP do Vercel
VERCEL_IP="76.76.21.21"

# CNAME do Circle
CIRCLE_CNAME="coins-renda-extra.circle.so."

# CNAME do Vercel
VERCEL_CNAME="cname.vercel-dns.com."
```

### 2. Criar Zonas DNS (se não existirem)

```bash
# Criar zona para base-xyz.com
gcloud dns managed-zones create $ZONE_XYZ \
  --description="Zona DNS para Base XYZ" \
  --dns-name=$DOMAIN_XYZ \
  --project=$PROJECT_ID

# Criar zona para base-coins.com
gcloud dns managed-zones create $ZONE_COINS \
  --description="Zona DNS para Investor DD" \
  --dns-name=$DOMAIN_COINS \
  --project=$PROJECT_ID
```

### 3. Apontar `base-xyz.com` para o Circle

```bash
# Iniciar transação
gcloud dns record-sets transaction start --zone=$ZONE_XYZ --project=$PROJECT_ID

# Remover registros antigos (A e CNAME para www)
gcloud dns record-sets transaction remove --name="$DOMAIN_XYZ" --type=A --ttl=300 --zone=$ZONE_XYZ --project=$PROJECT_ID "$(gcloud dns record-sets list --zone=$ZONE_XYZ --name="$DOMAIN_XYZ" --type=A --format=\"get(rrdatas[0])\")"
gcloud dns record-sets transaction remove --name="www.$DOMAIN_XYZ" --type=CNAME --ttl=300 --zone=$ZONE_XYZ --project=$PROJECT_ID "$(gcloud dns record-sets list --zone=$ZONE_XYZ --name="www.$DOMAIN_XYZ" --type=CNAME --format=\"get(rrdatas[0])\")"

# Adicionar CNAME para o Circle
gcloud dns record-sets transaction add --name="$DOMAIN_XYZ" --type=CNAME --ttl=300 --zone=$ZONE_XYZ --project=$PROJECT_ID "$CIRCLE_CNAME"

# Executar transação
gcloud dns record-sets transaction execute --zone=$ZONE_XYZ --project=$PROJECT_ID
```

### 4. Apontar `base-coins.com` para o Vercel

```bash
# Iniciar transação
gcloud dns record-sets transaction start --zone=$ZONE_COINS --project=$PROJECT_ID

# Adicionar registro A para o Vercel
gcloud dns record-sets transaction add --name="$DOMAIN_COINS" --type=A --ttl=300 --zone=$ZONE_COINS --project=$PROJECT_ID "$VERCEL_IP"

# Adicionar CNAME para www
gcloud dns record-sets transaction add --name="www.$DOMAIN_COINS" --type=CNAME --ttl=300 --zone=$ZONE_COINS --project=$PROJECT_ID "$VERCEL_CNAME"

# Executar transação
gcloud dns record-sets transaction execute --zone=$ZONE_COINS --project=$PROJECT_ID
```

---

## 🔄 O Que Acontece Depois

1.  **Propagação DNS:** Pode levar de 5 minutos a algumas horas.
2.  **`base-xyz.com`** começará a apontar para a sua comunidade no Circle.
3.  **`base-coins.com`** estará pronto para hospedar o Investor DD no Vercel.

---

## 🚨 Verificação

### Verificar `base-xyz.com`

```bash
dig base-xyz.com CNAME +short
# Deve retornar: coins-renda-extra.circle.so.
```

### Verificar `base-coins.com`

```bash
dig base-coins.com A +short
# Deve retornar: 76.76.21.21

dig www.base-coins.com CNAME +short
# Deve retornar: cname.vercel-dns.com.
```

---

## 🚀 Próximos Passos

1.  **Execute os comandos** no Cloud Shell.
2.  **Configure o domínio personalizado** no Circle:
    - Vá em **Settings → Custom Domain**
    - Adicione `base-xyz.com`
3.  **Configure o domínio personalizado** no Vercel:
    - No projeto do Investor DD, vá em **Settings → Domains**
    - Adicione `base-coins.com` e `www.base-coins.com`

---

**Preparado por:** Manus AI  
**Versão:** 1.0
