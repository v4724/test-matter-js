import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePressedAndCreateComponent } from './mouse-pressed-and-create.component';

describe('ClickAndCreateComponent', () => {
  let component: MousePressedAndCreateComponent;
  let fixture: ComponentFixture<MousePressedAndCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MousePressedAndCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MousePressedAndCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
