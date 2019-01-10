import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
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
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(
          'https://trackapi.nutritionix.com/v2/natural/nutrients',
          { query: recipeString },
          { headers: this.headers }
        )
        .toPromise()
        .then(res => {
          const {
            food_name,
            nf_calories,
            nf_protein,
            nf_total_fat,
            serving_qty,
            serving_unit
          } = res['foods'][0];
          resolve({
            Name: food_name,
            Calories: nf_calories,
            Protein: nf_protein,
            Fat: nf_total_fat,
            Quantity: serving_qty,
            Unit: serving_unit
          });
        })
        .catch(e => {
          reject(e);
        });
    });
    return promise;
  }
}
