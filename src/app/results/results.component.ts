import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  finalScore: number = this.appComponent.finalScore();

  playerName: string = "";

  ishard: boolean = this.appComponent.isHard;

  constructor(private appComponent: AppComponent, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // Handle form submission
    console.log(this.playerName);

    //Putting the players in the right leader board
    if(this.appComponent.selectedLevel === 'hard'){
      this.appComponent.hardLeaderboard.push({name: this.playerName, score: this.finalScore})
    }if(this.appComponent.selectedLevel === 'easy'){
      this.appComponent.easyLeaderboard.push({name: this.playerName, score: this.finalScore})
    }

    //Need to do it like this in order for the form to work
    this.router.navigateByUrl('/leader-board');

    //Reset final and current score
    this.finalScore = 0;
    this.appComponent.currentScore = 0;
 
  }

  onContinue(){
    this.finalScore = 0;
    this.appComponent.currentScore = 0;
  }

}
