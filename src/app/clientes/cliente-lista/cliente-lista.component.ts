import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit {
  @Input() clientes: Cliente[] = [];

  // clientes = [
  //   {
  //     nome: 'José',
  //     fone: '11982478236',
  //     email: 'jose@mail.com',
  //   },
  //   {
  //     nome: 'Maria',
  //     fone: '11985247142',
  //     email: 'maria@mail.com',
  //   },
  // ];

  constructor() {}

  ngOnInit(): void {}
}
