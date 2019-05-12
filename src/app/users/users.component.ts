import { Component, OnInit, Input } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { GitHubSearchResponse, User, Pagination, PageInfo } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() response: Subject<GitHubSearchResponse>;

  @Input() pagination: ReplaySubject<Pagination>;

  users: User[];

  config: PageInfo;

  totalItems: number;

  perPage: 10;

  ngOnInit() {
    this.response.subscribe((response: GitHubSearchResponse) => {
      this.totalItems = response.userCount;
      this.users = response.items;
    });

    this.pagination.subscribe((pagination: Pagination) => {
      
    });
  }

  handlePageChange(page: number) {
    this.pagination.next({
      page,
    });
  }
}
