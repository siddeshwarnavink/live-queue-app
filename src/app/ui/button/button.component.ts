import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() flat = false;
  @Input() isDisable = false;
  @Output() click = new EventEmitter();

  constructor() { }

  onClickHandler() {
    this.click.emit();
  }
}
