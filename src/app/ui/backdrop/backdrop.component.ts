import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  @Input() click = new EventEmitter();

  constructor() { }

  onClickHandler() {
    this.click.emit();
  }
}
