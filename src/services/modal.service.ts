import { Injectable, signal } from '@angular/core';

export type ModalType = 'login' | 'signup';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalState = signal<ModalType | null>(null);

  open(modalType: ModalType) {
    this.modalState.set(modalType);
  }

  close() {
    this.modalState.set(null);
  }
}
