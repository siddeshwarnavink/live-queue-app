import { Injectable } from '@angular/core';

import { Queue } from './queue.modal';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private queueList: Queue[] = [
    { id: '1', title: "Awesome queue", isLive: true, totalBooked: 10, totalBooking: 10 },
    { id: '2', title: "Dumb queue", isLive: false, totalBooked: 0, totalBooking: 25 }
  ];

  getQueue() {
    return this.queueList;
  }

  getQueueById(id: string) {
    return this.queueList.find((queueItem) => {
      return queueItem.id === id;
    });
  }

  constructor() { }
}
