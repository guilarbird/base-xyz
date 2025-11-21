#!/usr/bin/env node

/**
 * Script 00: Explorar Estrutura Atual do Circle
 * 
 * Este script faz uma análise completa da estrutura atual da comunidade
 * no Circle para entender o que já existe antes de começar a implementação.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Carregar credenciais
const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const { communityId, baseUrl } = credentials.circle;
const apiKey = credentials.circle.tokens.admin_v2; // Usando Admin v2

// Configurar cliente HTTP
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Token ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

async function exploreCommunity() {
  console.log('🔍 Explorando a estrutura atual da comunidade no Circle...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    communityId: communityId,
    spaces: [],
    members: {},
    settings: {}
  };

  try {
    // 1. Listar todos os espaços (spaces)
    console.log('📂 Buscando espaços existentes...');
    const spacesResponse = await api.get(`/communities/${communityId}/spaces`);
    report.spaces = spacesResponse.data;
    console.log(`   ✅ Encontrados ${report.spaces.length} espaços\n`);

    // 2. Informações da comunidade
    console.log('🏠 Buscando informações da comunidade...');
    const communityResponse = await api.get(`/communities/${communityId}`);
    report.settings = communityResponse.data;
    console.log(`   ✅ Nome: ${report.settings.name}`);
    console.log(`   ✅ URL: ${report.settings.url}\n`);

    // 3. Estatísticas de membros
    console.log('👥 Buscando estatísticas de membros...');
    const membersResponse = await api.get(`/communities/${communityId}/members`, {
      params: { per_page: 1 } // Apenas para pegar o total
    });
    report.members.total = membersResponse.data.length || 0;
    console.log(`   ✅ Total de membros: ${report.members.total}\n`);

    // Salvar relatório
    const reportPath = path.join(__dirname, '../docs/current-structure-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Relatório completo salvo em: ${reportPath}\n`);

    // Exibir resumo dos espaços
    console.log('📋 RESUMO DOS ESPAÇOS EXISTENTES:');
    console.log('─'.repeat(80));
    
    if (report.spaces.length === 0) {
      console.log('   (Nenhum espaço encontrado - comunidade vazia)');
    } else {
      report.spaces.forEach((space, index) => {
        console.log(`${index + 1}. ${space.name}`);
        console.log(`   Slug: ${space.slug}`);
        console.log(`   Tipo: ${space.space_type || 'N/A'}`);
        console.log(`   Visibilidade: ${space.is_private ? 'Privado' : 'Público'}`);
        console.log('');
      });
    }

    console.log('─'.repeat(80));
    console.log('\n✅ Exploração concluída com sucesso!');
    
    return report;

  } catch (error) {
    console.error('❌ Erro ao explorar a comunidade:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Mensagem: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`   ${error.message}`);
    }
    process.exit(1);
  }
}

// Executar
exploreCommunity();
