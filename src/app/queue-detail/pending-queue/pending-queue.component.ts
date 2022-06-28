import { Component, OnInit } from '@angular/core';

import { PersonsService } from 'src/app/queue/persons.service';

@Component({
  selector: 'app-pending-queue',
  templateUrl: './pending-queue.component.html'
})
export class PendingQueueComponent implements OnInit {

  constructor(
    public personsService: PersonsService
  ) { }

  ngOnInit(): void {
  }

}
