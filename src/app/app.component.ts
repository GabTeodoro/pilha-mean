import { Component, OnInit } from '@angular/core';
import { Cliente } from './clientes/cliente.model';
import {UsuarioService} from './auth/usuario.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private usuarioService: UsuarioService){}
  
  ngOnInit(){
    this.usuarioService.autenticarAutomaticamente()
  }
}
