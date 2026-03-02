import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfManagementPage } from './pnf.management.page';

describe('PnfManagementPage', () => {
  let component: PnfManagementPage;
  let fixture: ComponentFixture<PnfManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnfManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnfManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
