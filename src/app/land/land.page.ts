import { Component, OnInit } from '@angular/core';
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";

@Component({
  selector: 'app-land',
  templateUrl: './land.page.html',
  styleUrls: ['./land.page.scss'],
})
export class LandPage implements OnInit {

  constructor(private pickerController: PickerController) {}

  ngOnInit() {
  }

  multiColumnOptions = [
    [
      '北京',
      '上海',
      '湖北',
      '湖南',
    ],
    [
      '武汉',
      '十堰',
      '宜昌',
      '襄阳',
    ],
    [
      '张湾区',
    ]
  ]

  async openPicker(numColumns = 1, numOptions = 5, columnOptions = multiColumnOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
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
