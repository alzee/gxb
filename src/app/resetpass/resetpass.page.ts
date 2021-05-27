import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  cred: string;
  resp: Data;
  uid: number;

  constructor(
      private router: Router,
      private httpService: HttpService,
      private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  chkcred() {
    console.log(this.cred);
    const postData = {
      cred: this.cred
    };
    this.httpService.post('chkcred', postData).subscribe((res) => {
      console.log(res);
      this.resp = res;
      if (this.resp.code === 1) {
        this.toastService.presentToast('未找到对应用户');
      }
      if (this.resp.code === 0) {
        this.uid = this.resp.uid;
        this.router.navigate(['/otp']);
      }
    });
  }

}
