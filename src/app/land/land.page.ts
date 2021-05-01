import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
// import pca from './pca-code.json';
import pca from './pca.json';
import { DataService } from '../services/data.service';

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {
  provIndex = 8;
  cityIndex = 0;
  areaIndex = 1;
  provs = [];
  cities = [];
  areas = [];
  area: string;
  // columns: Array<Data>;
  columns = [];
  query = 'land_posts?itemsPerPage=35&order%5Bprice%5D=desc';
  land: Data = {
      id: 1
  };
  url = environment.url;
  posts: Array<Data>;

  constructor(
      private pickerController: PickerController,
      private httpService: HttpService,
      private data: DataService
             ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
      this.httpService.get('configs?itemsPerPage=30').subscribe((res) => {
          this.data.changeMessage({configs: res});
      });

      this.httpService.get(`${this.query}&land=1`).subscribe((res) => {
          this.posts = res;
          this.land.id = 1;
          this.posts.length = 35;
          console.log(this.posts);
      });
  }

  getCities(prov){
    let cities = [];
    for (const i of Object.keys(pca[prov])) {
        cities.push({text: i});
    }
    console.log(Object.keys(pca[prov]));
    console.log(cities)
    return cities;
  }

  getAreas(prov, city){
    let areas = [];
    for (const i of pca[prov][city]) {
        areas.push({text: i});
    }
    return areas;
  }

  async openPicker(){
    console.log(pca);
    console.log(Object.keys(pca));
    this.columns[0] = {};
    this.columns[0].options = [];
    this.columns[0].name = 'prov';
    this.columns[0].selectedIndex = this.provIndex;
    for (const i of Object.keys(pca)) {
        this.columns[0].options.push({text: i});
    }

    this.columns[1] = {};
    this.columns[1].name = 'city';
    this.columns[1].options = this.getCities('上海市');
    this.columns[1].selectedIndex = this.cityIndex;

    this.columns[2] = {};
    this.columns[2].name = 'area';
    this.columns[2].options = this.getAreas('上海市', '市辖区');;
    this.columns[2].selectedIndex = this.areaIndex;
    console.log(this.columns);

    const picker = await this.pickerController.create({
      columns: this.columns,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: (value) => {
            console.log(`Got Value ${value}`);
            console.log(value);
            this.area = value['area'].text;
            this.httpService.get('lands?name=' + this.area ).subscribe((res) => {
                this.land = res[0];
                if (!this.land){
                    const data = {name: this.area};
                    this.httpService.post('lands?', data).subscribe((res1) => {
                        this.land = res1;
                        this.httpService.get(`${this.query}&land=${this.land.id}`).subscribe((res2) => {
                            this.posts = res2;
                            this.posts.length = 35;
                            console.log(this.posts);
                        });
                    });
                }
                else{
                    console.log(this.land);
                    this.httpService.get(`${this.query}&land=${this.land.id}`).subscribe((res1) => {
                        this.posts = res1;
                        this.posts.length = 35;
                        console.log(this.posts);
                    });
                }
            });
          }
        }
      ]
    });

    picker.addEventListener('ionPickerColChange', async (event: any) => {
        console.log(event);
    });

    console.log(picker.columns);
    await picker.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }
}
