import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_DATA } from "@shared";
import { UnauthorizedGuard } from "@core";

const routes: Routes = [
  {
    path: ROUTES_DATA.AUTH.url,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('@modules/auth').then((m) => m.AuthModule),
  },
  {
    path: ROUTES_DATA.PRIVATE.url,
    loadChildren: () => import('@modules/private').then((m) => m.PrivateModule),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
