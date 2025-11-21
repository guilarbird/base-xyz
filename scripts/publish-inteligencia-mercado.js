/**
 * Publicar conteúdos educacionais no Inteligência de Mercado
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(__dirname, '../config/credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

const token = credentials.circle.tokens.admin_v1;
const communityId = credentials.circle.communityId;

// ID do espaço Inteligência de Mercado
const INTELIGENCIA_SPACE_ID = 2347737;

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

async function publishInteligenciaMercado() {
  console.log('\n📊 Publicando conteúdos no Inteligência de Mercado...\n');
  
  // 1. STABLECOINS
  console.log('1. Publicando: Stablecoins...');
  await publishPost(
    INTELIGENCIA_SPACE_ID,
    '💵 Stablecoins: A Ponte Entre Fiat e Cripto',
    `<h2>💵 Stablecoins: A Ponte Entre Fiat e Cripto</h2>

<p><strong>O que são stablecoins e por que elas são o futuro dos pagamentos digitais</strong></p>

<h3>📖 Definição</h3>

<p>Stablecoins são criptomoedas atreladas a ativos estáveis, geralmente moedas fiduciárias como o dólar americano (USD). Elas combinam a estabilidade de preço das moedas tradicionais com a eficiência e velocidade das criptomoedas.</p>

<h3>🎯 Por Que Existem?</h3>

<p>O problema das criptomoedas tradicionais (Bitcoin, Ethereum) é a <strong>volatilidade</strong>:</p>
<ul>
<li>Bitcoin pode variar 10-20% em um único dia</li>
<li>Isso torna difícil usar cripto para pagamentos do dia a dia</li>
<li>Empresas e pessoas precisam de previsibilidade</li>
</ul>

<p>Stablecoins resolvem isso mantendo um preço fixo (geralmente 1:1 com o dólar).</p>

<h3>📊 Principais Stablecoins</h3>

<p><strong>1. USDT (Tether)</strong></p>
<ul>
<li>Market cap: ~$150 bilhões</li>
<li>A stablecoin mais usada no mundo</li>
<li>Colateralizada por reservas em dólar e ativos equivalentes</li>
</ul>

<p><strong>2. USDC (USD Coin)</strong></p>
<ul>
<li>Market cap: ~$35 bilhões</li>
<li>Emitida pela Circle (empresa regulada nos EUA)</li>
<li>Auditada mensalmente, mais transparente</li>
</ul>

<p><strong>3. DAI (MakerDAO)</strong></p>
<ul>
<li>Market cap: ~$5 bilhões</li>
<li>Stablecoin descentralizada</li>
<li>Colateralizada por cripto (ETH, USDC, etc.)</li>
</ul>

<h3>⚙️ Como Funcionam?</h3>

<p><strong>Stablecoins Centralizadas (USDT, USDC):</strong></p>
<ol>
<li>Empresa emissora mantém reservas em dólar</li>
<li>Para cada 1 USDC emitido, há $1 em reserva</li>
<li>Usuários podem trocar USDC por dólar a qualquer momento</li>
</ol>

<p><strong>Stablecoins Descentralizadas (DAI):</strong></p>
<ol>
<li>Usuários depositam cripto como garantia (collateral)</li>
<li>Smart contracts emitem DAI contra essa garantia</li>
<li>Se o preço da garantia cai, o sistema liquida automaticamente</li>
</ol>

<h3>🌍 Casos de Uso no Sul Global</h3>

<p><strong>1. Proteção contra inflação</strong><br>
Em países como Argentina, Venezuela e Turquia, pessoas usam USDT para preservar valor.</p>

<p><strong>2. Remessas internacionais</strong><br>
Enviar USDC é 10x mais barato e rápido que Western Union ou bancos.</p>

<p><strong>3. Pagamentos B2B</strong><br>
Empresas pagam fornecedores internacionais com stablecoins, evitando taxas bancárias.</p>

<p><strong>4. Importação/Exportação</strong><br>
Traders usam USDT para comprar mercadorias da China sem passar por bancos.</p>

<h3>📈 Dados de Mercado (2024)</h3>

<ul>
<li><strong>Volume total de stablecoins:</strong> $190 bilhões em circulação</li>
<li><strong>Volume mensal de transações:</strong> $2+ trilhões</li>
<li><strong>Crescimento no Brasil:</strong> +300% em 2023-2024</li>
<li><strong>Adoção na América Latina:</strong> 40% do volume cripto é em stablecoins</li>
</ul>

<h3>⚠️ Riscos</h3>

<ul>
<li><strong>Risco de contraparte:</strong> Se a empresa emissora falir, você pode perder seu dinheiro</li>
<li><strong>Risco regulatório:</strong> Governos podem restringir ou banir stablecoins</li>
<li><strong>Risco de descolamento (depeg):</strong> Em momentos de crise, stablecoins podem perder a paridade</li>
</ul>

<h3>🚀 O Papel da Coins.xyz</h3>

<p>A Coins.xyz facilita:</p>
<ul>
<li>Compra e venda de stablecoins (USDT, USDC)</li>
<li>Conversão para BRL via PIX</li>
<li>Pagamentos cross-border para empresas</li>
<li>Liquidação on-chain para OTC</li>
</ul>

<h3>📚 Para Aprender Mais</h3>

<ul>
<li><a href="https://www.circle.com/en/usdc">Circle - USDC</a></li>
<li><a href="https://tether.to/">Tether - USDT</a></li>
<li><a href="https://makerdao.com/">MakerDAO - DAI</a></li>
<li>Curso "Protocolos da Base" na #SalaDeEstudos</li>
</ul>

<p><strong>Stablecoins são a ponte entre o mundo tradicional e o mundo cripto. Domine-as.</strong> 🎖️</p>`,
    false
  );
  
  await sleep(2000);
  
  // 2. DEFI NO SUL GLOBAL
  console.log('2. Publicando: DeFi no Sul Global...');
  await publishPost(
    INTELIGENCIA_SPACE_ID,
    '🌐 DeFi no Sul Global: Oportunidades e Desafios',
    `<h2>🌐 DeFi no Sul Global: Oportunidades e Desafios</h2>

<p><strong>Como as Finanças Descentralizadas estão transformando o acesso a serviços financeiros em mercados emergentes</strong></p>

<h3>📖 O Que É DeFi?</h3>

<p><strong>DeFi (Decentralized Finance)</strong> é um ecossistema de serviços financeiros construídos sobre blockchain, sem intermediários tradicionais como bancos.</p>

<p>Inclui:</p>
<ul>
<li>💰 Empréstimos e crédito</li>
<li>💱 Exchanges descentralizadas (DEXs)</li>
<li>📈 Investimentos e yield farming</li>
<li>🏦 Contas de poupança com juros</li>
<li>💳 Pagamentos e transferências</li>
</ul>

<p><strong>Tudo funciona via smart contracts, sem aprovação de bancos ou governos.</strong></p>

<h3>🌍 Por Que DeFi Importa para o Sul Global?</h3>

<p><strong>1. Acesso financeiro sem burocracia</strong><br>
2 bilhões de pessoas no mundo não têm conta bancária. Com DeFi, basta ter um smartphone e internet.</p>

<p><strong>2. Proteção contra inflação</strong><br>
Em países com moedas instáveis, DeFi oferece acesso a ativos em dólar e investimentos globais.</p>

<p><strong>3. Crédito sem histórico bancário</strong><br>
Protocolos DeFi permitem empréstimos colateralizados, sem análise de crédito tradicional.</p>

<p><strong>4. Rendimentos competitivos</strong><br>
Enquanto bancos brasileiros pagam 0,5% a.a. na poupança, protocolos DeFi oferecem 5-10% a.a. em stablecoins.</p>

<h3>📊 Dados de Adoção</h3>

<p><strong>América Latina (2024):</strong></p>
<ul>
<li>$12 bilhões em TVL (Total Value Locked) em protocolos DeFi</li>
<li>Brasil: 3º maior mercado cripto da América Latina</li>
<li>Argentina: 60% dos usuários cripto usam DeFi</li>
<li>Venezuela: DeFi como alternativa ao sistema bancário colapsado</li>
</ul>

<p><strong>África (2024):</strong></p>
<ul>
<li>Nigéria: Maior mercado P2P de cripto do mundo</li>
<li>Quênia: M-Pesa + DeFi = acesso financeiro massivo</li>
<li>África do Sul: Hub regional de DeFi</li>
</ul>

<h3>🎯 Casos de Uso Reais</h3>

<p><strong>1. Poupança em dólar</strong><br>
Argentinos depositam pesos em protocolos DeFi, convertem para USDC e ganham juros em dólar.</p>

<p><strong>2. Empréstimos colateralizados</strong><br>
Empresário brasileiro deposita Bitcoin como garantia e toma empréstimo em USDC para capital de giro.</p>

<p><strong>3. Remessas internacionais</strong><br>
Trabalhador nigeriano na Europa envia dinheiro para família via stablecoins, economizando 90% em taxas.</p>

<p><strong>4. Yield farming</strong><br>
Investidor brasileiro fornece liquidez em DEXs e ganha rendimentos em tokens.</p>

<h3>⚙️ Principais Protocolos DeFi</h3>

<p><strong>1. Aave</strong> (Empréstimos)<br>
Deposite cripto, ganhe juros. Ou use como garantia para pegar empréstimos.</p>

<p><strong>2. Uniswap</strong> (DEX)<br>
Troque tokens sem intermediários. Fornecedores de liquidez ganham taxas.</p>

<p><strong>3. Compound</strong> (Poupança)<br>
Deposite stablecoins e ganhe juros automaticamente.</p>

<p><strong>4. Curve</strong> (Stablecoins)<br>
Especializado em trocas de stablecoins com baixo slippage.</p>

<h3>⚠️ Desafios e Riscos</h3>

<p><strong>1. Complexidade técnica</strong><br>
DeFi exige conhecimento de wallets, gas fees, smart contracts. A curva de aprendizado é alta.</p>

<p><strong>2. Riscos de smart contracts</strong><br>
Bugs em código podem levar a perdas de fundos. Já aconteceu em vários protocolos.</p>

<p><strong>3. Volatilidade</strong><br>
Ativos DeFi (tokens de governança, LP tokens) podem ser muito voláteis.</p>

<p><strong>4. Regulação incerta</strong><br>
Governos ainda estão descobrindo como regular DeFi. Mudanças podem afetar acesso.</p>

<p><strong>5. Falta de proteção ao consumidor</strong><br>
Não há seguro de depósito. Se você perder suas chaves privadas, perdeu tudo.</p>

<h3>🚀 O Papel da Coins.xyz</h3>

<p>A Coins.xyz está construindo a ponte entre DeFi e o usuário comum:</p>
<ul>
<li>Interface simples para acessar protocolos DeFi</li>
<li>Educação sobre riscos e oportunidades</li>
<li>Integração com PIX para entrada/saída de fiat</li>
<li>Suporte em português e foco no Sul Global</li>
</ul>

<h3>📚 Para Aprender Mais</h3>

<ul>
<li><a href="https://aave.com/">Aave</a></li>
<li><a href="https://uniswap.org/">Uniswap</a></li>
<li><a href="https://compound.finance/">Compound</a></li>
<li><a href="https://defillama.com/">DeFi Llama</a> (dados de mercado)</li>
<li>Curso "Protocolos da Base" na #SalaDeEstudos</li>
</ul>

<p><strong>DeFi é a democratização das finanças. Mas exige educação e cautela.</strong> 🎖️</p>`,
    false
  );
  
  console.log('\n✅ Conteúdos publicados no Inteligência de Mercado!\n');
}

publishInteligenciaMercado();
