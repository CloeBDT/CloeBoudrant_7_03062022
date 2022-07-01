const select = document.querySelector(".select");
const selectBtn = document.querySelectorAll(".select__btn");
const options = document.querySelectorAll(".options");
const optionsList = document.querySelectorAll(".options__list");
const btnText = document.querySelector(".btn-text");
const selection = document.querySelector(".selection");
const tag = document.querySelector(".tag");
const arrowIngredient = document.querySelector(".arrow-ingredient");
const arrowAppareil = document.querySelector(".arrow-appareil");
const arrowUstensile = document.querySelector(".arrow-ustensile");
const sectionArticles = document.querySelector(".section-articles");


const selectIngredient = document.querySelector(".select-ingredient");
const selectAppareil = document.querySelector(".select-appareil");
const selectUstensile = document.querySelector(".select-ustensile");

function displayRecipes(recettes) {
    sectionArticles.innerHTML = "";

    recettes.forEach(recette => {
        const createData = new getRecipes(recette);
        const createCarte = createData.createCarteDOM();
        sectionArticles.appendChild(createCarte);
    });
}

const recettes = recipes;

class getRecipes {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.ingredients = data.ingredients
        this.ingredient = data.ingredient
        this.quantity = data.quantity
        this.unit = data.unit
        this.time = data.time
        this.description = data.description
    }

    createCarteDOM() {
        const article = document.createElement("article");
        const divImg = document.createElement("div");
        const divRecette = document.createElement("div");
        const h2 = document.createElement("h2");
        const divTemps = document.createElement("div");
        const i = document.createElement("i");
        const pTemps = document.createElement("p");
        const divComposition = document.createElement("div");
        const divInstruction = document.createElement("div");
        const pInstruction = document.createElement("p");

        h2.textContent = this.name;
        pTemps.textContent = this.time + " min";

        const ingredients = this.ingredients;

        ingredients.forEach(ingredient => {
            const p = document.createElement("p");
            divComposition.appendChild(p);

            if(ingredient.ingredient && !ingredient.quantity) {
                p.textContent = ingredient.ingredient;
            } else if(ingredient.ingredient && ingredient.quantity && !ingredient.unit) {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity;
            } else if(ingredient.ingredient && ingredient.quantity && 
            ingredient.unit !== "grammes" && 
            ingredient.unit !== "cuillères à soupe" && 
            ingredient.unit !== "ml" &&
            ingredient.unit !== "cl" &&
            ingredient.unit !== "kg") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + " " + ingredient.unit;
            } else if(ingredient.unit == "grammes") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + "g";
            } else if(ingredient.unit == "cuillères à soupe") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + " cuillères";
            } else if(ingredient.unit == "ml") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + "ml";
            } else if(ingredient.unit == "cl") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + "cl";
            } else if(ingredient.unit == "kg") {
                p.textContent = ingredient.ingredient + ": " + ingredient.quantity + "kg";
            }
        });

        pInstruction.textContent = this.description;

        const divTitre = document.createElement("div");
        divTitre.className = "recette__titre";
        const divCompoInst = document.createElement("div");
        divCompoInst.className = "recette__instr";

        article.appendChild(divImg);
        article.appendChild(divRecette);
        divRecette.appendChild(divTitre);
        divRecette.appendChild(divCompoInst);
        divImg.className = "img";
        divRecette.className = "recette";
        divTitre.appendChild(h2);
        divTitre.appendChild(divTemps);
        divTemps.className = "temps";
        i.className = "fa-regular fa-clock";
        divTemps.appendChild(i);
        divTemps.appendChild(pTemps);
        divComposition.className = "composition";
        divInstruction.className = "instruction";
        divInstruction.appendChild(pInstruction);
        divCompoInst.appendChild(divComposition);
        divCompoInst.appendChild(divInstruction);

        return article;
    }
}

function init () {
    displayRecipes(recettes);
}

init ();

arrowIngredient.addEventListener("click", () => {
    selectIngredient.classList.toggle("active");
});

arrowAppareil.addEventListener("click", () => {
    selectAppareil.classList.toggle("active");
});

arrowUstensile.addEventListener("click", () => {
    selectUstensile.classList.toggle("active");
});

optionsList.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        const close = document.createElement("i");
        close.classList = "fa-regular fa-circle-xmark";
        const tagOption = document.createElement("li");
        tagOption.classList = "tag__option";
        
        tagOption.innerText = selectedOption;
        tagOption.appendChild(close);
        tag.appendChild(tagOption);

        close.addEventListener("click", () => {
            tag.removeChild(tagOption);
            tagOption.style.display = "none";
        });

        selectIngredient.classList.remove("active");
        selectAppareil.classList.remove("active");
        selectUstensile.classList.remove("active");
    });
});