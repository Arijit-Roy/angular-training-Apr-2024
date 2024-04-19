import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrl: './filter-product.component.css'
})
export class FilterProductComponent {
  @Output('filterValueChanged') filterTextChanged = new EventEmitter<string>();
  filterText = '';
  setFilterText(value: string){
    this.filterText = value;
    this.filterTextChanged.emit(this.filterText)
  }
}
