import { Component, Input } from '@angular/core';
import { PersonsService } from 'src/app/queue/persons.service';

@Component({
  selector: 'app-pending-item',
  templateUrl: './pending-item.component.html'
})
export class PendingItemComponent {
  @Input() id?: string;
  @Input() name?: string;
  @Input() pfpSeed?: string;
  @Input() delayAttendee = false;

  constructor(
    private personsService: PersonsService
  ) { }

  removeFromNextUpHandler() {
    if (this.id) {
      this.personsService.removeSkippedUserFromNextUp(this.id);
    }
  }
}
