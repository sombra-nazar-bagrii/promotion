import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'promo-sorting-selector',
  templateUrl: './sorting-selector.component.html',
  styleUrls: ['./sorting-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingSelectorComponent implements OnInit {

  @Output() onSortingChange = new EventEmitter<boolean>();
  selectedOrder = 'Ascending';

  constructor() { }

  ngOnInit(): void {
  }

  setSortOrder(asc = true) {
    this.onSortingChange.emit(asc);
    this.selectedOrder = asc ? 'Ascending' : 'Descending'
  }
}
