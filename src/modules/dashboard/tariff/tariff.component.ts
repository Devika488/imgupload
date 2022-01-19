import { Component, EventEmitter, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Output, Input } from '@angular/core';
import { InputdupService } from 'src/shared/_services/inputdup.service';
import { BehavService } from 'src/shared/_services/behav.service';
import { TariffncService } from 'src/shared/_services/tariffnc.service';
import { ZonevalidService } from 'src/shared/_services/zonevalid.service';
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
    private tarsergetdata: TariffncService,
    private zonevalid: ZonevalidService
  ) {}

  filename: string = '';
  zoneindex: string[] = [];
  inc: number[] = [];
  col1: number = 0;
  col2: number = 0;
  col3: number = 0;
  col5: number = 0;
  col4: number = 0;
  row1: number[] = []; //network code type invalid row
  cvalue: number[] = []; //network code redundant invalid row
  opr: number[] = [];
  country: number[] = [];
  data: AOA = [[], []];
  invsheet: boolean = false;
  thead = [
    '1zone',
    '2country',
    '3network_operator',
    '4network_code',
    '5increment_type',
  ];

  ngOnInit(): void {
    this.zonevalid._zonevalidvalue$.subscribe((res) => {
      this.zoneindex = this.zonevalid._zonevalidvalue.getValue();
    });
  }
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
          // isnumber,isduplicate
          this.behav.changeValue(this.data);
          this.valid();
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
        this.valid();
      }
    });
  }

  export(): void {
    
      if(this.zoneindex.length>0){
        alert("Please check Zone. You've entered invalid zone")
      }
      else if(this.country.length>0){
        alert("Please check Country.You've not enetered all values")
      }
      else if(this.opr.length>0){
        alert("Please check network operator.You've not enetered all values")
      }
     else if(this.row1.length>0){
        alert("Please check network code. One value is not a number");
      }
      else if(this.cvalue.length>0){
        alert("Please check network code.Values are not unique");
      }
      else if(this.inc.length>0){
        alert("Please check increment values.The value should be KB/MB");
      }
    
   else{
    if (confirm('Are you Sure ?')) {
      this.dup.export();
    }
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

    //zone valid
    if (col == '1zone') {
      // make this 4 lines a function and call from zone valid
      this.zonevalid.validzone();
      this.zoneindex = this.zonevalid._zonevalidvalue.getValue();
      this.col1 = 0;
    }
    if (col == '2country') {
      this.country = this.dup.tofindemptycount();
      this.col2 = 1;
    }
    if (col == '3network_operator') {
      this.opr = this.dup.tofindemptyopr();
      this.col3 = 2;
    }
    // number string? && redundant
    if (col == '4network_code') {
      this.row1 = this.tarsergetdata.tofindisnumber();
      this.cvalue = this.tarsergetdata.toFindDuplicates();
      this.col4 = 3;
    }

    // increment kb/mb
    if (col == '5increment_type') {
      this.inc = this.dup.tofindincvalue();
      this.col5 = 4;
    }
  }

  cancel() {
    this.data = [];
    this.filename = '';
    this.behav.changeValue(this.data);
    this.zonevalid.validzone();
    this.childEvent.emit();
  }

  addrow() {
    let newRow: any = {
      '1zone': null,
      '2country': null,
      '3network_operator': null,
      '4network_code': null,
      '5increment_type': null,
    };

    this.data.unshift(newRow);
    this.behav.changeValue(this.data);
    this.valid();
  }
  valid() {
    this.zonevalid.validzone();
    this.zoneindex = this.zonevalid._zonevalidvalue.getValue();
    if (this.zoneindex) {
      this.col1 = 0;
    }
    this.row1 = this.tarsergetdata.tofindisnumber();
    this.cvalue = this.tarsergetdata.toFindDuplicates();
    if (this.cvalue || this.row1) {
      this.col4 = 3;
    }
    this.inc = this.dup.tofindincvalue();
    if (this.inc != []) {
      this.col5 = 4;
    }
    this.opr = this.dup.tofindemptyopr();
    if (this.opr) {
      this.col3 = 2;
    }
    this.country = this.dup.tofindemptycount();
    if (this.country) {
      this.col2 = 1;
    }
  }
}
