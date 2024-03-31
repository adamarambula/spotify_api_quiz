import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { AppComponent } from '../app.component';

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  genreKeyPairs: { [key: string]: string } = {
    'rock': '37i9dQZF1DWXRqgorJj26U?si=4c6f4740439b4da8',
    'rap': '37i9dQZF1DX0XUsuxWHRQd?si=7850ab6551f44e44',
    'pop': '37i9dQZF1DXcBWIGoYBM5M?si=273655aab9a74df0',
    'country': '37i9dQZF1EQmPV0vrce2QZ?si=c2a96810183449bf',
    'hip-hop': '37i9dQZF1EQnqst5TRi17F?si=f7ad3110a2744a34',
    'jazz': '37i9dQZF1DXbITWG1ZJKYt?si=051ddd188e624076',
    'alternative': '37i9dQZF1DX9GRpeH4CL0S',
    'j-pop': '37i9dQZF1DXdbRLJPSmnyq',
    'k-pop': '3Ir5YWemOTGRRfXgROrsDV?si=08377f2607934049',
    'emo': '37i9dQZF1EIhAUAaVF0Kop?si=b2e1320d1dd74c7d'
  };
 
  local_SelectedGenre: String = "";
  local_SelectedLevel: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  //Note* make play list dynamic 
  playlistRequest: string = "";
  songList: object[] = [];

  isPlayButtonDisable = false;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    console.log("INIT HOME");
    this.local_SelectedGenre = this.appComponent.selectedGenre; // persistence
    this.local_SelectedLevel = this.appComponent.selectedLevel; // persistence

    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
    });

    
  }

  loadGenres = async (t: any) => {
    this.configLoading = true;
    
     this.genres = [
       "rock",
       "rap",
       "pop",
       "country",
       "hip-hop",
       "jazz",
       "alternative",
       "j-pop",
       "k-pop",
       "emo"
     ]
    this.configLoading = false;

  };

  async setGenre(genre: any) {
    this.local_SelectedGenre = genre;
    this.appComponent.selectedGenre = genre; // Save selection to appComponent
    console.log(this.local_SelectedGenre);

    if (genre === "") {
      console.log("Empty, no request made");
    }
    else {

      if (this.genreKeyPairs.hasOwnProperty(genre)) {
        this.playlistRequest = "playlists/" + this.genreKeyPairs[genre];
      } 
      else {
        console.log("PLAYLIST NOT FOUND");
      }
  
      const response = await fetchFromSpotify({
        token: this.token,
        endpoint: this.playlistRequest
      });
  
      if (response.hasOwnProperty("tracks")) {
        if (response.tracks.hasOwnProperty("items")) {
          this.songList = response.tracks.items;
        } 
        else {
          console.log("ITEMS NOT FOUND");
        }
      } 
      else {
        console.log("TRACKS NOT FOUND");
      }
  
      this.shuffleArray(this.songList); // Mutating shuffle

    }

  }

  onLevelChange() {
    // Set isHard based on the selected level
    if (this.local_SelectedLevel === 'easy') {
      this.appComponent.selectedLevel = 'easy'; // Save selection to appComponent
      this.appComponent.isHard = false;
    } else if (this.local_SelectedLevel === 'hard') {
      this.appComponent.selectedLevel = 'hard'; // Save selection to appComponent
      this.appComponent.isHard = true;
    }
  }

  onPlayButtonClick() {
    this.setGenre(this.local_SelectedGenre); // BUG FIX: Resets the genre before every game, avoids running out of songs
    // RESET Game logic variables
    this.appComponent.lostHardMode = false; // This prevents a previous loss state from continuing into the next game
    this.appComponent.wrongAnswers = 0;
    this.appComponent.count = 0;
    console.log("lostHardMode: " + this.appComponent.lostHardMode);
    console.log("selectedLevel: " + this.appComponent.selectedLevel);
    console.log("isHard: " + this.appComponent.isHard);
    console.log("wrongAnswers: " + this.appComponent.wrongAnswers);
    console.log("count: " + this.appComponent.count);
  }

  shuffleArray(array: object[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //Needed to iniatlized here because I couldn't inject HomeComponent
    this.appComponent.songList=array;
  }

  hardModeLeaderboard(): void{
    this.appComponent.isHard = true;
  }

}
