
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ApiService } from '../service/api.service';

// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

// @Component({ selector: 'app', templateUrl: 'app.component.html' })

class ColumnsObj {
    SrNo:string;
    Title:string;
    FirstName:string;
    LastName:string;
    Email:string;
    City:string;
    State:string;
    Mobile:string;
    Password:string;
    ConfirmPassword:string;
    AcceptTerms:string;
   
}


@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.css']
  })
export class FormComponentComponent implements OnInit {
    registerForm: any;
    submitted = false;
    productForm: FormGroup;
    dataAr: ColumnsObj[];
    editMode: boolean = false;
    row: any[];
    Id:any;

    constructor(private formBuilder: FormBuilder, private api:ApiService,private http: HttpClient) {
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        city: ['', Validators.required],
        state:['', Validators.required],
        mobile: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    });
     }

    ngOnInit() {

        this.get();
  
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.valid) {
            // return;

            if(this.editMode == true){
              var fields = this.registerForm.value;
              const formData = new FormData();

              formData.append("Id", this.Id);

              formData.append("title",fields['title']);
              formData.append("firstName", fields["firstName"]);
              formData.append("lastName", fields["lastName"]);
              formData.append("email", fields['email']);
              formData.append("city", fields['city']);
              formData.append("state", fields['state']);
              formData.append("mobile", fields['mobile']);
              formData.append("password", fields['password']);
              formData.append("confirmPassword", fields['confirmPassword']);
              formData.append("acceptTerms", fields['acceptTerms']); 

              this.api.HttpPostType('index.php/jpi/update', formData).then((res:any)=>{
      
              })
            }
            else{


              var fields = this.registerForm.value;
                const formData = new FormData();
          
                formData.append("title",fields['title']);
                formData.append("firstName", fields["firstName"]);
                formData.append("lastName", fields["lastName"]);
                formData.append("email", fields['email']);
                formData.append("city", fields['city']);
                formData.append("state", fields['state']);
                formData.append("mobile", fields['mobile']);
                formData.append("password", fields['password']);
                formData.append("confirmPassword", fields['confirmPassword']);
                formData.append("acceptTerms", fields['acceptTerms']);
                 console.log(this.registerForm.value);
        
              this.api.HttpPostType('index.php/jpi/insertuser', formData).then((res:any)=>{
        
              })
            }
        }
        else{

        }
      

        // display form values on success popup form
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
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
      updateUser(Id:any, index:any) {
        this.editMode = true;
        this.Id = Id;
    
        // console.log(this.dataAr[index]);
        // console.log(this.dataAr[index].Name);
        // this.updaemode = mode
    
        this.registerForm.patchValue({
    
          title: this.dataAr[index].Title,
          firstName: this.dataAr[index].FirstName,
          lastName: this.dataAr[index].LastName,
          email: this.dataAr[index].Email,
          city: this.dataAr[index].City,
          state: this.dataAr[index].State,
          mobile: this.dataAr[index].Mobile,
          password: this.dataAr[index].Password,
          confirmPassword: this.dataAr[index].ConfirmPassword,
          acceptTerms: this.dataAr[index].AcceptTerms,

        });
    
      }

    }
