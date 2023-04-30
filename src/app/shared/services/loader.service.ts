import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loader$ = new BehaviorSubject<boolean>(false);

  get getLoader$(): Observable<boolean> {
    return this._loader$.asObservable();
  }

  setLoaderStatus(status: boolean) {
    this._loader$.next(status);
  }
}
