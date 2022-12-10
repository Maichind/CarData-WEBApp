import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ComunicationService {
  @Output() puente : EventEmitter<any> = new EventEmitter
  constructor() { }
}
