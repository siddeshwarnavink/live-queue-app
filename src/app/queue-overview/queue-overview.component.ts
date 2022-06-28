import { Component, OnInit, OnDestroy } from '@angular/core';

import { QueueService } from '../queue/queue.service';

@Component({
  selector: 'app-queue-overview',
  templateUrl: './queue-overview.component.html'
})
export class QueueOverviewComponent implements OnInit, OnDestroy {
  queueList = [];

  constructor(public queueService: QueueService) { }

  ngOnInit(): void {
    this.queueService.fetchQueueList();
  }

  ngOnDestroy(): void {
    this.queueService.unsubscribeQueueListSubscriptions();
  }
}
