const ingredients = [
  "Eggs",
  "Tomato",
  "Onion",
  "Garlic",
  "Chicken",
  "Beef",
  "Pasta",
  "Rice",
  "Potato",
  "Carrot",
  "Cheese",
  "Milk",
  "Butter",
  "Flour",
  "Bread",
  "Olive Oil",
  "Bell Pepper",
  "Mushroom",
  "Spinach",
  "Lettuce",
  "Cucumber",
  "Corn",
  "Peas",
  "Beans",
  "Lemon",
  "Yogurt",
  "Cream",
  "Salt",
  "Black Pepper",
  "Parsley",
  "Chickpeas",
  "Zucchini",
  "Mayonnaise"
];


// ===============================
// Select Elements
// ===============================

const ingredientsList = document.querySelector(".ingredients-list");
const form = document.querySelector("form");
const findYourRecipes = document.querySelector(".find-your-recipes");
const recipesGrid = document.querySelector(".recipes-grid");
const ingredientError = document.querySelector(".ingredient-error");
const cookingSection = document.querySelector(".Cooking-section");
const cookingContent = document.querySelector(".cooking-content");
const loading = document.querySelector(".loading");


// ===============================
// Create Ingredients
// ===============================

ingredients.forEach((ingredient) => {

  const ingredientItem = document.createElement("div");

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.id = ingredient;
  checkbox.value = ingredient;


  const label = document.createElement("label");

  label.textContent = ingredient;
  label.setAttribute("for", ingredient);


  ingredientItem.appendChild(checkbox);
  ingredientItem.appendChild(label);

  ingredientsList.appendChild(ingredientItem);

});


// ===============================
// Form Submit
// ===============================

form.addEventListener("submit", (e) => {

  e.preventDefault();


  // ===============================
  // Get Selected Ingredients
  // ===============================

  let selectedIngredients = [];


  const checkboxes = document.querySelectorAll(
    '.ingredients-list input[type="checkbox"]'
  );


  for (let i = 0; i < checkboxes.length; i++) {

    if (checkboxes[i].checked) {

      selectedIngredients.push(checkboxes[i].value);

    }

  }


  // ===============================
  // Check If Nothing Selected
  // ===============================

  if (selectedIngredients.length === 0) {

    ingredientError.style.display = "block";

    return;

  }


  ingredientError.style.display = "none";


  // ===============================
  // Show Loading
  // ===============================

  loading.style.display = "flex";


  // ===============================
  // Temporary Test
  // Keep Loading Visible For 5 Seconds
  // ===============================

  setTimeout(() => {

    loading.style.display = "none";

  }, 3000);


  // ===============================
  // Fetch Recipes
  // ===============================

  fetch("recipes.json")

    .then((result) => {

      return result.json();

    })

    .then((myData) => {


      // ===============================
      // Calculate Recipe Matches
      // ===============================

      const matchedRecipes = myData.map((recipe) => {

        let matches = 0;


        recipe.ingredients.forEach((ingredient) => {

          if (selectedIngredients.includes(ingredient)) {

            matches++;

          }

        });


        return {
          ...recipe,
          matches
        };

      });


      // ===============================
      // Sort Recipes
      // ===============================

      matchedRecipes.sort((a, b) => {

        return b.matches - a.matches;

      });


      // ===============================
      // Get Top 4 Recipes
      // ===============================

      const topRecipes = matchedRecipes.slice(0, 4);


      console.log(topRecipes);


      // ===============================
      // Clear Old Recipes
      // ===============================

      recipesGrid.innerHTML = "";


      // ===============================
      // Create Recipe Cards
      // ===============================

      topRecipes.forEach((recipe) => {


        const recipeCard = document.createElement("div");

        recipeCard.classList.add("recipe-card");


        // ===============================
        // Recipe Card HTML
        // ===============================

        recipeCard.innerHTML = `

          <img
            src="${recipe.image}"
            alt="${recipe.name}"
          >

          <div class="recipe-card-info">

            <h3>${recipe.name}</h3>

            <p>${recipe.description}</p>

            <span>${recipe.time}</span>

            <span>⭐ ${recipe.rating}</span>


            <div class="recipe-ingredients">

              ${recipe.ingredients.map((ingredient) => `

                <span>${ingredient}</span>

              `).join("")}

            </div>


            <button
              type="button"
              id="start-cooking"
            >
              Start Cooking
            </button>

          </div>

        `;


        // ===============================
        // Get Start Cooking Button
        // ===============================

        const startCooking =
          recipeCard.querySelector("#start-cooking");


        // ===============================
        // Start Cooking Event
        // ===============================

        startCooking.addEventListener("click", () => {


          console.log("Selected recipe:", recipe.name);


          // ===============================
          // Fetch Cooking Data
          // ===============================

          fetch("cooking.json")

            .then((result) => {

              return result.json();

            })

            .then((cookingData) => {


              // ===============================
              // Find Selected Recipe
              // ===============================

              const selectedRecipe = cookingData.find((item) => {

                return item.name === recipe.name;

              });


              console.log(
                "Cooking recipe:",
                selectedRecipe
              );


              // ===============================
              // Check If Recipe Exists
              // ===============================

              if (!selectedRecipe) {

                console.error(
                  "Cooking information not found for:",
                  recipe.name
                );

                return;

              }


              // ===============================
              // Display Cooking Section
              // ===============================

              cookingContent.innerHTML = `

                <div class="cooking-header">

                  <h2>${selectedRecipe.name}</h2>

                  <p>${recipe.description}</p>

                  <div class="cooking-meta">

                    <span>
                      👥 ${selectedRecipe.servings} Servings
                    </span>

                    <span>
                      ⏱ Prep: ${selectedRecipe.prepTime}
                    </span>

                    <span>
                      🔥 Cook: ${selectedRecipe.cookTime}
                    </span>

                    <span>
                      📊 ${selectedRecipe.difficulty}
                    </span>

                  </div>

                </div>


                <div class="cooking-body">


                  <div class="cooking-ingredients">

                    <h3>Ingredients</h3>

                    <div class="cooking-ingredients-list">

                      ${selectedRecipe.ingredients.map((ingredient) => `

                        <div class="cooking-ingredient">

                          <span>
                            ${ingredient.name}
                          </span>

                          <span>
                            ${ingredient.amount}
                          </span>

                        </div>

                      `).join("")}

                    </div>

                  </div>


                  <div class="cooking-steps">

                    <h3>Cooking Steps</h3>

                    <ol>

                      ${selectedRecipe.steps.map((step) => `

                        <li>${step}</li>

                      `).join("")}

                    </ol>

                  </div>


                </div>


                <div class="cooking-extra">


                  <div class="cooking-tips">

                    <h3>Tips</h3>

                    <ul>

                      ${selectedRecipe.tips.map((tip) => `

                        <li>${tip}</li>

                      `).join("")}

                    </ul>

                  </div>


                  <div class="cooking-equipment">

                    <h3>Equipment</h3>

                    <ul>

                      ${selectedRecipe.equipment.map((item) => `

                        <li>${item}</li>

                      `).join("")}

                    </ul>

                  </div>


                </div>

              `;


              // ===============================
              // Show Cooking Section
              // ===============================

              cookingSection.style.display = "block";


              // ===============================
              // Scroll To Cooking Section
              // ===============================

              cookingSection.scrollIntoView({
                behavior: "smooth"
              });


            })

            .catch((error) => {

              console.error(
                "Error loading cooking.json:",
                error
              );

            });

        });


        // ===============================
        // Add Recipe Card To Page
        // ===============================

        recipesGrid.appendChild(recipeCard);

      });


      // ===============================
      // Show Recipes Section
      // ===============================

      findYourRecipes.style.display = "block";


      // ===============================
      // Scroll To Recipes
      // ===============================

      findYourRecipes.scrollIntoView({
        behavior: "smooth"
      });


    })

    .catch((error) => {

      console.error(
        "Error loading recipes.json:",
        error
      );

    });

});