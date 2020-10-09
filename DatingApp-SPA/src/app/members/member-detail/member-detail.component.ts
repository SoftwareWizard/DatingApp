import { Member } from './../../models/member';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
   member: Member;

   constructor(private memberService: MemberService, private route: ActivatedRoute) {}

   async ngOnInit(): Promise<void> {
      this.member = await this.loadMember();
   }

   async loadMember(): Promise<Member> {
      const id = +this.route.snapshot.paramMap.get('id');
      return await this.memberService.getMember(id).toPromise();
   }
}
