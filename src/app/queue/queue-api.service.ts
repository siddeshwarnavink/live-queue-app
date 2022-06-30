import { Injectable } from '@angular/core';
import { collection, getDocs, onSnapshot, getDoc, doc, updateDoc, where, query } from "firebase/firestore";

import { Queue } from './queue.modal';
import { firestore } from '../config/firebase';
import { PersonsService } from './persons.service';
import { QueueService } from './queue.service';

@Injectable({
    providedIn: 'root'
})
export class QueueServiceApi {
    constructor(
        private personsService: PersonsService
    ) { }

    fetchQueueListFromAPI(queueService: QueueService) {
        queueService.queueListLoading = false;

        getDocs(collection(firestore, 'queue')).then(querySnapshot => {
            let fetchedQueue: Queue[] = [];
            let subscription;

            querySnapshot.forEach(doc => {
                subscription = onSnapshot(doc.ref, { includeMetadataChanges: true }, liveDoc => {
                    const queueIndex = queueService.getQueue().findIndex(queueItem => {
                        return queueItem.id === liveDoc.id
                    });

                    if (liveDoc.exists()) {
                        queueService.getQueue()[queueIndex].isLive = liveDoc.data()['isLive'];
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
                queueService.queueSubscriptions.push(subscription);
            }

            queueService.queueList = fetchedQueue;
            queueService.queueListLoading = false;
        });
    }

    fetchQueueOfIDFromAPI(id: string, queueService: QueueService) {
        queueService.singleQueueLoading = true;

        getDoc(doc(firestore, 'queue', id)).then(queueDoc => {
            if (queueDoc.exists()) {
                const subscription = onSnapshot(queueDoc.ref, { includeMetadataChanges: true }, liveDoc => {
                    if (liveDoc.exists()) {
                        queueService.fetchPersonOfTokenNumber(liveDoc.data()['activeToken'], false);

                        queueService.singleQueue = {
                            id: liveDoc.id,
                            title: liveDoc.data()['title'],
                            totalBooked: liveDoc.data()['totalBooked'],
                            totalBooking: liveDoc.data()['totalBooking'],
                            isLive: liveDoc.data()['isLive'],
                            activeToken: liveDoc.data()['activeToken']
                        }
                    }
                });

                queueService.singleQueue = {
                    id: queueDoc.id,
                    title: queueDoc.data()['title'],
                    totalBooked: queueDoc.data()['totalBooked'],
                    totalBooking: queueDoc.data()['totalBooking'],
                    isLive: queueDoc.data()['isLive'],
                    activeToken: queueDoc.data()['activeToken']
                }
                queueService.singleQueueLoading = false;
                queueService.queueSubscriptions.push(subscription);
            }
        });
    }

    fetchPersonOfTokenNumberFromAPI(tokenNumber: number, showLoading: boolean, queueService: QueueService) {
        if (showLoading) {
            queueService.selectedPersonLoading = true;
        }

        const fetchingQuery = query(collection(firestore, 'persons'), where('tokenNumber', '==', tokenNumber))
        getDocs(fetchingQuery).then(docs => {
            docs.forEach(doc => {
                queueService.selectedPerson = {
                    id: doc['id'],
                    ...doc.data()
                }
                queueService.selectedPersonLoading = false;
            });
        });
    }

    updateNextUpInAPI(id: string, tokenNumber: number, queueService: QueueService) {
        // const isSkippedPerson = (tokenNumber < queueService.selectedPerson.tokenNumber);
        const isSkippedPerson = queueService.highestTokenNumber !== tokenNumber;

        updateDoc(doc(firestore, 'persons', id), {
            isOnNextUp: false,
            isSkipped: false
        });

        if (!isSkippedPerson) {
            getDocs(query(collection(firestore, 'persons'), where('tokenNumber', '==', tokenNumber + 1))).then(docs => {
                docs.forEach(singleDoc => {
                    updateDoc(singleDoc.ref, {
                        isOnNextUp: true
                    });
                })
            });
        }
    }

    skipPersonInAPI(queueService: QueueService) {
        // updateDoc(doc(firestore, 'queue', this.singleQueue.id), {
        //   skipped: arrayUnion(this.selectedPerson)
        // }).then(() => {
        //   this.updateSingleQueueActiveToken(this.singleQueue.activeToken + 1);
        // });
        if (this.personsService.upNextList[0].tokenNumber > queueService.highestTokenNumber) {
            queueService.highestTokenNumber = this.personsService.upNextList[0].tokenNumber;
        }

        updateDoc(doc(firestore, 'persons', queueService.selectedPerson.id), {
            isSkipped: true
        }).then(() => {
            queueService.updateSingleQueueActiveToken(queueService.singleQueue.activeToken + 1);
        });

        queueService.updateNextUp(this.personsService.upNextList[0].id, this.personsService.upNextList[0].tokenNumber);
    }

    TEST_ONLY_resetEverythingInAPI(queueService: QueueService) {
        console.log('RESETTING...');

        updateDoc(doc(firestore, 'queue', queueService.singleQueue.id), {
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

    goLiveOnSingleSelectedQueueOnAPI(queueService: QueueService) {
        queueService.highestTokenNumber = 1;

        updateDoc(doc(firestore, 'queue', queueService.singleQueue.id), {
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

        queueService.singleQueue.activeToken = 1;
    }

    updateSingleQueueActiveTokenOnAPI(newToken: number, queueService: QueueService) {
        updateDoc(doc(firestore, 'queue', queueService.singleQueue.id), {
            activeToken: newToken
        });

        queueService.singleQueue.activeToken = newToken;
    }
}
