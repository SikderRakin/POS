import { Component, OnInit } from '@angular/core';
import { Exporter } from './exporter.model';
import * as $ from 'jquery';
import { ItemServiceService } from 'src/app/services/item-service.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  isChecked: boolean = false;
  exportInvoice: any = {};
  packingInfo: any = {};
  ddlExporter: string;
  ddlInvoiceType: string;
  ddlExporterBank: string;
  ddlFactory: string;
  ddlEmail: string;
  dataList: any;
  ddlCompany: string;
  exporters: Exporter[] = [
    { value: '1', viewValue: 'Retail Tech.' },
    { value: '2', viewValue: 'Others' },
    { value: '3', viewValue: 'Others-2' },
  ];
  invoiceTypes: Exporter[] = [
    { value: '1', viewValue: 'PI' },
    { value: '2', viewValue: 'SC/TT' },
    { value: '3', viewValue: 'SC/FD' },
  ];
  factories: Exporter[] = [
    { value: '1', viewValue: 'Uttra' },
    { value: '2', viewValue: 'EpZ' },
  ];
  companies: Exporter[] = [
    { value: '1', viewValue: 'A.K.M' },
    { value: '2', viewValue: 'Alfa Test' },
    { value: '3', viewValue: 'Other' },
  ];
  exporterBanks: Exporter[] = [
    { value: '1', viewValue: 'Woori bank' },
    { value: '2', viewValue: 'Dhaka bank' },
  ];
  emails: Exporter[] = [
    { value: '1', viewValue: 'rakin@gmail.com' },
    { value: '2', viewValue: 'rtb@gmail.com' },
  ];
  // SummerNote
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
  gg: any =
    '<ol><li>Payment: Letter of Credit&nbsp;<b> 90 days&nbsp;</b>From the date of Delivery Challan to be opened in favor of Retail Technologies Ltd.</li><li>Payment Should be made in U.S Dollar through LC.</li><li>Partial Shipment Allowed.</li><li>&nbsp;Quantity &amp; Value may vary +/- 10% of total Quantity &amp; Value of the Proforma Invoice.</li><li>Delivery Challan Should be treated as transport/Truck Challan.</li><li>Maturity date should be calculated from the date of goods delivery Challan.</li><li>All Banking Charges inside openers Bank counter on account of opener and outside openers bank counter on account of beneficiary.</li><li>Payment after Export Realization clause not allowed in the LC.</li><li>LC must incorporate delivery validity 30 days from the date of LC.</li><li>Presentation period: 15 days from the date of delivery.</li><li>L/C should be freely negotiable.</li><li>PI Validity 65 days from the date of issue.</li><li>Discrepancy charge should be mentioned between 25-30 Dollars.<br></li></ol>';

  // table
  isFinalized: boolean = false;
  itemNameDisable: boolean = false;
  constructor(private _itemSs: ItemServiceService) {}

  ngOnInit(): void {
    this._itemSs.modifiedTableDataChange.subscribe(
      (arg) => (this.dataList = arg)
    );
  }
  changeCompany(event: number) {
    this.dataSource = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];
    if (event == 1) {
      this.exportInvoice.CompanyNameBilling = 'A.K.M';
      this.exportInvoice.AddressBilling =
        '14, No Gedda, Karnopara, Ulail, Savar, Dhaka, Bangladesh.';
      this.exportInvoice.CompanyNameDelivery = 'A.K.M';
      this.exportInvoice.AddressDelivery =
        '14, No Gedda, Karnopara, Ulail, Savar, Dhaka, Bangladesh.';
    } else if (event == 2) {
      this.exportInvoice.CompanyNameBilling = 'Alfa Test';
      this.exportInvoice.AddressBilling = '1 Savar, Dhaka, Bangladesh.';
      this.exportInvoice.CompanyNameDelivery = 'Alfa Test';
      this.exportInvoice.AddressDelivery = 'Dhaka, Bangladesh.';
    }
  }

  selectFactory(factoryId: number) {
    debugger;
    if (factoryId == 1) {
      this.ddlExporterBank = '1';
    } else {
      this.ddlExporterBank = '2';
    }
  }
  getInfo() {
    console.log(this.gg);
    this.packingInfo.TotalCarton = 30;
    this.packingInfo.LabelNetWeight = 30;
    this.packingInfo.LabelGrossWeight = 30;
    this.packingInfo.RibonNetWeight = 30;
    this.packingInfo.RibonGrossWeight = 30;
    this.packingInfo.CartonMeasurement = 30;
  }
  reset() {
    this.ddlCompany = '';
    this.ddlEmail = '';
    this.ddlFactory = '';
    this.ddlExporterBank = '';
    this.ddlInvoiceType = '';
    this.exportInvoice = {};
    this.packingInfo = {};
    this.dataSource = [];
    this.ddlExporter = '';
  }
  save() {
    debugger;
    console.log(this.exportInvoice);
    console.log(this.packingInfo);
    console.log(this.dataList);
  }
  // table

  getItemInfo() {}
}
