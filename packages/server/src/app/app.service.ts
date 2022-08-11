import { Injectable } from '@nestjs/common';
import { interval, Subject } from 'rxjs';

const subscribers: Record<string, Subject<MessageEvent>> = {}
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  message(message: string, channelId: string) {
    if (subscribers[channelId]) {
      const observable = subscribers[channelId];
      observable.next(({ data: { channelId, message } } as MessageEvent));
    }
    interval()
  }

  subscribe(channelId: string) {
    if (!subscribers[channelId]) {
      subscribers[channelId] = new Subject();
    }
    return subscribers[channelId];
  }
}
