import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { LayoutModule } from './layout/layout.module';
import { QueueOverviewModule } from './queue-overview/queue-overview.module';
import { QueueControllerComponent } from './queue-detail/queue-controller/queue-controller.component';
import { UIModule } from './ui/ui.module';
import { PendingQueueComponent } from './queue-detail/pending-queue/pending-queue.component';
import { PendingItemComponent } from './queue-detail/pending-queue/pending-item/pending-item.component';
import { QueueStartComponent } from './queue-detail/queue-start/queue-start.component';

@NgModule({
  declarations: [
    AppComponent,
    QueueDetailComponent,
    QueueControllerComponent,
    PendingQueueComponent,
    PendingItemComponent,
    QueueStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    QueueOverviewModule,
    UIModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
