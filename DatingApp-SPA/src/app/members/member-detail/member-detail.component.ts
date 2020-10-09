import { Member } from './../../models/member';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

const IMAGE_SIZE_IN_PIXEL = 500;

@Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
   member: Member;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];

   constructor(private memberService: MemberService, private route: ActivatedRoute) {}

   async ngOnInit(): Promise<void> {
      this.member = await this.loadMember();

      this.galleryOptions = [
         {
            width: `${IMAGE_SIZE_IN_PIXEL}px`,
            height: `${IMAGE_SIZE_IN_PIXEL}px`,
            imagePercent: 100,
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            preview: false,
         },
      ];

      this.galleryImages = this.member.photos.map(
         item =>
            new NgxGalleryImage({
               small: item?.url,
               medium: item?.url,
               big: item?.url,
            })
      );
   }

   async loadMember(): Promise<Member> {
      const id = +this.route.snapshot.paramMap.get('id');
      return await this.memberService.getMember(id).toPromise();
   }
}
