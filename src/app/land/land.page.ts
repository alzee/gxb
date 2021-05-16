import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
// import pca from './pca-code.json';
import pca from './pca.json';
import { DataService } from '../services/data.service';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {
  userData: Data;
  provIndex = 8;
  cityIndex = 0;
  areaIndex = 1;
  provs = [];
  cities = [];
  areas = [];
  area: string;
  // columns: Array<Data>;
  date = new Date().toISOString();
  query = `itemsPerPage=35&order%5Bprice%5D=desc&showUntil%5Bafter%5D=${this.date}`;
  land: Data = {
      id: 1
  };
  url = environment.url;
  posts: Array<Data>;

  constructor(
      private pickerController: PickerController,
      private httpService: HttpService,
      private storageService: StorageService,
      private toastService: ToastService,
      private router: Router,
      private data: DataService
             ) {}

  ngOnInit() {
    this.storageService.get(AuthConstants.AUTH).then(
        (res) => {
            this.userData = res;
        }
    );
    this.storageService.get('pca').then(
        (res) => {
            this.provIndex = res[0];
            this.cityIndex = res[1];
            this.areaIndex = res[2];
        }
    );
    this.getPosts();
  }

  getPosts(){
      this.httpService.get(`land_posts?${this.query}&land=${this.land.id}`).subscribe((res) => {
          this.posts = res;
          this.posts.length = 35;
      });
  }

  ionViewWillEnter(){
      this.httpService.get('confs/1').subscribe((res) => {
          this.data.changeMessage({conf: res});
      });
      this.httpService.get('lands/' + this.land.id).subscribe((res) => {
          this.land = res;
      });
  }

  getCities(prov){
    const cities = [];
    for (const i of Object.keys(pca[prov])) {
        cities.push({text: i});
    }
    return cities;
  }

  getAreas(prov, city){
    const areas = [];
    for (const i of pca[prov][city]) {
        areas.push({text: i});
    }
    return areas;
  }

  async openPicker(){
    const columns = [];
    columns[0] = {};
    columns[0].options = [];
    columns[0].name = 'prov';
    columns[0].selectedIndex = this.provIndex;
    for (const i of Object.keys(pca)) {
        columns[0].options.push({text: i});
    }

    columns[1] = {};
    columns[1].name = 'city';
    columns[1].options = this.getCities(columns[0].options[this.provIndex].text);
    columns[1].selectedIndex = this.cityIndex;

    columns[2] = {};
    columns[2].name = 'area';
    columns[2].options = this.getAreas(columns[0].options[this.provIndex].text, columns[1].options[this.cityIndex].text);
    columns[2].selectedIndex = this.areaIndex;

    const picker = await this.pickerController.create({
      columns,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: (value) => {
            this.area = value.area.text;

            this.provIndex = columns[0].selectedIndex;
            this.cityIndex = columns[1].selectedIndex;
            this.areaIndex = columns[2].selectedIndex;

            this.storageService.store('pca', [
                columns[0].selectedIndex,
                columns[1].selectedIndex,
                columns[2].selectedIndex,
            ]);


            this.httpService.get('lands?name=' + this.area).subscribe((res) => {
                this.land = res[0];
                console.log(this.land);
                if (!this.land){
                    const data = {name: this.area};
                    this.httpService.post('lands?', data).subscribe((res1) => {
                        this.land = res1;
                        this.getPosts();
                    });
                }
                else {
                  this.getPosts();
                }
            });
          }
        }
      ]
    });

    picker.addEventListener('ionPickerColChange', async (event: any) => {
        let n = event.srcElement.nextElementSibling;
        let o = n.firstChild;
        let cities = [];
        let areas = [];
        let prov;
        let city;
        let j = 0;
        let x = 0;
        let btn;
        if (event.detail.name !== 'area') {
            btn = o.firstChild.cloneNode(true);
        }

        switch (event.detail.name) {
            case 'prov':
                prov = await picker.getColumn('prov');
                cities = this.getCities(prov.options[prov.selectedIndex].text);
                picker.columns[1].options = cities;
                picker.columns[1].selectedIndex = 0;

                // o.innerHtml = '';
                while (o.firstChild) {
                    o.removeChild(o.firstChild);
                }

                j = 0;
                x = 0;
                for (const i of cities) {
                    const btn1 = btn.cloneNode(true);
                    btn1.setAttribute('opt-index', j);
                    if (j < 4) {
                        btn1.style.transform = `rotateX(${x}deg) translate3d(0px, 0px, 90px)`;
                    }
                    else {
                        btn1.style.transform = `translate3d(0px, -9999px, 90px)`;
                    }
                    btn1.innerText = cities[j].text;
                    o.appendChild(btn1);
                    j += 1;
                    x -= 21.16;
                }
                n = event.srcElement.nextElementSibling.nextElementSibling;
                o = n.firstChild;
                // break;
            case 'city':
                prov = await picker.getColumn('prov');
                city = await picker.getColumn('city');
                areas = this.getAreas(prov.options[prov.selectedIndex].text, city.options[city.selectedIndex].text);
                picker.columns[2].options = areas;
                picker.columns[2].selectedIndex = 0;

                while (o.firstChild) {
                    o.removeChild(o.firstChild);
                }

                j = 0;
                x = 0;
                for (const i of areas) {
                    const btn1 = btn.cloneNode(true);
                    btn1.setAttribute('opt-index', j);
                    if (j < 4) {
                        btn1.style.transform = `rotateX(${x}deg) translate3d(0px, 0px, 90px)`;
                    }
                    else {
                        btn1.style.transform = `translate3d(0px, -9999px, 90px)`;
                    }
                    btn1.innerText = areas[j].text;
                    o.appendChild(btn1);
                    j += 1;
                    x -= 21.16;
                }
                break;
        }
    });
    await picker.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.land.id = 1;
      this.getPosts();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  buyIt(){
      if (this.land.owner && !this.land.forSale) {
          this.toastService.presentToast('该领地暂未出售');
      }
      else {
          // this.router.navigate(['/land/hall'], {queryParams: {id: this.land.id}});
          const postData = {
              price: this.land.price,
              buyer: this.userData.id
          };
          const orderData = {
              type: 7,
              note: '购买领地',
              amount: this.land.price / 100,
              data: {
                  entityId: this.land.id,
                  postData
              }
          };
          const message = {
              orderData
          };
          this.data.changeMessage(message);
          // this.router.navigate(['/land/my', '/pay']);
          this.router.navigate(['/pay']);
      }
  }
}
