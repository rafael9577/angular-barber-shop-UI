import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IScheduleService } from '../../services/api-client/schedules/ischedules.service';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { scheduleService } from '../../services/api-client/schedules/schedules.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointmentMonthModel, SelectClientModel } from '../schedule.models';
import { SaveScheduleRequest } from '../../services/api-client/schedules/schedule.models';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-schedules-month',
   imports: [ScheduleCalendarComponent],
   templateUrl: './schedules-month.component.html',
   styleUrl: './schedules-month.component.scss',
   providers: [
      { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: scheduleService },
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
   ]
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {
   private subscriptions: Subscription[] = []
   private selectedDate?: Date

   monthSchedule!: ScheduleAppointmentMonthModel
   clients: SelectClientModel[] = []

   constructor(
      @Inject(SERVICES_TOKEN.HTTP.SCHEDULE) private readonly httpService: IScheduleService,
      @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly clienthttpService: IClientsService,
      @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackbarManage: ISnackbarManagerService
   ) { }

   ngOnInit(): void {
      this.fetchSchedules(new Date());
      this.subscriptions.push(this.clienthttpService.list().subscribe(data => this.clients = data))
   }

   ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe())
   }

   onScheduleClient(schedule: SaveScheduleModel) {
      if (schedule.startAt && schedule.endAt && schedule.clientId) {
         const request: SaveScheduleRequest = { startAt: schedule.startAt, endAt: schedule.endAt, clientId: schedule.clientId }
         this.subscriptions.push(this.httpService.save(request)
            .subscribe(() => this.snackbarManage.show('Agendamento realizado com sucesso')
         ))
         if (this.selectedDate) {
            this.fetchSchedules(this.selectedDate)
         }
      }
   }

   onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
      this.subscriptions.push(this.httpService.delet(schedule.id).subscribe())
   }

   onDateChange(date: Date) {
      this.selectedDate = date
      this.fetchSchedules(date)
   }

   private fetchSchedules(currentDate: Date) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      this.subscriptions.push(this.httpService.listInMonth(year, month).subscribe(data => this.monthSchedule = data));
   }

}
