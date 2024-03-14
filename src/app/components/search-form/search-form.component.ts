import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SortType } from 'src/app/core/enums/sort-type.enum';
import { RoomFilter } from 'src/app/core/models/rooms-resources.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input() filter: RoomFilter = {} as RoomFilter;
  @Input() sortBy: { column: string, sortType: SortType };
  @Input() enableSorting: boolean = false;


  @Output() public searchClick = new EventEmitter<RoomFilter>();
  @Output() public sortChange = new EventEmitter<{ column: string, sortType: SortType }>();

  minDate: Date;
  sortType = SortType;

  areaList: any[] = [
    { value: null, text: 'ROOM TYPE' },
    { value: 'STANDARD', text: 'STANDARD' },
    { value: 'DELUXE', text: 'DELUXE' },
    { value: 'SUITE', text: 'SUITE' }
  ];

  sortByList: any[] = [
    { value: null, text: 'SORT BY' },
    { value: 'PRICE', text: 'PRICE' },
    { value: 'TYPE', text: 'TYPE' },
    { value: 'NAME', text: 'NAME' }
  ];

  constructor() {
    this.minDate = new Date();
    this.minDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());

  }
  public toggleText = "Hide";
  public show = false;

  public onToggle(): void {
    this.show = !this.show;
    this.toggleText = this.show ? "Hidе" : "Show";
  }

  onSortClick(column: string, type: SortType) {
    if (this.isSortSelected(column, type))
      this.sortChange.emit({ column: '', sortType: null });
    else this.sortChange.emit({ column, sortType: type });
    this.show = !this.show;
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.searchClick.emit({ ...this.filter });
    } else {
      form.form.markAllAsTouched();
    }
  }

  isSortSelected(column: string, type: SortType) {
    return this.sortBy && this.sortBy.column == column && this.sortBy.sortType == type;
  }
}
