import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private showToastSubject = new BehaviorSubject<{
    show: boolean;
    message: string;
  }>({ show: false, message: '' });

  // por baixo dos panos showToastSubject.asObservable(),
  get showToast$() {
    return this.showToastSubject.asObservable();
  }

  showError(message: string) {
    this.showToastSubject.next({ show: true, message });
    setTimeout(() => this.hideToast(), 6000);
  }

  hideToast() {
    this.showToastSubject.next({ show: false, message: '' });
  }
}
