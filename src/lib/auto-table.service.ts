import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoTableService {

  editRecords: any[] = [];
  editSelectRecoredsIndex: boolean[] = [];
  backupEditIndex: boolean[] = [];

  displayIndex: number[] = [];
  displayfield: any[] = [];
  tableHeaders: any[] = [];

  tableData: any[] = [];

  allData: any;

  backupData: any;

  sort_direction: string[] = [];
  sorting_img: string[] = [];
  sortingStyle: string[] = [];

  constructor() { }

  public async sort(column: string, index: number, header: any) {
    if (header.sort) {
      if (this.sort_direction[index] === '') {
        this.sort_direction[index] = await 'asc';
        this.sorting_img[index] = await '../../assets/icons/accending.png';
        this.sortingStyle[index] = await 'display: inline';
        await this.sortingupData(column);
      }
      else if (this.sort_direction[index] === 'asc') {
        this.sort_direction[index] = await 'desc';
        this.sorting_img[index] = await '../../assets/icons/decanding.png'
        this.sortingStyle[index] = await 'display: inline';
        await this.sortingdownData(column);
      }
      else if (this.sort_direction[index] === 'desc') {
        this.sort_direction[index] = await '';
        this.sorting_img[index] = await '';
        this.sortingStyle[index] = await 'display: none';
        this.tableData = await this.backupData.data;
      }
    }
  }

  public async sortingupData(column: string) {
    const res = await [...this.tableData].sort((a: any, b: any) => {
      return a[column].localeCompare(b[column], undefined, { sensitivity: 'base' });
    });
    this.tableData = res;
  }

  public async sortingdownData(column: string) {
    const res = await [...this.tableData].sort((a: any, b: any) => {
      return b[column].localeCompare(a[column], undefined, { sensitivity: 'base' });
    });
    this.tableData = res;
  }

  public activeInputField(fieldValue: string, field: String, index: number) {
    this.tableHeaders.forEach((data) => {
      if (data.id === field) {
        if (data.editable === true) {
          this.displayIndex[index] = 1;
          this.displayfield[index] = field;
        }
      }
    });
  }

}
