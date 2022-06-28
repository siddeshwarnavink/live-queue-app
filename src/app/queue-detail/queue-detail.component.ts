import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QueueService } from '../queue/queue.service';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
})
export class QueueDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    public queueService: QueueService
  ) { }

  ngOnInit(): void {
    const idFromParams = this.route.snapshot.paramMap.get('id');

    if (idFromParams) {
      this.queueService.fetchQueueOfId(idFromParams);
    }
  }

  ngOnDestroy(): void {
    this.queueService.unsubscribeQueueSubscriptions();
  }
}
