import { ChangeDetectionStrategy, Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'promo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }

}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
