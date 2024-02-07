import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private isScrollSubject!: BehaviorSubject<boolean>;
  public isScroll$!: Observable<boolean>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {
    this.isScrollSubject = new BehaviorSubject<boolean>(false);
    this.isScroll$ = this.isScrollSubject
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$));
  }

  setIsScroll(value: boolean): void {
    this.isScrollSubject.next(value);
  }

  destroyAll() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
