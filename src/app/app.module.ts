import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { QueueOverviewModule } from './queue-overview/queue-overview.module';
import { QueueDetailModule } from './queue-detail/queue-detail.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    QueueOverviewModule,
    QueueDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
