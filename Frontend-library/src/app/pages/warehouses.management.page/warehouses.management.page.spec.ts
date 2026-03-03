import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesManagementPage } from './warehouses.management.page';

describe('WarehousesManagementPage', () => {
  let component: WarehousesManagementPage;
  let fixture: ComponentFixture<WarehousesManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehousesManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousesManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
