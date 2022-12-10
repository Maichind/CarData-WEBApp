import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  // Production
  postCar(data : any){
    return this.http.post<any>("https://carsdata.onrender.com/cars", data);
  }

  getCar():  Observable<any>{
    return this.http.get<any>("https://carsdata.onrender.com/cars");
  }

  putCar(data : any, _id : string){
    return this.http.put<any>("https://carsdata.onrender.com/cars/update/"+_id, data);
  }

  deleteCar(_id : string){
    return this.http.delete<any>("https://carsdata.onrender.com/cars/delete/"+_id);
  }

  //Almacen
  postAlm(data : any){
    return this.http.post<any>("https://carsdata.onrender.com/alm", data);
  }

  getAlm():  Observable<any>{
    return this.http.get<any>("https://carsdata.onrender.com/alm");
  }

  //Ventas
  postVentas(data : any){
    return this.http.post<any>("https://carsdata.onrender.com/ventas", data);
  }

  getVentas():  Observable<any>{
    return this.http.get<any>("https://carsdata.onrender.com/ventas");
  }

  //Vendidos
  postVendido(data : any){
    return this.http.post<any>("https://carsdata.onrender.com/vendidos", data);
  }

  getVendido():  Observable<any>{
    return this.http.get<any>("https://carsdata.onrender.com/vendidos");
  }
}
