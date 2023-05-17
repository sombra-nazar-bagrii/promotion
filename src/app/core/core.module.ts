import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ProfileService, InitService, ErrorHandlerService } from './services';
import { firstValueFrom } from 'rxjs';

export function startupServiceFactory(startupService: InitService): () => void {
  return () => firstValueFrom(startupService.invokeCurrentUser());
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      multi: true,
      deps: [InitService, ProfileService, AuthService],
    },
    {
      provide: ErrorHandler,
      useExisting: ErrorHandlerService,
    },
  ],
})
export class CoreModule {}
