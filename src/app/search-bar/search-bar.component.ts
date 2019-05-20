import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  @Input() ngClass = 'container';

  @Input() search: Subject<string>;

  @Input() placeholder = "search...";
  
  theme = "light";

  size = "xl";

  disabled = false;

  private search$ = new Subject<string>();

  value: string;

  onKey(event) {
    this.search$.next(event.key);
  }

  ngOnInit() {
    this.search$.pipe(
      map((q: string) => q.trim()),
      filter((q: string) => Boolean(q)),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.search.next(this.value);
    });
  }
}
