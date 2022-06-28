import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

@Component({
  template: `<app-button>My awesome button</app-button>`,
})
class TestHostComponent { }

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, TestHostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ng content content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);

    const de: DebugElement = testFixture.debugElement.query(
      By.css('button')
    );
    const el: Element = de.nativeElement;

    expect(el.textContent).toEqual('My awesome button');
  });

  it('should execute (click) if button clicked', () => {
    spyOn(component.click, 'emit');

    component.onClickHandler();

    expect(component.click.emit).toHaveBeenCalled();
  });
});
