import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Injectable } from "@angular/core";

@Injectable()
export class RouterMock {
  navigate = jasmine.createSpy();
}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: AngularFireAuth,
          useValue: {
            authState: of(true),
          },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false for child routes if the user is not logged in', () => {
    const expected = cold('(a|)', { a: false });
    const response = cold('(b|)', { b: false });
    guard['checkAuthed'] = jasmine.createSpy().and.returnValue(response);
    expect(guard.canActivateChild()).toBeObservable(expected);
  });

  it('should return true for child routes if the user is logged in', () => {
    const expected = cold('(a|)', { a: true });
    const response = cold('(b|)', { b: true });
    guard['checkAuthed'] = jasmine.createSpy().and.returnValue(response);
    expect(guard.canActivateChild()).toBeObservable(expected);
  });

  it('should return true if the user is logged in', () => {
    const expected = cold('a|', { a: true });
    const response = cold('b|', { b: true });
    guard['checkAuthed'] = jasmine.createSpy().and.returnValue(response);
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return false if the user is not logged in', () => {
    const expected = cold('a|', { a: false });
    const response = cold('b|', { b: false });
    guard['checkAuthed'] = jasmine.createSpy().and.returnValue(response);
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
