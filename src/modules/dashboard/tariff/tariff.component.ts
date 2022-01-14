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
  col1: number = 0;
  row1: number[] = [];
  cvalue: number []= [];
  data: AOA = [[], []];
  invsheet: boolean = false;

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
          header: 1,
          range: 1,
        });
        if (this.data.length === 0) {
          this.filename = '';
          this.data = [];
          alert('Please upload a valid excel sheet');
        } else {
          // this.dup.finddup(this.data);
          
          this.behav.changeValue(this.data);
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
      console.warn(JSON.stringify(this.zonearray), this.behav._behavalue.value);
    }
  }

  getData(event: any, row: any, col: any) {
    this.tarsergetdata.getData(event, row, col);
    this.row1 = this.tarsergetdata._isBoolean$.getValue();
    this.cvalue=this.tarsergetdata.toFindDuplicates();
    console.warn("arry:"+ this.cvalue);
    
    if (this.row1 !== []) {
      this.col1 = 3;
    }

  }

  cancel() {
    this.data = [];
    this.filename = '';
    this.behav.changeValue(this.data);
    this.childEvent.emit();
  }

  addrow() {
    let newRow: any = [null, null, null, null, null];

    this.data.unshift(newRow);
  }
}
