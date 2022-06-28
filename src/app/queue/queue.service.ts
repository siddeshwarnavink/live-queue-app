import { Injectable } from '@angular/core';
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { Queue } from './queue.modal';
import { firestore } from '../config/firebase';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  public queueListLoading = false;
  private queueList: Queue[] = [
    // { id: '1', title: "Awesome queue", isLive: true, totalBooked: 10, totalBooking: 10 },
    // { id: '2', title: "Dumb queue", isLive: false, totalBooked: 0, totalBooking: 25 }
  ];
  private queueListSubscriptions: Function[] = [];

  getQueue() {
    return this.queueList;
  }

  getQueueById(id: string) {
    return this.queueList.find((queueItem) => {
      return queueItem.id === id;
    });
  }

  fetchQueueList() {
    this.queueListLoading = true;

    getDocs(collection(firestore, "queue")).then(querySnapshot => {
      let fetchedQueue: Queue[] = [];
      let subscription;

      querySnapshot.forEach(doc => {
        subscription = onSnapshot(doc.ref, { includeMetadataChanges: true }, liveDoc => {
          const queueIndex = this.queueList.findIndex(queueItem => {
            return queueItem.id === liveDoc.id
          });

          if (liveDoc.exists()) {
            this.queueList[queueIndex].isLive = liveDoc.data()['isLive'];
          }

          console.log(liveDoc.data());
        })

        fetchedQueue.push({
          id: doc.id,
          title: doc.data()['title'],
          totalBooked: doc.data()['totalBooked'],
          totalBooking: doc.data()['totalBooking'],
          isLive: doc.data()['isLive']
        });
      });

      if (typeof subscription === 'function') {
        this.queueListSubscriptions.push(subscription);
      }

      this.queueList = fetchedQueue;
      this.queueListLoading = false;
    });
  }

  unsubscribeQueueListSubscriptions() {
    this.queueListSubscriptions.forEach(subscription => {
      if (typeof subscription === 'function') {
        subscription();
      }
    });
  }

  constructor() { }
}
