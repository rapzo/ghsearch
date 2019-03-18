import { Component, OnInit, Input } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { GitHubSearchResponse, GitHubUser } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() response: Subject<GitHubSearchResponse>;

  @Input() page: ReplaySubject<number>;

  @Input() perPage: ReplaySubject<number>;

  private users: GitHubUser[];

  private userCount = 0;

  private perPageOptions = [5, 10, 25, 100]

  constructor() {}

  ngOnInit() {
    this.response.subscribe((response: GitHubSearchResponse) => {
      this.userCount = response.total_count;
      this.users = response.items;
    });
  }

  handlePage(page: Event) {
    // this.page.next(page.pageIndex);
    // this.perPage.next(page.pageSize);
  }
}
