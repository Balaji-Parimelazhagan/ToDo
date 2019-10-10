import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTaskHover]'
})
export class TaskHoverDirective {

  constructor(private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.background = 'rgba(233,233,233,0.5)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.background = 'none';
  }

}
