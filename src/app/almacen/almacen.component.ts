import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {

  displayedColumns: string[] = ['-', 'ID', 'Placa', 'Marca', 'Modelo', 'Kilometraje', 'Transmisión', 'Tipo', 'Precio', 'Proviniencia', '    '];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public _MatPaginatorIntl: MatPaginatorIntl){}

  ngOnInit(): void {
    this.getCarsAlm()
    this._MatPaginatorIntl.itemsPerPageLabel = 'Resultados';
  }

  getCarsAlm(): void {
    this.api.getAlm().subscribe({
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

  ventas(row : any){
    // console.log(row);
    this.api.postVentas(row).subscribe({
      next:(res)=>{
        Swal.fire({
          title:'Car added to sales successfully'
        })
      },
      error:()=>{
        Swal.fire({
          title:'¡Error!'
        });
      }
    })
  }

}
