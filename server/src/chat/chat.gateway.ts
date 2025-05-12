// src/chat/chat.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(@Inject(ChatService) private readonly chatService: ChatService) {}

  // Event triggered when a new client connects
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // Event triggered when a client disconnects
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Listen to the 'sendMessage' event from the client
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, @MessageBody() message: { role: string; content: string }) {
    console.log('Received message:', message);

    try {
      // Call the ChatService to get the AI response
      const aiResponse = await this.chatService.getAIResponse([message]);

      // Emit the response back to the client
      this.server.emit('receiveMessage', { role: 'assistant', content: aiResponse });
    } catch (error) {
      console.error('Error handling message:', error);
      this.server.emit('receiveMessage', {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message.',
      });
    }
  }
}
