import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private fb: FormBuilder, private router:Router,private service:AuthService) { }

  submit:boolean=false
  emailUsed!:String
  

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    cpassword: ['', [Validators.required]]
  })

  onSubmit(){
    this.submit = true
    const {name,email,password,cpassword} = this.registerForm.value
    if(cpassword == password){
      this.registerUser()
    } 
    
  }

  registerUser(){
    console.log(this.registerForm.value)
    this.service.registerUser(this.registerForm.value).subscribe(
      (response) => {
        if(response.emailUsed){
          this.emailUsed = response.emailUsed
          setTimeout(()=>{
            this.emailUsed = '' 
          },2000)
        }else{
          alert('Registraion Completed!');
          setTimeout(()=>{
            this.router.navigate(['/login'])
          },3000)
        }
      },(error)=>{
        console.log(error)
      })
  }
}
