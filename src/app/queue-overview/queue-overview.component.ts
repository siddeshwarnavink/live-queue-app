import { Component } from '@angular/core';

@Component({
  selector: 'app-queue-overview',
  templateUrl: './queue-overview.component.html'
})
export class QueueOverviewComponent {
  queueList = [
    { id: 1, title: "Awesome queue", isLive: true },
    { id: 2, title: "Dumb queue", isLive: false }
  ]

  constructor() { }
}
