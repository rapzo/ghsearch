import { Component, OnInit, Input } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { GitHubSearchResponse, GitHubUser, Pagination } from '../users.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() response: Subject<GitHubSearchResponse>;

  @Input() pagination: ReplaySubject<Pagination>;

  users: GitHubUser[];

  public config: PaginationInstance = {
    id: 'search-results',
    itemsPerPage: 10,
    currentPage: 1,
  };

  ngOnInit() {
    this.response.subscribe((response: GitHubSearchResponse) => {
      this.config.totalItems = response.total_count;
      this.users = response.items;
    });

    this.pagination.subscribe((pagination: Pagination) => {
      this.config.currentPage = pagination.page;
      this.config.itemsPerPage = pagination.perPage;
    });
  }

  handlePageChange(page: number) {
    this.pagination.next({
      page,
      perPage: this.config.itemsPerPage,
    });
  }
}
