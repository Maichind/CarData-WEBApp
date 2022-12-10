import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { ComunicationService } from '../services/comunication.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  carForm! : FormGroup;
  actionButton : string = "Add";
  displayModal : boolean = true;
  reload : boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData : any, 
              private comunication : ComunicationService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      id : ['', Validators.required],
      placa : ['', Validators.required],
      marca : ['', Validators.required],
      modelo : ['', Validators.required],
      kilometraje : ['', Validators.required],
      transmision : ['', Validators.required],
      tipo : ['', Validators.required],
      precio : ['', Validators.required]
    })

    //console.log(this.editData);
    
    if(this.editData){
      this.actionButton = "Update"
      this.carForm.controls['id'].setValue(this.editData.id);
      this.carForm.controls['placa'].setValue(this.editData.placa);
      this.carForm.controls['marca'].setValue(this.editData.marca);
      this.carForm.controls['modelo'].setValue(this.editData.modelo);
      this.carForm.controls['kilometraje'].setValue(this.editData.kilometraje);
      this.carForm.controls['transmision'].setValue(this.editData.transmision);
      this.carForm.controls['tipo'].setValue(this.editData.tipo);
      this.carForm.controls['precio'].setValue(this.editData.precio);
    }
    
  }

  addCar(){
    if(!this.editData){
      if(this.carForm.valid){
        this.api.postCar(this.carForm.value).subscribe({
          next:(res)=>{
            this.carForm.reset();
            this.dialogRef.close('update');
            Swal.fire({
              title:'Car added Successfully',
              willClose: () => {
                this.reload = true;
                this.comunication.puente.emit({
                  data : this.reload
                })
              }
            })
          },
          error:()=>{
            Swal.fire({
              title:'¡Error!'
            });
          }
        })
      }
    } else{
      this.updateCar()
    }
  }

  updateCar(){
    this.api.putCar(this.carForm.value, this.editData._id.$oid).subscribe({
      next:(res)=>{
        this.carForm.reset();
        this.dialogRef.close('update');
        Swal.fire({
          title:'Car Updated Successfully',
          willClose: () => {
            this.reload = true;
            this.comunication.puente.emit({
              data : this.reload
            })
          }
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
