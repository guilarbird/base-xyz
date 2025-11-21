# Prompts Globais para o GPT - Base XYZ

Este documento contém prompts prontos para serem executados no GPT-4 para gerar documentações e conteúdos complementares para a Base XYZ.

---

## PROMPT 1: Manual de Onboarding para Moderadores

```
Você é um especialista em gestão de comunidades online e treinamento de equipes.

Crie um **Manual Completo de Onboarding para Moderadores** da Base XYZ, uma comunidade no Circle focada em formar criadores de conteúdo e builders para a coins.xyz (corretora cripto do Sul Global).

**Contexto:**
- A Base XYZ usa uma temática militar ("Academia Tática", "Recrutas", "Operações", "Patentes")
- Existem 2 trilhas principais: Creator (produção de conteúdo) e Builder (desenvolvimento técnico)
- Sistema de progressão por patentes: Recruta → Soldado → Especialista → Veterano → Comandante
- Moderadores incluem: funcionários da Coins (Geraldo, David, Wayne, Ellie) e Super Champions (André Leiria, Everton)

**O manual deve incluir:**

1. **Bem-vindo à Equipe de Comando**
   - Visão geral da missão da Base XYZ
   - Papel dos moderadores no ecossistema

2. **Estrutura da Comunidade**
   - Mapa completo dos espaços e grupos
   - Diferença entre espaços públicos, privados e condicionais

3. **Sistema de Patentes e Progressão**
   - Como funciona cada patente
   - Critérios de promoção
   - Como conceder badges manualmente

4. **Protocolos de Moderação**
   - Regras de conduta e código de ética
   - Como lidar com conflitos
   - Quando e como banir membros

5. **Fluxo de Onboarding de Novos Membros**
   - Passo a passo do que o novo membro vê
   - Como acompanhar o progresso
   - Quando intervir

6. **Gestão de Conteúdo**
   - Como aprovar posts no #InteligênciaDeMercado
   - Sistema de tags e conteúdo Evergreen
   - Como fixar e destacar posts importantes

7. **Operações de Elite**
   - Como selecionar candidatos para as 4 Operações (Copywriting, Edição de Vídeo, VibeCoding, Research)
   - Processo de entrevista e avaliação
   - Como gerenciar bolsas e pagamentos (R$ 500/mês para até 20 pessoas)

8. **Ferramentas e Automações**
   - Como usar os AI Agents do Circle
   - Integração com Zapier
   - Scripts úteis

9. **FAQs para Moderadores**
   - Perguntas frequentes e suas respostas

10. **Checklist Diário/Semanal**
    - Tarefas de rotina para manter a comunidade ativa

**Formato:** Markdown, profissional, direto, com exemplos práticos.
**Tom:** Sério, operacional, mas acolhedor. Use a linguagem militar da Base XYZ.
```

---

## PROMPT 2: Guia de Configuração de AI Agents

```
Você é um especialista em automação de comunidades e configuração de AI Agents no Circle.

Crie um **Guia Completo de Configuração de AI Agents** para a Base XYZ.

**Contexto:**
A Base XYZ precisa automatizar:
1. Concessão automática de patentes (badges) baseada em ações
2. Mensagens de boas-vindas personalizadas
3. Lembretes semanais do Desafio da Garrafa
4. Notificações de novas Operações disponíveis
5. Feedback automático em posts de qualificação

**O guia deve incluir:**

1. **Introdução aos AI Agents do Circle**
   - O que são e como funcionam
   - Limitações e melhores práticas

2. **Agent 1: Onboarding Automático**
   - Trigger: Novo membro entra na comunidade
   - Ação: Enviar DM de boas-vindas + instruções para completar perfil
   - Configuração passo a passo

3. **Agent 2: Concessão de Patente "Recruta"**
   - Trigger: Membro completa perfil (campo "Objetivo de Missão" preenchido)
   - Ação: Conceder badge "Recruta" + enviar mensagem de congratulações
   - Configuração passo a passo

4. **Agent 3: Lembrete Semanal do Desafio da Garrafa**
   - Trigger: Toda segunda-feira às 9h
   - Ação: Postar no #DesafioDaGarrafa o tema da semana
   - Configuração passo a passo

5. **Agent 4: Monitoramento de Likes para Conteúdo Evergreen**
   - Trigger: Post no #InteligênciaDeMercado atinge 5+ likes
   - Ação: Notificar moderadores para adicionar tags e mover para biblioteca
   - Configuração passo a passo

6. **Agent 5: Notificação de Progressão**
   - Trigger: Membro recebe nova patente
   - Ação: Enviar DM parabenizando + explicar próximos passos
   - Configuração passo a passo

7. **Troubleshooting**
   - Problemas comuns e soluções

8. **Monitoramento e Ajustes**
   - Como verificar se os agents estão funcionando
   - Quando desativar ou ajustar

**Formato:** Markdown, com screenshots simulados (descrições textuais), passo a passo numerado.
**Tom:** Técnico, mas acessível. Assuma que o leitor tem conhecimento básico do Circle.
```

---

## PROMPT 3: Documentação do Sistema de Badges/Patentes

```
Você é um game designer especializado em sistemas de progressão e gamificação.

Crie a **Documentação Completa do Sistema de Patentes** da Base XYZ.

**Contexto:**
A Base XYZ usa um sistema de patentes militares para gamificar a progressão dos membros. Existem duas trilhas paralelas:
- **Trilha Academia** (todos os membros): Recruta → Soldado → Especialista → Veterano → Comandante
- **Trilha de Operações** (membros selecionados): Candidato → Champion

**O documento deve incluir:**

1. **Visão Geral do Sistema**
   - Por que usamos patentes?
   - Como elas motivam o engajamento

2. **Trilha Academia (Patentes Gerais)**
   
   Para cada patente, descreva:
   - **Nome e Ícone** (descrição visual)
   - **Requisitos para Obtenção**
   - **Benefícios e Acessos Desbloqueados**
   - **Mensagem de Congratulações** (texto que o membro recebe ao conquistar)
   
   Patentes:
   - **Recruta** (primeira patente, automática)
   - **Soldado** (completou curso "Protocolos da Base" + 1 post no #DesafioDaGarrafa)
   - **Especialista** (completou missão de qualificação da trilha Creator ou Builder)
   - **Veterano** (6 meses ativo + 10 posts de qualidade)
   - **Comandante** (membro fundador ou contribuidor excepcional, concedido manualmente)

3. **Trilha de Operações (Patentes Especiais)**
   
   - **Candidato a Champion** (completou qualificação + foi selecionado para entrevista)
   - **Champion** (aprovado e recebendo bolsa mensal)

4. **Regras de Progressão**
   - Patentes são cumulativas (não se perde ao subir)
   - Patentes podem ser concedidas manualmente por moderadores em casos excepcionais
   - Inatividade de 90 dias congela a progressão (mas não remove patentes)

5. **Design Visual dos Badges**
   - Descrição detalhada de como cada badge deve ser (para o designer Ian Barreiro criar)
   - Paleta de cores sugerida
   - Referências visuais (temática militar + cripto + ON1 Force)

6. **Implementação Técnica**
   - Como criar badges no Circle
   - Como configurar regras de concessão automática
   - Como conceder manualmente

7. **Comunicação das Patentes**
   - Como anunciar novas patentes para a comunidade
   - Como celebrar promoções

**Formato:** Markdown, com tabelas comparativas.
**Tom:** Técnico + inspirador. Deve ser útil tanto para a equipe quanto para os membros curiosos.
```

---

## PROMPT 4: Scripts de Automação via Zapier

```
Você é um especialista em automação no-code usando Zapier.

Crie um **Guia de Automações via Zapier** para a Base XYZ, que já tem integração Circle + Zapier configurada.

**Contexto:**
A Base XYZ precisa automatizar fluxos que a API do Circle sozinha não consegue, como:
- Enviar emails externos
- Integrar com Google Sheets para tracking
- Notificar equipe no Slack/Discord
- Criar tarefas no Notion

**O guia deve incluir:**

1. **Introdução**
   - Por que usar Zapier além da API do Circle?
   - Pré-requisitos

2. **Zap 1: Novo Membro → Notificar Equipe**
   - Trigger: Novo membro entra na Base XYZ
   - Ação: Enviar mensagem no Slack/Discord com nome e perfil do membro
   - Passo a passo da configuração

3. **Zap 2: Novo Post no #InteligênciaDeMercado → Adicionar ao Google Sheets**
   - Trigger: Novo post criado no espaço #InteligênciaDeMercado
   - Ação: Adicionar linha no Google Sheets com título, autor, data, link
   - Passo a passo da configuração

4. **Zap 3: Post com 5+ Likes → Criar Card no Notion**
   - Trigger: Post atinge 5 likes
   - Ação: Criar card na database "Conteúdo Evergreen" do Notion com tags
   - Passo a passo da configuração

5. **Zap 4: Membro Completa Qualificação → Enviar Email de Parabéns**
   - Trigger: Membro recebe badge "Especialista"
   - Ação: Enviar email personalizado com próximos passos
   - Passo a passo da configuração

6. **Zap 5: Lembrete Semanal do Desafio da Garrafa → Postar no Circle**
   - Trigger: Agendamento (toda segunda-feira 9h)
   - Ação: Criar post no #DesafioDaGarrafa com tema da semana
   - Passo a passo da configuração

7. **Boas Práticas**
   - Como testar Zaps antes de ativar
   - Como monitorar erros
   - Quando usar Paths (condicionais)

8. **Troubleshooting**
   - Problemas comuns e soluções

**Formato:** Markdown, com descrições passo a passo e screenshots simulados (descrições textuais).
**Tom:** Prático, direto, acessível para não-programadores.
```

---

## PROMPT 5: Conteúdos Adicionais para Publicação

```
Você é um copywriter especializado em comunidades cripto e conteúdo educacional.

Crie os seguintes **conteúdos prontos para publicação** na Base XYZ:

---

### CONTEÚDO 1: Post Semanal do Desafio da Garrafa - Semana 02

**Tema da Semana 02:** Cross-Border Payments

**Formato:** Post para o espaço #DesafioDaGarrafa

**Estrutura:**
- Título chamativo
- Briefing da missão
- Explicação do tema (2-3 parágrafos educativos sobre cross-border payments)
- Regras de engajamento
- Prazo de entrega
- Mensagem motivacional final

**Tom:** Direto, operacional, inspirador. Use a linguagem militar da Base XYZ.

---

### CONTEÚDO 2: Missão de Qualificação - Trilha Builder (Semana 02)

**Tema:** Análise de Stablecoin (BRLA da Avenia)

**Formato:** Post para o espaço #Labs

**Estrutura:**
- Título: [DESAFIO DE QUALIFICAÇÃO] Simulação "Análise BRLA"
- Briefing
- Cenário da simulação (analisar a stablecoin BRLA da Avenia)
- Perguntas que devem ser respondidas:
  1. Qual a arquitetura técnica do BRLA? (blockchain, padrão de token)
  2. Como funciona o lastro em reais?
  3. Quais os casos de uso principais?
  4. Quais os riscos técnicos e regulatórios?
- Formato de entrega (documento de 500-800 palavras)
- Critérios de avaliação

**Tom:** Técnico, desafiador, mas justo.

---

### CONTEÚDO 3: Lição 1 do Curso "Protocolos da Base"

**Módulo 1: Doutrina e Cultura**

**Formato:** Lição de curso para o espaço #SalaDeEstudos

**Estrutura:**
- Título: "Lição 1: A Missão da Base XYZ"
- Introdução (2 parágrafos)
- Seção 1: Quem Somos
  - História da coins.xyz
  - Conexão com a Binance
  - Foco no Sul Global
- Seção 2: O que Fazemos
  - 4 rails (Exchange, Payments, OTC, On-Chain Brokerage)
  - Por que isso importa
- Seção 3: Por que a Base XYZ Existe
  - Formar talentos para a nova economia digital
  - Criar oportunidades no Sul Global
- Conclusão + Call to Action (ir para Lição 2)

**Tom:** Institucional, inspirador, claro.

---

### CONTEÚDO 4: Post de Boas-Vindas no #QG

**Formato:** Primeiro post oficial no espaço #QG - Quartel General

**Estrutura:**
- Título: "🎖️ Bem-vindo à Base XYZ, Recruta"
- Mensagem de boas-vindas do "Comando" (Geraldo/equipe)
- Explicação rápida do que é a Base XYZ
- O que esperar nas próximas semanas
- Primeiros passos:
  1. Complete seu perfil
  2. Leia o Manifesto
  3. Apresente-se no #Identificação
  4. Participe do Desafio da Garrafa
- Mensagem motivacional final

**Tom:** Acolhedor, mas sério. Estabelece autoridade e expectativas.

---

### CONTEÚDO 5: Anúncio das Operações de Elite

**Formato:** Post para o espaço #QG

**Estrutura:**
- Título: "🎯 ABERTURA DAS OPERAÇÕES DE ELITE"
- Anúncio oficial das 4 Operações:
  1. Operação Copywriting
  2. Operação Edição de Vídeo
  3. Operação VibeCoding
  4. Operação Research
- Para cada operação:
  - O que faz
  - Quem lidera (Esther para Copywriting, André Leiria para Edição, etc.)
  - Requisitos mínimos
  - Benefícios (bolsa de R$ 500/mês)
- Como se candidatar
- Prazo de inscrições
- Mensagem final: "Aqui, quem entrega, sobe."

**Tom:** Profissional, seletivo, motivador.

---

**Entregue cada conteúdo em Markdown, pronto para copiar e colar no Circle.**
```

---

## Como Usar Estes Prompts

1. Copie cada prompt individualmente
2. Cole no ChatGPT (GPT-4 recomendado)
3. Revise e ajuste o output conforme necessário
4. Salve os resultados na pasta `content/` do projeto

---

**Nota:** Estes prompts foram projetados para serem autocontidos e gerarem outputs de alta qualidade com mínima intervenção.
