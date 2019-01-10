import { Component, Input } from '@angular/core';
import { NutritionixServiceService } from './nutritionix-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularTest';
  recipeInput: string;
  @Input() food;
  constructor(private nutrixService: NutritionixServiceService) {}
  onSubmitForm() {
    const recipe = this.recipeInput;
    this.recipeInput = '';
    console.log(recipe);
    this.nutrixService.getParsedRecipe(recipe).then(res => {
      Object.assign(this.food, res);
      console.log(this.food);
    });
  }
}
