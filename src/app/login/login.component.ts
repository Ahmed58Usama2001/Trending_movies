import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
  }

  apiError: string = ''
  loading: boolean = false
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),

    }
  )



  loginData(loginForm: FormGroup) {
    this.loading = true
    this._AuthService.login(loginForm.value).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token)
          this._AuthService.decodeUserData()
          this._Router.navigate(['/home'])
          this.loading = false
        }
      },
      error: (err) => {
        this.loading = false


        this.apiError = err?.error.message
      }
    })
  }


}
