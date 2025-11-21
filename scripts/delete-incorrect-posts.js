/**
 * Deletar posts incorretos do Desafio da Garrafa
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

async function listPosts() {
  try {
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
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao listar posts:', error.response?.data || error.message);
    return [];
  }
}

async function deletePost(postId, postName) {
  try {
    await axios.delete(`https://app.circle.so/api/v1/posts/${postId}`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        community_id: communityId
      }
    });
    
    console.log(`✅ Deletado: ${postName}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao deletar "${postName}":`, error.response?.data || error.message);
    return false;
  }
}

async function deleteIncorrectPosts() {
  console.log('\n🗑️  Deletando posts incorretos...\n');
  
  const posts = await listPosts();
  
  if (!posts || posts.length === 0) {
    console.log('⚠️  Nenhum post encontrado.');
    return;
  }
  
  console.log(`📊 Total de posts encontrados: ${posts.length}\n`);
  
  // Posts a deletar (Semana 01 e 02 do Desafio da Garrafa)
  const postsToDelete = posts.filter(post => 
    post.name && (
      post.name.includes('Semana 01') || 
      post.name.includes('Semana 02') ||
      post.name.includes('Stablecoins - A Moeda do Futuro') ||
      post.name.includes('Pagamentos Cross-Border')
    ) && post.space_name === 'Desafio da Garrafa'
  );
  
  if (postsToDelete.length === 0) {
    console.log('✅ Nenhum post incorreto encontrado para deletar.');
    return;
  }
  
  console.log(`🎯 Posts a deletar: ${postsToDelete.length}\n`);
  
  for (const post of postsToDelete) {
    console.log(`Deletando: ${post.name} (ID: ${post.id})`);
    await deletePost(post.id, post.name);
    await sleep(1000);
  }
  
  console.log('\n✅ Deleção concluída!\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

deleteIncorrectPosts();
