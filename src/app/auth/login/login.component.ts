import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  estaCarregando: boolean = false;

  onLogin(form: NgModel){
    console.log(form.value)
  }

  constructor() {}

  ngOnInit(): void {}
}
