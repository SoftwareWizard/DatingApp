import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { of } from 'rxjs';
import { MemberEditComponent } from 'src/app/members/member-edit/member-edit.component';

@Injectable({
   providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
   canDeactivate(component: MemberEditComponent): boolean {
      if (component.editForm.dirty) {
         return confirm('Are you sure to continue without saving changes?');
      }

      return true;
   }
}
