import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface GitHubUser {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  search(q: string, page: number = 1, perPage: number = 10) {
    const query = [
      `q=${q.replace(/\s/, '+')}`,
      `page=${page}`,
      `perPage=${perPage}`
    ].join('&');

    return this.http.get<GitHubSearchResponse>(
      `http://localhost:3000/search?${query}`
    );
  }
}
