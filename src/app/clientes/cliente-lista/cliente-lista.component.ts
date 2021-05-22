import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {UsuarioService} from '../../auth/usuario.service'

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private clientesSubscription: Subscription;
  public estaCarregando = false;
  totalDeClientes: number = 0;
  totalDeClientesPorPagina = 2;
  opcoesTotalDeClientesPorPagina = [2, 5, 10];
  paginaAtual: number = 1;
  public autenticado: boolean = false;
  private authObserver: Subscription;
  public idUsuario: string;

  constructor(public clienteService: ClienteService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.estaCarregando = true;
    this.clienteService.getClientes(
      this.totalDeClientesPorPagina,
      this.paginaAtual
    );
    this.idUsuario = this.usuarioService.getIdUsuario();
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((dados: { clientes: []; maxClientes: number }) => {
        this.estaCarregando = false;
        this.clientes = dados.clientes;
        this.totalDeClientes = dados.maxClientes;
      });
      this.autenticado = this.usuarioService.isAutenticado()
      this.authObserver = this.usuarioService.getStatusSubject().subscribe((autenticado)=>{
        this.autenticado = autenticado
      })
  }

  onDelete(id: string): void {
    this.estaCarregando = true;
    this.clienteService.removerCliente(id).subscribe(() => {
      this.clienteService.getClientes(
        this.totalDeClientesPorPagina,
        this.paginaAtual
      );
    });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
    this.authObserver.unsubscribe();
  }

  onPaginaAlterada(dadosPagina: PageEvent) {
    // console.log(dadosPagina);
    this.estaCarregando = true;
    this.paginaAtual = dadosPagina.pageIndex + 1;
    this.totalDeClientesPorPagina = dadosPagina.pageSize;
    this.clienteService.getClientes(
      this.totalDeClientesPorPagina,
      this.paginaAtual
    );
  }
}
