import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAdaptHeight]'
})


export class AdaptHeightDirective implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('appAdaptHeight') appAdaptHeight: number;

    constructor(private el: ElementRef) {

    }

    async ngOnInit() {
        const view = this.viewport();
        this.el.nativeElement.style.height = `${(view.height - this.appAdaptHeight)}px`;
        this.el.nativeElement.style.overflow = 'auto';
    }


    viewport() {
        let e: any = window
            , a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    }

}