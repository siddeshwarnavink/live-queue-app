import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LayoutComponent } from './layout.component';

@Component({
  template: `<app-layout>Hello World</app-layout>`,
})
class TestHostComponent { }

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, TestHostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ng content content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);

    const de: DebugElement = testFixture.debugElement.query(
      By.css('div')
    );
    const el: Element = de.nativeElement;

    expect(el.textContent).toEqual('Hello World');
  });

  it('should render <app-toolbar>', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-toolbar')).not.toBe(null);
  })
});
