// Get recipe name from URL

const params = new URLSearchParams(window.location.search);

const recipeName = params.get("name");


// Select Elements

const cookingSection =
  document.querySelector(".Cooking-section");

const cookingContent =
  document.querySelector(".cooking-content");


// Fetch Cooking Data

fetch("cooking.json")

  .then((result) => {

    return result.json();

  })

  .then((cookingData) => {


    // Find Selected Recipe

    const selectedRecipe = cookingData.find((item) => {

      return item.name === recipeName;

    });


    console.log("Selected recipe:", selectedRecipe);


    // Check If Recipe Exists

    if (!selectedRecipe) {

      console.error(
        "Cooking information not found for:",
        recipeName
      );

      return;

    }


    // Display Cooking Section

    cookingContent.innerHTML = `

      <div class="cooking-header">

        <h2>${selectedRecipe.name}</h2>

        <p>${selectedRecipe.description}</p>

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


    // Show Cooking Section

    cookingSection.style.display = "block";

  })


  .catch((error) => {

    console.error(
      "Error loading cooking.json:",
      error
    );

  });