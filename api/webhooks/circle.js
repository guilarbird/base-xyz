/**
 * Vercel Edge Function - Webhook do Circle
 * 
 * Recebe notificações do Circle quando:
 * - Novo membro entra
 * - Novo post é criado
 * - Membro completa um curso
 * etc.
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Apenas aceita POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const payload = await request.json();
    
    // Log do evento recebido
    console.log('Webhook recebido:', {
      type: payload.event_type,
      timestamp: new Date().toISOString(),
      data: payload
    });

    // Processar diferentes tipos de eventos
    switch (payload.event_type) {
      case 'member.created':
        await handleNewMember(payload);
        break;
      
      case 'post.created':
        await handleNewPost(payload);
        break;
      
      case 'course.completed':
        await handleCourseCompleted(payload);
        break;
      
      default:
        console.log('Evento não tratado:', payload.event_type);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleNewMember(payload) {
  const member = payload.data;
  console.log('Novo membro:', member.name);
  
  // TODO: Enviar mensagem de boas-vindas
  // TODO: Conceder badge "Recruta"
  // TODO: Notificar moderadores no Slack
}

async function handleNewPost(payload) {
  const post = payload.data;
  console.log('Novo post:', post.name);
  
  // TODO: Verificar se precisa moderação
  // TODO: Notificar moderadores se for spam
  // TODO: Atualizar métricas
}

async function handleCourseCompleted(payload) {
  const { member, course } = payload.data;
  console.log('Curso completado:', course.name, 'por', member.name);
  
  // TODO: Conceder badge "Soldado"
  // TODO: Enviar mensagem de parabéns
  // TODO: Desbloquear acesso ao #CampoDeProvas ou #Labs
}
