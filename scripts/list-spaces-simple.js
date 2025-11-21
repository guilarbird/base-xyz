/**
 * Listar espaços e seus IDs
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

async function listSpaces() {
  try {
    const response = await axios.get(`https://app.circle.so/api/v1/spaces`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        community_id: communityId
      }
    });
    
    console.log(`\n✅ Total de espaços: ${response.data.length}\n`);
    
    const spaces = {};
    response.data.forEach((space, i) => {
      console.log(`${i + 1}. ${space.name}`);
      console.log(`   ID: ${space.id}`);
      console.log(`   Slug: ${space.slug}\n`);
      
      spaces[space.slug] = space.id;
    });
    
    // Salvar mapeamento
    fs.writeFileSync(
      path.join(__dirname, '../docs/space-ids-current.json'),
      JSON.stringify(spaces, null, 2)
    );
    
    console.log('💾 Mapeamento salvo em docs/space-ids-current.json');
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

listSpaces();
