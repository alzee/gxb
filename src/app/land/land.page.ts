import { Component, OnInit } from '@angular/core';
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import cities from "./pca.json";

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {

  constructor(private pickerController: PickerController) {}

  ngOnInit() {
      console.log(cities);
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

}
