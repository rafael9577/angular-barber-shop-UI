import { Observable } from "rxjs";
import { DetailClientReponse, ListClientReponse, SaveClientReponse, SaveClientRequest, UpdateClientRequest, UpdatelientReponse } from "./client.models";

export interface IClientsService {
  save(request: SaveClientRequest): Observable<SaveClientReponse>

  update(id: number,request: UpdateClientRequest): Observable<UpdatelientReponse>

  delete(id: number): Observable<void>

  list(): Observable<ListClientReponse[]>

  findById(id: number): Observable<DetailClientReponse>

}
