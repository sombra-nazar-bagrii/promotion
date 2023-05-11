import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IUser } from "@shared";
import { ProfileService } from "@core";
import { Observable } from "rxjs";

@Component({
  selector: 'promo-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorInfoComponent implements OnInit {

  @Input() authorId: string;
  author$: Observable<IUser>;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.author$ = this.profileService.getUserById(this.authorId);
  }

}
