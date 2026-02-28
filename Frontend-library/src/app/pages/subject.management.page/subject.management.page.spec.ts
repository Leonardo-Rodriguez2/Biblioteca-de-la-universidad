import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectManagementPage } from './subject.management.page';

describe('SubjectManagementPage', () => {
  let component: SubjectManagementPage;
  let fixture: ComponentFixture<SubjectManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
