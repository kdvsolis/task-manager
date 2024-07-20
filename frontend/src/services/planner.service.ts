import { Injectable } from '@angular/core';
import { ApiService } from '../utils/api.service'; // Ensure the path is correct

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  private baseUrl = '/api/planner'; // Base URL for the API

  constructor(private apiService: ApiService) {}

  async create(body: any) {
    return this.apiService.post(this.baseUrl, {}, {}, '', body);
  }

  async get(id: number) {
    return this.apiService.get(`${this.baseUrl}/${id}`, {}, {}, '');
  }

  async getAll(page: number = 0, size: number = 10) {
    return this.apiService.get(`${this.baseUrl}?page=${page}&size=${size}`, {}, {}, '');
  }

  async update(id: number, body: any) {
    return this.apiService.put(`${this.baseUrl}/${id}`, {}, {}, '', body);
  }

  async delete(id: number) {
    return this.apiService.delete(`${this.baseUrl}/${id}`, {}, {}, '', {});
  }

  // New method for searching by title
  async search(name: string, page: number = 0, size: number = 10) {
    return this.apiService.get(`${this.baseUrl}/search?name=${name}&page=${page}&size=${size}`, {}, {}, '');
  }
}
