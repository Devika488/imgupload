import { Component, EventEmitter, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Output,Input } from '@angular/core';
const { read, write, utils } = XLSX;
type AOA = any[][];
@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  @Input() zonearray:any;
  filename: string = '';

  data: AOA = [[], []];
  invsheet: boolean = false;
  constructor() {}

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

     
        this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
       
      };
      reader.readAsBinaryString(event.target.files[0]);
    } else {
      this.invsheet = true;
      throw new Error('Ivalid type... Upload a excel sheet (.xlsx)');
    }
  }

  del(row: any) {
    this.data.forEach((item, index) => {
      if (index == row + 1) {
        console.warn(index, row + 1);
        this.data.splice(index, 1);
      }
    });
  }

  export(): void {
    //  tariffdata=(JSON.stringify(this.data));
    //  const tariffdata=this.zonearray;
    //  const dataobj=JSON.stringify(tariffdata).join(JSON.stringify(this.data))
    if(confirm("Are you Sure ?"))
{    console.warn(JSON.stringify(this.zonearray),JSON.stringify(this.data));
}
  }

  getData(event: any, row: any, col: any) {
    console.warn(  this.data[row + 1]);
    
    this.data[row + 1][col] = event.target.value;
  }

  cancel() {
    this.data = [];
    this.filename = '';
    this.childEvent.emit();
  }

  addrow() {
    let newRow: string[] = ['','','','',''];
    console.warn(this.data);
    
    this.data.push(newRow);
  }

}
