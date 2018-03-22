import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  text = this.renderer.createText('😄');
  tooltip = this.renderer.createElement('div');
  hieght: number;
  tooltipElement: object;
  hostElement: object;
  tooltipWidth;

  @HostListener('mouseenter')
  onmouseenter() {
    
    this.hostElement = this.el.nativeElement.getBoundingClientRect();
    console.log(this.hostElement) 
    // 상 좌 우 만들기
    this.renderer.appendChild(this.tooltip, this.text);
    this.renderer.setAttribute(this.tooltip, 'class', 'Custom_tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    
    this.tooltipElement = this.el.nativeElement.children[0].getBoundingClientRect();
    this.tooltipWidth = this.tooltipElement.width;
    this.tooltipheigt = this.tooltipElement.height;
    console.log(this.tooltipElement)
    console.dir(this.renderer);

    if ( this.el.nativeElement.classList.contains('tooltip-bottom') ) {
      this.renderer.setStyle(this.tooltip, 'margin-left', `${(-this.tooltipWidth / 2).toString()}px`);
      this.renderer.setStyle(this.tooltip, 'left', '50%');
      this.renderer.setStyle(this.tooltip, 'bottom', `-${(this.tooltipheigt)+10}px`);
    } else if ( this.el.nativeElement.classList.contains('tooltip-top') ) {
      this.renderer.setStyle(this.tooltip, 'margin-left', `${(-this.tooltipWidth / 2).toString()}px`);
      this.renderer.setStyle(this.tooltip, 'left', '50%');
      this.renderer.setStyle(this.tooltip, 'top', `-${this.tooltipheigt+10}px`);
    } else if ( this.el.nativeElement.classList.contains('tooltip-left') ) {
      this.renderer.setStyle(this.tooltip, 'margin-top', `${(-this.tooltipheigt / 2).toString()}px`);
      this.renderer.setStyle(this.tooltip, 'top', '50%');
      this.renderer.setStyle(this.tooltip, 'left', `-${this.tooltipWidth+10}px`);
    } else if ( this.el.nativeElement.classList.contains('tooltip-right') ) {
      this.renderer.setStyle(this.tooltip, 'margin-top', `${(-this.tooltipheigt / 2).toString()}px`);
      this.renderer.setStyle(this.tooltip, 'top', '50%');
      this.renderer.setStyle(this.tooltip, 'right', `-${this.tooltipWidth+10}px`);
    } 
  }
  // @HostListener('mouseleave')
  // onmouseleave() {
  //   this.renderer.removeChild(this.el.nativeElement, this.tooltip);
  // }
}
