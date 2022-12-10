import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { ComunicationService } from '../services/comunication.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['-', 'ID', 'Placa', 'Marca', 'Modelo', 'Kilometraje', 'Transmisión', 'Tipo', 'Precio', 'Proviniencia', '    '];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public _MatPaginatorIntl: MatPaginatorIntl, public dialog: MatDialog,
              private comunication : ComunicationService){}

  ngOnInit(): void {
    this.comunication.puente.subscribe(data => {
      //console.log(data);
      if(data){
        this.getCars();
      }
    })
    this.getCars()
    this._MatPaginatorIntl.itemsPerPageLabel = 'Resultados';
  }

  getCars(): void {
    this.api.getCar().subscribe({
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

  editCar(row : any){
    this.dialog.open(DialogComponent,{
      data:row
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delCar(row: any){
    Swal.fire({ 
      title: 'Delete Car', 
      text: "Are you sure to delete the car?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Yes, delete'
      }).then((result) => { 
        if (result.isConfirmed) { 
          this.api.deleteCar(row._id.$oid).subscribe({
            next:(res)=>{
              Swal.fire(
                'Car Deleted Successfully'
              )
              this.ngOnInit(); 
            },
            error:()=>{
              Swal.fire({
                title:'¡Error!'
              });
            },
          })
        }
      })
  }

  almacenar(row : any){
    // console.log(row);
    this.api.postAlm(row).subscribe({
      next:(res)=>{
        Swal.fire({
          title:'Car added to warehouse Successfully'
        })
      },
      error:()=>{
        Swal.fire({
          title:'¡Error!'
        });
      }
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    })
  }

}
