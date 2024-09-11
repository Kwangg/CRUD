import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent implements OnInit{
  
  constructor(private service:ApiserviceService,private router:ActivatedRoute){ }
  errormsg:any;
  successmsg:any;
  getparamid:any

  ngOnInit(): void {
    
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){

      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.emForm.patchValue({
          'name':res.data[0].name,
          'last_name':res.data[0].last_name,
          'gender':res.data[0].gender,
          'birth_date':res.data[0].birth_date
        })
  
      })
    }
  }
  emForm = new FormGroup({
    'name':new FormControl('',Validators.required),
    'last_name':new FormControl('',Validators.required),
    'gender':new FormControl('',Validators.required),
    'birth_date': new FormControl('',Validators.required)
  })
  emSubmit(){
    if(this.emForm.valid){
      console.log(this.emForm.value);
      this.service.createData(this.emForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.emForm.reset();
        this.successmsg = res.message;
      })
    }
    else{
      this.errormsg = 'all field is required !';
    }
      
  }

  emUpdate(){

    console.log(this.emForm.value,'updateform');

    if(this.emForm.valid){
      this.service.updateData(this.emForm.value,this.getparamid).subscribe((res)=>{
        this.successmsg = res.message;
      })
    }else{
      this.errormsg = 'all field is required';
    }
  }


}

