import { AuthFacade } from './../../../auth/store/auth.facade';
import { Member } from '../../models/member';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MemberService } from '../../services/member.service';
import { User } from 'src/app/modules/auth';

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
   user: User;

   constructor(private authFacade: AuthFacade, private memberService: MemberService) {}

   async ngOnInit(): Promise<void> {
      this.user = await this.authFacade.select.user.pipe(take(1)).toPromise();
      this.initalizeUploader();
   }

   initalizeUploader(): void {
      this.uploader = new FileUploader({
         url: `${this.baseUrl}/users/add-photo`,
         authToken: `Bearer ${this.user.token}`,
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
      await this.memberService.setMainPhoto(id).pipe(take(1)).toPromise();
      this.member.photos.forEach(item => (item.isMain = false));
      const photo = this.member.photos.find(item => item.id === id);
      photo.isMain = true;
      this.authFacade.changePhoto.dispatch(photo.url);
   }

   public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
   }

   public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
   }
}
