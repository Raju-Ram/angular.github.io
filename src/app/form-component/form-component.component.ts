
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../service/api.service';

// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

// @Component({ selector: 'app', templateUrl: 'app.component.html' })

class ColumnsObj {
    SrNo:string;
    title:string;
    FirstName:string;
    LastName:string;
    email:string;
    password:string;
    confirmPassword:string;
    acceptTerms:string;
}


@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.css']
  })
export class FormComponentComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    dataAr: ColumnsObj[];

    constructor(private formBuilder: FormBuilder, private api:ApiService,private http: HttpClient) { }

    ngOnInit() {

        this.get();
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        else{


            var fields = this.registerForm.value;
              const formData = new FormData();
        
              formData.append("title",fields['title']);
              formData.append("firstName", fields["firstName"]);
              formData.append("lastName", fields["lastName"]);
              formData.append("email", fields['email']);
              formData.append("password", fields['password']);
              formData.append("confirmPassword", fields['confirmPassword']);
              formData.append("acceptTerms", fields['acceptTerms']);
               console.log(this.registerForm.value);
      
            this.api.HttpPostType('index.php/jpi/insertuser', formData).then((res:any)=>{
      
            })
          }

        // display form values on success popup form
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

    get(){
        const that = this;
        this.api.HttpGetType('index.php/jpi/getData1')
          .subscribe(response => {
            that.dataAr = response['data'];
            console.log(that.dataAr);
    
            console.log(this.dataAr);
            if (this.dataAr.length > 0) {
            }
          });

    }
    deleteQuantity(id:any){
   
        const formData = new FormData();
    
        formData.append("Id",id);
      this.api.HttpPostType('index.php/jpi/delete', formData).then((res:any)=>{
    
      })
      }
    
    
}