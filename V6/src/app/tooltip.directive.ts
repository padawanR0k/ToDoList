import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tooltipText]'
})
export class TooltipDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() tooltipText: string;
  @Input() positionOption : string;
  tooltip = this.renderer.createElement('div');
  hostWidth: number;
  hostHeight: number;
  tootipEl: object;
  hostEl: object;
  tooltipWidth: number;
  text: string

  left: number;
  top: number;

  @HostListener('mouseenter')
  onmouseenter() {
    this.text = this.renderer.createText(this.tooltipText);

    this.renderer.addClass(this.el.nativeElement,this.positionOption );
    this.hostEl = this.el.nativeElement.getBoundingClientRect();
    this.hostWidth = this.hostEl.width;
    this.hostHeight = this.hostEl.height;

    this.renderer.appendChild(this.tooltip, this.text);
    this.renderer.setAttribute(this.tooltip, 'class', 'Custom_tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    
    this.tootipEl = this.el.nativeElement.children[0].getBoundingClientRect();
    this.tooltipWidth = this.tootipEl.width;
    this.tooltipHeight = this.tootipEl.height;

    if ( this.positionOption  === 'tooltip-bottom' ) {
      this.left = (this.hostWidth - this.tooltipWidth)/2;
      this.top = this.hostHeight; 
    } else if ( this.positionOption  === 'tooltip-top' ) {
      this.left = (this.hostWidth - this.tooltipWidth)/2;
      this.top = -this.tooltipHeight; 
    } else if ( this.positionOption  === 'tooltip-left' ) {
      this.left = -this.tooltipWidth;
      this.top = (this.hostHeight - this.tooltipHeight)/2; 
    } else if ( this.positionOption  === 'tooltip-right' ) {
      this.left = this.hostWidth;
      this.top = (this.hostHeight - this.tooltipHeight)/2; 
    } 

    this.renderer.setStyle(this.tooltip, 'left', `${this.left}px`);
    this.renderer.setStyle(this.tooltip, 'top', `${this.top}px`);
    console.dir(this.renderer)
    console.dir(this.el.nativeElement.getBoundingClientRect())
  }
  @HostListener('mouseleave')
  onmouseleave() {
    this.el.nativeElement.children[0].classList += ' fadeOut';
    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);      
    }, 300);
    this.tooltipText = '';
  }
}
