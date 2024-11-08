import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private showToastSubject = new BehaviorSubject<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: '',
  });

  readonly showToast$ = this.showToastSubject.asObservable(); // Tornar público apenas o Observable

  showError(message: string) {
    console.log('ToastService: Erro exibido', message);
    this.showToastSubject.next({ show: true, message });
    setTimeout(() => this.hideToast(), 4000); // Timeout reduzido para 4s conforme preferências
  }

  private hideToast() {
    this.showToastSubject.next({ show: false, message: '' });
  }
}
