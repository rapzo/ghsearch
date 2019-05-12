import { Component, OnInit, Input } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { GitHubSearchResponse, User, Pagination, PageInfo } from '../users.service';
import { PageDirection, Page } from '../app.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() response: Subject<GitHubSearchResponse>;

  @Input() pagination: ReplaySubject<Page>;

  users: User[];

  pageInfo: PageInfo;

  totalItems: number;

  perPage = 10;

  ngOnInit() {
    this.response.subscribe((response: GitHubSearchResponse) => {
      this.totalItems = response.userCount;
      this.users = response.items;
      this.pageInfo = response.pageInfo;
    });

    // this.pagination.subscribe((page: Page) => {
      
    // });
  }

  handleNextPage() {
    this.pagination.next({
      cursor: this.pageInfo.endCursor,
      direction: PageDirection.next,
    });
  }

  handlePreviousPage() {
    this.pagination.next({
      cursor: this.pageInfo.endCursor,
      direction: PageDirection.previous,
    });
  }
}
