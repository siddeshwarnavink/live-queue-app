import { Injectable } from '@angular/core';
import { collection, getDocs, onSnapshot, getDoc, doc } from "firebase/firestore";

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
  private singleQueue: any;
  public singleQueueLoading = false;
  private queueSubscriptions: Function[] = [];

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
    this.queueListLoading = true;

    getDocs(collection(firestore, 'queue')).then(querySnapshot => {
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
        this.queueSubscriptions.push(subscription);
      }

      this.queueList = fetchedQueue;
      this.queueListLoading = false;
    });
  }

  fetchQueueOfId(id: string) {
    this.singleQueueLoading = true;

    getDoc(doc(firestore, 'queue', id)).then(queueDoc => {
      if (queueDoc.exists()) {
        const subscription = onSnapshot(queueDoc.ref, { includeMetadataChanges: true }, liveDoc => {
          if (liveDoc.exists()) {
            this.singleQueue = {
              id: liveDoc.id,
              title: liveDoc.data()['title'],
              totalBooked: liveDoc.data()['totalBooked'],
              totalBooking: liveDoc.data()['totalBooking'],
              isLive: liveDoc.data()['isLive']
            }
          }
        });

        this.singleQueue = {
          id: queueDoc.id,
          title: queueDoc.data()['title'],
          totalBooked: queueDoc.data()['totalBooked'],
          totalBooking: queueDoc.data()['totalBooking'],
          isLive: queueDoc.data()['isLive']
        }
        this.singleQueueLoading = false;
        this.queueSubscriptions.push(subscription);
      }
    });
  }

  unsubscribeQueueSubscriptions() {
    this.queueSubscriptions.forEach(subscription => {
      if (typeof subscription === 'function') {
        subscription();
      }
    });
  }

  constructor() { }
}
