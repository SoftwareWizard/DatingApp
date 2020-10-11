import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      NgxGalleryModule,
      NgxSpinnerModule,
      FileUploadModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   exports: [
      BsDropdownModule,
      TabsModule,
      NgxGalleryModule,
      NgxSpinnerModule,
      FileUploadModule,
      ToastrModule,
      FormsModule,
      ReactiveFormsModule,
   ],
})
export class SharedModule {}
