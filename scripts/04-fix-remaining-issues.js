#!/usr/bin/env node

/**
 * Script 04: Corrigir Erros Remanescentes
 * 
 * Este script corrige de forma robusta:
 * 1. Emojis duplicados (detecta automaticamente)
 * 2. Grupos antigos que ainda existem
 * 3. Qualquer inconsistência na estrutura
 */

const circleAPI = require('./lib/circle-api');

console.log('🔧 CORREÇÃO DE ERROS REMANESCENTES - BASE XYZ\n');
console.log('='.repeat(80));
console.log('\n');

/**
 * Detecta e corrige emojis duplicados em um nome
 */
function fixDuplicateEmojis(name) {
  // Regex para detectar emojis
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu;
  
  const emojis = name.match(emojiRegex) || [];
  
  // Se tem 2+ emojis iguais consecutivos, remover duplicatas
  if (emojis.length >= 2 && emojis[0] === emojis[1]) {
    // Remover o primeiro emoji duplicado
    return name.replace(emojiRegex, '').trim();
  }
  
  return name;
}

/**
 * Grupos permitidos (whitelist)
 */
const ALLOWED_GROUPS = [
  'ACADEMIA',
  'TRILHA CREATOR',
  'TRILHA BUILDER',
  'GERAL',
  'LEGACY'
];

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Listar e corrigir grupos
    console.log('📂 Etapa 1: Auditando e corrigindo grupos...\n');
    
    const groupsResponse = await circleAPI.listSpaceGroups();
    const allGroups = groupsResponse.records;
    
    console.log(`   Total de grupos: ${allGroups.length}\n`);
    
    for (const group of allGroups) {
      const groupName = group.name.replace(/[🎓🎬⚙️🏠📚🎖️⚔️🔬📊☕📜🪪📢📅🥤]/gu, '').trim();
      
      const isAllowed = ALLOWED_GROUPS.some(allowed => groupName.includes(allowed));
      
      if (!isAllowed) {
        try {
          console.log(`   🗑️  Deletando grupo "${group.name}" (não está na whitelist)...`);
          await circleAPI.deleteSpaceGroup(group.id);
          console.log(`   ✅ Deletado`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log(`   ⚠️  Erro: ${error.message}`);
        }
      } else {
        console.log(`   ✅ Mantendo grupo "${group.name}"`);
      }
    }
    
    console.log('\n');
    
    // 2. Listar e corrigir espaços
    console.log('🏠 Etapa 2: Auditando e corrigindo espaços...\n');
    
    const spacesResponse = await circleAPI.listSpaces();
    const allSpaces = spacesResponse.records;
    
    console.log(`   Total de espaços: ${allSpaces.length}\n`);
    
    for (const space of allSpaces) {
      const originalName = space.name;
      const fixedName = fixDuplicateEmojis(originalName);
      
      if (originalName !== fixedName) {
        try {
          console.log(`   ✏️  Corrigindo "${originalName}" → "${fixedName}"...`);
          await circleAPI.updateSpace(space.id, {
            name: fixedName
          });
          console.log(`   ✅ Corrigido`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log(`   ⚠️  Erro: ${error.message}`);
        }
      } else {
        console.log(`   ✓ "${originalName}" está OK`);
      }
    }
    
    console.log('\n');
    
    // 3. Verificar estrutura final
    console.log('📊 Etapa 3: Verificando estrutura final...\n');
    
    const finalGroupsResponse = await circleAPI.listSpaceGroups();
    const finalSpacesResponse = await circleAPI.listSpaces();
    
    console.log('   GRUPOS FINAIS:');
    for (const group of finalGroupsResponse.records) {
      console.log(`   - ${group.name}`);
    }
    
    console.log('\n   ESPAÇOS FINAIS:');
    const spacesByGroup = {};
    
    for (const space of finalSpacesResponse.records) {
      const groupId = space.space_group_id;
      if (!spacesByGroup[groupId]) {
        spacesByGroup[groupId] = [];
      }
      spacesByGroup[groupId].push(space);
    }
    
    for (const group of finalGroupsResponse.records) {
      console.log(`\n   ${group.name}:`);
      const spaces = spacesByGroup[group.id] || [];
      for (const space of spaces) {
        console.log(`     - ${space.name}`);
      }
    }
    
    // Espaços sem grupo
    const spacesWithoutGroup = finalSpacesResponse.records.filter(s => !s.space_group_id);
    if (spacesWithoutGroup.length > 0) {
      console.log(`\n   SEM GRUPO:`);
      for (const space of spacesWithoutGroup) {
        console.log(`     - ${space.name}`);
      }
    }
    
    console.log('\n');
    console.log('='.repeat(80));
    console.log('\n✅ Correções concluídas!\n');
    console.log(`   Grupos ativos: ${finalGroupsResponse.records.length}`);
    console.log(`   Espaços ativos: ${finalSpacesResponse.records.length}\n`);
    
  } catch (error) {
    console.error('\n❌ Erro fatal:');
    console.error(error);
    process.exit(1);
  }
}

// Executar
main();
