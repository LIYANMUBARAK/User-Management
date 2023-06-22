import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) { }

  submit: boolean = false
  emailMessage!: String
  passMessage!: String

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })


  onSubmit() {
    console.log(this.loginForm)
    this.submit = true
    this.verifyAdmin()
  }

  verifyAdmin() {
    this.service.verifyAdmin(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.passMatch) {
          this.passMessage = response.passMatch
        }
        else if (response.emailMatch) {
          this.emailMessage = response.emailMatch
        }
        else {
          console.log("login")
          localStorage.setItem('adminToken', response.adminToken);
          localStorage.setItem('adminId', response.adminId)
          this.router.navigate(['admin/'])
        }
        setTimeout(() => {
          this.passMessage = ""
          this.emailMessage = "";
        }, 2000)
      }, (error) => {
        console.log(error)
      }
    )
  }


}
