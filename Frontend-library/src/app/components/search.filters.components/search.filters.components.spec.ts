import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersComponents } from './search.filters.components';

describe('SearchFiltersComponents', () => {
  let component: SearchFiltersComponents;
  let fixture: ComponentFixture<SearchFiltersComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
