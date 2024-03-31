import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  easyLeaderboard: { name: string, score: number }[] = this.appComponent.easyLeaderboard;
  hardLeaderboard: { name: string, score: number }[] = this.appComponent.hardLeaderboard;

  ishard: boolean = this.appComponent.isHard;

  selectedLevel: String = this.appComponent.selectedLevel;

  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {

    //Sorts
    //If b.score - a.score is positive, it means b.score is greater than a.score, 
    //so b should come before a in the sorted array, effectively sorting the 
    //array in descending order of score.
    this.easyLeaderboard.sort((a, b) => b.score - a.score);
    this.hardLeaderboard.sort((a, b) => b.score - a.score);
  }

}
