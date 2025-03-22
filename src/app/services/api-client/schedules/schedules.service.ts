import { Injectable } from "@angular/core";
import { IScheduleService } from "./ischedules.service";
import { Observable } from "rxjs";
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMontResponde } from "./schedule.models";
import { enviroment } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";


@Injectable({
   providedIn: 'root'
})
export class scheduleService implements IScheduleService {

   private readonly basePath = enviroment.apiURL

   constructor(
      private http: HttpClient
   ) {}
   save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
      return this.http.post<SaveScheduleResponse>(`${this.basePath}`, request)
   }
   delet(id: number): Observable<void> {
      return this.http.delete<void>(`${this.basePath}schedules/${id}`)
   }
   listInMonth(year: number, month: number): Observable<ScheduleAppointmentMontResponde> {
      return this.http.get<ScheduleAppointmentMontResponde>(`${this.basePath}schedules/${year}/${month}`)
   }
}
