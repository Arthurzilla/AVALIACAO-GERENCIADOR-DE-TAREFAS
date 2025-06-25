import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriacaoDeTarefaPage } from './criacao-de-tarefa.page';

describe('CriacaoDeTarefaPage', () => {
  let component: CriacaoDeTarefaPage;
  let fixture: ComponentFixture<CriacaoDeTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoDeTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
