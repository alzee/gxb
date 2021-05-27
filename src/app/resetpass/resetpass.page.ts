import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor(
      private router: Router,
      private httpService: HttpService,
      private toastService: ToastService,
      private data: DataService
  ) { }

  ngOnInit() {
  }

  chkcred() {
    const postData = {
      cred: this.cred
    };
    this.httpService.post('chkcred', postData).subscribe((res) => {
      // console.log(res);
      this.resp = res;
      if (this.resp.code === 1) {
        this.toastService.presentToast('未找到对应用户');
      }
      if (this.resp.code === 0) {
        const msg = {
          uid: this.resp.uid,
          phone: this.resp.phone,
          action: 'reset'
        };
        this.data.changeMessage(msg);
        this.router.navigate(['/otp'], {replaceUrl: true});
      }
    });
  }

}
