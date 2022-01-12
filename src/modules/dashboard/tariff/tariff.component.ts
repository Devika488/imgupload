import { Component, EventEmitter, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Output, Input } from '@angular/core';
import { tariff } from 'src/shared/interface/tariff';
import { InputdupService } from 'src/shared/_services/inputdup.service';
import { BehavService } from 'src/shared/_services/behav.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
const { read, write, utils } = XLSX;
type AOA = any[][];
@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @Input() zonearray: any;
  filename: string = '';
  col1: number = 0;
  row1: any[] = [];
  cvalue: string = '';
  data: AOA = [[], []];
  invsheet: boolean = false;
  validnum: boolean = false;
  constructor(private dup: InputdupService, private behav: BehavService) {}

  ngOnInit(): void {}
  onImageChange(event: any) {
    if (event.target.files.length !== 1)
      throw new Error('Cannot use multiple files');
    let allowedExtensions = /(\.xlsx)$/i;

    const file: File = event.target.files[0];
    if (allowedExtensions.exec(file.name)) {
      this.invsheet = false;
      this.filename = file.name;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */

        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        // let tariff = [
        //   // 'Zone',
        //   // 'Country',
        //   // 'Network Operator',
        //   // 'Network Code',
        //   // 'Increment',
        // ];
        const thead = [
          'Zone',
          'Country',
          'Network Operator',
          'Network Code',
          'Increment',
        ];

        this.data = <AOA>XLSX.utils.sheet_to_json(ws, {
          blankrows: false,
          header: 1,
          range: 1,
        });
        if (this.data.length === 0) {
          this.filename = '';
          this.data = [];
          alert('Please upload a valid excel sheet');
        } else {
          this.dup.finddup(this.data);
          this.behav.changeValue(this.data);
        } // console.warn(JSON.stringify(this.data.length));
        // this.data.forEach((item, index) => {
        //     // console.warn(item[3]);

        // });
      };
      reader.readAsBinaryString(event.target.files[0]);
    } else {
      this.invsheet = true;
      throw new Error('Ivalid type... Upload a excel sheet (.xlsx)');
    }
  }

  del(row: any) {
    this.behav._behavalue.value.forEach((item: any, index: number) => {
      if (index == row) {
        // console.warn(index, row);
        this.data.splice(index, 1);
        // this.behav.changeValue(this.data);
        console.warn(this.behav._behavalue.value);
      }
    });
  }

  export(): void {
    //  tariffdata=(JSON.stringify(this.data));
    //  const tariffdata=this.zonearray;
    //  const dataobj=JSON.stringify(tariffdata).join(JSON.stringify(this.data))
    if (confirm('Are you Sure ?')) {
      console.warn(JSON.stringify(this.zonearray), this.behav._behavalue.value);
    }
  }

  getData(event: any, row: any, col: any) {
    // console.warn('data : ' + this.data[row + 1]);
    // this.data[row][col] = event.target.value;
    if (col === 3) {
      if (Number(event.target.value)) {
        if (this.row1 !== [] || this.row1.includes(row)) {
          this.row1.forEach((element: any, index: number) => {
            if (element === row) {
              console.warn(this.row1, element, index);

              this.row1.splice(index, 1);
            }
          });
        } else {
          this.validnum = false;
          console.warn('inside 3');

          this.behav._behavalue.value[row][col] = event.target.value;
        }
      } else {
        this.col1 = col;
        this.row1.push(row);
        console.warn('col : ' + this.col1);
        this.validnum = true;
        alert('Please enter a valid Network Code !');
        console.warn('enter a number in 3rd col');
      }
    } else if (col !== 3) {
      console.warn('not inside 3');

      this.behav._behavalue.value[row][col] = event.target.value;
    }

    // this.behav.changeValue(this.data);
    console.warn(this.behav._behavalue.value);
  }

  cancel() {
    this.data = [];
    this.filename = '';
    this.behav.changeValue(this.data);
    this.childEvent.emit();
  }

  addrow() {
    let newRow: any = [null, null, null, null, null];

    this.data.push(newRow);
  }
}
