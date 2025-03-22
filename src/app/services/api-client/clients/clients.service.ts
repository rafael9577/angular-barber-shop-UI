import { Injectable } from '@angular/core';
import { IClientsService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientRequest, SaveClientReponse, UpdateClientRequest, UpdatelientReponse, ListClientReponse, DetailClientReponse } from './client.models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService implements IClientsService {

  private readonly basePath = enviroment.apiURL

  constructor(private http: HttpClient) { }

  save(request: SaveClientRequest): Observable<SaveClientReponse> {
    return this.http.post<SaveClientReponse>(`${this.basePath}clients`, request);
  }

  update(id: number, request: UpdateClientRequest): Observable<UpdatelientReponse> {
    return this.http.put<UpdatelientReponse>(`${this.basePath}clients/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}clients/${id}`);
  }

  list(): Observable<ListClientReponse[]> {
    return this.http.get<ListClientReponse[]>(`${this.basePath}clients/`);
  }

  findById(id: number): Observable<DetailClientReponse> {
    return this.http.get<DetailClientReponse>(`${this.basePath}clients/${id}`);
  }
}
