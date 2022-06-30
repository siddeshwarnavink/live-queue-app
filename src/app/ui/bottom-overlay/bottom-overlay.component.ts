import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-bottom-overlay',
  templateUrl: './bottom-overlay.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
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
