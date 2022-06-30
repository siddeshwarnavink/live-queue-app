import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
})
export class QueueItemComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() totalBooking!: number
  @Input() totalBooked!: number
  @Input() isLive = false;

  isDisabled() {
    return this.totalBooked < 1;
  }

  constructor() { }
}
