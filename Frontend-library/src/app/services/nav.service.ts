import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {
  private _open$ = new BehaviorSubject<boolean>(false);
  readonly open$ = this._open$.asObservable();

  toggle() {
    this._open$.next(!this._open$.value);
  }

  open() { this._open$.next(true); }
  close() { this._open$.next(false); }

  isMobile(): boolean {
    try { return typeof window !== 'undefined' && window.innerWidth < 768; } catch { return false; }
  }
}
