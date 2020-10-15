import { Member } from '../../models/member';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// FIXME: import { AccountService, User } from 'src/app/core';
import { MemberService } from '../../services/member.service';

@Component({
   selector: 'app-photo-editor',
   templateUrl: './photo-editor.component.html',
   styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
   @Input() member: Member;

   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   hasAnotherDropZoneOver = false;
   baseUrl = environment.apiUrl;
   response: string;
  //  FIXME: user: User;

   constructor(
    // FIXME: private accountService: AccountService,
      private memberService: MemberService) {
    // FIXME: this.accountService.currentUser$.pipe(take(1)).subscribe(user => (this.user = user));
   }

   ngOnInit(): void {
      this.initalizeUploader();
   }

   initalizeUploader(): void {
      this.uploader = new FileUploader({
         url: `${this.baseUrl}/users/add-photo`,
        //  FIXME: authToken: `Bearer ${this.user.token}`,
         isHTML5: true,
         allowedFileType: ['image'],
         removeAfterUpload: true,
         autoUpload: false,
         maxFileSize: 10 * 1024 * 1024,
      });

      this.uploader.onAfterAddingFile = file => {
         file.withCredentials = false;
      };

      this.uploader.onSuccessItem = (item, response, status, headers) => {
         if (response) {
            const photo = JSON.parse(response);
            this.member.photos.push(photo);
         }
      };
   }

   async onDeletePhoto(id: number): Promise<void> {
      await this.memberService.deletePhoto(id).toPromise();
   }

   async onSetMain(id: number): Promise<void> {
      await this.memberService.setMainPhoto(id).toPromise();
   }

   public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
   }

   public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
   }
}
