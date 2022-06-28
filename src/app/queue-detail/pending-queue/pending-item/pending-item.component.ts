import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pending-item',
  templateUrl: './pending-item.component.html'
})
export class PendingItemComponent {
  @Input() delayAttendee = false;

  constructor() { }
}
