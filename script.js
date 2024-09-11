let search = document.querySelector("#search");
let btn = document.querySelector("#btn");
let recipeContainer = document.querySelector(".recipe-container");

// sideMenu function
const sideMenu = document.querySelector("#sideMenu");

function openMenu(){
      sideMenu.style.transform = "translateX(-16rem)";
}
function closeMenu(){
      sideMenu.style.transform = "translateX(16rem)";
}

// function to get recipe
const getRecipe = async(value) => {
      recipeContainer.innerHTML = `<h2 class="font-medium text-center text-2xl md:text-3xl my-3 text-indigo-600">Fetching Recipe :-</h2>`;
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
      const data = await res.json()
      // console.log(data.meals[0]);
      recipeContainer.innerHTML = ""
      let recipes = ""
      data.meals.forEach(meal => {
            // console.log(meal.length);
            recipes +=`<div class="max-w-sm rounded-lg shadow-lg overflow-hidden mb-3 bg-white">
                              <div class="md:flex">
                                    <img src="${meal.strMealThumb}" class="w-full object-cover h-48" srcset="">
                              </div>
                              <div class="p-8 text-center">
                                    <div class="uppercase tracking-wide text-2xl text-indigo-600 font-semibold">${meal.strMeal}</div>
                                    <button type="button"  class="viewBtn mt-1 font-medium text-red-500 underline cursor-pointer hover:text-red-600">View Recipe</button>
                              </div>
                        </div>`
            recipeContainer.innerHTML = recipes;

            const viewBtn = document.querySelectorAll(".viewBtn");

            viewBtn.forEach(btn => {
                  btn.addEventListener("click", () => {
                        openPopup(meal)
                  })
            })

            
            
      });
      
      

}

btn.addEventListener("click", (e) => {
      e.preventDefault()
      let searchValue = search.value.trim()
      getRecipe(searchValue);
      console.log(search.value,"btn is here");
      
});

// function for popup
const openPopup = (meal) => {
      const modal = document.getElementById("recipeModal");
      const modalMealTitle = document.getElementById("modalMealTitle");
      const modalIngredients = document.getElementById("modalIngredients");
      const modalInstructions = document.getElementById("modalInstructions");
      const closeModal = document.getElementById("closeModal");

      modalMealTitle.innerText = meal.strMeal;
            console.log(meal.strInstructions);
            
      modalInstructions.textContent = meal.strInstructions;

      // clear existing ingredients
      modalIngredients.innerHTML = "";

      // Loop through ingredients and measures (up to 20)
      for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if(ingredient){
                  let li = document.createElement("li");
                  li.textContent = `${ingredient} - ${measure}`;
                  modalIngredients.appendChild(li);
            }
      }

      // show the model
      modal.classList.remove("hidden");

      // add event listener to close popUp
      closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
      });

      window.onclick = function(event){
            if (event.target === modal) {
                  modal.classList.add("hidden");
                  
            }
      } 
}