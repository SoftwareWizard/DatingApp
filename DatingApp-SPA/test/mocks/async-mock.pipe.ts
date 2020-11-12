import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'async'
})
export class AsyncPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
