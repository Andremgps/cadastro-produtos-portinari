import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCategoriasComponent } from './adm-categorias.component';

describe('AdmCategoriasComponent', () => {
  let component: AdmCategoriasComponent;
  let fixture: ComponentFixture<AdmCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
