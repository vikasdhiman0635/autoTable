import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoTableService } from '../../auto-table.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-field-editor',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './field-editor.component.html',
  styleUrl: './field-editor.component.css'
})
export class FieldEditorComponent {
  textValue: any;

  headerfield: any;

  @Input({ required: true }) headers: any[] = [];
  @Input({ required: true }) fieldValue: any = "";
  @Input({ required: true }) fieldName: any = "";
  @Input({ required: true }) index: any;


  @Output() changeValue = new EventEmitter<any>();

  constructor(
    public stateService: AutoTableService
  ) { }

  ngOnInit() {
    this.headers.forEach((element: any) => {
      if (element.id === this.fieldName) {
        this.headerfield = element;
      }
    });
  }


  hideInput(event: any) {
    if (event.key === 'Enter') {
      this.stateService.editRecords[this.index] = this.stateService.tableData[this.index];
      this.stateService.tableData[this.index].checkbox = true;
      this.stateService.editSelectRecoredsIndex[this.index] = true;
      this.stateService.backupEditIndex[this.index] = true;
      this.stateService.tableData[this.index][this.fieldName] = this.fieldValue;
      this.stateService.displayIndex[this.index] = 0;
      this.stateService.tableData[this.index].checkbox = true;
    }
    else {
      this.stateService.displayIndex[this.index] = 0;
    }
  }

  cancelEdit() {
    this.stateService.displayIndex[this.index] = 0;
  }


}
