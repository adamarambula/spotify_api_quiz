import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-answer-choice',
  templateUrl: './answer-choice.component.html',
  styleUrls: ['./answer-choice.component.css']
})
export class AnswerChoiceComponent {
  @Input() choice: string = "";
  @Output() answerSelected = new EventEmitter<string>();
  @Input() isSelected: boolean = false;

  selectAnswer() {
    if (!this.isSelected) {
      this.isSelected = true;
      // Emit the selected choice directly
      this.answerSelected.emit(this.choice);
    }
  }
}
