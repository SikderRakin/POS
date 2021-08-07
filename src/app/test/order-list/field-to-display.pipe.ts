import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldToDisplay',
})
export class FieldToDisplayPipe implements PipeTransform {
  public transform(value: string): string {
    if (value.includes('_')) return value.replace('_', ' ');
    else {
      let display = value.charAt(0).toUpperCase();
      for (let i = 1; i < value.length; i++) {
        let char = value.charAt(i);
        if (this.isUpperCase(char)) {
          char = ' ' + char;
        }
        display += char;
      }

      return display;
    }
  }

  private isUpperCase(char: string) {
    return char === char.toUpperCase();
  }
}
