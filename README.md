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
    <makingTable [tableData]="tableData"></makingTable>
```

- open component.ts file
- make the tableData array

```typescript
tableData: any = {
  headerName: [
    {
      displayName: "Name",
      sort: true,
      id: "name",
      editable: true,
      type: "text",
    },
    {
      displayName: "Age",
      sort: true,
      id: "age",
      editable: true,
      type: "number",
    },
    {
      displayName: "Gender",
      sort: false,
      id: "gender",
      editable: true,
      type: "select",
    },
    {
      displayName: "Email",
      sort: false,
      id: "email",
      editable: false,
      type: "email",
    },
    {
      displayName: "Phone Number",
      sort: false,
      id: "phoneNo",
      editable: false,
      type: "number",
    },
  ],
  data: [
    {
      name: "Ram",
      age: "23",
      gender: "male",
      email: "ram@gmail.com",
      phoneNo: "+91 0000000000",
    },
    {
      name: "Vivek",
      age: "24",
      gender: "male",
      email: "vivek@gmail.com",
      phoneNo: "+91 0000000000",
    },
    {
      name: "Mohan",
      age: "22",
      gender: "male",
      email: "Mohan@gmail.com",
      phoneNo: "+91 0000000000",
    },
  ],
  manageDisplayData: false,
  makeTableData: [],
  allbtn: {
    download_btn: true,
    download_btnValue: "Download Excel",
    download_btnStyle: { "background-color": "rgb(154, 134, 134)" },
    savebtn: true,
    savebtnValue: "Save data",
    savebtnstyle: { "background-color": "rgb(154, 134, 134)" },
  },
  allbtnStyle: { display: "flex", "justify-content": "space-evenly" },
};
```

### Note

- In headerName columns Id will be match with data keys

#### Ex.

```HTML
{ displayName: "Name", sort: true, id: 'name', editable: true, type: 'text' }
```

- The identifier name(id: 'name') corresponds to the key data name (data: [ { name(Key): 'Ram'(Value) } ]).

## Usage/Examples

### Build Project

```cmd
  npm i && npm run build
```

To run demo code locally

## License

[MIT](https://choosealicense.com/licenses/mit/)
