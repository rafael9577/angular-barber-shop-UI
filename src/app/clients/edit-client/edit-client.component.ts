import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientsService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from "../components/client-form/client-form.component";
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientModelForm } from '../client.models';

@Component({
   selector: 'app-edit-client',
   imports: [ClientFormComponent],
   templateUrl: './edit-client.component.html',
   styleUrl: './edit-client.component.scss',
   providers: [
      { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
      { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
   ]
})
export class EditClientComponent implements OnInit, OnDestroy {

   private httpsubscriptions?: Subscription[] = []
   client: ClientModelForm = { id: 0, name: '', email: '', phone: '' }


   constructor(
      @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientsService,
      @Inject(SERVICES_TOKEN.SNACKBAR) private readonly scnackBarManager: ISnackbarManagerService,
      private readonly activateRouter: ActivatedRoute,
      private readonly router: Router
   ) { }

   ngOnInit(): void {
      const id = this.activateRouter.snapshot.paramMap.get('id')
      if (!id) {
         this.scnackBarManager.show('Error ao recuperar informações do cliente')
         this.router.navigate(['clients/list'])
         return
      }
      this.httpsubscriptions?.push(this.httpService.findById(Number(id)).subscribe(data => this.client = data))
   }

   ngOnDestroy(): void {
      this.httpsubscriptions?.forEach(s => s.unsubscribe())
   }

   onSubmitedCLient(value: ClientModelForm) {
      const {id, ... Request} = value
      if (id) {
         this.httpsubscriptions?.push(this.httpService.update(id, Request).subscribe(_ =>{
            this.scnackBarManager.show("Usuário atualizado com sucesso")
            this.router.navigate(['clients/list'])
         }))
         return
      }
      this.scnackBarManager.show("Um erro inesperado ocorreu")
      this.router.navigate(['clients/list'])
   }

}
