import { Component } from '@angular/core';
import { UsersService, GitHubSearchResponse } from './users.service';
import { Subject, merge, ReplaySubject, BehaviorSubject } from 'rxjs';
import { switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export enum PageDirection {
  next,
  previous,
}
export interface Page {
  cursor?: string;
  direction?: PageDirection;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'write something...';

  private search: string;

  private pagination: Page;

  response$ = new Subject<GitHubSearchResponse>();
  search$ = new Subject<string>();
  pagination$ = new Subject<Page>();

  constructor(private service: UsersService) {
    merge(
      this.search$.pipe(
        tap((q: string) => this.search = q)
      ),
      this.pagination$.pipe(
        tap((page: Page) => this.pagination = page)
      ),
    ).pipe(
      distinctUntilChanged(),
      switchMap(() => this.service.search(this.search, this.pagination))
    ).subscribe((response: GitHubSearchResponse) => {
      this.response$.next(response);
    });

    if (!environment.production) {
      this.search$.next('xxx');
    }
  }
}
