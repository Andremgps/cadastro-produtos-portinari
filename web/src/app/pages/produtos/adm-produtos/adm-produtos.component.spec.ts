import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmProdutosComponent } from './adm-produtos.component';

describe('AdmProdutosComponent', () => {
  let component: AdmProdutosComponent;
  let fixture: ComponentFixture<AdmProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
