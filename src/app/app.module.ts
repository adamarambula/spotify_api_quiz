import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PlayGameComponent } from './play-game/play-game.component';
import { CheckAnswerComponent } from "./check-answer/check-answer.component";
import { ResultsComponent } from './results/results.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { AnswerChoiceComponent } from './play-game/answer-choice/answer-choice.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "check-answer", component: CheckAnswerComponent},
  { path: "results", component: ResultsComponent},
  { path: "leader-board", component: LeaderBoardComponent},
  { path: "play-game", component: PlayGameComponent}
]

@NgModule({
  declarations: [AppComponent, HomeComponent, PlayGameComponent, CheckAnswerComponent, ResultsComponent, LeaderBoardComponent, AnswerChoiceComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
