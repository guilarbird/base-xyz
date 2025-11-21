# 🔄 Guia de Deploy Contínuo - Base XYZ

**Objetivo:** Explicar como publicar e gerenciar conteúdos na Base XYZ de forma automatizada.

---

## 🎯 O Que é Deploy Contínuo?

É o processo de **publicar automaticamente** novos conteúdos e atualizações na Base XYZ sempre que você faz uma mudança no repositório GitHub.

**Fluxo:**
1. Você edita um arquivo no GitHub
2. Faz commit e push
3. Automação detecta a mudança
4. Publica no Circle automaticamente

---

## 🛠️ Como Publicar Conteúdo

### Método 1: Via GitHub (Recomendado)

1.  **Navegue até a pasta `content/posts/`** no repositório:
    - [github.com/guilarbird/base-xyz/tree/main/content/posts](https://github.com/guilarbird/base-xyz/tree/main/content/posts)

2.  **Crie um novo arquivo:**
    - Clique em **Add file → Create new file**
    - Nome do arquivo: `novo-post.md`

3.  **Adicione o conteúdo em Markdown:**
    - **Importante:** Adicione o "frontmatter" no topo:
      ```markdown
      ---
      title: "Título do Novo Post"
      space: "qg-quartel-general"  # Slug do espaço
      pinned: false              # Fixar no topo? (true/false)
      ---
      
      Conteúdo do post aqui...
      ```

4.  **Faça commit:**
    - Dê um título para a mudança (ex: "Adicionar novo post sobre X")
    - Clique em **Commit new file**

5.  **Pronto!** A automação (GitHub Action) vai:
    - Detectar o novo arquivo
    - Chamar o script `publish-content.js`
    - Publicar o post no Circle

### Método 2: Via Script Local (Avançado)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/guilarbird/base-xyz.git
    cd base-xyz
    ```

2.  **Instale dependências:**
    ```bash
    npm install
    ```

3.  **Configure credenciais:**
    - Copie `config/credentials.example.json` para `config/credentials.json`
    - Preencha com seu API token do Circle

4.  **Crie o arquivo Markdown** em `content/posts/`

5.  **Execute o script:**
    ```bash
    node scripts/publish-content.js content/posts/novo-post.md
    ```

---

## ✏️ Como Editar Conteúdo

1.  **Navegue até o arquivo** que você quer editar no GitHub.
2.  **Clique no ícone de lápis** (Edit this file).
3.  **Faça suas mudanças.**
4.  **Faça commit** das mudanças.
5.  A automação vai detectar e atualizar o post no Circle (futuro).

---

## 🔄 Como Voltar Versões Antigas (Rollback)

1.  **Vá em "Commits"** no GitHub.
2.  **Encontre o commit** que você quer reverter.
3.  **Clique no ícone `<>`** (Browse the repository at this point in the history).
4.  **Copie o conteúdo** da versão antiga.
5.  **Cole no arquivo atual** e faça um novo commit.

---

## 🚀 Como Gerar Novos Módulos (Cursos)

1.  **Crie uma nova pasta** em `content/courses/`:
    - Ex: `content/courses/novo-curso/`

2.  **Crie arquivos Markdown** para cada lição:
    - `01-introducao.md`
    - `02-conceitos-basicos.md`
    - etc.

3.  **Adicione frontmatter** em cada arquivo.

4.  **Faça commit e push.**

5.  A automação (futura) criará o curso e as lições no Circle.

---

## ❓ O Que é Manual vs Automatizado

| Tarefa | Status | Como Fazer |
| :--- | :--- | :--- |
| **Publicar post** | ✅ Automatizado | Commit no GitHub |
| **Editar post** | ⚠️ Semi-automático | Editar no GitHub (atualização no Circle é futura) |
| **Criar espaço** | ❌ Manual | Interface do Circle |
| **Criar grupo** | ❌ Manual | Interface do Circle |
| **Conceder badge** | ⚠️ Semi-automático | Via webhook (futuro) |

---

## 📈 Benefícios

- **Agilidade:** Publique conteúdo em segundos.
- **Segurança:** Histórico completo de todas as mudanças.
- **Colaboração:** Equipe pode revisar e aprovar conteúdo via Pull Requests.
- **Escalabilidade:** Sistema pronto para crescer com a comunidade.

---

**Preparado por:** Manus AI  
**Versão:** 1.0
