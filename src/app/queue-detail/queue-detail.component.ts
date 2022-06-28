import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QueueService } from '../queue/queue.service';
import { PersonsService } from '../queue/persons.service';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
})
export class QueueDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    public queueService: QueueService,
    public personsService: PersonsService
  ) { }

  ngOnInit(): void {
    const idFromParams = this.route.snapshot.paramMap.get('id');

    if (idFromParams) {      
      this.queueService.fetchQueueOfId(idFromParams);
      this.personsService.fetchUpNextPersons();
    }
  }

  ngOnDestroy(): void {
    this.queueService.unsubscribeQueueSubscriptions();
    this.personsService.unsubscribeQueueSubscriptions();
  }
}
