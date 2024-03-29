import { MessageThreadComponent } from './components/message-thread/message-thread.component';
import { MessageRouteNames } from './message-routing.names';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageListComponent } from './components/message-list/message-list.component';

const routes: Routes = [
  { path: '', component: MessageListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
