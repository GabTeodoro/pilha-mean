import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {
  mensagem: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {mensagem:string}) { 
    this.mensagem = data.mensagem
  }

  ngOnInit(): void {
  }

}
