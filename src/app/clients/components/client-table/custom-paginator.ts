import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable({
   providedIn: 'root'
})

export class CustomPaginator extends MatPaginatorIntl{
   override itemsPerPageLabel = 'Itens por página';
   override nextPageLabel = 'Proxima página';
   override previousPageLabel = 'página anterior';
   override firstPageLabel = 'primeira página';
   override lastPageLabel = 'Última página';
}
