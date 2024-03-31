import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  titlePositionNumber: number = this.appComponent.count;

  answerOne: string = "";
  answerTwo: string = "";
  answerThree: string = "";
  answerFour: string = "";

  finalSelectedChoice: string | null = null; 
  selectedAnswer: string | null = null; 
  selectedChoice: string | null = null;
  choices: string[] = ["A", "B", "C", "D"];

  randomNumber: number = Math.floor(Math.random() * 4);
  correctAnswer: string= "";

  audioUrl: string = "";

  titleNumber: string[] = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth', 
    'Ninth', 
    'Tenth'
  ]

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {

    //Removes all the null previews before initializing 
    this.removeAllNullPreviewUrlsAndNullTrackNames(this.appComponent.songList)
    console.log("length " + this.appComponent.songList.length)

    //Initializes the values
    this.answerOne = (this.appComponent.songList[0] as any).track.name;
    this.answerTwo = (this.appComponent.songList[1] as any).track.name;
    this.answerThree = (this.appComponent.songList[2] as any).track.name;
    this.answerFour  = (this.appComponent.songList[3] as any).track.name;

    this.correctAnswer = this.choices[this.randomNumber];

    this.appComponent.songsPlayedName.push((this.appComponent.songList[this.randomNumber] as any).track.name)

    this.audioUrl = (this.appComponent.songList[this.randomNumber] as any).track.preview_url;

    console.log("Answer " + this.correctAnswer)
    console.log((this.appComponent.songList[this.randomNumber] as any).track.name)
    console.log("preview url " + this.audioUrl)

    this.appComponent.isCorrect = false;

    this.removePlayedSong(this.appComponent.songList, (this.appComponent.songList[this.randomNumber] as any).track.name)
    
  }

  handleAnswer(answer: string) {
    // Update the selectedAnswer whenever a choice is selected
    this.selectedAnswer = answer;
  
    // Update the finalSelectedChoice with the selectedAnswer
    this.finalSelectedChoice = answer;
  }
  
  onSubmit() {
    console.log("song played lis " + this .appComponent.songsPlayedName)
    // Perform any action with the finalSelectedChoice
    if (this.finalSelectedChoice) {
      console.log(`final selected choice: ${this.finalSelectedChoice}`);
      if (this.finalSelectedChoice === this.correctAnswer) {
        console.log("Correct!!");
        this.appComponent.isCorrect = true;
        this.appComponent.currentScore++;
      } else {
        console.log("Incorrect");
        this.appComponent.wrongAnswers++;
        if (this.appComponent.isHard && this.appComponent.wrongAnswers >= 3) {
          console.log("Missed 3 questions, lost hard mode");
          this.appComponent.lostHardMode = true;
        }
      }
    } else {
      //TODO: Figure out why it is not working?
      console.log("No choice selected yet. Choice is required.");
      // Display an error message to prompt the user to make a selection
      alert("Choice is required. Please select an option.");
      return; // Don't proceed with submission if choice is not selected
    }
  
    // Call the titleCount method here or refactor as needed
    this.titleCount();
  }
  
  onAnswerSelected(choice: string) {
    this.finalSelectedChoice = choice;
  }

  titleCount() {
    this.appComponent.count += 1;
    this.appComponent.shuffleArray(this.appComponent.songList);
  }

  removeAllNullPreviewUrlsAndNullTrackNames(array: object[]): void {
    // Filtering out objects with null preview_url property
    const filteredArray = array.filter(item => 
      (item as any).track.name !== null && (item as any).track.name !== undefined &&
      (item as any).track.preview_url !== null
    );

    // Reassign the original array with the filtered array
    array.length = 0;
    Array.prototype.push.apply(array, filteredArray);
    console.log("----- REMOVED NULL PREVIEWS AND TRACKS ");
    console.log("----- Songlist array length: " + array.length);
}

removePlayedSong(array: object[], name: string): void {
  // Filtering out objects with the provided name
  const filteredArray = array.filter(item => (item as any).track.name !== name);
  // console.log("deleted " + name)

  // Reassign the original array with the filtered array
  array.length = 0;
  Array.prototype.push.apply(array, filteredArray);
  console.log("----- REMOVED PLAYED SONG ");
  console.log("----- Songlist array length: " + array.length);
}

}


