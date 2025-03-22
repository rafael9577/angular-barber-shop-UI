import { Observable } from "rxjs";
import { SaveScheduleResponse, SaveScheduleRequest, ScheduleAppointmentMontResponde } from "./schedule.models"

export interface IScheduleService {

   save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>

   delet(id: number): Observable<void>

   listInMonth(wear: number, month: number): Observable<ScheduleAppointmentMontResponde>

}
