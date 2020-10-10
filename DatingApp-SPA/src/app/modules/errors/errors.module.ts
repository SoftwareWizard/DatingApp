import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';

@NgModule({
   declarations: [NotFoundComponent, ServerErrorComponent, TestErrorsComponent],
   imports: [CommonModule],
   exports: [NotFoundComponent, ServerErrorComponent, TestErrorsComponent],
})
export class ErrorsModule {}
