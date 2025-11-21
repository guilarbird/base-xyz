#!/usr/bin/env node

/**
 * Script 00: Testar Conexão com a API do Circle
 * Versão simplificada para validar autenticação
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Carregar credenciais
const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const { communityId, baseUrl } = credentials.circle;
const apiKey = credentials.circle.tokens.admin_v2;

console.log('🔍 Testando conexão com a API do Circle...\n');
console.log(`📍 Community ID: ${communityId}`);
console.log(`🔗 Base URL: ${baseUrl}\n`);

// Teste simples: buscar informações da comunidade
async function testConnection() {
  try {
    console.log('⏳ Fazendo requisição de teste...');
    
    const response = await axios.get(`${baseUrl}/community`, {
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      params: {
        community_id: communityId
      },
      timeout: 10000 // 10 segundos de timeout
    });

    console.log('✅ Conexão estabelecida com sucesso!\n');
    console.log('📊 Informações da Comunidade:');
    console.log(`   Nome: ${response.data.name || 'N/A'}`);
    console.log(`   ID: ${response.data.id || communityId}`);
    console.log(`   URL: ${response.data.url || 'N/A'}\n`);
    
    return true;

  } catch (error) {
    console.error('❌ Erro ao conectar com a API:\n');
    
    if (error.response) {
      console.error(`   Status HTTP: ${error.response.status}`);
      console.error(`   Mensagem: ${error.response.statusText}`);
      console.error(`   Detalhes: ${JSON.stringify(error.response.data, null, 2)}`);
    } else if (error.request) {
      console.error('   Nenhuma resposta recebida do servidor');
      console.error(`   Detalhes: ${error.message}`);
    } else {
      console.error(`   Erro: ${error.message}`);
    }
    
    return false;
  }
}

testConnection();
