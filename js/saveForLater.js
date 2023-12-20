document.addEventListener("DOMContentLoaded", function () {
  //Function to render saved recipe cards
  function renderSavedRecipeCards() {
    //Get the element where saved recipe cards will be displayed
    const savedRecipeCardsDiv = document.getElementById("savedRecipeCards");
    //Retrieve saved recipes from local storage
    const savedRecipes = getSavedRecipes();

    //Loop through saved recipes and create a card for each
    savedRecipes.forEach((recipe) => {
      //Create a new card element for the saved recipe
      const savedRecipeCard = document.createElement("div");
      savedRecipeCard.className = "col-md-4";
      savedRecipeCard.innerHTML = `
        <div class="card">
          <img class="card-img-top img-fluid" src="${recipe.img}" alt="${
        recipe.name
      }">
          <div class="card-body">
            <h4 class="card-title">${recipe.name}</h4>
            <h5>Ingredients:</h5>
            <ul>
              ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      `;

      //Append the saved recipe card to the container
      savedRecipeCardsDiv.appendChild(savedRecipeCard);
    });
  }

  //Function to get saved recipes from local storage
  function getSavedRecipes() {
    //Retrieve saved recipes from local storage or return an empty array
    const savedRecipes = localStorage.getItem("savedRecipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  }

  //Load saved recipe cards on page load
  renderSavedRecipeCards();
});
