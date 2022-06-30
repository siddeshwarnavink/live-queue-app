import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueItemPulseComponent } from './queue-item-pulse.component';

describe('QueueItemPulseComponent', () => {
  let component: QueueItemPulseComponent;
  let fixture: ComponentFixture<QueueItemPulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueItemPulseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueItemPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
