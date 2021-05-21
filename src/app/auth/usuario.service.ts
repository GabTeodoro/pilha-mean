import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusSubject = new Subject<boolean>();
  private autenticado: boolean = false;

  public getToken(): string {
    return this.token;
  }

  public isAutenticado() {
    return this.autenticado;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) {}

  criarUsuario(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      password: senha,
    };
    this.httpClient
      .post('http://localhost:3000/api/usuario/signup', authData)
      .subscribe((resposta) => {
        console.log(resposta);
      });
  }

  private salvarDadosDeAutenticacao(token: string, validade: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
  }

  login(email: string, senha: string) {
    const authData: AuthData = {
      email: email,
      password: senha,
    };
    this.httpClient
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/login',
        authData
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          const tempoValidadeToken = resposta.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, tempoValidadeToken * 1000);
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.salvarDadosDeAutenticacao(
            this.token,
            new Date(new Date().getTime() + tempoValidadeToken * 1000)
          );
          this.router.navigate(['/']);
        }
      });
  }

  private removerDadosDeAutenticacao() {
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    clearTimeout(this.tokenTimer);
    this.removerDadosDeAutenticacao();
    this.router.navigate['/'];
  }

  public autenticarAutomaticamente(): void {
    const dadosAutenticacao = this.obterDadosDeAutenticacao();
    if (dadosAutenticacao) {
      const agora = new Date();
      const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
      console.log(diferenca);
      if (diferenca > 0) {
        this.token = dadosAutenticacao.token;
        console.log(dadosAutenticacao.token);
        this.autenticado = true;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, diferenca);
        this.authStatusSubject.next(true);
      }
    }
  }

  private obterDadosDeAutenticacao() {
    const token = localStorage.getItem('token');
    const validade = localStorage.getItem('validade');
    const idUsuario = localStorage.getItem('idUsuario');
    if (token && validade) {
      return {
        token: token,
        validade: new Date(validade),
        idUsuario: idUsuario,
      };
    }
    return null;
  }
}
