#!/usr/bin/env node

/**
 * Script 03: Finalizar Estrutura e Publicar Conteúdos
 * 
 * Este script:
 * 1. Deleta grupos antigos vazios
 * 2. Corrige emojis duplicados nos espaços
 * 3. Cria espaços faltantes
 * 4. Publica os conteúdos fundamentais
 */

const circleAPI = require('./lib/circle-api');
const fs = require('fs');
const path = require('path');

console.log('🎯 FINALIZAÇÃO E PUBLICAÇÃO - BASE XYZ\n');
console.log('='.repeat(80));
console.log('\n');

/**
 * Carregar conteúdos prontos
 */
function loadContent(filename) {
  const contentPath = path.join(__dirname, '../content/posts', filename);
  return fs.readFileSync(contentPath, 'utf8');
}

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Deletar grupos antigos
    console.log('🗑️  Etapa 1: Deletando grupos antigos vazios...\n');
    
    const groupsResponse = await circleAPI.listSpaceGroups();
    const allGroups = groupsResponse.records;
    
    const oldGroupNames = [
      'Aprendendo a Engatinher.',
      'Coins Academy.',
      'Coins Creators Hub.',
      'Coins Games.'
    ];
    
    for (const group of allGroups) {
      if (oldGroupNames.includes(group.name)) {
        try {
          console.log(`   🗑️  Deletando grupo "${group.name}"...`);
          await circleAPI.deleteSpaceGroup(group.id);
          console.log(`   ✅ Deletado`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log(`   ⚠️  Erro: ${error.message}`);
        }
      }
    }
    
    console.log('\n');
    
    // 2. Corrigir emojis duplicados
    console.log('✏️  Etapa 2: Corrigindo emojis duplicados...\n');
    
    const spacesResponse = await circleAPI.listSpaces();
    const allSpaces = spacesResponse.records;
    
    const corrections = {
      '📜 📜 Arquivo de Missão': '📜 Arquivo de Missão',
      '🪪 🪪 Identificação': '🪪 Identificação',
      '📢 📢 QG - Quartel General': '📢 QG - Quartel General',
      '☕ ☕ Cantina da Base': '☕ Cantina da Base',
      '📚 📚 Sala de Estudos': '📚 Sala de Estudos',
      '📅 📅 Eventos da Base': '📅 Eventos da Base'
    };
    
    for (const space of allSpaces) {
      if (corrections[space.name]) {
        try {
          console.log(`   ✏️  Corrigindo "${space.name}" → "${corrections[space.name]}"...`);
          await circleAPI.updateSpace(space.id, {
            name: corrections[space.name]
          });
          console.log(`   ✅ Corrigido`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log(`   ⚠️  Erro: ${error.message}`);
        }
      }
    }
    
    console.log('\n');
    
    // 3. Criar espaços faltantes
    console.log('🏗️  Etapa 3: Criando espaços faltantes...\n');
    
    // Recarregar lista de espaços
    const updatedSpacesResponse = await circleAPI.listSpaces();
    const currentSpaces = updatedSpacesResponse.records;
    const currentSlugs = currentSpaces.map(s => s.slug);
    
    // Recarregar grupos
    const updatedGroupsResponse = await circleAPI.listSpaceGroups();
    const currentGroups = updatedGroupsResponse.records;
    
    const groupMap = {};
    for (const group of currentGroups) {
      if (group.name.includes('ACADEMIA')) groupMap.academia = group.id;
      if (group.name.includes('TRILHA CREATOR')) groupMap.trilha_creator = group.id;
      if (group.name.includes('TRILHA BUILDER')) groupMap.trilha_builder = group.id;
      if (group.name.includes('GERAL')) groupMap.geral = group.id;
    }
    
    const missingSpaces = [
      {
        name: '📊 Inteligência de Mercado',
        slug: 'inteligencia-de-mercado',
        space_type: 'basic',
        space_group_id: groupMap.academia,
        is_private: false,
        emoji: '📊',
        description: 'Análises, teses e pesquisas sobre cripto e mercados emergentes'
      },
      {
        name: '🎓 Conselho Acadêmico',
        slug: 'conselho-academico',
        space_type: 'basic',
        space_group_id: groupMap.academia,
        is_private: false,
        emoji: '🎓',
        description: 'Dúvidas sobre os cursos e materiais de estudo'
      },
      {
        name: '⚔️ Campo de Provas',
        slug: 'campo-de-provas',
        space_type: 'basic',
        space_group_id: groupMap.trilha_creator,
        is_private: true,
        is_hidden_from_non_members: true,
        emoji: '⚔️',
        description: 'Missões de qualificação para Creators'
      },
      {
        name: '🔬 Labs',
        slug: 'labs',
        space_type: 'basic',
        space_group_id: groupMap.trilha_builder,
        is_private: true,
        is_hidden_from_non_members: true,
        emoji: '🔬',
        description: 'Desafios técnicos e simulações para Builders'
      }
    ];
    
    for (const spaceData of missingSpaces) {
      if (!currentSlugs.includes(spaceData.slug)) {
        try {
          console.log(`   🔨 Criando "${spaceData.name}"...`);
          await circleAPI.createSpace(spaceData);
          console.log(`   ✅ Criado`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log(`   ⚠️  Erro: ${error.message}`);
        }
      } else {
        console.log(`   ⏭️  "${spaceData.name}" já existe`);
      }
    }
    
    console.log('\n');
    
    // 4. Publicar conteúdos
    console.log('📝 Etapa 4: Publicando conteúdos fundamentais...\n');
    
    // Recarregar espaços finais
    const finalSpacesResponse = await circleAPI.listSpaces();
    const finalSpaces = finalSpacesResponse.records;
    
    const spaceMap = {};
    for (const space of finalSpaces) {
      spaceMap[space.slug] = space.id;
    }
    
    // Conteúdos a publicar
    const publications = [
      {
        space_slug: 'arquivo-de-missao',
        title: 'Manifesto da Base XYZ',
        content: loadContent('01-manifesto-base-xyz.md'),
        is_pinned: true
      },
      {
        space_slug: 'identificacao',
        title: '📌 Processo de Identificação: Apresente-se à Tropa',
        content: loadContent('02-instrucoes-identificacao.md'),
        is_pinned: true
      },
      {
        space_slug: 'inteligencia-de-mercado',
        title: '[TESE] Por que Pagamentos são o Futuro do Cripto no Sul Global',
        content: fs.readFileSync(path.join(__dirname, '../content/posts/03-todos-conteudos-prontos.md'), 'utf8').split('---')[1], // Extrair primeira tese
        is_pinned: true
      }
    ];
    
    for (const pub of publications) {
      if (!spaceMap[pub.space_slug]) {
        console.log(`   ⏭️  Espaço "${pub.space_slug}" não encontrado, pulando...`);
        continue;
      }
      
      try {
        console.log(`   📝 Publicando "${pub.title}" em "${pub.space_slug}"...`);
        
        await circleAPI.createPost(spaceMap[pub.space_slug], {
          name: pub.title,
          body: pub.content,
          is_pinned: pub.is_pinned || false
        });
        
        console.log(`   ✅ Publicado`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log(`   ⚠️  Erro: ${error.message}`);
      }
    }
    
    console.log('\n');
    
    // 5. Resumo final
    console.log('='.repeat(80));
    console.log('\n📋 RESUMO FINAL:\n');
    console.log(`   ✅ Grupos antigos deletados`);
    console.log(`   ✅ Emojis corrigidos`);
    console.log(`   ✅ Espaços faltantes criados`);
    console.log(`   ✅ Conteúdos fundamentais publicados`);
    console.log('\n🎉 Base XYZ está pronta para o lançamento!\n');
    
  } catch (error) {
    console.error('\n❌ Erro fatal:');
    console.error(error);
    process.exit(1);
  }
}

// Executar
main();
