import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDocumentTeacherComponent } from './cards.document.teacher.component';

describe('CardsDocumentTeacherComponent', () => {
  let component: CardsDocumentTeacherComponent;
  let fixture: ComponentFixture<CardsDocumentTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsDocumentTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsDocumentTeacherComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
