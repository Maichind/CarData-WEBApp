import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator,  MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'FrontendCars';
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private router: Router, public _MatPaginatorIntl: MatPaginatorIntl){}

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Resultados';
  }

  Listar(){
    Swal.fire({
      title:'Cargue masivo',
      text: 'Espera un momento mientras procesamos los datos, esto puede tardar unos minutos.',
      timer: 3000,
      imageUrl:'../assets/loading.gif',
      showConfirmButton: false,
      willClose: () => {
        this.router.navigate(['/listar']);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
