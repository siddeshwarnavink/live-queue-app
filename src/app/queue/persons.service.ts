import { Injectable } from '@angular/core';
import { collection, getDocs, onSnapshot, getDoc, doc, updateDoc, where, query, arrayUnion } from "firebase/firestore";

import { firestore } from '../config/firebase';

@Injectable({
    providedIn: 'root'
})
export class PersonsService {
    public upNextList: any[] = [];
    public upNextListLoading = false;
    private queueSubscriptions: Function[] = [];

    fetchUpNextPersons() {
        if (this.queueSubscriptions.length < 1) {
            const fetchQuery = query(collection(firestore, 'persons'), where('isOnNextUp', "==", true));
            const unsubscribe = onSnapshot(fetchQuery, (querySnapshot) => {
                const persons: any[] = [];
                querySnapshot.forEach((doc) => {
                    persons.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.upNextList = persons;
            });

            this.queueSubscriptions.push(unsubscribe);
        }
    }

    unsubscribeQueueSubscriptions() {
        this.queueSubscriptions.forEach(subscription => {
            if (typeof subscription === 'function') {
                subscription();
            }
        });
    }
}
