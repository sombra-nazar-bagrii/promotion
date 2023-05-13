import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_DATA } from "@shared";
import { PrivateLayoutComponent } from "./layout";

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES_DATA.PRIVATE.children.DASHBOARD.url,
        pathMatch: 'full',
      },
      {
        path: ROUTES_DATA.PRIVATE.children.DASHBOARD.url,
        loadChildren: () => import('./dashboard').then((m) => m.DashboardModule),
      },
      {
        path: ROUTES_DATA.PRIVATE.children.PROFILE.url,
        loadChildren: () => import('./profile').then((m) => m.ProfileModule),
      },
      {
        path: ROUTES_DATA.PRIVATE.children.ARTICLE.url,
        loadChildren: () => import('./article').then((m) => m.ArticleModule),
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
