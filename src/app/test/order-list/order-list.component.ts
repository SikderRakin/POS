import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input()
  public content: any;
  @Input() dataSource: any;
  public rows = new MatTableDataSource<any>();
  public columns = [];
  public selection = new SelectionModel<any>(true, []);
  addClass: boolean = false;
  //Resuable Table Input
  @Input() isSelect: boolean = true;
  @Input() isButton: boolean = false;
  @Input() isSerial: boolean = false;
  @Input() ispaginator: boolean = false;
  @Input() addFilter: boolean = false;
  colLength: number = 0;
  public constructor() {}

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public filterBy(event: any): void {
    const filterBy: string = event.target.value;
    this.rows.filter = filterBy;
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rows.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.rows.data.forEach((row) => this.selection.select(row));
  }

  public checkboxLabel(row?: any): string {
    return !row
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
          row.position + 1
        }`;
  }

  private updateRows(): void {
    this.rows = new MatTableDataSource<any>(this.content);
    //this.rows.sort = this.sort;
    //this.rows.paginator = this.paginator;
  }

  private updateColumns(): void {
    debugger;
    if (this.isSelect == true) {
      this.columns = ['select'];
    }

    if (this.isButton == true) {
      this.columns = ['buttons'];
      this.colLength = -1;
    }

    if (this.isSerial == true) {
      this.columns = ['Sn'];
    }
    if (this.addFilter == true) {
      this.columns = ['Action'];
    }

    for (const column of Object.keys(this.content[0])) {
      this.columns.push(column);
    }
    this.colLength = this.colLength + this.columns.length;
  }

  private updateTable(): void {
    if (this.content) {
      this.updateRows();
      this.updateColumns();
    }
  }

  public showFamilies(): void {}
  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  add() {
    debugger;
    this.content = this.dataSource;
    this.updateTable();
    this.selection.clear();
  }
  see(event) {
    console.log(event);
  }
  // onDeviceSelect(element){
  //   this.addClass = false;
  //   this.tableData.forEach(element = > {
  //     if(element.VIN === event.VIN) {

  //      this.addClass = true;
  //   }
  //   });

  //   }
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
// // @Input() displayedColumns: string;
// // @Input() dataSource: PeriodicElement[];
// // displayedColumns: string[] = [
// //   'select',
// //   'position',
// //   'name',
// //   'weight',
// //   'symbol',
// // ];
// // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
// public content: any;

// public rows = new MatTableDataSource<any>();
// public columns = [];
// public selection = new SelectionModel<any>(true, []);

// /** Whether the number of selected elements matches the total number of rows. */
// isAllSelected() {
//   const numSelected = this.selection.selected.length;
//   const numRows = this.dataSource.length;
//   return numSelected === numRows;
// }

// /** Selects all rows if they are not all selected; otherwise clear selection. */
// masterToggle() {
//   if (this.isAllSelected()) {
//     this.selection.clear();
//     return;
//   }

//   this.selection.select(...this.dataSource);
// }

// /** The label for the checkbox on the passed row */
// checkboxLabel(row?: PeriodicElement): string {
//   if (!row) {
//     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
//   }
//   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
//     row.position + 1
//   }`;
// }
// constructor() {}
// add() {
//   console.log(this.selection.selected);
// }

// //dynamicTable
// private updateRows(): void {
//   this.rows = new MatTableDataSource<any>(this.content);
//   this.rows.sort = this.sort;
//   this.rows.paginator = this.paginator;
// }

// private updateColumns(): void {
//   this.columns = ['select'];

//   for (const column of Object.keys(this.content[0])) {
//     this.columns.push(column);
//   }
// }

// private updateTable(): void {
//   if (this.content) {
//     this.updateRows();
//     this.updateColumns();
//   }
// }

// public showFamilies(): void {
//   this.content = families;
//   this.updateTable();
//   this.selection.clear();
// }

// public showProducts(): void {
//   this.content = products;
//   this.updateTable();
//   this.selection.clear();
// }

// public showTransactions(): void {
//   this.content = transactions;
//   this.updateTable();
//   this.selection.clear();
// }
// ngOnInit(): void {
//   $('#hide').click(function () {
//     alert('gg');
//   });
// }
