#!/usr/bin/env node

/**
 * Script 01: Criar Arquitetura de Espaços da Base XYZ
 * 
 * Este script cria todos os grupos de espaços e espaços necessários
 * para a Base XYZ conforme definido no PDB (Project Definition Blueprint).
 */

const circleAPI = require('./lib/circle-api');
const fs = require('fs');
const path = require('path');

// Carregar a arquitetura de espaços
const architecturePath = path.join(__dirname, '../config/spaces-architecture.json');
const architecture = JSON.parse(fs.readFileSync(architecturePath, 'utf8'));

console.log('🏗️  IMPLEMENTAÇÃO DA ARQUITETURA DE ESPAÇOS - BASE XYZ\n');
console.log('=' .repeat(80));
console.log('\n');

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Listar grupos e espaços existentes
    console.log('📊 Etapa 1: Mapeando estrutura existente...\n');
    
    const existingGroups = await circleAPI.listSpaceGroups();
    const existingSpaces = await circleAPI.listSpaces();
    
    console.log(`   ✅ Encontrados ${existingGroups.records.length} grupos existentes`);
    console.log(`   ✅ Encontrados ${existingSpaces.records.length} espaços existentes\n`);
    
    // 2. Criar grupos de espaços
    console.log('📂 Etapa 2: Criando grupos de espaços...\n');
    
    const createdGroups = {};
    
    for (const group of architecture.space_groups) {
      // Verificar se já existe
      const existing = existingGroups.records.find(g => g.name === group.name);
      
      if (existing) {
        console.log(`   ⏭️  Grupo "${group.name}" já existe (ID: ${existing.id})`);
        createdGroups[group.key] = existing;
      } else {
        console.log(`   🔨 Criando grupo "${group.name}"...`);
        const newGroup = await circleAPI.createSpaceGroup(group.name, group.description);
        console.log(`   ✅ Grupo criado (ID: ${newGroup.id})`);
        createdGroups[group.key] = newGroup;
      }
    }
    
    console.log('\n');
    
    // 3. Criar espaços
    console.log('🏠 Etapa 3: Criando espaços...\n');
    
    const createdSpaces = {};
    
    for (const space of architecture.spaces) {
      // Verificar se já existe
      const existing = existingSpaces.records.find(s => s.slug === space.slug);
      
      if (existing) {
        console.log(`   ⏭️  Espaço "${space.name}" já existe (ID: ${existing.id})`);
        createdSpaces[space.key] = existing;
        continue;
      }
      
      // Preparar dados do espaço
      const spaceData = {
        name: space.name,
        slug: space.slug,
        space_type: space.space_type,
        is_private: space.is_private,
        is_hidden_from_non_members: space.is_hidden_from_non_members || false,
        emoji: space.emoji,
        description: space.description || ''
      };
      
      // Adicionar space_group_id se especificado
      if (space.space_group_key && createdGroups[space.space_group_key]) {
        spaceData.space_group_id = createdGroups[space.space_group_key].id;
      }
      
      console.log(`   🔨 Criando espaço "${space.name}" (${space.space_type})...`);
      
      try {
        const newSpace = await circleAPI.createSpace(spaceData);
        console.log(`   ✅ Espaço criado (ID: ${newSpace.id})`);
        createdSpaces[space.key] = newSpace;
        
        // Aguardar um pouco entre criações para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.log(`   ⚠️  Erro ao criar espaço "${space.name}": ${error.message}`);
      }
    }
    
    console.log('\n');
    
    // 4. Salvar mapeamento de IDs
    console.log('💾 Etapa 4: Salvando mapeamento de IDs...\n');
    
    const mapping = {
      timestamp: new Date().toISOString(),
      groups: createdGroups,
      spaces: createdSpaces
    };
    
    const mappingPath = path.join(__dirname, '../docs/space-ids-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    
    console.log(`   ✅ Mapeamento salvo em: ${mappingPath}\n`);
    
    // 5. Resumo final
    console.log('=' .repeat(80));
    console.log('\n📋 RESUMO DA IMPLEMENTAÇÃO:\n');
    console.log(`   Grupos criados/verificados: ${Object.keys(createdGroups).length}`);
    console.log(`   Espaços criados/verificados: ${Object.keys(createdSpaces).length}`);
    console.log('\n✅ Arquitetura de espaços implementada com sucesso!\n');
    
  } catch (error) {
    console.error('\n❌ Erro fatal durante a implementação:');
    console.error(error);
    process.exit(1);
  }
}

// Executar
main();
