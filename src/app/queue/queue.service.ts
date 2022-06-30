import { Injectable } from '@angular/core';

import { Queue } from './queue.modal';
import { PersonsService } from './persons.service';
import { QueueServiceApi } from './queue-api.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  public queueListLoading = false;
  public queueList: Queue[] = [
    // { id: '1', title: "Awesome queue", isLive: true, totalBooked: 10, totalBooking: 10 },
    // { id: '2', title: "Dumb queue", isLive: false, totalBooked: 0, totalBooking: 25 }
  ];
  public singleQueue: any;
  public highestTokenNumber = 0;
  public selectedPerson: any;
  public singleQueueLoading = false;
  public selectedPersonLoading = false;
  public queueSubscriptions: Function[] = [];

  constructor(
    private personsService: PersonsService,
    private queueServiceAPI: QueueServiceApi
  ) { }

  getQueue() {
    return this.queueList;
  }

  getSingleQueue() {
    return this.singleQueue;
  }

  getQueueById(id: string) {
    return this.queueList.find((queueItem) => {
      return queueItem.id === id;
    });
  }

  fetchQueueList() {
    this.queueServiceAPI.fetchQueueListFromAPI(this);
  }

  fetchQueueOfId(id: string) {
    this.queueServiceAPI.fetchQueueOfIDFromAPI(id, this);
  }

  fetchPersonOfTokenNumber(tokenNumber: number, showLoading = true) {
    this.queueServiceAPI.fetchPersonOfTokenNumberFromAPI(tokenNumber, showLoading, this);
  }

  updateSingleQueueActiveToken(newToken: number) {
    this.queueServiceAPI.updateSingleQueueActiveTokenOnAPI(newToken, this);
  }

  updateNextUp(id: string, tokenNumber: number) {
    this.queueServiceAPI.updateNextUpInAPI(id, tokenNumber, this);
  }

  goToNextPerson() {
    this.selectedPerson = this.personsService.upNextList[0];

    if (this.personsService.upNextList[0].tokenNumber > this.highestTokenNumber) {
      this.highestTokenNumber = this.personsService.upNextList[0].tokenNumber;
    }

    this.updateNextUp(this.personsService.upNextList[0].id, this.personsService.upNextList[0].tokenNumber);
    this.updateSingleQueueActiveToken(this.personsService.upNextList[0].tokenNumber);
  }

  skipPerson() {
    this.queueServiceAPI.skipPersonInAPI(this);
  }

  goLiveOnSingleSelectedQueue() {
    this.queueServiceAPI.goLiveOnSingleSelectedQueueOnAPI(this);
  }

  unsubscribeQueueSubscriptions() {
    this.queueSubscriptions.forEach(subscription => {
      if (typeof subscription === 'function') {
        subscription();
      }
    });
  }

  TEST_ONLY_resetEverything() {
    this.queueServiceAPI.TEST_ONLY_resetEverythingInAPI(this);
  }
}
