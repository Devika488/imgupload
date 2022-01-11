import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
type AOA = any[][];
@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
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
       const thead= [
          'Zone',
          'Country',
          'Network Operator',
          'Network Code',
          'Increment',
        ];
       
      
        //try to validate is it crct sheet using header but output is always false
        // if (<AOA>XLSX.utils.sheet_to_json(ws, { header: 1 })[0] == tariff) {
        
          
          this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
          // tariff=this.data;
          // console.warn("tariff"+tariff[0]==thead.toString());
        // }

      };
      reader.readAsBinaryString(event.target.files[0]);
    } else {
      this.invsheet = true;
      throw new Error('Ivalid type... Upload a excel sheet (.xlsx)');
    }
  }

  del(val:any,row:any){
    this.data.forEach((item, index) => {
      if (index==row) {
        this.data.splice(index, 1);
      }
    });
    console.warn(val,row);
    
  }
  
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'tariff');

    /* save to file */
    XLSX.writeFile(wb, this.filename);
  }
  getData(event:any,row:any,col:any){

    this.data[row+1][col]=event.target.value;
    
  }

}
