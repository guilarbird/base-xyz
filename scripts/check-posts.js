/**
 * Script simples para verificar posts publicados
 */

const fs = require('fs');
const path = require('path');

// Carregar credenciais
const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const communityId = credentials.circle.communityId;
const token = credentials.circle.tokens.admin_v1;

// Tentar diferentes endpoints
const endpoints = [
  `/api/v1/posts`,
  `/api/admin/v2/communities/${communityId}/posts`,
  `/api/v1/communities/${communityId}/posts`
];

async function checkPosts() {
  const axios = require('axios');
  
  console.log('🔍 Verificando posts publicados...\n');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Tentando: ${endpoint}`);
      const response = await axios.get(`https://app.circle.so${endpoint}`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (response.data && response.data.records) {
        console.log(`✅ Sucesso! Encontrados ${response.data.records.length} posts\n`);
        response.data.records.forEach((post, i) => {
          console.log(`${i + 1}. ${post.name}`);
          console.log(`   Space: ${post.space_name || 'N/A'}`);
          console.log(`   ID: ${post.id}\n`);
        });
        return;
      }
      
    } catch (error) {
      console.log(`❌ Erro: ${error.response?.status || error.message}\n`);
    }
  }
  
  console.log('⚠️  Nenhum endpoint funcionou. Os posts podem ter sido deletados.');
}

checkPosts();
