import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queue-start',
  templateUrl: './queue-start.component.html'
})
export class QueueStartComponent {
  @Input() title!: string;
  @Input() totalBooked!: number;
  @Input() totalBooking!: number;

  constructor() { }
}
