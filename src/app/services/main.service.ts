import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  emitShowLoading = new EventEmitter<boolean>();

  constructor() { }

  showLoading() {
    this.emitShowLoading.emit(true);
  }

  hideLoading() {
    this.emitShowLoading.emit(false);
  }
}
