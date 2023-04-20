import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropNameComponent } from './drop-name.component';

describe('DropNameComponent', () => {
  let component: DropNameComponent;
  let fixture: ComponentFixture<DropNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
