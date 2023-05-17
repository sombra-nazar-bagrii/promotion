import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { IUser } from "@shared";
import { Observable } from "rxjs";
import { UserService } from "@modules/private/profile/user.service";

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.author$ = this.userService.getUserById(this.authorId);
  }

}
