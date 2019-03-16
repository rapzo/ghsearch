import { Component, OnInit, Injector } from '@angular/core';
import { UsersService, GitHubUser } from '../users.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],

})
export class SearchBarComponent implements OnInit {

  value = 'Clear me';

  users$: Observable<GitHubUser[]>;
  private search$ = new Subject<string>();

  constructor(private service: UsersService) {}

  ngOnInit() {
    this.users$ = this.search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((q: string): Observable<GitHubUser[]> => {
        return this.service.search(q);
      })
    );
  }
}
