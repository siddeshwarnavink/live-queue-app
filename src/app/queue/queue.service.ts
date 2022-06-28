import { Injectable } from '@angular/core';
import { collection, getDocs, onSnapshot, getDoc, doc, updateDoc, where, query } from "firebase/firestore";

import { Queue } from './queue.modal';
import { firestore } from '../config/firebase';
import { PersonsService } from './persons.service';

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
  public selectedPerson: any;
  public singleQueueLoading = false;
  public selectedPersonLoading = false;
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
            this.fetchPersonOfTokenNumber(liveDoc.data()['activeToken'], false);

            this.singleQueue = {
              id: liveDoc.id,
              title: liveDoc.data()['title'],
              totalBooked: liveDoc.data()['totalBooked'],
              totalBooking: liveDoc.data()['totalBooking'],
              isLive: liveDoc.data()['isLive'],
              activeToken: liveDoc.data()['activeToken']
            }
          }
        });

        this.singleQueue = {
          id: queueDoc.id,
          title: queueDoc.data()['title'],
          totalBooked: queueDoc.data()['totalBooked'],
          totalBooking: queueDoc.data()['totalBooking'],
          isLive: queueDoc.data()['isLive'],
          activeToken: queueDoc.data()['activeToken']
        }
        this.singleQueueLoading = false;
        this.queueSubscriptions.push(subscription);
      }
    });
  }

  fetchPersonOfTokenNumber(tokenNumber: number, showLoading = true) {
    if (showLoading) {
      this.selectedPersonLoading = true;
    }

    const fetchingQuery = query(collection(firestore, 'persons'), where('tokenNumber', '==', tokenNumber))
    getDocs(fetchingQuery).then(docs => {
      docs.forEach(doc => {
        this.selectedPerson = {
          id: doc['id'],
          ...doc.data()
        }
        this.selectedPersonLoading = false;
      });
    });
  }

  updateSingleQueueActiveToken(newToken: number) {
    updateDoc(doc(firestore, 'queue', this.singleQueue.id), {
      activeToken: newToken
    });

    this.singleQueue.activeToken = newToken;
  }

  updateNextUp(id: string, tokenNumber: number) {
    updateDoc(doc(firestore, 'persons', id), {
      isOnNextUp: false
    });

    getDocs(query(collection(firestore, 'persons'), where('tokenNumber', '==', tokenNumber + 1))).then(docs => {
      docs.forEach(singleDoc => {
        updateDoc(singleDoc.ref, {
          isOnNextUp: true
        });
      })
    });
    // getDocs(query(collection(firestore, 'persons'), where('tokenNumber', '==', token))).then(docs => {
    //   docs.forEach(nextUpPersonDoc => {
    //     updateDoc(doc(firestore, 'persons', nextUpPersonDoc.id), {
    //       isOnNextUp: true
    //     });
    //   });
    // });
    // getDocs(query(collection(firestore, 'persons'), where('tokenNumber', '==', token - 1))).then(docs => {
    //   docs.forEach(nextUpPersonDoc => {
    //     updateDoc(doc(firestore, 'persons', nextUpPersonDoc.id), {
    //       isOnNextUp: false
    //     });
    //   });
    // });
  }

  goToNextPerson() {
    // Update upnext list
    this.updateNextUp(this.personsService.upNextList[0].id, this.personsService.upNextList[0].tokenNumber);
    // Update the currentSelected in queue document
    this.updateSingleQueueActiveToken(this.personsService.upNextList[0].tokenNumber);
  }

  skipPerson() {
    // updateDoc(doc(firestore, 'queue', this.singleQueue.id), {
    //   skipped: arrayUnion(this.selectedPerson)
    // }).then(() => {
    //   this.updateSingleQueueActiveToken(this.singleQueue.activeToken + 1);
    // });
    updateDoc(doc(firestore, 'persons', this.selectedPerson.id), {
      isSkipped: true
    }).then(() => {
      this.updateSingleQueueActiveToken(this.singleQueue.activeToken + 1);
    });

    this.updateNextUp(this.personsService.upNextList[0].id, this.personsService.upNextList[0].tokenNumber);
  }

  goLiveOnSingleSelectedQueue() {
    updateDoc(doc(firestore, 'queue', this.singleQueue.id), {
      isLive: true,
      activeToken: 1
    });

    getDocs(query(collection(firestore, 'persons'), where('tokenNumber', '==', 2))).then(docs => {
      docs.forEach(nextUpPersonDoc => {
        updateDoc(doc(firestore, 'persons', nextUpPersonDoc.id), {
          isOnNextUp: true
        });
      });
    });

    this.singleQueue.activeToken = 1;
  }

  unsubscribeQueueSubscriptions() {
    this.queueSubscriptions.forEach(subscription => {
      if (typeof subscription === 'function') {
        subscription();
      }
    });
  }

  TEST_ONLY_resetEverything() {
    console.log('RESETTING...');


    updateDoc(doc(firestore, 'queue', this.singleQueue.id), {
      isLive: false,
      activeToken: 1
    });

    getDocs(query(collection(firestore, 'persons'))).then(docs => {
      docs.forEach((personDoc): void => {
        updateDoc(personDoc.ref, {
          isOnNextUp: false,
          isSkipped: false
        })
      });
    });

  }

  constructor(
    private personsService: PersonsService
  ) { }
}
