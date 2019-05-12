import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../environments/environment';
import { Page } from './app.component';

export interface User {
  name: string;
  login: string;
  email: string;
  company: string;
  url: string;
  avatarUrl: string;
  websiteUrl: string;
  followers: number;
  following: number;
  repositories: number;
  starredRepositories: number;
  repositoriesContributedTo: number;
}

export interface GitHubSearchResponse {
  pageInfo: PageInfo;
  userCount: number;
  items: User[];
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Pagination {
  page: number;
  perPage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  search(q: string, page?: Page) {
    const query = [
      `q=${q.replace(/\s/, '+')}`,
      `perPage=${10}`,
    ]
    
    if (page) {
      query.push(`page=${page.cursor}`);
    }

    return this.http.get<GitHubSearchResponse>(`${API}?${query.join('&')}`);
  }
}
