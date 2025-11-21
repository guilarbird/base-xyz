/**
 * Publicar todos os conteúdos nos espaços corretos
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

// IDs dos espaços
const SPACES = {
  'arquivo-de-missao': 2347717,
  'identificacao': 2347718,
  'inteligencia-de-mercado': 2347737,
  'desafio-da-garrafa': 2321958,
  'campo-de-provas': 2347739,
  'sala-de-estudos': 2347714,
  'cantina-da-base': 2347720
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

async function publishAllContent() {
  console.log('\n🚀 Iniciando publicação de conteúdos...\n');
  
  // 1. MANIFESTO DA BASE XYZ
  console.log('📜 Publicando Manifesto...');
  await publishPost(
    SPACES['arquivo-de-missao'],
    '📜 Manifesto da Base XYZ',
    `<h2>🎖️ Manifesto da Base XYZ</h2>

<p><strong>Bem-vindo à Base XYZ.</strong></p>

<p>Você não está aqui por acaso. Você está aqui porque entende que o mundo mudou. O dinheiro mudou. O trabalho mudou. E quem não se adapta, fica para trás.</p>

<h3>🌍 Nossa Missão</h3>

<p>A Base XYZ é a <strong>academia tática</strong> da economia digital no Sul Global. Não somos uma comunidade comum. Somos um <strong>campo de treinamento</strong> para profissionais que querem dominar cripto, blockchain, pagamentos internacionais e a nova economia.</p>

<p>Nossa missão é simples: <strong>formar, qualificar e conectar talentos</strong> com as oportunidades reais da economia digital.</p>

<h3>⚔️ O Que Fazemos</h3>

<p><strong>1. Educação de Elite</strong><br>
Cursos, workshops, análises de mercado e conteúdos exclusivos sobre cripto, DeFi, stablecoins, pagamentos cross-border e economia digital.</p>

<p><strong>2. Qualificação Prática</strong><br>
Desafios reais, missões táticas e projetos práticos para você provar suas habilidades.</p>

<p><strong>3. Operações Remuneradas</strong><br>
Profissionais qualificados são selecionados para <strong>Operações de Elite</strong>: projetos remunerados da Coins.xyz e parceiros.</p>

<h3>🎯 Quem Somos</h3>

<p>A Base XYZ é mantida pela <strong>Coins.xyz</strong>, a CriptoEdTech que está construindo a infraestrutura financeira do Sul Global.</p>

<p>Somos:</p>
<ul>
<li>🏦 <strong>Exchange</strong> de criptomoedas</li>
<li>💳 <strong>Payments</strong> (PIX, cartões, rails locais)</li>
<li>🏢 <strong>OTC Desk</strong> (câmbio e importação/exportação)</li>
<li>⛓️ <strong>On-Chain Brokerage</strong> (stablecoins e settlement)</li>
</ul>

<p>E você, como membro da Base, está na linha de frente dessa revolução.</p>

<h3>🪖 Código de Conduta</h3>

<p><strong>1. Respeito</strong><br>
Tratamos todos com profissionalismo. Zero tolerância para desrespeito, spam ou comportamento tóxico.</p>

<p><strong>2. Colaboração</strong><br>
Compartilhe conhecimento. Ajude outros membros. Crescemos juntos.</p>

<p><strong>3. Execução</strong><br>
Fale menos, execute mais. Resultados falam mais alto que promessas.</p>

<p><strong>4. Curiosidade</strong><br>
Pergunte, aprenda, experimente. A Base é seu laboratório.</p>

<h3>🚀 Próximos Passos</h3>

<p>1. Complete seu perfil no #Identificação<br>
2. Escolha sua trilha (Creator ou Builder)<br>
3. Comece o curso "Protocolos da Base" na #SalaDeEstudos<br>
4. Participe do #DesafioDaGarrafa<br>
5. Qualifique-se para as Operações de Elite</p>

<p><strong>Bem-vindo à Base. Boa missão, soldado.</strong> 🎖️</p>`,
    true
  );
  
  await sleep(2000);
  
  // 2. INSTRUÇÕES DE IDENTIFICAÇÃO
  console.log('🪪 Publicando Instruções de Identificação...');
  await publishPost(
    SPACES['identificacao'],
    '🪪 Processo de Identificação: Apresente-se à Tropa',
    `<h2>🪪 Bem-vindo ao Processo de Identificação</h2>

<p>Este é o espaço onde você se apresenta oficialmente à Base XYZ. Pense nisso como sua <strong>carta de apresentação</strong> para a comunidade.</p>

<h3>📋 Como Fazer Sua Apresentação</h3>

<p>Crie um novo post neste espaço com as seguintes informações:</p>

<p><strong>1. Quem é você?</strong></p>
<ul>
<li>Nome (ou como prefere ser chamado)</li>
<li>Localização (cidade/país)</li>
<li>Profissão ou área de atuação</li>
</ul>

<p><strong>2. O que você faz?</strong></p>
<ul>
<li>Suas habilidades principais</li>
<li>Experiência com cripto/blockchain (se tiver)</li>
<li>Projetos ou trabalhos relevantes</li>
</ul>

<p><strong>3. Por que você está aqui?</strong></p>
<ul>
<li>O que te trouxe para a Base XYZ?</li>
<li>O que você quer aprender ou conquistar?</li>
<li>Como você pode contribuir?</li>
</ul>

<p><strong>4. Redes Sociais</strong></p>
<ul>
<li>Twitter/X</li>
<li>LinkedIn</li>
<li>Portfolio ou site (se tiver)</li>
</ul>

<h3>💡 Dicas</h3>

<ul>
<li>✅ Seja autêntico e direto</li>
<li>✅ Mostre suas habilidades reais</li>
<li>✅ Explique como você pode agregar valor</li>
<li>❌ Não exagere ou invente experiências</li>
<li>❌ Não faça spam ou autopromoção excessiva</li>
</ul>

<h3>🎯 Por Que Isso Importa?</h3>

<p>Sua apresentação é vista por:</p>
<ul>
<li>Moderadores da Base</li>
<li>Outros membros da comunidade</li>
<li>Equipe da Coins.xyz (ao selecionar para Operações)</li>
</ul>

<p>Uma boa apresentação aumenta suas chances de ser selecionado para projetos remunerados.</p>

<p><strong>Pronto? Clique em "Criar publicação" e se apresente!</strong> 🎖️</p>`,
    true
  );
  
  await sleep(2000);
  
  // 3. TESE SOBRE PAGAMENTOS CROSS-BORDER
  console.log('📊 Publicando Tese sobre Pagamentos...');
  await publishPost(
    SPACES['inteligencia-de-mercado'],
    '📊 Tese: O Futuro dos Pagamentos Cross-Border no Sul Global',
    `<h2>📊 O Futuro dos Pagamentos Cross-Border no Sul Global</h2>

<p><em>Por que stablecoins e blockchain vão dominar os pagamentos internacionais nos próximos 5 anos</em></p>

<h3>🌍 O Problema</h3>

<p>Hoje, enviar dinheiro entre países é:</p>
<ul>
<li>💸 <strong>Caro:</strong> Taxas de 3-7% por transação</li>
<li>🐌 <strong>Lento:</strong> 3-5 dias úteis para compensação</li>
<li>🔒 <strong>Burocrático:</strong> Documentação, compliance, intermediários</li>
<li>⏰ <strong>Limitado:</strong> Horário bancário, feriados, fins de semana</li>
</ul>

<p>No Sul Global, isso é ainda pior. Moedas instáveis, inflação alta, controles de capital e infraestrutura bancária precária tornam pagamentos internacionais um pesadelo.</p>

<h3>💡 A Solução: Stablecoins + Blockchain</h3>

<p><strong>Stablecoins</strong> (como USDT, USDC) são criptomoedas atreladas ao dólar. Elas combinam:</p>
<ul>
<li>✅ Estabilidade do dólar</li>
<li>✅ Velocidade do blockchain (segundos, não dias)</li>
<li>✅ Custos baixíssimos (centavos por transação)</li>
<li>✅ Disponibilidade 24/7</li>
<li>✅ Sem intermediários bancários</li>
</ul>

<h3>📈 Dados do Mercado</h3>

<p><strong>Volume de Stablecoins (2024):</strong></p>
<ul>
<li>USDT: $150 bilhões em circulação</li>
<li>USDC: $35 bilhões em circulação</li>
<li>Volume mensal: $2+ trilhões</li>
</ul>

<p><strong>Crescimento no Sul Global:</strong></p>
<ul>
<li>Brasil: +300% em volume (2023-2024)</li>
<li>Argentina: Stablecoins são 40% do volume cripto</li>
<li>Nigéria: Maior mercado P2P de USDT na África</li>
</ul>

<h3>🎯 Casos de Uso Reais</h3>

<p><strong>1. Importação/Exportação</strong><br>
Empresas usam stablecoins para pagar fornecedores internacionais sem passar por bancos.</p>

<p><strong>2. Remessas</strong><br>
Trabalhadores enviam dinheiro para famílias em outros países com taxas 10x menores.</p>

<p><strong>3. Proteção Cambial</strong><br>
Em países com inflação alta, pessoas guardam dinheiro em USDT para preservar valor.</p>

<p><strong>4. Pagamentos B2B</strong><br>
Empresas pagam freelancers e fornecedores globais instantaneamente.</p>

<h3>🚀 O Papel da Coins.xyz</h3>

<p>A Coins.xyz está construindo a infraestrutura para esse futuro:</p>
<ul>
<li>🏦 <strong>Exchange:</strong> Compra/venda de stablecoins</li>
<li>💳 <strong>Payments:</strong> Integração com PIX e rails locais</li>
<li>🏢 <strong>OTC Desk:</strong> Câmbio para empresas</li>
<li>⛓️ <strong>On-Chain Brokerage:</strong> Settlement via blockchain</li>
</ul>

<p>Estamos conectando o mundo tradicional (bancos, PIX, cartões) com o mundo cripto (stablecoins, DeFi, blockchain).</p>

<h3>📚 Para Aprender Mais</h3>

<ul>
<li>Curso "Protocolos da Base" na #SalaDeEstudos</li>
<li>Desafio da Garrafa: Semana 01 - Stablecoins</li>
<li>Documentação: <a href="https://docs.coins.xyz">docs.coins.xyz</a></li>
</ul>

<p><strong>O futuro dos pagamentos já começou. E você está na linha de frente.</strong> 🎖️</p>`,
    false
  );
  
  console.log('\n✅ Publicação concluída!\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

publishAllContent();
