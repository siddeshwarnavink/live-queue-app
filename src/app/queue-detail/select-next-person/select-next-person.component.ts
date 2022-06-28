import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-next-person',
  templateUrl: './select-next-person.component.html'
})
export class SelectNextPersonComponent implements OnInit {

  isOverlayOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleOverlayHandler() {
    this.isOverlayOpen = !this.isOverlayOpen
  }
}
