import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLibraryPage } from './my.library.page';

describe('MyLibraryPage', () => {
  let component: MyLibraryPage;
  let fixture: ComponentFixture<MyLibraryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLibraryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLibraryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
