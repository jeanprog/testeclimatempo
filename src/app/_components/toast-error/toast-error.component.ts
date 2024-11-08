import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [],
  templateUrl: './toast-error.component.html',
})
export class ToastErrorComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
}
