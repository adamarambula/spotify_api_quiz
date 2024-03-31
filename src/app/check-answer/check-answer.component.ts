import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer.component.html',
  styleUrls: ['./check-answer.component.css']
})
export class CheckAnswerComponent implements OnInit {

  submitted: number = this.appComponent.count;
  isCorrect: boolean = this.appComponent.isCorrect;
  currentScore: number = this.appComponent.currentScore;
  lostHardMode: boolean = this.appComponent.lostHardMode;

  randomNumber: number = Math.floor(Math.random() * 10);

  correct: string = "Correct";
  incorrect: string = "Incorrect";

  incorrectComments: string [] = [
    "Oops! Looks like your earbuds need a tune-up!",
    "That's a 'nope', but don't worry, even Beethoven had off days!",
    "Not quite, but hey, even rockstars hit a few flat notes!",
    "Uh-oh! Your music sense seems to be on mute.",
    "Close, but no cigar! Time to rock out with a different tune.",
    "Nope, not quite! But keep jamming, practice makes perfect!",
    "Eek! Looks like you're out of sync, but don't fret, we've got more melodies to explore!",
    "Not the right chord, but hey, it's all about the journey, right?",
    "Whoopsie daisy! That's a note we weren't expecting. Try again!",
    "Haha, nice try! But it seems your rhythm's gone rogue. Let's get back in sync!"
  ]

  correctComments: string [] = [
    "Bingo! You hit the right note! Rock on!",
    "Ding ding ding! We have a winner! You're a musical maestro!",
    "Bullseye! Your music knowledge is pitch-perfect!",
    "Congratulations! You're officially on the right track! Keep the beats coming!",
    "Bingo bango bongo! You nailed it! Time to celebrate with some groovy tunes!",
    "Bravo! Your musical instincts are spot-on! Keep the melodies flowing!",
    "Spot on! You've got the rhythm of a seasoned pro! Keep the hits coming!",
    "Hooray! You're a music genius! Keep dazzling us with your tunes!",
    "Hallelujah! You've unlocked the melody master achievement! Keep rocking!",
    "You're on fire! Your musical prowess knows no bounds! Keep the hits rolling!"
  ]


  constructor(private appComponent: AppComponent) { }

  ngOnInit(): void {

  }
}
