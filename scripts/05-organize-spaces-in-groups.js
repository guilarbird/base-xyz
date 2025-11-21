#!/usr/bin/env node

/**
 * Script 05: Organizar Espaços nos Grupos Corretos
 * 
 * Move cada espaço para seu grupo apropriado conforme o Blueprint
 */

const circleAPI = require('./lib/circle-api');

console.log('📁 ORGANIZAÇÃO DE ESPAÇOS NOS GRUPOS - BASE XYZ\n');
console.log('='.repeat(80));
console.log('\n');

/**
 * Mapeamento de espaços para grupos
 */
const SPACE_TO_GROUP_MAP = {
  // ACADEMIA
  'sala-de-estudos': 'ACADEMIA',
  'inteligencia-de-mercado': 'ACADEMIA',
  'cantina-da-base': 'ACADEMIA',
  'conselho-academico': 'ACADEMIA',
  
  // TRILHA CREATOR
  'campo-de-provas': 'TRILHA CREATOR',
  
  // TRILHA BUILDER
  'labs': 'TRILHA BUILDER',
  
  // GERAL
  'arquivo-de-missao': 'GERAL',
  'identificacao': 'GERAL',
  'qg-quartel-general': 'GERAL',
  'eventos-da-base': 'GERAL',
  
  // LEGACY
  'boas-vindas-da-coins-xyz': 'LEGACY',
  'apresentacoes': 'LEGACY',
  'desafio-da-garrafa': 'LEGACY'
};

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Buscar todos os grupos
    console.log('📂 Etapa 1: Mapeando grupos...\n');
    
    const groupsResponse = await circleAPI.listSpaceGroups();
    const allGroups = groupsResponse.records;
    
    const groupMap = {};
    for (const group of allGroups) {
      const groupName = group.name.replace(/[🎓🎬⚙️🏠📚]/gu, '').trim();
      groupMap[groupName] = group.id;
      console.log(`   ✓ ${groupName} → ID: ${group.id}`);
    }
    
    console.log('\n');
    
    // 2. Buscar todos os espaços
    console.log('🏠 Etapa 2: Organizando espaços...\n');
    
    const spacesResponse = await circleAPI.listSpaces();
    const allSpaces = spacesResponse.records;
    
    let moved = 0;
    let skipped = 0;
    
    for (const space of allSpaces) {
      const targetGroupName = SPACE_TO_GROUP_MAP[space.slug];
      
      if (!targetGroupName) {
        console.log(`   ⏭️  "${space.name}" não está no mapeamento, pulando...`);
        skipped++;
        continue;
      }
      
      const targetGroupId = groupMap[targetGroupName];
      
      if (!targetGroupId) {
        console.log(`   ⚠️  Grupo "${targetGroupName}" não encontrado para "${space.name}"`);
        skipped++;
        continue;
      }
      
      // Verificar se já está no grupo correto
      if (space.space_group_id === targetGroupId) {
        console.log(`   ✓ "${space.name}" já está em "${targetGroupName}"`);
        continue;
      }
      
      try {
        console.log(`   📦 Movendo "${space.name}" → "${targetGroupName}"...`);
        
        await circleAPI.updateSpace(space.id, {
          space_group_id: targetGroupId
        });
        
        console.log(`   ✅ Movido`);
        moved++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`   ❌ Erro: ${error.message}`);
        skipped++;
      }
    }
    
    console.log('\n');
    
    // 3. Verificar resultado final
    console.log('📊 Etapa 3: Verificando organização final...\n');
    
    const finalSpacesResponse = await circleAPI.listSpaces();
    const finalSpaces = finalSpacesResponse.records;
    
    const spacesByGroup = {};
    
    for (const space of finalSpaces) {
      const groupId = space.space_group_id || 'SEM_GRUPO';
      if (!spacesByGroup[groupId]) {
        spacesByGroup[groupId] = [];
      }
      spacesByGroup[groupId].push(space);
    }
    
    for (const group of allGroups) {
      const spaces = spacesByGroup[group.id] || [];
      console.log(`\n   ${group.name} (${spaces.length} espaços):`);
      for (const space of spaces) {
        console.log(`     - ${space.name}`);
      }
    }
    
    const spacesWithoutGroup = spacesByGroup['SEM_GRUPO'] || [];
    if (spacesWithoutGroup.length > 0) {
      console.log(`\n   ⚠️  SEM GRUPO (${spacesWithoutGroup.length} espaços):`);
      for (const space of spacesWithoutGroup) {
        console.log(`     - ${space.name}`);
      }
    }
    
    console.log('\n');
    console.log('='.repeat(80));
    console.log('\n✅ Organização concluída!\n');
    console.log(`   Espaços movidos: ${moved}`);
    console.log(`   Espaços pulados: ${skipped}`);
    console.log(`   Espaços sem grupo: ${spacesWithoutGroup.length}\n`);
    
  } catch (error) {
    console.error('\n❌ Erro fatal:');
    console.error(error);
    process.exit(1);
  }
}

// Executar
main();
