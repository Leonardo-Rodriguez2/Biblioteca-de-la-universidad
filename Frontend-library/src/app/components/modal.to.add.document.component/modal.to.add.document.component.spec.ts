import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddDocumentComponent } from './modal.to.add.document.component';

describe('ModalToAddDocumentComponent', () => {
  let component: ModalToAddDocumentComponent;
  let fixture: ComponentFixture<ModalToAddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalToAddDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalToAddDocumentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
