import { Component, OnInit } from '@angular/core';

import { QueueService } from 'src/app/queue/queue.service';

@Component({
  selector: 'app-queue-controller',
  templateUrl: './queue-controller.component.html'
})
export class QueueControllerComponent implements OnInit {
  constructor(
    public queueService: QueueService,
  ) { }

  ngOnInit(): void {
    const currentQueue = this.queueService.getSingleQueue();
    this.queueService.fetchPersonOfTokenNumber(currentQueue.activeToken);
  }

  goToNextPersonHandler() {
    // const currentQueue = this.queueService.getSingleQueue();
    // this.queueService.updateSingleQueueActiveToken(currentQueue.activeToken + 1);
    this.queueService.goToNextPerson();
  }

  skipPersonHandler() {
    this.queueService.skipPerson();
  }

  resetEverythingHandler() {
    this.queueService.TEST_ONLY_resetEverything();
  }
}
