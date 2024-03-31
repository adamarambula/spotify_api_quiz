import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  //All the gaming logic goes here
  isCorrect: boolean = false;
  currentScore: number = 0;
  songList: Object [] = [];
  count: number = 0;
  title: String = "angular-whos-who";
  previewURL: string = ""; // Updated by in play-game in the gnOnInit()
  selectedLevel: string = "";
  selectedGenre: string = "";
  isHard: boolean = false;
  wrongAnswers: number = 0;
  lostHardMode: boolean = false;
  songsPlayedName: string [] =[];
  hardLeaderboard: { name: string, score: number }[] = [];
  easyLeaderboard: { name: string, score: number }[] = [];


  constructor(){}
  
  shuffleArray(array: object[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  finalScore(): number {
    return this.currentScore / 10 * 100;
  }

}
