import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNextPersonComponent } from './select-next-person.component';

describe('SelectNextPersonComponent', () => {
  let component: SelectNextPersonComponent;
  let fixture: ComponentFixture<SelectNextPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectNextPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectNextPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
