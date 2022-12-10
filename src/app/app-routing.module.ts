import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './almacen/almacen.component';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './home/home.component';
import { ListarComponent } from './listar/listar.component';
import { VendidosComponent } from './vendidos/vendidos.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [
  { path: 'home', component : HomeComponent},
  { path: 'listar', component : ListarComponent},
  { path: 'dialog', component : DialogComponent},
  { path: 'almacen', component : AlmacenComponent},
  { path: 'ventas', component : VentasComponent},
  { path: 'vendidos', component : VendidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
