import { Component, OnInit } from '@angular/core';
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import cities from "./pca.json";

interface Data {
    [propName: string]: any;
}

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {
  city: string;
  land: Data = {
      id: 1
  };
  url = environment.url;
  posts = [];

  constructor(
      private pickerController: PickerController,
      private httpService: HttpService
             ) {}

  ngOnInit() {
      this.httpService.get('land_posts?itemsPerPage=35&land=1').subscribe((res) => {
          this.posts = res;
          this.posts.length = 35;
          console.log(this.posts);
      });
  }

  multiColumnOptions = [
    [
      '湖北',
    ],
    [
      '十堰',
    ],
    [
      '张湾区',
      '茅箭区',
      '郧阳区',
      '竹山县',
      '竹溪县',
      '房县',
      '丹江口市'
    ]
  ]

  async openPicker(){
    const picker = await this.pickerController.create({
      columns: this.getColumns(3),
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
            this.city = value['col-2'].text;
            this.httpService.get('lands?name=' + this.city).subscribe((res) => {
                this.land = res[0];
                if(!this.land){
                    const data = {name: this.city};
                    this.httpService.post('lands?', data).subscribe((res) => {
                        this.land = res;
                        this.httpService.get('land_posts?itemsPerPage=35&land=' + this.land.id).subscribe((res) => {
                            this.posts = res;
                            this.posts.length = 35;
                            console.log(this.posts);
                        });
                    });
                }
                else{
                    console.log(this.land);
                    this.httpService.get('land_posts?itemsPerPage=35&land=' + this.land.id).subscribe((res) => {
                        this.posts = res;
                        this.posts.length = 35;
                        console.log(this.posts);
                    });
                }
            });
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns) {
      let columns = [];
      let numOptions = 5;
      let columnOptions = this.multiColumnOptions;
      for (let i = 0; i < numColumns; i++) {
          columns.push({
              name: `col-${i}`,
              options: this.getColumnOptions(i, numOptions, columnOptions)
          });
      }

      return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
      let options = [];
      for (let i = 0; i < numOptions; i++) {
          options.push({
              text: columnOptions[columnIndex][i % numOptions],
              value: i
          })
      }

      return options;
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
