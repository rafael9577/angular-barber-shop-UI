import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientTableComponent } from "../components/client-table/client-table.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientModelTabel } from '../client.models';
import { Router } from '@angular/router';

@Component({
   selector: 'app-list-clients',
   imports: [ClientTableComponent],
   templateUrl: './list-clients.component.html',
   styleUrl: './list-clients.component.scss',
   providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
   ]
})
export class ListClientsComponent implements OnInit, OnDestroy {

   private httpSubscriptions: Subscription[] = []
   clients: ClientModelTabel[] = []

   constructor(
      @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService,
      @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
      private readonly router: Router
   ) { }
   ngOnInit(): void {
      this.httpSubscriptions.push(this.httpService.list().subscribe(data => { this.clients = data }))
   }
   ngOnDestroy(): void {
      this.httpSubscriptions.forEach(s => s.unsubscribe())
   }

   update(client: ClientModelTabel) {
      this.router.navigate(['clients/edit-client', client.id])
   }

   delete(client: ClientModelTabel) {
      this.httpSubscriptions.push(this.httpService.delete(client.id)
         .subscribe(_ => this.snackBarManager.show(`o Cliente ${client.name} foi excluido com sucesso`))
      )
   }
}
