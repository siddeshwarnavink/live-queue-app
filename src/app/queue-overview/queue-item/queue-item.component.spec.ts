import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueItemComponent } from './queue-item.component';

describe('QueueItemComponent', () => {
  let component: QueueItemComponent;
  let fixture: ComponentFixture<QueueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueueItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QueueItemComponent);
    component = fixture.componentInstance;

    component.title = 'my-title'
    component.totalBooked = 10
    component.totalBooking = 100
    component.isLive = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('span#queue-item-title').innerText).toBe('my-title')
  });

  it('should render <no. of booked>/<total bookings> format', () => {
    expect(fixture.nativeElement.querySelector('span#queue-item-subtitle').innerText).toBe('10/100 booked')
  });

  it('should render "LIVE NOW" if isLive is set true', () => {
    expect(fixture.nativeElement.querySelector('div#queue-item-live')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('div#queue-item-live span').innerText).toBe('LIVE NOW');
  });

  it('should not render "LIVE NOW" if isLive is set false', () => {
    component.isLive = false;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div#queue-item-live')).not.toBeTruthy();
  });
});
