import { Body, Controller, Get, Post, Query, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() response: Response) {
    response.type('text/html').send(readFileSync(join(__dirname, 'assets/index.html')).toString());
  }

  @Get('/data')
  getData() {
    return this.appService.getData();
  }
  @Post('/message')
  message(
    @Query('channelId') channelId: string,
    @Body() input: { message: string }) {
    return this.appService.message(input.message, channelId);
  }

  @Sse('/sse')
  sse(@Query('channelId') channelId: string): Observable<MessageEvent> {
    return this.appService.subscribe(channelId);
  }
}
