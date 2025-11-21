/**
 * Script para publicar conteúdo Markdown no Circle
 * 
 * Uso: node scripts/publish-content.js <caminho-do-arquivo.md>
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Carregar credenciais
const credentialsPath = path.join(__dirname, '../config/credentials.json');
if (!fs.existsSync(credentialsPath)) {
  console.error('❌ Arquivo credentials.json não encontrado!');
  console.error('   Copie credentials.example.json e preencha com suas chaves.');
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

// Mapeamento de slugs para IDs de espaços
const SPACE_IDS = {
  'arquivo-de-missao': 2347717,
  'identificacao': 2347718,
  'qg-quartel-general': 2347719,
  'desafio-da-garrafa': 2321958,
  'eventos-da-base': 2347720,
  'sala-de-estudos': 2347714,
  'inteligencia-de-mercado': 2347737,
  'cantina-da-base': 2347715,
  'conselho-academico': 2347716,
  'campo-de-provas': 2347739,
  'labs': 2347740
};

/**
 * Extrai frontmatter de um arquivo Markdown
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, body: content };
  }
  
  const [, frontmatter, body] = match;
  const metadata = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      metadata[key.trim()] = value === 'true' ? true : value === 'false' ? false : value;
    }
  });
  
  return { metadata, body: body.trim() };
}

/**
 * Converte Markdown para HTML
 */
function markdownToHtml(markdown) {
  // Conversão básica (você pode usar uma lib como 'marked' para algo mais robusto)
  return markdown
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>');
}

/**
 * Publica post no Circle
 */
async function publishPost(spaceId, title, body, isPinned = false) {
  try {
    const response = await axios.post(
      `https://app.circle.so/api/v1/posts`,
      {
        community_id: communityId,
        space_id: spaceId,
        name: title,
        body: body,
        is_pinned: isPinned,
        is_comments_enabled: true,
        is_liking_enabled: true
      },
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ Publicado: ${title}`);
    console.log(`   URL: ${response.data.url}`);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Erro ao publicar "${title}":`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Função principal
 */
async function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('❌ Uso: node publish-content.js <caminho-do-arquivo.md>');
    process.exit(1);
  }
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }
  
  console.log(`\n📄 Lendo arquivo: ${filePath}\n`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const { metadata, body } = parseFrontmatter(content);
  
  // Validar metadados
  if (!metadata.title) {
    console.error('❌ Frontmatter inválido: falta "title"');
    process.exit(1);
  }
  
  if (!metadata.space) {
    console.error('❌ Frontmatter inválido: falta "space"');
    process.exit(1);
  }
  
  const spaceId = SPACE_IDS[metadata.space];
  if (!spaceId) {
    console.error(`❌ Espaço desconhecido: ${metadata.space}`);
    console.error(`   Espaços disponíveis: ${Object.keys(SPACE_IDS).join(', ')}`);
    process.exit(1);
  }
  
  // Converter Markdown para HTML
  const htmlBody = markdownToHtml(body);
  
  // Publicar
  await publishPost(
    spaceId,
    metadata.title,
    htmlBody,
    metadata.pinned || false
  );
  
  console.log('\n✅ Publicação concluída!\n');
}

main().catch(error => {
  console.error('\n❌ Erro fatal:', error.message);
  process.exit(1);
});
