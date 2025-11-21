/**
 * Listar todos os posts publicados com detalhes
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

async function listAllPosts() {
  try {
    console.log('\n📊 Listando todos os posts publicados...\n');
    
    const response = await axios.get(`https://app.circle.so/api/v1/posts`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        community_id: communityId,
        per_page: 100
      }
    });
    
    const posts = response.data;
    
    if (!posts || posts.length === 0) {
      console.log('⚠️  Nenhum post encontrado.\n');
      return;
    }
    
    console.log(`✅ Total de posts: ${posts.length}\n`);
    console.log('═'.repeat(80));
    
    // Agrupar por espaço
    const postsBySpace = {};
    
    posts.forEach(post => {
      const spaceName = post.space_name || 'Sem espaço';
      if (!postsBySpace[spaceName]) {
        postsBySpace[spaceName] = [];
      }
      postsBySpace[spaceName].push(post);
    });
    
    // Listar por espaço
    Object.keys(postsBySpace).sort().forEach(spaceName => {
      console.log(`\n📂 ${spaceName}`);
      console.log('─'.repeat(80));
      
      postsBySpace[spaceName].forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.name}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Fixado: ${post.is_pinned ? '📌 SIM' : 'NÃO'}`);
        console.log(`   Criado em: ${new Date(post.created_at).toLocaleString('pt-BR')}`);
        console.log(`   URL: https://coins-renda-extra.circle.so/c/${post.space_slug}/${post.slug}`);
      });
    });
    
    console.log('\n' + '═'.repeat(80) + '\n');
    
    // Salvar relatório
    const report = {
      total: posts.length,
      timestamp: new Date().toISOString(),
      posts: posts.map(p => ({
        id: p.id,
        name: p.name,
        space: p.space_name,
        space_slug: p.space_slug,
        is_pinned: p.is_pinned,
        created_at: p.created_at,
        url: `https://coins-renda-extra.circle.so/c/${p.space_slug}/${p.slug}`
      }))
    };
    
    const reportPath = path.join(__dirname, '../docs/posts-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`💾 Relatório salvo em: docs/posts-report.json\n`);
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

listAllPosts();
