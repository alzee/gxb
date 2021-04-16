import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

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
  min = 1;
  feeRate = 0.15;
  taskLeast: number;
  sum: number;
  fee: number;
  price: number;
  total: number;
  availableBalance: number;
  userData: Data;
  user: Data;
  orderData = {
      amount: 0,
      type: 1,
      note: '任务发布',
      user: '',
      couponId: 0,
      fee: 0

  };
  orderType = 1;
  orderNote = '任务发布';
  coupon: Data;
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
      guides: [],
      reviews: []
  };

  constructor(
      public alertController: AlertController,
      private formBuilder: FormBuilder,
      private httpService: HttpService,
      private http: HttpClient,
      private storageService: StorageService,
      private router: Router,
      private data: DataService
  ) {
  }

  ngOnInit() {
      this.storageService.get(AuthConstants.AUTH).then((res) => {
          this.userData = res;
          this.httpService.get('users/' + this.userData.id).subscribe((res1) => {
              console.log(res1);
              this.user = res1;
              this.feeRate = this.user.level.postFee;
              this.taskLeast = this.user.level.taskLeast;
              this.f.quantity.setValidators([Validators.min(this.taskLeast)]);
              for (const coupon of this.user.coupon) {
                  if (coupon.type === this.orderType) {
                      this.coupon = coupon;
                  }
              }
          });
      });

      this.httpService.get('categories?itemsPerPage=50').subscribe((res) => {
          this.categories = res;
      });
      this.form = this.formBuilder.group({
          category: [],
          title: [''],
          name: [''],
          quantity: [''],
          workHours: [''],
          reviewHours: [''],
          price: [''],
          description: [''],
          link: [''],
          note: [''],
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
      // const applyUntil = new Date();
      // applyUntil.setHours(applyUntil.getHours() + this.f.workHours.value);
      // const approveUntil = new Date();
      // approveUntil.setHours(approveUntil.getHours() + this.f.reviewHours.value);
      // const showUntil = new Date();
      // showUntil.setDate(showUntil.getDate() + this.f.showdays.value);
      // this.postData.applyUntil = applyUntil;
      // this.postData.approveUntil = approveUntil;
      // this.postData.showUntil = showUntil;
      this.postData.owner = 'api/users/' + this.userData.id;
      this.postData.category = '/api/categories/' + this.f.category.value;
      this.postData.title = this.f.title.value;
      this.postData.name = this.f.name.value;
      this.postData.quantity = this.f.quantity.value;
      this.postData.workHours = this.f.workHours.value;
      this.postData.reviewHours = this.f.reviewHours.value;
      this.postData.price = Math.round(this.price * 100);
      this.postData.description = this.f.description.value;
      this.postData.link = this.f.link.value;
      this.postData.note = this.f.note.value;
      this.postData.guides.push(this.guides);
      this.postData.reviews.push(this.reviews);
      console.log(this.postData);
      // return (
      //     this.postData.username &&
      //         this.postData.password &&
      //         username.length > 0 &&
      //         password.length > 0
      // );
  }

  uploadPhoto(fileChangeEvent, type, i) {
    // Get a reference to the file that has just been added to the input
    const photo = fileChangeEvent.target.files[0];

    // Create a form data object using the FormData API
    const formData = new FormData();

    // Add the file that was just added to the form data
    formData.append('file', photo, photo.name);

    // POST formData to server using HttpClient
    const url = environment.apiUrl;
    let o: any; // = { contentUrl?: '' };
    this.http.post(url + 'media_objects', formData).subscribe((res) => {
      console.log(res);
      o = res;

      if (type === 'guide') {
          this.guides[i].img = o.contentUrl;
      }
      if (type === 'review') {
          this.reviews[i].img = o.contentUrl;
      }
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
      this.validateInputs();
      const msg = {
          postData: this.postData
      };
      this.data.changeMessage(msg);
      this.router.navigate(['/detail'], {queryParams: {id: 0}});
  }

  getCateMin(){
      for (const i of this.categories){
          if (i.id === parseInt(this.f.category.value, 10)){
              this.f.price.setValidators([Validators.min(i.rate), Validators.required]);
              this.f.price.updateValueAndValidity();
              this.min = i.rate;
              break;
          }
      }
  }

  async showTip(type: number) {
      let msg;
      switch (type) {
          case 1:
              msg = `${this.user.level.name} 手续费 ${this.feeRate * 100}%`;
              break;
          case 2:
              msg = '账户中相应的可用余额将被冻结，任务结束后解冻剩余部分。';
              break;
          case 3:
              msg = '红包只能抵扣手续费。';
              break;
      }
      const alert = await this.alertController.create({
          header: '提示',
          message: msg
      });

      await alert.present();
  }

  async confirmPublish() {
    const alert = await this.alertController.create({
      header: '发布任务',
      message: `您账户中相应金额(${this.sum}元)将被冻结，任务结束后解冻剩余部分！`,
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
            this.orderData.amount = Math.round(this.total * 100);
            this.orderData.fee = Math.round(this.fee * 100);
            this.orderData.type = this.orderType;
            this.orderData.note = this.orderNote;
            this.orderData.user = '/api/users/' + this.user.id;
            if (this.coupon) {
                this.orderData.couponId = this.coupon.id;
            }
            this.httpService.post('finances', this.orderData).subscribe((res) => {
                console.log(res);
                this.publish();
                const params = res;
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmTopup() {
    const alert = await this.alertController.create({
      header: `可用余额(${this.availableBalance}元)不足`,
      subHeader: `需充值${Math.round((this.total - this.availableBalance) * 100) / 100}元`,
      message: '转入充值页面？',
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
            this.router.navigate(['/topup'], {queryParams: {amount: this.total - this.availableBalance}});
          }
        }
      ]
    });

    await alert.present();
  }

  checkBalance(){
      this.httpService.get('users/' + this.userData.id).subscribe((res) => {
          this.user = res;
          this.availableBalance = this.user.topup + this.user.earnings;
          if (this.availableBalance < this.total){
              this.confirmTopup();
          }
          else {
              this.confirmPublish();
          }
      });
  }

  subtotal(){
      if (this.f.price.value) {
          this.price = +this.f.price.value.toFixed(2);
      }
      this.sum = +(this.f.quantity.value * this.price).toFixed(2);
      this.fee = +(this.sum * this.feeRate).toFixed(2);
      if (this.coupon) {
          this.fee = +(this.fee - this.coupon.value).toFixed(2);
      }
      if (this.fee < 0) {
          this.fee = 0;
      }
      this.total = +(this.sum + this.fee).toFixed(2);
  }
}
