import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDocumentTeacherToVerifyComponent } from './cards.document.teacher.to.verify.component';

describe('CardsDocumentTeacherToVerifyComponent', () => {
  let component: CardsDocumentTeacherToVerifyComponent;
  let fixture: ComponentFixture<CardsDocumentTeacherToVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsDocumentTeacherToVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsDocumentTeacherToVerifyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
