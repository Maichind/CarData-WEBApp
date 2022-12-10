import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListarComponent } from './listar/listar.component';
import { ApiService } from './services/api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AlmacenComponent } from './almacen/almacen.component';
import { VentasComponent } from './ventas/ventas.component';
import { VendidosComponent } from './vendidos/vendidos.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ListarComponent, DialogComponent, AlmacenComponent, VentasComponent, VendidosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [ApiService, ListarComponent, DialogComponent, AppComponent, 
    {provide: MatDialogRef, useValue: {}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
