import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from 'src/app/queue/persons.service';

@Component({
  selector: 'app-select-next-person',
  templateUrl: './select-next-person.component.html'
})
export class SelectNextPersonComponent implements OnInit {

  isOverlayOpen = false;

  constructor(
    public personsService: PersonsService
  ) { }

  ngOnInit(): void {
    this.personsService.fetchSkippedPersons();
  }

  toggleOverlayHandler() {
    this.isOverlayOpen = !this.isOverlayOpen
  }

  selectPersonHandler(id: string) {
    this.personsService.addSkippedPersonToQueue(id);
  }
}
