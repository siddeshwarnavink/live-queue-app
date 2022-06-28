import { Component } from '@angular/core';

import { QueueService } from '../queue/queue.service';

@Component({
  selector: 'app-queue-overview',
  templateUrl: './queue-overview.component.html'
})
export class QueueOverviewComponent {
  queueList = [];

  constructor(public queueService: QueueService) { }
}
