import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleManageComponent, ArticleComponent } from "./pages";

const routes: Routes = [
  {
    path: 'manage/:id',
    component: ArticleManageComponent,
  },
  {
    path: ':id',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
