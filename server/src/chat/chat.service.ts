// src/chat/chat.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async getAIResponse(messages: Array<{ role: string; content: string }>) {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    if (!DEEPSEEK_API_KEY) {
      throw new HttpException('API key is missing', HttpStatus.FORBIDDEN);
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.deepseek.com/v1/chat/completions',
          {
            model: 'deepseek-chat',
            messages,
            max_tokens: 150,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            },
          },
        ),
      );

      // Handle response structure if needed
      return response.data.choices?.[0]?.message || 'No response from AI';
    } catch (error) {
      // Log error and throw exception
      console.log('Error fetching AI response:', error);
      throw new HttpException('Failed to fetch response from DeepSeek', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
