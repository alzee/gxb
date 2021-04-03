import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RoutesRecognized } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {
  min: number;
  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          amount: []
      });

      this.activeRoute.queryParams.subscribe((params: Params) => {
          if (params.amount){
              this.min = params.amount;
              this.amount.setValue(this.min);
              this.amount.setValidators(Validators.min(this.min));
          }
          else {
              this.min = 0;
          }
          console.log(this.min);
      });
  }

  get amount(){
      return this.form.controls.amount;
  }

  topup(){
    console.log(this.amount);
  }

}
