import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagementPage } from './document.management.page';

describe('DocumentManagementPage', () => {
  let component: DocumentManagementPage;
  let fixture: ComponentFixture<DocumentManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
