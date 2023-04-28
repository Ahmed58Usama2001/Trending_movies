
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) {
  }
  apiError: string = ''
  loading: boolean = false
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    }, { validators: this.rePasswordMatch }
  )

  rePasswordMatch(registerForm: any) {
    let passwordControl = registerForm.get('password')
    let rePasswordControl = registerForm.get('rePassword')

    if (passwordControl?.value == rePasswordControl?.value)
      return null
    else {
      rePasswordControl?.setErrors({ passwordMatch: "password and repassword don't match" })
      return { passwordMatch: "password and repassword don't match" }
    }
  }

  registerData(registerForm: FormGroup) {
    this.loading = true
    this._AuthService.register(registerForm.value).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this._Router.navigate(['/login'])
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
