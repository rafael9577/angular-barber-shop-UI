import { InjectionToken } from "@angular/core";
import { IClientsService } from "./api-client/clients/iclients.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";
import { IScheduleService } from "./api-client/schedules/ischedules.service";

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT : new InjectionToken<IClientsService>('SERVICES_TOKEN.HTTP.CLIENT'),
    SCHEDULE : new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.CLIENT')
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),
  DIALOG: new InjectionToken<IDialogManagerService>('SERVICE_TOKEN.YES_NO_DIALOG')

}
