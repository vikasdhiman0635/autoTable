import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTableComponent } from './Making-table';

describe('AutoTableComponent', () => {
  let component: AutoTableComponent;
  let fixture: ComponentFixture<AutoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AutoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
