import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as $ from 'jquery';
import { ItemServiceService } from 'src/app/services/item-service.service';
declare const myFun: any;
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {
  title = 'UseJquery';
  insertItemCount: any = undefined;
  distCount: any = 1;
  Qty: any = 0;
  QtySumForItem: any = 0;
  UnitpriceSumForItem: any = 0;
  UnitPrice: any = 0;
  AmountSumForItem: any = 0;
  dataList: any;
  invoiceDetail: any = {};
  invoiceDetailList: any = [];
  ItemTableDataRow: any = [
    ['11', '111', 1, 'Barcode Label', '4"X 3" Type: Mat Fasoin', 5, 10, 50],
    ['12', '112', 2, 'Barcode Ribbon', '156 M"X 400 M"', 1, 20, 20],
    [
      '13',
      '113',
      3,
      'Barcode Label',
      '148 M"X 210 M" Type: Mat Fasoin',
      10,
      6,
      60,
    ],
    ['14', '114', 4, 'Barcode Printer', '200p', 1, 7, 7],
  ];
  ItemTableHeaders: any = [
    'SalesOrderId_Hide',
    'ItemId',
    'SlNo',
    'Item Name',
    'Description Of Goods',
    'Qty/Rolls',
    'Unit Price',
    'Amount',
  ];
  ItemTableFooter: any = ['', '', '', '', '', '0', '', '0'];

  constructor(private _itemSs: ItemServiceService) {}

  getItem() {
    for (var s = 0; s < this.ItemTableHeaders.length; s++) {
      //console.log( this.ItemTableDataRow[s]);
      for (var l = 0; l < this.ItemTableDataRow.length; l++) {
        if (s > 4) {
          var item = this.ItemTableDataRow[l][s];

          console.log(item);
          console.log(this.ItemTableDataRow[l]);
        }
      }
    }
  }

  //Col Add
  tableInsertCol() {
    var index = prompt('Please enter index No');
    var name = prompt('Enter column name here');
    if (
      Number(index) > this.ItemTableHeaders.length - 3 ||
      Number(index) <= 4 ||
      name == null ||
      index == null ||
      isNaN(Number(index))
    )
      alert("Can't insert here");
    else {
      this.insertAtTable(Number(index), name);
    }
  }
  insertAtTable(index, insertItem) {
    this.insertItemCount = insertItem;
    this.ItemTableHeaders.splice(index, 0, insertItem);

    this.ItemTableDataRow.forEach(function (item, idx) {
      console.log(item);
      item.splice(Number(index), 0, 'new data');
    });
    this.ItemTableFooter.splice(index, 0, '');
  }
  ////////////////////////////
  ////////////ColRemove
  tableRemoveCol() {
    var index = prompt('Please enter Column No');
    var col = Number(index);

    var firstVisualElementNumber = 3;
    if (col <= 4) alert("Can't Remove this Column");
    else if (col >= this.ItemTableHeaders.length - 3)
      alert("Can't Remove this Column");
    else {
      this.ItemTableHeaders.splice(col, 1);

      this.ItemTableDataRow.forEach(function (item, idx) {
        item.splice(col, 1);
      });

      this.ItemTableFooter.splice(col, 1);
    }
  }
  //////////
  rearrangeSerial() {
    var serial = 1;
    this.ItemTableDataRow.forEach(function (aRow) {
      for (var i = 0; i < aRow.length; i++) {
        if (i === 2) {
          aRow[2] = serial++;
        }
      }
    });
  }
  tableRemoveRow() {
    debugger;
    var index = prompt('Please enter Row No');
    var row_numP1 = Number(index);
    if (row_numP1 != null) {
      //var rowNo = prompt("Please enter a row number");
      if (row_numP1 != null) {
        if (this.ItemTableDataRow.length > 1) {
          var row = this.ItemTableDataRow[Number(row_numP1 - 1)];

          //remove item table data row here
          this.ItemTableDataRow.splice(Number(row_numP1 - 1), 1);
          this.ItemTableFooter = ['', '', '', '', '0', '', '0'];
          //this.rearrangeSerial();
          this.GetItemValueForAmountCalculation();
        } else {
          alert("Shouldn't remove Last Item!!!");
        }
      } else {
        row_numP1 = null;
        alert('Please select a item !!!');
      }
    }
  }

  tableInputDisable() {
    var tdMofiz = document.getElementById('mofiz').getElementsByTagName('td');
    for (var i = 0; i < tdMofiz.length; i++) {
      tdMofiz[i].contentEditable = 'true';
    }
    this.newFun();

    // $("#mofiz tbody tr td:nth-child(-n+" + rowNumber + ")").each(function () {
    //     $(this).attr("contenteditable", "true");
    // });
    // $("#mofiz tfoot tr th").each(function () {
    //     $(this).attr("contenteditable", "true");
    // });
    // //$("#mofiz tbody tr td:nth-child(n + 6)").each(function () {
    // //    $(this).attr("contenteditable", "false");
    // //});
    // $("#mofiz  tr th:nth-child(n)").each(function () {
    //     $(this).attr("contenteditable", "true");
    // });
    // $("#mofiz tbody tr td:nth-child(1),#mofiz tbody tr td:nth-child(2)").each(function () {
    //     $(this).attr("contenteditable", "false");
    // });
    // $("#mofiz  tr th:nth-child(1),#mofiz tr th:nth-child(2)").each(function () {
    //     $(this).attr("contenteditable", "false");
    // });
    // $("#mofiz tbody td").find(":input").each(function () {
    //     $(this).attr("disabled", false);
    // });
  }

  select($event) {
    var e = $event;
    e.preventDefault();
    e.stopPropagation();
    if (e.path.length == 11) {
      var tdMofiz = document.getElementById('mofiz').getElementsByTagName('td');
      var thMofiz = document.getElementById('mofiz').getElementsByTagName('th');
      for (var i = 0; i < tdMofiz.length; i++) {
        tdMofiz[i].style.backgroundColor = 'white';
      }
      for (var i = 0; i < thMofiz.length; i++) {
        thMofiz[i].style.backgroundColor = 'white';
      }
      var mofizId = e.target.className;
      console.log(mofizId);
      if (mofizId != 'mofizth t-cell-center') {
        e.target.style.backgroundColor = 'yellow';
        var column_numP1 = $(e.target).index() + 1;
        var row_numP1 = $(e.target).parent().index() + 1;
        console.log(column_numP1, row_numP1);
      }
    }
  }

  GetItemValueForAmountCalculation() {
    debugger;
    var qty = 0;
    var unitPrice = 0;
    var amount = 0;
    this.QtySumForItem = 0;
    this.AmountSumForItem = 0;

    for (var l = 0; l < this.ItemTableDataRow.length; l++) {
      var row = this.ItemTableDataRow[l];
      console.log(row);
      qty = row[5];
      unitPrice = row[6];

      this.QtySumForItem += Number(qty);

      amount = unitPrice * qty;
      this.ItemTableDataRow[l][this.ItemTableFooter.length - 1] =
        Number(amount);
      this.AmountSumForItem += Number(amount);

      var integerPartQty = parseInt(this.QtySumForItem);
      var decimalPartQty = this.QtySumForItem - integerPartQty;

      if (decimalPartQty == 0) {
        this.ItemTableFooter[this.ItemTableFooter.length - 3] =
          this.QtySumForItem;
      } else {
        this.ItemTableFooter[this.ItemTableFooter.length - 3] = parseFloat(
          this.QtySumForItem
        ); //.toFixed(2);
      }
      this.ItemTableFooter[this.ItemTableFooter.length - 1] = parseFloat(
        this.AmountSumForItem
      ); //.toFixed(2);
      this.distCount = 1;
    }
  }
  GetChengedFieldValue(itemName, row, index) {
    if (itemName == '') {
      alert('Please enter valid Number!!!');
      return;
    }
    if (itemName == '.') {
      alert("Can't input just dot !!!");
      return;
    }
    var qtyTemp = row[row.length - 3];
    var unitPriceTemp = row[row.length - 2];

    var item;
    item = parseFloat(itemName);

    if (isNaN(item)) {
      alert("Can't Enter Any Alphabet and Special Character Before Number !!!");
      return;
    } else {
      if (row.length - 1 != index) {
        this.QtySumForItem -= parseFloat(row[row.length - 3]);
        this.AmountSumForItem -= parseFloat(row[row.length - 1]);
        if (index >= row.length - 3) {
          row[index] = item;
        } else {
          row[index] = item;
        }
        var qtyConvert = parseFloat(row[row.length - 3]);
        var amountConvert = parseFloat(row[row.length - 2]);
        row[row.length - 1] = (qtyConvert * amountConvert).toFixed(2);
        this.AmountSumForItem += parseFloat(row[row.length - 1]);
        this.QtySumForItem += parseFloat(row[row.length - 3]);
      } else {
        this.AmountSumForItem -= row[row.length - 1];
        row[index] = item;
        this.AmountSumForItem += item;
      }

      var integerPartQty = parseInt(this.QtySumForItem);
      var decimalPartQty = this.QtySumForItem - integerPartQty;

      if (decimalPartQty == 0) {
        this.ItemTableFooter[this.ItemTableFooter.length - 3] =
          this.QtySumForItem;
      } else {
        this.ItemTableFooter[this.ItemTableFooter.length - 3] = parseFloat(
          this.QtySumForItem
        ).toFixed(2);
      }
      this.ItemTableFooter[this.ItemTableFooter.length - 1] = parseFloat(
        this.AmountSumForItem
      ).toFixed(2);

      this.invoiceDetailList.forEach(function (invoiceDetail) {
        if (
          invoiceDetail.ItemId == row[1] &&
          invoiceDetail.Quantity == qtyTemp &&
          invoiceDetail.UnitPrice == unitPriceTemp
        ) {
          var objectIndex = this.invoiceDetailList.indexOf(invoiceDetail);
          if (objectIndex != -1 && objectIndex + 1 == row[2]) {
            invoiceDetail.ItemName = row[3];
            invoiceDetail.DescriptionOne = row[4];
            invoiceDetail.Quantity = row[row.length - 3];
            invoiceDetail.UnitPrice = row[row.length - 2];
            invoiceDetail.Amount = row[row.length - 1];
          }
        }
      });
      row[index] = item;
    }
    //console.log(this.ItemTableDataRow);
  }
  newFun() {
    debugger;
    // table = document.getElementById("mofiz");;
    //console.log(table);
    var CustomiseTableDataList = [];
    var CustomiseTableData = {};

    var x = 1,
      l = 0;
    for (var s = 0; s < this.ItemTableHeaders.length; s++) {
      for (l = 0; l < this.ItemTableDataRow.length; l++) {
        for (var m = 0; m < this.ItemTableHeaders.length; m++) {
          if (m === s) {
            CustomiseTableData['Id'] = x++;
            CustomiseTableData['ColName'] = this.ItemTableHeaders[s];
            CustomiseTableData['ColValue'] = this.ItemTableDataRow[l][s];

            CustomiseTableDataList.push(CustomiseTableData);

            CustomiseTableData = {};
          }
        }
      }
    }
    this._itemSs.changeModifiedTableData(CustomiseTableDataList);
    //var pb = [[]];
    // for (var i = 0, row:any; row = table.rows[i]; i++) {
    //     pb[i] = [];
    //     //rows would be accessed using the "row" variable assigned in the for loop
    //     for (var j = 0, col:any; col = row.cells[j]; j++) {

    //         pb[i][j] = (col.innerText);
    //         if (j == 0) {
    //             //col.text(i);
    //             $("#mofiz tbody tr td:first").val(i);

    //         }
    //     }
    // }

    // var y = 0;
    // var z = 0;
    // pb.splice(pb.length - 1, 1);
    // for (var p = 0; p < pb[0].length; p++) {
    //     //rows would be accessed using the "row" variable assigned in the for loop
    //     for (var k = 0; k < pb.length - 1; k++) {
    //         CustomiseTableData['Id'] = x++;
    //         CustomiseTableData['ColName'] = pb[y][z];
    //         CustomiseTableData['ColValue'] = pb[k + 1][p];

    //         CustomiseTableDataList.push(CustomiseTableData);
    //         CustomiseTableData = {};
    //     }
    //     z++;
    // }
    // var tbody = table.querySelector('tbody');
    // var tr = tbody.getElementsByClassName('tr');
    // console.log(tr);
    //             for (var i = 0; i < tr.length; i++){
    //               console.log(tr[i]);
    //             }
    console.log(CustomiseTableDataList);
  }

  ngOnInit() {
    //this.getItem();
    this.GetItemValueForAmountCalculation();
    //myFun();
    this.newFun();

    //   //  $("#btnAddNumber").click(function(){
    //   //   alert('gg');
    //   //   var firstNumber = $("#txtFirstNumber").val();
    //   //   var secondNumber = $("#txtSecondNumber").val();
    //   //   ///alert(parseInt(firstNumber) + parseInt(secondNumber));
    //   // })
    //  })
  }
  // title = 'UseJquery';
  // insertItemCount: any = undefined;
  // distCount: any = 1;
  // Qty: any = 0;
  // QtySumForItem: any = 0;
  // UnitpriceSumForItem: any = 0;
  // UnitPrice: any = 0;
  // AmountSumForItem: any = 0;

  // @Input()
  // public content: any;
  // colLenght: number;
  // public rows = new MatTableDataSource<any>();
  // public columns = [];
  // dataSource = [
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 1,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 2,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 3,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 4,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 5,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 6,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 7,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 8,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 9,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 10,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 11,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  //   {
  //     SalesOrderId_Hide: 11,
  //     ItemId: 11,
  //     SlNo: 12,
  //     'Item Name': 'Barcode Label',
  //     'Description Of Goods': '4"X 3" Type: Mat Fasoin',
  //     'Qty/Rolls': 5,
  //     'Unit Price': 5,
  //     Amount: 9,
  //   },
  // ];
  // a: number;
  // b: number;
  // ItemTableFooter: any = ['', '', '', '', '', '0', '', '0'];
  // private updateRows(): void {
  //   this.rows = new MatTableDataSource<any>(this.content);
  //   //this.rows.sort = this.sort;
  //   //this.rows.paginator = this.paginator;
  // }

  // private updateColumns(): void {
  //   debugger;

  //   for (const column of Object.keys(this.content[0])) {
  //     this.columns.push(column);
  //   }
  //   this.colLenght = this.columns.length;
  // }

  // private updateTable(): void {
  //   if (this.content) {
  //     this.updateRows();
  //     this.updateColumns();
  //   }
  // }

  // public showFamilies(): void {}
  // ngOnInit(): void {
  //   this.content = this.dataSource;
  //   this.updateTable();
  // }

  // add(i) {
  //   debugger;
  // }
  // constructor() {}
}
