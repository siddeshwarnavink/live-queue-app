import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pending-item',
  templateUrl: './pending-item.component.html'
})
export class PendingItemComponent {
  @Input() name?: string;
  @Input() pfpSeed?: string;
  @Input() delayAttendee = false;

  constructor() { }
}
