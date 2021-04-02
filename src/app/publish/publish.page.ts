import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  form: FormGroup;
  arr1 = [1];
  arr2 = [1];
  url = environment.url;
  min: number;
  availableBalance: number;
  userData = {
      id: 0
  };
  user: Data;
  hourOptions = [
      {
          time: 3,
          label: '3小时'
      },
      {
          time: 6,
          label: '6小时'
      },
      {
          time: 24,
          label: '1天'
      },
      {
          time: 72,
          label: '3天'
      },
      {
          time: 120,
          label: '5天'
      },
      {
          time: 168,
          label: '7天'
      }
  ];
  categories = [];
  guides = [
      {
          desc: '',
          img: ''
      }
  ];
  reviews = [
      {
          desc: '',
          img: ''
      }
  ];
  guide = {
      desc: '',
      img: ''
  };
  review = {
      desc: '',
      img: ''
  };
  postData: Data = {
      //owner: '',
      //title: '',
      //name: '',
      //applyHours: 0,
      //approveHours: 0,
      //quantity: 0,
      //showdays: 0,
      //category: '',
      //platform: '',
      guides: [],
      reviews: []
  };

  constructor(
      public alertController: AlertController,
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router
  ) {
  }

  ngOnInit() {
      this.min = 1;
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res) => {
              console.log(res);
              this.user = res;
              this.availableBalance = this.user.topup + this.user.earnings;
              console.log(this.availableBalance);
          });
      });

      this.httpService.get('categories?itemsPerPage=50').subscribe((res) => {
          console.log(res);
          this.categories = res;
      });
      this.form = this.formBuilder.group({
          category: [''],
          title: [''],
          name: [''],
          quantity: [''],
          applyHours: [''],
          approveHours: [''],
          showdays: [''],
          price: [, Validators.min(this.min)],
          description: [''],
          link: [''],
          note: [''],
          //guides: [[ {desc: '', img} ]],
          //reviews: [[ {desc: '', img} ]],
          acceptTerms: [false, Validators.requiredTrue],
      });
  }

  get f(){
      return this.form.controls;
  }

  publish() {
      this.validateInputs();
      this.httpService.post('tasks', this.postData).subscribe((res) => {
          console.log(res);
          this.router.navigate(['/myposts'], {replaceUrl: true});
      });
  }

  validateInputs() {
      let applyUntil = new Date();
      applyUntil.setHours(applyUntil.getHours() + this.f.applyHours.value);
      let approveUntil = new Date();
      approveUntil.setHours(approveUntil.getHours() + this.f.approveHours.value);
      this.postData.owner = 'api/users/' + this.userData.id;
      this.postData.category = '/api/categories/' + this.f.category.value;
      this.postData.title = this.f.title.value;
      this.postData.name = this.f.name.value;
      this.postData.quantity = this.f.quantity.value;
      this.postData.applyUntil = applyUntil;
      this.postData.approveUntil = approveUntil;
      this.postData.showdays = this.f.showdays.value;
      this.postData.price = this.f.price.value;
      this.postData.description = this.f.description.value;
      this.postData.link = this.f.link.value;
      this.postData.note = this.f.note.value;
      this.postData.guides.push(this.guides);
      this.postData.reviews.push(this.reviews);
      //return (
      //    this.postData.username &&
      //        this.postData.password &&
      //        username.length > 0 &&
      //        password.length > 0
      //);
  }

  uploadPhoto(fileChangeEvent, type, i) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    // Create a form data object using the FormData API
    let formData = new FormData();

    // Add the file that was just added to the form data
    formData.append("file", photo, photo.name);

    // POST formData to server using HttpClient
    const url = environment.apiUrl;
    let o:any; // = { contentUrl?: '' };
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      o = res

      if(type == 'guide')
          this.guides[i].img = o.contentUrl;
      if(type == 'review')
          this.reviews[i].img = o.contentUrl;
    });
  }

  add1(){
      this.guides.push(
          {
              desc: '',
              img: ''
          }
      );
      this.arr1.push(1);
  }

  add2(){
      this.reviews.push(
          {
              desc: '',
              img: ''
          }
      );
      this.arr2.push(1);
  }

  preview(){
      //this.validateInputs();
      console.log(this.f);
      this.checkBalance();
  }

  getCateMin(){
      let that = this;
      this.categories.forEach(
          function(i){
              if(i.id == that.f.category.value){
                  that.f.price.setValidators([Validators.min(i.rate), Validators.required]);
                  that.f.price.updateValueAndValidity();
                  that.min = i.rate;
                  return;
              }
          }
      )
  }

  async showTip() {
    const alert = await this.alertController.create({
      header: '提示',
      //subHeader: 'Subtitle',
      message: '账户中相应的可用余额将被冻结，任务结束后解冻剩余部分。',
    });

    await alert.present();
  }

  async confirmPublish() {
    const alert = await this.alertController.create({
      header: '发布任务',
      //subHeader: '',
      message: `您账户中相应金额(${this.f.quantity.value * this.f.price.value}元)将被冻结，任务结束后解冻剩余部分！`,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            this.publish();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmTopup() {
    const alert = await this.alertController.create({
      header: '余额不足',
      message: '账户可用余额不足，将转入充值页面！',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/topup']);
          }
        }
      ]
    });

    await alert.present();
  }

  checkBalance(){
      console.log(this.availableBalance);
      console.log(this.f.quantity.value * this.f.price.value);
      if(this.availableBalance < (this.f.quantity.value * this.f.price.value)){
          this.confirmTopup();
      }
      else{
          this.confirmPublish();
      }
  }
}
