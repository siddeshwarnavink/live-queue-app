import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-overlay',
  templateUrl: './bottom-overlay.component.html',
})
export class BottomOverlayComponent implements OnInit {
  @Input() isOpen = false;
  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeOverlayHandler() {
    this.toggle.emit();
  }

}
