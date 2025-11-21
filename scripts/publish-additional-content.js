/**
 * Publicar conteúdos adicionais
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

const SPACES = {
  'desafio-da-garrafa': 2321958,
  'campo-de-provas': 2347739,
  'sala-de-estudos': 2347714
};

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function publishAdditionalContent() {
  console.log('\n🚀 Publicando conteúdos adicionais...\n');
  
  // 1. DESAFIO DA GARRAFA - SEMANA 01
  console.log('🍾 Publicando Desafio da Garrafa - Semana 01...');
  await publishPost(
    SPACES['desafio-da-garrafa'],
    '🍾 Semana 01: Stablecoins - A Moeda do Futuro',
    `<h2>🍾 Desafio da Garrafa - Semana 01</h2>

<h3>📚 Tema: Stablecoins</h3>

<p><strong>O que são stablecoins?</strong></p>

<p>Stablecoins são criptomoedas atreladas a ativos estáveis (geralmente o dólar). Elas combinam o melhor dos dois mundos:</p>
<ul>
<li>💵 Estabilidade de preço (não oscilam como Bitcoin)</li>
<li>⚡ Velocidade e eficiência do blockchain</li>
<li>🌍 Disponibilidade global 24/7</li>
<li>💸 Custos baixíssimos de transação</li>
</ul>

<h3>🎯 Desafio da Semana</h3>

<p><strong>Missão:</strong> Pesquisar e responder às seguintes perguntas:</p>

<ol>
<li><strong>Quais são as 3 maiores stablecoins do mercado?</strong> (nome, símbolo, volume)</li>
<li><strong>Como elas mantêm a paridade com o dólar?</strong> (mecanismos de colateralização)</li>
<li><strong>Qual a diferença entre stablecoins centralizadas e descentralizadas?</strong></li>
<li><strong>Por que stablecoins são importantes para o Sul Global?</strong></li>
<li><strong>Cite 3 casos de uso reais de stablecoins</strong></li>
</ol>

<h3>📝 Como Participar</h3>

<p>1. Pesquise sobre o tema (use Google, YouTube, Twitter, documentação oficial)<br>
2. Responda às perguntas em um comentário neste post<br>
3. Seja claro, objetivo e cite fontes quando possível<br>
4. Interaja com as respostas de outros membros</p>

<h3>🏆 Recompensas</h3>

<ul>
<li>🎖️ Badge "Especialista em Stablecoins" para respostas completas</li>
<li>⭐ Destaque no #ConselhoAcadêmico para as melhores respostas</li>
<li>🎯 Pontos para qualificação nas Operações de Elite</li>
</ul>

<h3>📚 Recursos Recomendados</h3>

<ul>
<li><a href="https://www.circle.com/en/usdc">Circle - USDC</a></li>
<li><a href="https://tether.to/">Tether - USDT</a></li>
<li><a href="https://makerdao.com/">MakerDAO - DAI</a></li>
<li>Curso "Protocolos da Base" na #SalaDeEstudos</li>
</ul>

<p><strong>Prazo:</strong> 7 dias a partir de hoje</p>

<p><strong>Boa sorte, soldado!</strong> 🎖️</p>`,
    true
  );
  
  await sleep(2000);
  
  // 2. DESAFIO DA GARRAFA - SEMANA 02
  console.log('🍾 Publicando Desafio da Garrafa - Semana 02...');
  await publishPost(
    SPACES['desafio-da-garrafa'],
    '🍾 Semana 02: Pagamentos Cross-Border',
    `<h2>🍾 Desafio da Garrafa - Semana 02</h2>

<h3>📚 Tema: Pagamentos Cross-Border</h3>

<p><strong>O que são pagamentos cross-border?</strong></p>

<p>São transações financeiras entre diferentes países. Tradicionalmente, envolver:</p>
<ul>
<li>🏦 Bancos intermediários (correspondentes)</li>
<li>💸 Taxas altas (3-7% por transação)</li>
<li>🐌 Demora (3-5 dias úteis)</li>
<li>📄 Burocracia e compliance</li>
</ul>

<p><strong>Com blockchain e stablecoins, isso muda completamente.</strong></p>

<h3>🎯 Desafio da Semana</h3>

<p><strong>Missão:</strong> Pesquisar e responder:</p>

<ol>
<li><strong>Como funcionam pagamentos cross-border tradicionais?</strong> (sistema SWIFT, bancos correspondentes)</li>
<li><strong>Quais são os principais problemas desse sistema?</strong></li>
<li><strong>Como blockchain resolve esses problemas?</strong></li>
<li><strong>Quais empresas estão usando stablecoins para pagamentos internacionais?</strong></li>
<li><strong>Cenário prático:</strong> Uma empresa brasileira precisa pagar um fornecedor chinês. Compare:
   <ul>
   <li>Via banco tradicional (tempo, custo, processo)</li>
   <li>Via stablecoin (tempo, custo, processo)</li>
   </ul>
</li>
</ol>

<h3>📝 Como Participar</h3>

<p>1. Pesquise sobre o tema<br>
2. Responda às perguntas em um comentário<br>
3. Use dados reais e exemplos práticos<br>
4. Cite fontes confiáveis</p>

<h3>🏆 Recompensas</h3>

<ul>
<li>🎖️ Badge "Especialista em Payments" para respostas completas</li>
<li>⭐ Destaque no #InteligênciaDeMercado</li>
<li>🎯 Pontos extras para qualificação</li>
</ul>

<h3>📚 Recursos Recomendados</h3>

<ul>
<li><a href="https://www.swift.com/">SWIFT</a></li>
<li><a href="https://ripple.com/">Ripple</a></li>
<li><a href="https://www.stellar.org/">Stellar</a></li>
<li>Tese sobre Pagamentos no #InteligênciaDeMercado</li>
</ul>

<p><strong>Prazo:</strong> 7 dias</p>

<p><strong>Boa missão!</strong> 🎖️</p>`,
    false
  );
  
  await sleep(2000);
  
  // 3. MISSÃO: OPERAÇÃO PRIMEIRA LUZ
  console.log('⚔️ Publicando Missão: Operação Primeira Luz...');
  await publishPost(
    SPACES['campo-de-provas'],
    '⚔️ Missão: Operação Primeira Luz',
    `<h2>⚔️ Missão: Operação Primeira Luz</h2>

<p><strong>Status:</strong> 🔴 CLASSIFICADA - Apenas membros qualificados</p>

<h3>📋 Briefing da Operação</h3>

<p><strong>Objetivo:</strong> Criar conteúdo educacional sobre cripto para iniciantes</p>

<p><strong>Cliente:</strong> Coins.xyz</p>

<p><strong>Remuneração:</strong> R$ 500 por profissional selecionado</p>

<p><strong>Vagas:</strong> 5 posições (3 copywriters, 2 editores de vídeo)</p>

<h3>🎯 Escopo do Projeto</h3>

<p><strong>Entregáveis:</strong></p>
<ul>
<li>📝 3 artigos de 800-1000 palavras cada (copywriters)</li>
<li>🎬 3 vídeos curtos de 60-90 segundos (editores)</li>
</ul>

<p><strong>Temas:</strong></p>
<ol>
<li>O que é Bitcoin? (para quem nunca ouviu falar)</li>
<li>Como comprar sua primeira cripto (passo a passo)</li>
<li>Stablecoins: dólar digital explicado</li>
</ol>

<p><strong>Requisitos:</strong></p>
<ul>
<li>✅ Linguagem simples e acessível</li>
<li>✅ Tom educacional, não promocional</li>
<li>✅ Foco no público brasileiro</li>
<li>✅ Exemplos práticos e visuais</li>
</ul>

<h3>📝 Como Se Candidatar</h3>

<p><strong>Para Copywriters:</strong></p>
<ol>
<li>Escreva um artigo de 500 palavras sobre "Por que cripto importa para o Brasil"</li>
<li>Poste como comentário neste post</li>
<li>Inclua: título chamativo, introdução, 3 argumentos principais, conclusão</li>
</ol>

<p><strong>Para Editores de Vídeo:</strong></p>
<ol>
<li>Crie um vídeo de 60 segundos explicando "O que é uma stablecoin"</li>
<li>Pode usar motion graphics, animações simples ou live action</li>
<li>Poste o link (YouTube, Vimeo, Drive) como comentário</li>
</ol>

<h3>🏆 Critérios de Seleção</h3>

<ul>
<li>📊 Clareza e didática (40%)</li>
<li>🎨 Criatividade e originalidade (30%)</li>
<li>✍️ Qualidade técnica (20%)</li>
<li>⏱️ Cumprimento do prazo (10%)</li>
</ul>

<h3>📅 Timeline</h3>

<ul>
<li><strong>Candidaturas:</strong> 7 dias</li>
<li><strong>Seleção:</strong> 2 dias</li>
<li><strong>Produção:</strong> 10 dias</li>
<li><strong>Revisão:</strong> 3 dias</li>
<li><strong>Pagamento:</strong> Após aprovação final</li>
</ul>

<h3>⚠️ Atenção</h3>

<p>Esta é uma Operação de Elite. Apenas candidatos que demonstrarem:</p>
<ul>
<li>✅ Habilidades técnicas sólidas</li>
<li>✅ Comprometimento com prazos</li>
<li>✅ Capacidade de seguir briefings</li>
</ul>

<p>...serão selecionados.</p>

<p><strong>Prazo para candidaturas: 7 dias</strong></p>

<p><strong>Boa sorte, soldado. Mostre do que você é capaz.</strong> 🎖️</p>`,
    true
  );
  
  await sleep(2000);
  
  // 4. CURSO: PROTOCOLOS DA BASE - INTRODUÇÃO
  console.log('📚 Publicando Curso: Protocolos da Base...');
  await publishPost(
    SPACES['sala-de-estudos'],
    '📚 Curso: Protocolos da Base - Introdução',
    `<h2>📚 Curso: Protocolos da Base</h2>

<p><strong>Bem-vindo ao curso fundamental da Base XYZ.</strong></p>

<p>Este curso vai te ensinar os fundamentos da economia digital, cripto, blockchain e pagamentos que você precisa para operar na Base.</p>

<h3>🎯 O Que Você Vai Aprender</h3>

<p><strong>Módulo 1: Fundamentos de Cripto</strong></p>
<ul>
<li>Lição 1.1: O que é blockchain?</li>
<li>Lição 1.2: Bitcoin vs Ethereum vs Stablecoins</li>
<li>Lição 1.3: Carteiras e custódia</li>
</ul>

<p><strong>Módulo 2: Economia Digital</strong></p>
<ul>
<li>Lição 2.1: DeFi (Finanças Descentralizadas)</li>
<li>Lição 2.2: Pagamentos cross-border</li>
<li>Lição 2.3: Casos de uso no Sul Global</li>
</ul>

<p><strong>Módulo 3: Protocolos da Coins.xyz</strong></p>
<ul>
<li>Lição 3.1: Como funciona a Exchange</li>
<li>Lição 3.2: Payments e integração com PIX</li>
<li>Lição 3.3: OTC Desk e On-Chain Brokerage</li>
</ul>

<h3>📝 Formato</h3>

<ul>
<li>📄 Textos explicativos</li>
<li>🎬 Vídeos curtos (5-10 min)</li>
<li>📊 Infográficos e diagramas</li>
<li>✅ Quizzes de fixação</li>
<li>🎯 Exercícios práticos</li>
</ul>

<h3>⏱️ Duração</h3>

<p>Aproximadamente <strong>6-8 horas</strong> de conteúdo, dividido em lições de 15-30 minutos.</p>

<p>Você pode fazer no seu ritmo, mas recomendamos completar em <strong>2-3 semanas</strong>.</p>

<h3>🏆 Certificação</h3>

<p>Ao completar o curso com 80%+ de aproveitamento, você recebe:</p>
<ul>
<li>🎖️ Badge "Soldado" (patente básica)</li>
<li>📜 Certificado digital</li>
<li>🎯 Elegibilidade para Operações de Elite</li>
</ul>

<h3>🚀 Como Começar</h3>

<p>1. Leia esta introdução<br>
2. Vá para o Módulo 1, Lição 1.1<br>
3. Complete as lições em ordem<br>
4. Faça os quizzes e exercícios<br>
5. Participe das discussões nos comentários</p>

<p><strong>Próximo passo:</strong> <a href="#">Módulo 1 - Lição 1.1: O que é blockchain?</a></p>

<p><strong>Bons estudos, soldado!</strong> 🎖️</p>`,
    true
  );
  
  console.log('\n✅ Todos os conteúdos adicionais foram publicados!\n');
}

publishAdditionalContent();
