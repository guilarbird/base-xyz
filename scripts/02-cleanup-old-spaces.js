#!/usr/bin/env node

/**
 * Script 02: Auditar e Limpar Espaços Antigos
 * 
 * Este script:
 * 1. Lista todos os espaços existentes
 * 2. Identifica quais têm conteúdo relevante
 * 3. Cria grupo LEGACY para espaços com conteúdo histórico
 * 4. Move espaços relevantes para LEGACY
 * 5. Deleta espaços vazios ou com conteúdo irrelevante
 */

const circleAPI = require('./lib/circle-api');
const fs = require('fs');
const path = require('path');

console.log('🧹 AUDITORIA E LIMPEZA DE ESPAÇOS - BASE XYZ\n');
console.log('='.repeat(80));
console.log('\n');

/**
 * Espaços que devem ser mantidos (têm conteúdo relevante)
 */
const KEEP_SPACES = [
  'boas-vindas-da-coins-xyz',  // Tem curso com estudantes
  'desafio-da-garrafa',         // Tem posts do André Leiria
  'apresentacoes'               // Tem apresentações reais
];

/**
 * Espaços novos da Base XYZ (não deletar)
 */
const NEW_BASE_XYZ_SPACES = [
  'arquivo-de-missao',
  'identificacao',
  'qg-quartel-general',
  'cantina-da-base',
  'sala-de-estudos',
  'conselho-academico',
  'inteligencia-de-mercado',
  'campo-de-provas',
  'labs',
  'eventos-da-base'
];

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Listar todos os espaços
    console.log('📊 Etapa 1: Listando todos os espaços existentes...\n');
    
    const spacesResponse = await circleAPI.listSpaces();
    const allSpaces = spacesResponse.records;
    
    console.log(`   ✅ Total de espaços encontrados: ${allSpaces.length}\n`);
    
    // 2. Categorizar espaços
    console.log('📋 Etapa 2: Categorizando espaços...\n');
    
    const toKeep = [];
    const toDelete = [];
    const newSpaces = [];
    
    for (const space of allSpaces) {
      const slug = space.slug;
      
      if (NEW_BASE_XYZ_SPACES.includes(slug)) {
        newSpaces.push(space);
        console.log(`   ✅ [NOVO] ${space.name} (${slug})`);
      } else if (KEEP_SPACES.includes(slug)) {
        toKeep.push(space);
        console.log(`   📦 [LEGACY] ${space.name} (${slug})`);
      } else {
        toDelete.push(space);
        console.log(`   ❌ [DELETAR] ${space.name} (${slug})`);
      }
    }
    
    console.log('\n');
    console.log(`   Novos (Base XYZ): ${newSpaces.length}`);
    console.log(`   Manter (Legacy): ${toKeep.length}`);
    console.log(`   Deletar: ${toDelete.length}\n`);
    
    // 3. Criar grupo LEGACY
    console.log('📂 Etapa 3: Criando grupo LEGACY...\n');
    
    const groupsResponse = await circleAPI.listSpaceGroups();
    const existingGroups = groupsResponse.records;
    
    let legacyGroup = existingGroups.find(g => g.name === '📚 LEGACY');
    
    if (!legacyGroup) {
      console.log('   🔨 Criando grupo LEGACY...');
      legacyGroup = await circleAPI.createSpaceGroup(
        '📚 LEGACY',
        'Conteúdos históricos e materiais de arquivo'
      );
      console.log(`   ✅ Grupo LEGACY criado (ID: ${legacyGroup.id})\n`);
    } else {
      console.log(`   ⏭️  Grupo LEGACY já existe (ID: ${legacyGroup.id})\n`);
    }
    
    // 4. Mover espaços para LEGACY
    console.log('📦 Etapa 4: Movendo espaços para LEGACY...\n');
    
    for (const space of toKeep) {
      try {
        console.log(`   🔄 Movendo "${space.name}" para LEGACY...`);
        await circleAPI.updateSpace(space.id, {
          space_group_id: legacyGroup.id
        });
        console.log(`   ✅ Movido com sucesso`);
        
        // Aguardar entre operações
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`   ⚠️  Erro ao mover "${space.name}": ${error.message}`);
      }
    }
    
    console.log('\n');
    
    // 5. Deletar espaços vazios
    console.log('🗑️  Etapa 5: Deletando espaços vazios/irrelevantes...\n');
    console.log('   ⚠️  ATENÇÃO: Esta operação é irreversível!\n');
    
    for (const space of toDelete) {
      try {
        console.log(`   🗑️  Deletando "${space.name}" (${space.slug})...`);
        await circleAPI.deleteSpace(space.id);
        console.log(`   ✅ Deletado com sucesso`);
        
        // Aguardar entre operações
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`   ⚠️  Erro ao deletar "${space.name}": ${error.message}`);
      }
    }
    
    console.log('\n');
    
    // 6. Salvar relatório
    console.log('💾 Etapa 6: Salvando relatório de limpeza...\n');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_spaces_before: allSpaces.length,
        new_base_xyz: newSpaces.length,
        moved_to_legacy: toKeep.length,
        deleted: toDelete.length
      },
      new_spaces: newSpaces.map(s => ({ id: s.id, name: s.name, slug: s.slug })),
      legacy_spaces: toKeep.map(s => ({ id: s.id, name: s.name, slug: s.slug })),
      deleted_spaces: toDelete.map(s => ({ id: s.id, name: s.name, slug: s.slug }))
    };
    
    const reportPath = path.join(__dirname, '../docs/cleanup-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`   ✅ Relatório salvo em: ${reportPath}\n`);
    
    // 7. Resumo final
    console.log('='.repeat(80));
    console.log('\n📋 RESUMO DA LIMPEZA:\n');
    console.log(`   Espaços antes: ${allSpaces.length}`);
    console.log(`   Espaços novos (Base XYZ): ${newSpaces.length}`);
    console.log(`   Movidos para LEGACY: ${toKeep.length}`);
    console.log(`   Deletados: ${toDelete.length}`);
    console.log(`   Total após limpeza: ${newSpaces.length + toKeep.length}`);
    console.log('\n✅ Limpeza concluída com sucesso!\n');
    
  } catch (error) {
    console.error('\n❌ Erro fatal durante a limpeza:');
    console.error(error);
    process.exit(1);
  }
}

// Executar
main();
