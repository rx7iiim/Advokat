// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [HttpModule], 
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}