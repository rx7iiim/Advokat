// src/ai/ai.controller.ts
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('api/ai')
export class  ProxyController{
  constructor(private readonly httpService: HttpService) {}

  @Post('prompts')
  async getPrompts(@Body() body: any, @Headers('authorization') apiKey: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://extensions.aitopia.ai/ai/prompts',
        body,
        {
          headers: {
            'Authorization': apiKey || process.env.AITOPIA_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
    );
    return response.data;
  }

  @Post('model_settings')
  async getModelSettings(@Body() body: any, @Headers('authorization') apiKey: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://extensions.aitopia.ai/ai/model_settings',
        body,
        {
          headers: {
            'Authorization': apiKey || process.env.AITOPIA_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
    );
    return response.data;
  }
}