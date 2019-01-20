import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodData } from './FoodData';

@Injectable()
export class NutritionixServiceService {
  appID = '861a7f2e';
  appKey = 'ae4fbd8b8305137d0b3851b38100356e';
  headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'x-app-id': this.appID,
      'x-app-key': this.appKey,
      'x-remote-user-id': '0'
    });
  }
  getParsedRecipe(recipeString) {
    return this.http.post<any>(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query: recipeString },
      { headers: this.headers }
    );
  }
}
