import { Component, Input } from '@angular/core';
import { UsersService, GitHubSearchResponse, Pagination } from './users.service';
import { Subject, merge, ReplaySubject } from 'rxjs';
import { switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'write something...';

  private search: string;

  private pagination: Pagination = {
    page: 1,
    perPage: 10,
  };

  response$ = new Subject<GitHubSearchResponse>();
  search$ = new Subject<string>();
  pagination$ = new ReplaySubject<Pagination>();

  constructor(private service: UsersService) {
    merge(
      this.search$.pipe(
        distinctUntilChanged(),
        tap((q: string) => this.search = q)
      ),
      this.pagination$.pipe(
        distinctUntilChanged(),
        tap((pagination: Pagination) => this.pagination = pagination)
      ),
    ).pipe(
      switchMap(() => this.service.search(this.search, this.pagination))
    ).subscribe((response: GitHubSearchResponse) => {
      this.response$.next(response);
    });

    if (!environment.production) {
      this.search$.next('xxx');
    }
  }
}
