import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptantesService } from '../servicios/adoptantes.service';
import { ProtectoraService } from '../servicios/protectora.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  mensajeError: string;
  formLogin: FormGroup;
  tipo: string;

  constructor(
    private adoptantesService: AdoptantesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private protectoraService: ProtectoraService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('',
        [Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)]
      )
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tipo = params.tipo;
    })
  }

  onSubmit(formValues) {
    console.log(formValues);
    this.mensajeError = null;
    formValues.tipo = this.tipo;

    if (this.tipo === "adoptante") {
      this.adoptantesService.login(formValues)
        .then(response => {

          if (response['error']) {
            this.mensajeError = response['error'];
          } else {
            console.log(response['token']);

            localStorage.setItem('token_adoptantes', response['token']);
            this.router.navigate(['/vistaadoptante']);

          }



        })
        .catch(error => console.log(error));
    } else {

      this.protectoraService.login(formValues)
        .then(response => {
          if (response['error']) {
            this.mensajeError = response['error'];
          } else {
            console.log(response['token']);

            localStorage.setItem('token_protectoras', response['token']);
            this.router.navigate(['/vistaprotectora']);

          }
        })
        .catch(error => console.log(error));
    }



  }

}
