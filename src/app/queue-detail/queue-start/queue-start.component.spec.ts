import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueStartComponent } from './queue-start.component';

describe('QueueStartComponent', () => {
  let component: QueueStartComponent;
  let fixture: ComponentFixture<QueueStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
