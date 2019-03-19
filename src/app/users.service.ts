import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../environments/environment';

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

export interface Pagination {
  page: number;
  perPage: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  search(q: string, pagination: Pagination) {
    const {page, perPage} = pagination;
    const query = [
      `q=${q.replace(/\s/, '+')}`,
      `page=${page}`,
      `perPage=${perPage}`
    ].join('&');

    return this.http.get<GitHubSearchResponse>(`${API}?${query}`);
  }
}
