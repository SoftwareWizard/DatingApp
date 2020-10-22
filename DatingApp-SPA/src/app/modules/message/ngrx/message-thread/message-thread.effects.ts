import { MessageThreadService } from './../../services/message-thread.service';
import { Injectable } from '@angular/core';
import { getActions } from '@ngrx-ducks/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageThreadFacade } from './message-thread.facade';
import { tap } from 'rxjs/operators';

const actions = getActions(MessageThreadFacade);

@Injectable({
   providedIn: 'root',
})
export class MessageThreadEffects {
   constructor(private actions$: Actions, private messageThreadService: MessageThreadService) {}

   startMessageThreadHub$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.startMessageThreadHub),
            tap(action => {
               this.messageThreadService.createHubConnection(
                  action.payload.user,
                  action.payload.otherUsername
               );
            })
         );
      },
      { dispatch: false }
   );

   stopMessageThreadHub$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.stopMessageThreadHub),
            tap(_ => {
               this.messageThreadService.stopHubConnection();
            })
         );
      },
      { dispatch: false }
   );

   sendMessage$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.sendMessage),
            tap(action => {
               this.messageThreadService.sendMessage(action.payload.message);
            })
         );
      },
      { dispatch: false }
   );
}
