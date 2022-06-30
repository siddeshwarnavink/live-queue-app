import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { QueueOverviewModule } from './queue-overview/queue-overview.module';
import { QueueDetailModule } from './queue-detail/queue-detail.module';
import { QueueOverviewComponent } from './queue-overview/queue-overview.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: QueueOverviewComponent, data: { animation: 'HomePage' } },
      { path: 'queue/:id', component: QueueDetailComponent, data: { animation: 'DetailPage' } },
    ]),
    LayoutModule,
    QueueOverviewModule,
    QueueDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
