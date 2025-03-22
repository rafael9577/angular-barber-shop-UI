import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ClientModelTabel } from '../../client.models';
import { MatTableDataSource, MatTableModule, MatRow } from '@angular/material/table'
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatIcon } from '@angular/material/icon'
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { CustomPaginator } from './custom-paginator';

@Component({
   selector: 'app-client-table',
   imports: [MatTableModule, MatRow, MatPaginator, MatIcon],
   templateUrl: './client-table.component.html',
   styleUrl: './client-table.component.scss',
   providers: [
      { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
      { provide: MatPaginatorIntl, useClass: CustomPaginator }

   ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

   @Input() clients: ClientModelTabel[] = []

   dataSource!: MatTableDataSource<ClientModelTabel>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;

   displayedColumns: string[] = ['name', 'email', 'phone', 'actions']

   private dialogManagerServiceSbuscriptions?: Subscription

   @Output() onConfirmeDelete = new EventEmitter<ClientModelTabel>()

   @Output() onRequestUpdate = new EventEmitter<ClientModelTabel>()

   constructor(
      @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManageService: IDialogManagerService
   ) { }

   ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['clients'] && this.clients) {
         this.dataSource = new MatTableDataSource<ClientModelTabel>(this.clients)
         if (this.paginator) {
            this.dataSource.paginator = this.paginator
         }
      }
   }

   ngOnDestroy(): void {
      if (this.dialogManagerServiceSbuscriptions) {
         this.dialogManagerServiceSbuscriptions.unsubscribe()
      }
   }

   formatPhton(phone: string) {
      return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)}`
   }

   update(client: ClientModelTabel) {
      this.onRequestUpdate.emit(client)
   }

   delete(client: ClientModelTabel) {
      this.dialogManageService.showYesNoDialog(
         YesNoDialogComponent,
         { title: "Exclusão de cçiente", content: `Confirma a exclusão do cliente ${client.name}` }
      )
         .subscribe(result => {
            if (result) {
               this.onConfirmeDelete.emit(client)
               const updateList = this.dataSource.data.filter(c => c.id !== client.id)
               this.dataSource = new MatTableDataSource<ClientModelTabel>(updateList)
            }
         })
   }
}
