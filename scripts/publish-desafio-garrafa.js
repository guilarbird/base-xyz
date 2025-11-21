/**
 * Publicar conteúdo correto do Desafio da Garrafa
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

// ID do espaço Desafio da Garrafa
const DESAFIO_GARRAFA_SPACE_ID = 2321958;

async function publishPost(spaceId, title, body, isPinned = false) {
  try {
    const response = await axios.post(
      `https://app.circle.so/api/v1/posts`,
      {
        community_id: communityId,
        space_id: spaceId,
        name: title,
        body: body,
        is_pinned: isPinned,
        is_comments_enabled: true,
        is_liking_enabled: true
      },
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ Publicado: ${title}`);
    return response.data;
    
  } catch (error) {
    console.error(`❌ Erro ao publicar "${title}":`, error.response?.data || error.message);
    return null;
  }
}

async function publishDesafioGarrafa() {
  console.log('\n🥤 Publicando Desafio da Garrafa...\n');
  
  await publishPost(
    DESAFIO_GARRAFA_SPACE_ID,
    '🥤 Desafio da Garrafa: Seu Ritual de Entrada na Base XYZ',
    `<h2>🥤 O Desafio da Garrafa</h2>

<p><strong>Bem-vindo ao ritual de entrada da Base XYZ.</strong></p>

<p>O Desafio da Garrafa não é apenas um desafio. É a <strong>porta de entrada</strong> para a Base. É o primeiro teste. É como você mostra quem você é antes mesmo de entrar.</p>

<h3>🎯 O Que É?</h3>

<p>Uma garrafa. Um símbolo. Um totem.</p>

<p>Você vai receber a imagem de uma garrafa (ou um conceito visual dela) e vai <strong>criar sua própria versão</strong>. Do seu jeito. Com suas ferramentas. Com sua visão.</p>

<p>Pode ser:</p>
<ul>
<li>📸 Uma foto criativa</li>
<li>🎬 Um vídeo curto (15-60 segundos)</li>
<li>🎨 Uma ilustração ou design</li>
<li>🤖 Uma criação com IA</li>
<li>😂 Um meme</li>
<li>✨ Motion graphics ou animação</li>
</ul>

<p><strong>O formato não importa. O que importa é a execução.</strong></p>

<h3>⚡ Como Funciona?</h3>

<p><strong>1. Pegue a garrafa</strong><br>
Baixe a imagem de referência (será postada aqui ou nas redes sociais da Coins.xyz)</p>

<p><strong>2. Crie sua versão</strong><br>
Use suas habilidades. Mostre sua criatividade. Conte uma história.</p>

<p><strong>3. Poste nas redes</strong><br>
Publique no Kwai, X (Twitter), Instagram ou TikTok com a hashtag <strong>#DesafioDaGarrafa</strong></p>

<p><strong>4. Compartilhe aqui</strong><br>
Poste o link da sua criação neste espaço como comentário ou novo post</p>

<p><strong>5. Seja notado</strong><br>
A equipe da Base XYZ vai avaliar todas as submissões</p>

<h3>🏆 Por Que Participar?</h3>

<p><strong>1. É sua carta de apresentação</strong><br>
Você mostra suas habilidades antes mesmo de ser selecionado para uma Operação.</p>

<p><strong>2. É o primeiro filtro</strong><br>
Quem participa demonstra comprometimento, criatividade e execução.</p>

<p><strong>3. É sua entrada na Base</strong><br>
Participar do Desafio da Garrafa é o primeiro passo para ser reconhecido na comunidade.</p>

<p><strong>4. Pode te levar para uma Operação</strong><br>
As melhores submissões são vistas pela equipe da Coins.xyz. Creators e Builders que se destacam são convidados para projetos remunerados.</p>

<h3>📋 Critérios de Avaliação</h3>

<ul>
<li>🎨 <strong>Criatividade:</strong> Originalidade e visão única</li>
<li>✨ <strong>Execução:</strong> Qualidade técnica e atenção aos detalhes</li>
<li>📖 <strong>Narrativa:</strong> Capacidade de contar uma história</li>
<li>🎯 <strong>Alinhamento:</strong> Conexão com a cultura da Base XYZ</li>
</ul>

<h3>🎖️ Recompensas</h3>

<ul>
<li>🏅 Badge "Candidato" para quem participar</li>
<li>⭐ Destaque no #QG para as melhores submissões</li>
<li>🎯 Pontos para qualificação nas Operações de Elite</li>
<li>💎 Convite direto para projetos remunerados (casos excepcionais)</li>
</ul>

<h3>⚠️ Regras</h3>

<ul>
<li>✅ Criação original (não plagiar)</li>
<li>✅ Respeitar a identidade visual da Coins.xyz</li>
<li>✅ Postar nas redes com #DesafioDaGarrafa</li>
<li>✅ Compartilhar o link aqui</li>
<li>❌ Não usar conteúdo ofensivo ou inapropriado</li>
</ul>

<h3>🚀 Pronto para Começar?</h3>

<p>A garrafa será revelada em breve. Fique atento aos anúncios no #QG e nas redes sociais da Coins.xyz.</p>

<p><strong>Enquanto isso:</strong></p>
<ol>
<li>Complete seu perfil no #Identificação</li>
<li>Leia o Manifesto no #ArquivoDeMissão</li>
<li>Prepare suas ferramentas</li>
<li>Estude a identidade visual da Coins.xyz</li>
</ol>

<p><strong>A garrafa é só o começo. Mostre do que você é capaz.</strong> 🎖️</p>

<hr>

<p><em>Dúvidas? Comente abaixo ou pergunte no #QG</em></p>`,
    true
  );
  
  console.log('\n✅ Desafio da Garrafa publicado com sucesso!\n');
}

publishDesafioGarrafa();
