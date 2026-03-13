import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyManagementPage } from './categoty.management.page';

describe('CategotyManagementPage', () => {
  let component: CategotyManagementPage;
  let fixture: ComponentFixture<CategotyManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategotyManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategotyManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
