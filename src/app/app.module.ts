import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { LayoutModule } from './layout/layout.module';
import { QueueOverviewModule } from './queue-overview/queue-overview.module';

@NgModule({
  declarations: [
    AppComponent,
    QueueDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    QueueOverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
