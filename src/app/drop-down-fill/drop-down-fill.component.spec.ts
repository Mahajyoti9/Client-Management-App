import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFillComponent } from './drop-down-fill.component';

describe('DropDownFillComponent', () => {
  let component: DropDownFillComponent;
  let fixture: ComponentFixture<DropDownFillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownFillComponent]
    });
    fixture = TestBed.createComponent(DropDownFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
