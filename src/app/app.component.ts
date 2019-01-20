import { Component, Input, Output } from '@angular/core';
import { NutritionixServiceService } from './nutritionix-service.service';
import { FoodData } from './FoodData';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularTest';
  recipeInput: string;
  name: string;
  image: string;
  nf_calories: number;
  nf_total_carbohydrate: number;
  nf_protein: number;
  nf_total_fat: number;
  serving_qty: number;

  constructor(private nutrixService: NutritionixServiceService) {}
  onSubmitForm() {
    event.preventDefault();
    const recipe = this.recipeInput;
    this.recipeInput = '';
    this.nutrixService.getParsedRecipe(recipe).subscribe(recipeData => {
      console.log(recipeData);
      this.name = recipeData.foods[0].food_name;
      this.image = recipeData.foods[0].photo.highres;
      this.nf_calories = recipeData.foods[0].nf_calories;
      this.nf_total_carbohydrate = recipeData.foods[0].nf_total_carbohydrate;
      this.nf_protein = recipeData.foods[0].nf_protein;
      this.nf_total_fat = recipeData.foods[0].nf_total_fat;
      this.serving_qty = recipeData.foods[0].serving_qty;
    });
    const element = document.querySelector('#results');
    element.classList.remove('hidden');
  }
}
