import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regali } from './regali';

describe('Regali', () => {
  let component: Regali;
  let fixture: ComponentFixture<Regali>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regali]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regali);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
