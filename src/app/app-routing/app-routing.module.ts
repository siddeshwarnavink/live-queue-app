import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueDetailComponent } from '../queue-detail/queue-detail.component';
import { QueueOverviewComponent } from '../queue-overview/queue-overview.component';

const routes: Routes = [
    { path: '', component: QueueOverviewComponent },
    { path: 'queue', component: QueueDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }