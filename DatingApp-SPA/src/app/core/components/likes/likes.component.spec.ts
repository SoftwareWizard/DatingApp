import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';
import { MemberCardComponent } from './../../../modules/members/components/member-card/member-card.component';
import { Spectator, createComponentFactory, byText } from '@ngneat/spectator';
import { MockComponent, ngMocks } from 'ng-mocks';
import { LikesComponent } from './likes.component';
import { ButtonRadioDirective } from 'ngx-bootstrap/buttons';
import { NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TEST_MEMBERS } from 'test/test-data/test-members';

describe('LikesComponent', () => {
   let spectator: Spectator<LikesComponent>;

   const createComponent = createComponentFactory({
      component: LikesComponent,
      declarations: [
         MockComponent(MemberCardComponent),
         ButtonRadioDirective,
         NgModel,
      ],
      imports: [],
   });

   beforeEach(() => {
      spectator = createComponent();

   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should display members when members available', () => {
      spectator.setInput({ members: TEST_MEMBERS });
      spectator.detectChanges();

      const memberCardMocks = ngMocks.findAll<MemberCardComponent>(
         spectator.fixture,
         'app-member-card'
      );

      for (let index = 0; index < TEST_MEMBERS.length - 1; index++) {
         const memberCard = memberCardMocks[index].componentInstance;
         expect(memberCard.member).toBe(TEST_MEMBERS[index]);
      }
   });

   it('should display no members when no available', () => {
      spectator.setInput({ members: [] });
      spectator.detectChanges();

      const textElement = spectator.query(byText('There are no members'));
      expect(textElement).toBeTruthy();
   });

   it('should change predicate', () => {
      let predicateResult: LikedPredicateType;

      const predicateTexts = Array.from(
         spectator.component.predicateTexts.entries(),
         ([key, value]) => ({ key, value })
      );
      const buttonDebugElement = spectator.debugElement.queryAll(
         By.css('button')
      );

      const headerElement = spectator.query('h2');
      spectator
         .output('predicateChanged')
         .subscribe((result: LikedPredicateType) => (predicateResult = result));

      const likesButtonDebugElement = buttonDebugElement[0];
      const likesButtonElement = likesButtonDebugElement.nativeElement as HTMLButtonElement;

      const likesByButtonDebugElement = buttonDebugElement[1];
      const likesByButtonElement = likesByButtonDebugElement.nativeElement as HTMLButtonElement;

      likesByButtonElement.click();
      spectator.detectChanges();

      expect(headerElement.textContent).toBe(predicateTexts[1].value);
      expect(predicateResult).toBe(predicateTexts[1].key);

      likesButtonElement.click();
      spectator.detectChanges();

      expect(headerElement.textContent).toBe(predicateTexts[0].value);
      expect(predicateResult).toBe(predicateTexts[0].key);
   });
});
