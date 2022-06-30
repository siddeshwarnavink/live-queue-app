import { Component, ElementRef, OnInit } from '@angular/core';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-dev-only',
  templateUrl: './dev-only.component.html'
})
export class DevOnlyComponent implements OnInit {
  debugging = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.debugging = !environment.production;
    if (!this.debugging) {
      let element = this.elementRef.nativeElement as HTMLElement;
      if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
    }
  }

}
