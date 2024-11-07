import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [],
  templateUrl: './toast-error.component.html',
  styleUrl: './toast-error.component.css',
})
export class ToastErrorComponent implements OnChanges {
  @Input() show: boolean = false;
  @Input() message: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && this.show) {
      this.show === true;
      console.log(this.show);
      setTimeout(() => (this.show = false), 10000); // Esconde após 10s
    }
  }
}
