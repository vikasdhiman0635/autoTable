import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragPreview, CdkDropList, CdkDropListGroup, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoTableService } from './auto-table.service';

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { FieldEditorComponent } from './comp/field-editor/field-editor.component';

@Component({
  selector: 'makingTable',
  standalone: true,
  imports: [
    FieldEditorComponent,
    CommonModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    CdkDragPreview,
    CdkDropListGroup,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './auto-table.component.html',
  styleUrl: './auto-table.component.scss'
})
export class MakingTable {
  sort_direction: string[] = [];
  sorting_img: string[] = [];

  data_col: any;

  select_all: boolean = false;

  startingPoint: number = 0;
  endingPoint: number = 4;
  pages: any = 1;
  currentPage: number = 1;

  pagination: any[] = [
    { key: '5' },
    { key: '10' },
    { key: '15' },
    { key: '30' },
    { key: '50' },
  ];

  @Input() table: any;

  @Output() exportEditingArray = new EventEmitter<any>();


  constructor(
    public stateService: AutoTableService,
    private clipboard: Clipboard
  ) { }

  ngOnInit() {
    this.stateService.tableHeaders = this.table.headerName;
    this.stateService.backupData = this.table;
    this.stateService.allData = this.table;
    this.stateService.tableData = this.table.data;
    var data_col = Object.keys(this.table.data[0]);
    if (data_col.length === this.stateService.tableHeaders.length) {
      this.data_col = data_col;
      for (let i = 0; i < data_col.length; i++) {
        this.sort_direction[i] = '';
        this.sorting_img[i] = '';
      }
      for (let i = 0; i < this.stateService.tableData.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = false;
        this.stateService.backupEditIndex[i] = false;
      }
    }

    if (this.stateService.allData.manageDisplayData) {
      this.stateService.allData.makeTableData[0] = this.stateService.tableHeaders[0];
      this.stateService.tableHeaders.splice(0, this.stateService.tableHeaders.length - (this.stateService.tableHeaders.length - 1));
    }

    this.setPagination();
  }

  // Starting and ending no of records
  setPagination() {
    this.startingPoint = 0;
    this.currentPage = 1;
    this.endingPoint = this.stateService.allData.paginationSelected - 1;
    this.setPageNo();
  }

  // Set total Page no
  async setPageNo() {
    let count = await this.stateService.allData.data.length / (this.endingPoint + 1);
    var nextPage = await count - Math.trunc(count)
    if (nextPage > 0.1) {
      this.pages = await Math.trunc(count + 1);
    }
    else if (count === 0) {
      this.pages = await this.pages;
    }
  }

  activeInputField(fieldValue: string, field: String, index: number) {
    this.stateService.tableHeaders.forEach((data: any) => {
      if (data.id === field) {
        if (data.editable === true) {
          this.stateService.displayIndex[index] = 1;
          this.stateService.displayfield[index] = field;
        }
      }
    });
  }

  // export all data 
  exportData() {
    let exit_array = [];
    for (let i = 0; i < this.stateService.backupEditIndex.length; i++) {
      if (this.stateService.backupEditIndex[i]) {
        exit_array.push(this.stateService.tableData[i]);
      }
    }
  }


  async sort(column: string, index: number, header: any) {
    if (header.sort) {
      if (this.sort_direction[index] === '') {
        this.sort_direction[index] = await 'asc';
        this.sorting_img[index] = await 'up';
        await this.sortingupData(column);
      }
      else if (this.sort_direction[index] === 'asc') {
        this.sort_direction[index] = await 'desc';
        this.sorting_img[index] = await 'down'
        await this.sortingdownData(column);
      }
      else if (this.sort_direction[index] === 'desc') {
        this.sort_direction[index] = await '';
        this.sorting_img[index] = await '';
        this.stateService.tableData = await this.stateService.allData.data;
      }
    }
  }

  async sortingupData(column: string) {
    const res = await [...this.stateService.tableData].sort((a: any, b: any) => {
      return a[column].localeCompare(b[column], undefined, { sensitivity: 'base' });
    });
    this.stateService.tableData = res;
  }

  async sortingdownData(column: string) {
    const res = await [...this.stateService.tableData].sort((a: any, b: any) => {
      return b[column].localeCompare(a[column], undefined, { sensitivity: 'base' });
    });
    this.stateService.tableData = res;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stateService.tableHeaders, event.previousIndex, event.currentIndex);
  }

  async checkRecords() {
    this.select_all = !this.select_all;
    if (this.select_all) {
      for (let i = 0; i < this.stateService.editSelectRecoredsIndex.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = true;
        this.stateService.tableData[i].checkbox = true;
      }
    }
    else if (!this.select_all) {
      for (let i = 0; i < this.stateService.editSelectRecoredsIndex.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = false;
        this.stateService.tableData[i].checkbox = false;
      }
      for (let i = 0; i < this.stateService.backupEditIndex.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = this.stateService.backupEditIndex[i];
        this.stateService.tableData[i].checkbox = this.stateService.backupEditIndex[i];
      }
    }
  }


  async selectField(index: number) {
    this.stateService.backupEditIndex[index] = await true;
    this.stateService.editSelectRecoredsIndex[index] = await true;
  }

  copyText(text: string) {
    this.clipboard.copy(text);
  }

  // select total no of records in per page
  changeNoofRecords(event: any) {
    this.startingPoint = 0;
    this.currentPage = 1;
    this.endingPoint = event.target.value - 1;
    this.stateService.allData.paginationSelected = event.target.value;
    this.setPageNo();
  }

  // set page in next and previous
  pageChange(pageNo: any, str: string) {
    if (str === 'next') {
      this.currentPage = pageNo;
      this.startingPoint = (this.endingPoint + 1);
      this.endingPoint = (this.stateService.allData.paginationSelected * pageNo) - 1;
    }
    else if (str === 'back') {
      this.currentPage = pageNo;
      this.endingPoint = (this.stateService.allData.paginationSelected * pageNo) - 1;
      this.startingPoint = (this.endingPoint - this.stateService.allData.paginationSelected) + 1;
    }
  }


  endPage() {
    this.currentPage = this.pages;
    this.endingPoint = this.stateService.allData.data.length;
    this.startingPoint = this.endingPoint - Math.trunc(this.stateService.allData.data.length % this.stateService.allData.paginationSelected);
  }

  startup() {
    this.currentPage = 1;
    this.startingPoint = 0;
    this.endingPoint = this.stateService.allData.paginationSelected - 1;
  }

  async downloadExcel() {
    await this.exportExcel(0, this.stateService.tableData.length);
  }

  async downloadExcelByPage() {
    await this.exportExcel(this.startingPoint, this.endingPoint);
  }

  async exportExcel(start: number, end: number) {
    const workbook = await new Workbook();

    const worksheet = await workbook.addWorksheet('abc');

    // Make Headers
    let headersArray: any = [];

    for (let headers of this.stateService.tableHeaders) {
      let data = { header: headers.displayName, key: headers.id, width: 20 };
      headersArray.push(data);
    }
    worksheet.columns = await headersArray;

    // Add Data

    for (let i = start; i <= end; i++) {
      if (this.stateService.tableData[i]) {
        let acc: any = { ...this.stateService.tableData[i] };
        worksheet.addRow(acc);
      }
    }

    // download file
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const data = await workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: fileType });
      const fileName = `fileData.xlsx`;
      saveAs(blob, fileName);
    })
      .catch((error: any) => console.error(error));

  }


}
