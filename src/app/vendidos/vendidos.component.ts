import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendidos',
  templateUrl: './vendidos.component.html',
  styleUrls: ['./vendidos.component.scss']
})
export class VendidosComponent implements OnInit {

  displayedColumns: string[] = ['-', 'ID', 'Placa', 'Marca', 'Modelo', 'Kilometraje', 'Transmisión', 'Tipo', 'Precio', 'Proviniencia', '    '];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public _MatPaginatorIntl: MatPaginatorIntl){}

  ngOnInit(): void {
    this.getCarsVendidos()
    this._MatPaginatorIntl.itemsPerPageLabel = 'Resultados';
  }

  getCarsVendidos(): void {
    this.api.getVendido().subscribe({
      next:(res)=>{
        //console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("error");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
