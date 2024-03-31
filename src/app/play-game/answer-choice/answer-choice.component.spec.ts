import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerChoiceComponent } from './answer-choice.component';

describe('AnswerChoiceComponent', () => {
  let component: AnswerChoiceComponent;
  let fixture: ComponentFixture<AnswerChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
