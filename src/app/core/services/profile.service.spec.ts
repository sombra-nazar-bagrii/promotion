import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { IUser } from "@shared";

describe('ProfileService', () => {
  let service: ProfileService;
  let angularFireAuthSpy: jasmine.SpyObj<AngularFireAuth>;
  let angularFirestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['authState'],{
      authState: of({ uid: 'user123' }),
    });

    angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['doc']);
    const docSpy = jasmine.createSpyObj<DocumentSnapshot<IUser>>('DocumentSnapshot', ['get']);
    angularFirestoreSpy.doc.and.returnValue(docSpy);

    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: AngularFireAuth, useValue: angularFireAuthSpy },
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
      ],
    });

    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke user profile and set current user', () => {
    const user: IUser = { uid: 'user123', userName: 'John Doe', age: '12', photoURL: 'some', email: 'email@test.com', emailVerified: true };
    const docSpy = angularFirestoreSpy.doc as jasmine.Spy;
    docSpy.and.returnValue({
      get: () => of({ data: () => user }),
    });

    service.invokeUserProfile().subscribe((currentUser) => {
      expect(currentUser).toEqual(user);
      service.getCurrentUser().subscribe(u => expect(u).toEqual(user))
    });

    expect(docSpy).toHaveBeenCalledWith('users/user123');
  });

  it('should clear user profile when invoke fails', () => {
    const docSpy = angularFirestoreSpy.doc as jasmine.Spy;
    docSpy.and.returnValue({
      get: () => { throw new Error('Error'); },
    });

    service.invokeUserProfile().subscribe((currentUser) => {
      expect(currentUser).toBeNull();
      service.getCurrentUser().subscribe(user => expect(user).toBeNull())
    });

    expect(docSpy).toHaveBeenCalledWith('users/user123');
  });

  it('should clear user profile', () => {
    service.clearUserProfile();
    service.getCurrentUser().subscribe(user => expect(user).toBeNull())
  });

});
