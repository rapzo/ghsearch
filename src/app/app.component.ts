import { Component } from '@angular/core';
import { UsersService, GitHubSearchResponse } from './users.service';
import { Subject, merge, ReplaySubject } from 'rxjs';
import { switchMap, map, tap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github user search';

  private search: string;
  private page: number = 1;
  private perPage: number = 10;

  response$ = new Subject<GitHubSearchResponse>();
  search$ = new Subject<string>();
  page$ = new ReplaySubject<number>(this.page);
  perPage$ = new ReplaySubject<number>(this.perPage);

  constructor(private service: UsersService) {
    merge(
      this.search$.pipe(
        distinctUntilChanged(),
        tap((q: string) => this.search = q)
      ),
      this.page$.pipe(
        distinctUntilChanged(),
        tap((page: number) => this.page = page)
      ),
      this.perPage$.pipe(
        distinctUntilChanged(),
        tap((perPage: number) => this.perPage = perPage)
      )
    ).pipe(
      switchMap(
        () => this.service.search(this.search, this.page, this.perPage)
      )
    ).subscribe((response: GitHubSearchResponse) => {
      this.response$.next(response);
    });
  }
}
