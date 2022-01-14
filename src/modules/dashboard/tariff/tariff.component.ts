import { Component, EventEmitter, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Output, Input } from '@angular/core';
import { tariff } from 'src/shared/interface/tariff';
import { InputdupService } from 'src/shared/_services/inputdup.service';
import { BehavService } from 'src/shared/_services/behav.service';
import { TariffncService } from 'src/shared/_services/tariffnc.service';
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
  constructor(
    private dup: InputdupService,
    private behav: BehavService,
    private tarsergetdata: TariffncService
  ) {}

  filename: string = '';
  inc: number[] = [];
  col5: number = 0;
  col4: number = 0;
  row1: number[] = []; //network code type invalid row
  cvalue: number[] = []; //network code redundant invalid row
  data: AOA = [[], []];
  invsheet: boolean = false;
  thead = [
    '1zone',
    '2country',
    '3network_operator',
    '4network_code',
    '5increment_type',
  ];

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

        this.data = <AOA>XLSX.utils.sheet_to_json(ws, {
          blankrows: false,
          header: this.thead,
          range: 1,
        });
        if (this.data.length === 0) {
          this.filename = '';
          this.data = [];
          alert('Please upload a valid excel sheet');
        } else {
          // this.dup.finddup(this.data);
          // isnumber,isduplicate
          this.behav.changeValue(this.data);
          this.row1 = this.tarsergetdata.tofindisnumber();
          this.cvalue = this.tarsergetdata.toFindDuplicates();
          if (this.cvalue || this.row1) {
            this.col4 = 3;
          }
          this.inc = this.dup.tofindincvalue();
          if (this.inc != []) {
            this.col5 = 4;
          }
          // this.behav._behavalue.value.forEach((item: any, index: any) => {
          //   console.warn(item[3], index);
          // });
        }
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
        this.data.splice(index, 1);
        console.warn(this.behav._behavalue.value);
      }
    });
  }

  export(): void {
    if (confirm('Are you Sure ?')) {
      console.warn(
        JSON.stringify(this.zonearray),
        this.behav._behavalue.getValue()
      );
    }
  }

  getData(event: any, row: any, col: any) {
    switch (col) {
      case 0: {
        col = '1zone';
        break;
      }
      case 1: {
        col = '2country';
        break;
      }
      case 2: {
        col = '3network_operator';
        break;
      }
      case 3: {
        col = '4network_code';
        break;
      }
      case 4: {
        col = '5increment_type';
        break;
      }
      default: {
        console.warn('invalid key');
        break;
      }
    }

    this.behav._behavalue.value[row][col] = event.target.value;
    if (col == '4network_code') {
      this.row1 = this.tarsergetdata.tofindisnumber();
      this.cvalue = this.tarsergetdata.toFindDuplicates();
      this.col4 = 3;
    }
    if (this.row1.includes(row)) {
      // this.behav._behavalue.value[row][col] = prev;
    }
    if (col == '5increment_type') {
      this.inc = this.dup.tofindincvalue();
      this.col5 = 4;
    }
    console.warn(this.behav._behavalue.getValue());
    
  }

  cancel() {
    this.data = [];
    this.filename = '';
    this.behav.changeValue(this.data);
    this.childEvent.emit();
  }

  addrow() {
    let newRow: any = { '1zone':null,'2country': null,'3network_operator': null, '4network_code':null,'5increment_type': null};

    this.data.unshift(newRow);
    this.behav.changeValue(this.data);
  }
}
