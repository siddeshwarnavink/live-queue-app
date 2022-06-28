import { Injectable } from '@angular/core';
import { collection, onSnapshot, doc, updateDoc, where, query, orderBy } from "firebase/firestore";

import { firestore } from '../config/firebase';

@Injectable({
    providedIn: 'root'
})
export class PersonsService {
    public upNextList: any[] = [];
    public skippedList: any[] = [];

    private upNextPersonSubscription: any;
    private skippedPersonsSubscription: any;

    fetchUpNextPersons() {
        if (!this.upNextPersonSubscription) {
            const fetchQuery = query(
                collection(firestore, 'persons'),
                where('isOnNextUp', "==", true),
                orderBy("tokenNumber", "asc")
            );
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

            this.upNextPersonSubscription = unsubscribe;
        }
    }

    fetchSkippedPersons() {
        if (!this.skippedPersonsSubscription) {
            const fetchQuery = query(collection(firestore, 'persons'), where('isOnNextUp', "==", false), where('isSkipped', "==", true));
            const unsubscribe = onSnapshot(fetchQuery, (querySnapshot) => {
                const persons: any[] = [];
                querySnapshot.forEach((doc) => {
                    persons.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                this.skippedList = persons;
            });

            this.skippedPersonsSubscription = unsubscribe;
        }
    }

    addSkippedPersonToQueue(personId: string) {
        updateDoc(doc(firestore, 'persons', personId), {
            isSkipped: true,
            isOnNextUp: true
        });
    }

    unsubscribeQueueSubscriptions() {
        this.upNextPersonSubscription();
        this.skippedPersonsSubscription();
    }
}
