import { MessageModule } from './../message/message.module';
import { MembersRoutingModule } from './members-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';

@NgModule({
   declarations: [
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberListComponent,
      PhotoEditorComponent,
   ],
   imports: [CommonModule, MembersRoutingModule, MessageModule, SharedModule],
   exports: [MemberListComponent, MemberEditComponent, MemberCardComponent, MembersRoutingModule],
})
export class MembersModule {}
