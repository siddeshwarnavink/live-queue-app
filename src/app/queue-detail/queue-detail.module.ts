import { NgModule } from "@angular/core";
import { UIModule } from "../ui/ui.module";

import { PendingQueueComponent } from "./pending-queue/pending-queue.component";
import { QueueControllerComponent } from "./queue-controller/queue-controller.component";
import { QueueStartComponent } from "./queue-start/queue-start.component";
import { PendingItemComponent } from "./pending-queue/pending-item/pending-item.component";
import { QueueDetailComponent } from "./queue-detail.component";
import { CommonModule } from "@angular/common";
import { SelectNextPersonComponent } from './select-next-person/select-next-person.component';

const components = [
    QueueDetailComponent,
    PendingQueueComponent,
    QueueControllerComponent,
    QueueStartComponent,
    PendingItemComponent,
    SelectNextPersonComponent
]

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        UIModule
    ],
    bootstrap: [...components],
    exports: [...components]
})
export class QueueDetailModule { }