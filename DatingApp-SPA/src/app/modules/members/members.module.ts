import { LikesEffects } from './ngrx/likes/likes.effects';
import { MembersEffects } from './ngrx/members/members.effects';
import { MessageModule } from './../message/message.module';
import { MembersRoutingModule } from './members.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { PhotoEditorComponent } from './components/photo-editor/photo-editor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as memberFacade from './ngrx/member.facade';
import { metaReducers } from './ngrx/member.state';
import { MemberFilterComponent } from './components/member-filter/member-filter.component';
import { MemberPaginatorComponent } from './components/member-paginator/member-paginator.component';

@NgModule({
   declarations: [
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberListComponent,
      PhotoEditorComponent,
      MemberFilterComponent,
      MemberPaginatorComponent,
   ],
   imports: [
      CommonModule,
      MembersRoutingModule,
      MessageModule,
      SharedModule,
      StoreModule.forFeature(memberFacade.featureKey, memberFacade.reducers, {
         metaReducers,
      }),
      EffectsModule.forFeature([MembersEffects, LikesEffects]),
   ],
   exports: [MemberListComponent, MemberEditComponent, MemberCardComponent, MembersRoutingModule],
})
export class MembersModule {}
