import { MembersRoutingModule } from './members-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
   MemberCardComponent,
   MemberDetailComponent,
   MemberEditComponent,
   MemberListComponent,
   PhotoEditorComponent,
} from '.';
import { SharedModule } from '../shared/shared.module';

@NgModule({
   declarations: [
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberListComponent,
      PhotoEditorComponent,
   ],
   imports: [CommonModule, MembersRoutingModule, SharedModule],
   exports: [MemberListComponent, MemberEditComponent, MembersRoutingModule],
})
export class MembersModule {}
