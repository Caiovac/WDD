import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Itinerario } from './itinerario';

describe('Itinerario', () => {
  let component: Itinerario;
  let fixture: ComponentFixture<Itinerario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Itinerario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Itinerario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
