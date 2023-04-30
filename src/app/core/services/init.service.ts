import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ProfileService } from '@core';
import { IUser } from "@shared";

@Injectable({ providedIn: 'root' })
export class InitService {
  constructor(private profileService: ProfileService) {
  }

  invokeCurrentUser(): Observable<IUser | null> {
    return this.profileService.invokeUserProfile();
  }
}
