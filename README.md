
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&ts=1683906897&type=6e&v=17.3.0&x2=0)](https://badge.fury.io/js/ngx-easy-table) 
[![last commit](https://badgen.net/github/last-commit/vikasdhiman0635/autoTable)](https://badgen.net/github/last-commit/vikasdhiman0635/autoTable)
[![total downloads](https://badgen.net/npm/dt/making-table)](https://badgen.net/npm/dt/ngx-easy-table)
[![license](https://badgen.net/npm/license/lodash)](https://badgen.net/npm/license/lodash)

# Making Table

With this library, you can effortlessly construct table structures by simply providing JSON data.

From 6.0.0, there is no other JS dependency anymore. Just Angular.

It works with angular version 2.0.0 and up
## Dependency

- You can utilize version 0.0.3 of the "making-table" library with any Angular version higher than 8.

## Installation

You can get it on npm.


```bash
  npm install making-table
```
 - Open your module file e.g app.module.ts and update imports array

 - If you're using Angular 16 or 17, please navigate to the component.ts file and ensure to update the imports array accordingly.

 ```typescript
    import { MakingTable } from 'making-table';
    ...
    imports: [
    ...
        MakingTable,
    ...
    ]
 ```
## Usage

### Copy source

This library support multiple kinds of copy source.

 - Setting tableData attribute
 - open component.html file

```HTML
<makingTable [table]="table" (exportEditingArray)="exportData($event)"></makingTable>
```

 - open component.ts file
 - make the tableData array

```typescript
    tableData: any = {
    headerName: [
      { displayName: "Name", sort: true, id: 'name', editable: true, type: 'text' },
      { displayName: "Age", sort: true, id: 'age', editable: true, type: 'number' },
      { displayName: "Gender", sort: false, id: 'gender', editable: true, type: 'select', selectFieldValues: ['male', 'female', 'others'] },
      { displayName: "Email", sort: false, id: 'email', editable: false, type: 'email' },
      { displayName: "Phone Number", sort: false, id: 'phoneNo', editable: true, type: 'tel' },
      { displayName: "Flat No", sort: false, id: 'flatNo', editable: false, type: 'number' },
      { displayName: "Tower Number", sort: false, id: 'towerNo', editable: false, type: 'number' },
      { displayName: "Socity", sort: false, id: 'socity', editable: false, type: 'text' },
      { displayName: "Sector", sort: false, id: 'sector', editable: false, type: 'text' },
      { displayName: "State", sort: false, id: 'state', editable: false, type: 'text' },
      { displayName: "Country", sort: false, id: 'country', editable: false, type: 'text' }
    ],
    data: [
      { name: 'Ram', age: '23', gender: 'male', email: 'ram@gmail.com', phoneNo: '+91 0000000000' },
      { name: 'Vivek', age: '24', gender: 'male', email: 'vivek@gmail.com', phoneNo: '+91 0000000000' },
      { name: 'Mohan', age: '22', gender: 'male', email: 'Mohan@gmail.com', phoneNo: '+91 0000000000' }
    ],
    manageDisplayData: false,
    makeTableData: [],
    allbtn: {
      alldownload_btn: true,
      alldownload_btnValue: 'All Download',
      alldownload_btnStyle: { 'background-color': 'skyblue', 'width': '200px', 'height': '40px', 'margin-top': '50px' },
      download_as_pagination: true,
      download_as_pagination_btnValue: 'Download Excel by Page',
      download_as_pagination_btnStyle: { 'background-color': 'skyblue', 'width': '200px', 'height': '40px', 'margin-top': '50px' },
      savebtn: true,
      savebtnValue: 'Save data',
      save_btnstyle: { 'background-color': 'skyblue', 'width': '100px', 'height': '40px', 'margin-top': '50px' },
    },
    allbtnStyle: { 'display': 'flex', 'justify-content': 'space-evenly' },
    paginationNoS: [5, 10, 15, 20, 30, 50],
    paginationSelected: 10,
    table_style: {},
    th_style: { 'background-color': 'gray' },
    td_style: {}
  }
```

### Note
 - In headerName columns Id will be match with data keys 
 #### Ex.
  ``` HTML
  { displayName: "Name", sort: true, id: 'name', editable: true, type: 'text' }
  ```
  - The identifier name(id: 'name') corresponds to the key data name (data:  [ { name(Key): 'Ram'(Value) } ]).


### Export Table

 - Within the makingTable tag, there's an event called exportEditingArray that allows you to export table data.
 - You have the flexibility to choose any name for the function exportData($event) and include it in your component.ts file.

```typescript
<makingTable [table]="tableData" (exportEditingArray)="exportData($event)"></makingTable>
```



## Usage/Examples

### Build Project
```cmd
  npm i && npm run build
```

To run demo code locally

