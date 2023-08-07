import { Controller, Get,  } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const response = await this.httpService.post('/auth', {
      username: 'mateorodas@gmail.com',
      password: '123456'
    }).toPromise();
    response.data;
    return 'test';
  }
}
