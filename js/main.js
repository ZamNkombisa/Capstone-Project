document.addEventListener("DOMContentLoaded", function () {
  //Sample recipes data
  const recipes = [
    {
      id: "one",
      name: "A5 Wagyu beef with Omelette on top",
      img: "./images/A5 Wagyu.jpg",
      ingredients: [
        "Wagyu Beef",
        "Eggs",
        "Salt",
        "Soy Sauce",
        "Hot Sauce",
        "Pepper",
        "Red Pepper flakes",
        "Paprika",
      ],
    },
    {
      id: "two",
      name: "Chicharon with Guacamole",
      img: "./images/Guacamole.jpeg",
      ingredients: [
        "Pork Belly",
        "Cooking Oil",
        "Olive Oil",
        "Yellow and Red onions",
        "Garlic",
        "Avocado",
        "Lime",
        "Black Pepper",
        "Pepper Corns",
        "Bay Leaves",
        "Salt",
      ],
    },
    {
      id: "three",
      name: "Tornado Eggplant with Pork Belly",
      img: "./images/Eggplant.jpg",
      ingredients: [
        "Eggplant",
        "Pork Belly(slices)",
        "Cheese slices",
        "Pasta Sauce",
        "Salt",
        "Paprika",
        "Black Pepper",
        "Garlic Powder",
        "Olive Oil",
      ],
    },
  ];

  //Function to render recipe cards on the page
  function renderRecipeCards() {
    const recipeCardsDiv = document.getElementById("recipeCards");

    recipes.forEach((recipe) => {
      const existingCard = document.getElementById(`recipe-card-${recipe.id}`);
      if (existingCard) {
        return;
      }

      //Creating HTML for recipe card
      const recipeCard = document.createElement("div");
      recipeCard.id = `recipe-card-${recipe.id}`;
      recipeCard.className = "col-md-4";
      recipeCard.innerHTML = `
        <div class="card">
          <img class="card-img-top img-fluid" src="${recipe.img}" alt="${recipe.name}">
          <div class="card-body">
            <h4 class="card-title">${recipe.name}</h4>
            <button class="btn btn-primary save-for-later">Save for later</button>
          </div>
        </div>
      `;

      //Adding click event listener to "Save for later" button
      recipeCard
        .querySelector(".save-for-later")
        .addEventListener("click", function () {
          saveForLater(recipe);
        });

      recipeCardsDiv.appendChild(recipeCard);
    });
  }

  //Function to save a recipe for later in local storage
  function saveForLater(recipe) {
    const savedRecipes = getSavedRecipes();
    savedRecipes.push(recipe);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert("Recipe saved for later!");
  }

  //Function to get saved recipes from local storage
  function getSavedRecipes() {
    const savedRecipes = localStorage.getItem("savedRecipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  }

  document
    .getElementById("reviewForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const recipeId = "one";
      const userId = 1990;
      const rating = document.getElementById("rating").value;
      const comment = document.getElementById("comment").value;

      try {
        const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, rating, comment }),
        });

        if (response.ok) {
          // Handle successful review submission (e.g., update UI)
        } else {
          // Handle error response
          console.error("Failed to submit review");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

  //Load recipe cards on page load
  renderRecipeCards();
});
