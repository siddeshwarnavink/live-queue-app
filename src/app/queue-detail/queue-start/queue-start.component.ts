import { Component, Input } from '@angular/core';
import { QueueService } from 'src/app/queue/queue.service';

@Component({
  selector: 'app-queue-start',
  templateUrl: './queue-start.component.html'
})
export class QueueStartComponent {
  @Input() title!: string;
  @Input() totalBooked!: number;
  @Input() totalBooking!: number;

  constructor(private queueService: QueueService) { }

  startSessionHandler() {
    this.queueService.goLiveOnSingleSelectedQueue();
  }
}
