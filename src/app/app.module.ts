import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { QueueOverviewComponent } from './queue-overview/queue-overview.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    QueueOverviewComponent,
    QueueDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
