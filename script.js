console.log("JS WORKING");


// ===============================
// Recipes
// ===============================

let recipes = [];


// ===============================
// Select Elements
// ===============================

const recipeImage = document.querySelector(".recipe-image img");

const recipeName = document.querySelector(".recipe-info h3");

const recipeRating = document.querySelector(
  ".recipe-meta span:first-child"
);

const recipeTime = document.querySelector(
  ".recipe-meta span:last-child"
);

const recipeDescription = document.querySelector(
  ".recipe-info p"
);

const currentRecipeNumber = document.querySelector(
  "#current-recipe"
);

const totalRecipeNumber = document.querySelector(
  "#total-recipes"
);

const prevButton = document.querySelector(".prev");

const nextButton = document.querySelector(".next");
const recipeLink = document.querySelector(".recipe-link");
let currentRecipe = 0;


// ===============================
// Show Recipe
// ===============================

function showRecipe() {

  console.log("showRecipe WORKING");

  const recipe = recipes[currentRecipe];
  recipeLink.href = `recipe-details.html?name=${encodeURIComponent(recipe.name)}`;  //!Converts text into a URL-safe format encodeURIComponent(recipe.name)  
     
  const recipeDisplay = document.querySelector(".recipe-display");

  recipeDisplay.classList.add("recipe-changing");


  setTimeout(() => {

    recipeImage.src = recipe.image;

    recipeName.textContent = recipe.name;

    recipeRating.textContent = `⭐ ${recipe.rating}`;

    recipeTime.textContent = `⏱ ${recipe.time}`;

    recipeDescription.textContent = recipe.description;

    currentRecipeNumber.textContent = currentRecipe + 1;//  لانها zero based

    totalRecipeNumber.textContent = recipes.length;


    recipeDisplay.classList.remove("recipe-changing");

  }, 500);

}


// ===============================
// Fetch Recipes
// ===============================

fetch("recipes.json")

  .then((result) => {

    return result.json();

  })

  .then((data) => {

    recipes = data;
      recipes.forEach((recipe) => {
        const img = new Image();
        img.src = recipe.image;
    });
    totalRecipeNumber.textContent = recipes.length;

    showRecipe();

  })

  .catch((error) => {

    console.error("Error loading recipes.json:", error);

  });


// ===============================
// Next Button
// ===============================

nextButton.addEventListener("click", () => {

  if (currentRecipe < recipes.length - 1) {

    currentRecipe++;

    showRecipe();

  }

});


// ===============================
// Previous Button
// ===============================

prevButton.addEventListener("click", () => {

  if (currentRecipe > 0) {

    currentRecipe--;

    showRecipe();

  }

});