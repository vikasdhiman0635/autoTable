import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  sortingStyle: string[] = [];

  data_col: any;

  select_all: boolean = false;

  startingPoint: number = 0;
  endingPoint: number = 4;
  pages: any = 1;
  currentPage: number = 1;
  noOfRecordsSelected: number = 5;

  pagination: any[] = [
    { key: '5' },
    { key: '10' },
    { key: '15' },
    { key: '30' },
    { key: '50' },
  ];

  @Input() tableData: any;


  constructor(
    public stateService: AutoTableService,
    private clipboard: Clipboard
  ) { }

  ngOnInit() {
    this.stateService.tableHeaders = this.tableData.headerName;
    this.stateService.backupData = this.tableData;
    this.stateService.tableData = this.tableData.data;
    var data_col = Object.keys(this.tableData.data[0]);
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

    if (this.stateService.backupData.manageDisplayData) {
      this.stateService.backupData.makeTableData[0] = this.stateService.tableHeaders[0];
      this.stateService.tableHeaders.splice(0, this.stateService.tableHeaders.length - (this.stateService.tableHeaders.length - 1));
    }
    this.setPageNo();
  }

  async setPageNo() {
    let count = await this.stateService.backupData.data.length / (this.endingPoint + 1);
    var nextPage = await count - Math.trunc(count)
    if (nextPage > 0.1) {
      this.pages = await Math.trunc(count + 1);
    }
    else if (count === 0) {
      this.pages = await this.pages;
    }
  }

  activeInputField(fieldValue: string, field: String, index: number) {
    this.stateService.tableHeaders.forEach((data) => {
      if (data.id === field) {
        if (data.editable === true) {
          this.stateService.displayIndex[index] = 1;
          this.stateService.displayfield[index] = field;
        }
      }
    });
  }

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
        this.sorting_img[index] = await '../accending.png';
        this.sortingStyle[index] = await 'display: inline';
        await this.sortingupData(column);
      }
      else if (this.sort_direction[index] === 'asc') {
        this.sort_direction[index] = await 'desc';
        this.sorting_img[index] = await '../decanding.png'
        this.sortingStyle[index] = await 'display: inline';
        await this.sortingdownData(column);
      }
      else if (this.sort_direction[index] === 'desc') {
        this.sort_direction[index] = await '';
        this.sorting_img[index] = await '';
        this.sortingStyle[index] = await 'display: none';
        this.stateService.tableData = await this.stateService.backupData.data;
      }
    }
  }

  async sortingupData(column: string) {
    const res = await [...this.tableData.data].sort((a: any, b: any) => {
      return a[column].localeCompare(b[column], undefined, { sensitivity: 'base' });
    });
    this.stateService.tableData = res;
  }

  async sortingdownData(column: string) {
    const res = await [...this.tableData.data].sort((a: any, b: any) => {
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
      }
    }
    else if (!this.select_all) {
      for (let i = 0; i < this.stateService.editSelectRecoredsIndex.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = false;
      }
      for (let i = 0; i < this.stateService.backupEditIndex.length; i++) {
        this.stateService.editSelectRecoredsIndex[i] = this.stateService.backupEditIndex[i];
      }
    }
  }


  async selectField(index: number) {
    this.stateService.backupEditIndex[index] = await true;
    this.stateService.editSelectRecoredsIndex[index] = await true;
  }

  copyText(text: string, field: string, index: number) {
    this.clipboard.copy(text);
  }

  changeNoofRecords(event: any) {
    this.startingPoint = 0;
    this.currentPage = 1;
    this.endingPoint = event.target.value - 1;
    this.noOfRecordsSelected = event.target.value;
    this.setPageNo();
  }

  pageChange(pageNo: any, str: string) {
    if (str === 'up') {
      this.currentPage = pageNo;
      this.startingPoint = (this.endingPoint + 1);
      this.endingPoint = (this.noOfRecordsSelected * pageNo) - 1;
    }
    else if (str === 'down') {
      this.currentPage = pageNo;
      this.startingPoint = (this.endingPoint - (this.noOfRecordsSelected * 2)) + 1;
      this.endingPoint = this.endingPoint - this.noOfRecordsSelected;
    }
  }


  endPage() {
    this.currentPage = this.pages;
    this.endingPoint = this.stateService.backupData.data.length;
    this.startingPoint = this.endingPoint - Math.trunc(this.stateService.backupData.data.length % this.noOfRecordsSelected);
  }

  startup() {
    this.currentPage = 1;
    this.startingPoint = 0;
    this.endingPoint = this.noOfRecordsSelected - 1;
  }

  async downloadExcel() {
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
    this.stateService.tableData.forEach((data: any) => {
      let acc: any = { ...data };
      worksheet.addRow(acc);
    })

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
