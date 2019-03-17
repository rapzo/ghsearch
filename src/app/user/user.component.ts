import { Component, Input } from '@angular/core';
import { GitHubUser } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input() user: GitHubUser;
}
