# 🎖️ Base XYZ - Infraestrutura e Automação

**Repositório oficial da Base XYZ**  
Comunidade de creators e builders da Coins.xyz

---

## 📦 O Que É Este Repositório?

Este repositório centraliza toda a infraestrutura, conteúdos e automações da Base XYZ, uma comunidade no Circle focada em formar criadores de conteúdo e profissionais técnicos para o mercado cripto.

### Componentes Principais

- **`/content`**: Todos os conteúdos em Markdown (posts, cursos, missões)
- **`/config`**: Configurações da comunidade (espaços, badges, permissões)
- **`/scripts`**: Automações e integrações com a API do Circle
- **`/api`**: Vercel Edge Functions (webhooks, publicação automática)
- **`/docs`**: Documentação completa da Base XYZ

---

## 🚀 Como Funciona

### 1. Conteúdos Versionados

Todos os posts, cursos e missões são escritos em Markdown e armazenados em `/content`. Qualquer mudança é rastreada pelo Git, permitindo:

- Histórico completo de edições
- Rollback fácil se algo quebrar
- Colaboração via Pull Requests

### 2. Publicação Automatizada

Quando você faz commit de um novo arquivo em `/content`, uma GitHub Action detecta a mudança e:

1. Valida o formato Markdown
2. Chama uma Vercel Edge Function
3. A função publica o conteúdo no Circle via API
4. O post aparece automaticamente no espaço correto

### 3. Webhooks do Circle

Quando algo acontece no Circle (novo membro, novo post, etc.), um webhook notifica uma Edge Function que pode:

- Enviar notificações para Slack
- Atualizar um banco de dados
- Acionar automações (ex: conceder badge automaticamente)

---

## 📁 Estrutura do Repositório

```
base-xyz-repo/
├── content/                    # Conteúdos em Markdown
│   ├── posts/                  # Posts para espaços
│   │   ├── manifesto.md
│   │   ├── desafio-garrafa.md
│   │   └── ...
│   ├── courses/                # Cursos
│   │   └── protocolos-da-base/
│   └── missions/               # Missões
│       ├── operacao-primeira-luz.md
│       └── simulacao-ponte-quebrada.md
├── config/                     # Configurações
│   ├── spaces.json             # Definição de espaços
│   ├── badges.json             # Sistema de patentes
│   ├── permissions.json        # Regras de acesso
│   └── credentials.json        # Credenciais (não commitado)
├── scripts/                    # Automações Node.js
│   ├── publish-content.js      # Publicar conteúdo via API
│   ├── sync-circle.js          # Sincronizar configurações
│   └── moderate.js             # Moderação automática
├── api/                        # Vercel Edge Functions
│   ├── webhooks/
│   │   └── circle.js           # Recebe webhooks do Circle
│   ├── publish/
│   │   └── post.js             # Publica posts via API
│   └── admin/
│       └── sync.js             # Sincroniza GitHub → Circle
├── docs/                       # Documentação
│   ├── TRILHA-CREATOR.md
│   ├── TRILHA-BUILDER.md
│   └── MANUAL-MODERADORES.md
├── .github/                    # GitHub Actions
│   └── workflows/
│       └── publish.yml         # CI/CD para publicação
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Setup Local

### Pré-requisitos

- Node.js 18+
- Git
- Conta no Circle com API key

### Instalação

```bash
# Clone o repositório
git clone https://github.com/guilabird/base-xyz.git
cd base-xyz

# Instale dependências
npm install

# Configure credenciais
cp config/credentials.example.json config/credentials.json
# Edite config/credentials.json com suas chaves

# Teste a conexão com a API do Circle
npm run test:api
```

### Scripts Disponíveis

```bash
# Publicar um post manualmente
npm run publish -- content/posts/novo-post.md

# Sincronizar configurações do GitHub para o Circle
npm run sync

# Listar todos os espaços
npm run list:spaces

# Listar todos os posts
npm run list:posts
```

---

## 🌐 Deploy no Vercel

Este repositório está configurado para deploy automático no Vercel:

1. **Conecte o repositório** no dashboard do Vercel
2. **Configure as variáveis de ambiente:**
   - `CIRCLE_API_TOKEN`
   - `CIRCLE_COMMUNITY_ID`
3. **Deploy automático** a cada push na branch `main`

As Edge Functions em `/api` ficam disponíveis em:
- `https://base-xyz.vercel.app/api/webhooks/circle`
- `https://base-xyz.vercel.app/api/publish/post`

---

## 📝 Como Publicar Conteúdo

### Método 1: Via GitHub (Recomendado)

1. Crie um arquivo Markdown em `content/posts/`
2. Adicione o frontmatter:
   ```markdown
   ---
   title: "Título do Post"
   space: "arquivo-de-missao"
   pinned: true
   ---
   
   Conteúdo aqui...
   ```
3. Commit e push:
   ```bash
   git add content/posts/novo-post.md
   git commit -m "Adicionar novo post"
   git push
   ```
4. A GitHub Action publica automaticamente no Circle

### Método 2: Via Script Local

```bash
npm run publish -- content/posts/novo-post.md
```

---

## 🔐 Segurança

- **Credenciais:** Nunca commite `config/credentials.json`. Use variáveis de ambiente.
- **API Keys:** Armazene no Vercel Environment Variables.
- **Webhooks:** Valide assinaturas para evitar requisições maliciosas.

---

## 🤝 Contribuindo

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adicionar nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Propriedade da Coins.xyz. Uso interno apenas.

---

## 📞 Contato

- **Comunidade:** [coins-renda-extra.circle.so](https://coins-renda-extra.circle.so)
- **Email:** suporte@coins.xyz
- **Liderança:** Gui (@guilabird)

---

**Construído com ❤️ pela equipe da Coins.xyz**
