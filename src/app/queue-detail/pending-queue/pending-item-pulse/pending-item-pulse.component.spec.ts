import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingItemPulseComponent } from './pending-item-pulse.component';

describe('PendingItemPulseComponent', () => {
  let component: PendingItemPulseComponent;
  let fixture: ComponentFixture<PendingItemPulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingItemPulseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingItemPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
