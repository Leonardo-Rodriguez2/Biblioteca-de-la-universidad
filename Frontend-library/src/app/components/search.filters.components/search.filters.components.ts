import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-filters-components',
  templateUrl: './search.filters.components.html',
  styleUrls: ['./search.filters.components.css'],
})
export class SearchFiltersComponents {

  @Input()
  public filterCriteria: any[] = [];
  
}
