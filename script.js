let allPets = [];
let currentPets = [];

// Load Categories
const loadCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    displayCategories(data.categories);
};

const displayCategories = (categories) => {
    const container = document.getElementById("category-container");
    container.innerHTML = "";
    for (const category of categories) {
        const div = document.createElement("div");
        div.innerHTML = `
            <button onclick="activateCategory('${category.category}')"
                class="category-btn flex items-center gap-2 hover:bg-[#0e7a81a1] rounded-lg font-bold text-xl px-4 py-2">
                <img src="${category.category_icon}" class="w-6 h-6" /> ${category.category}
            </button>
        `;
        container.appendChild(div);
    }
};
loadCategories();

// Load All Pets
const loadAllPets = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    const data = await res.json();
    allPets = data.pets;
    currentPets = allPets;
    displayAllPets(currentPets);
};

// Display Pets
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = "";

    if (!pets || pets.length == 0) {
        petsContainer.innerHTML = `<p class="text-center text-lg mt-10">No Information Available</p>`;
        return;
    }

    const petImageContainer = document.getElementById("pet-image-container");

    pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("p-5", "shadow-xl", "rounded-lg", "border-2", "hover:shadow-2xl", "transition", "duration-300");
        petCard.innerHTML = `
            <div>
                <img src="${pet.image}" alt="" class="rounded-lg w-full h-48 object-cover">
                <h1 class="font-bold text-2xl mt-3 mb-3">${pet.breed ? pet.breed : "No Name Found"}</h1>
                <p>Breed: ${pet.breed ? pet.breed : "No Name Found"}</p>
                <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : "No Birth Info"}</p>
                <p>Gender: ${pet.gender ? pet.gender : "No Gender Info"}</p>
                <p>Price: ${pet.price ? pet.price : "No Price Given"}</p>
            </div>
            <div class="mt-3 flex justify-center gap-2">
                <button class="btn like-btn text-[#0e7a81]    hover:bg-[#0e7a81a1]"><i class="fa-solid fa-thumbs-up"></i></button>
                <button class="btn text-[#0e7a81] font-bold hover:bg-[#0e7a81a1]">Adopt</button>
                <button class="btn text-[#0e7a81] font-bold hover:bg-[#0e7a81a1]">Details</button>
            </div>
        `;

        petsContainer.appendChild(petCard);

        // Like Button Functionality
        // Like Button Functionality
        const likeBtn = petCard.querySelector(".like-btn");
        likeBtn.addEventListener("click", () => {
            // আগের image duplicate হলে add হবে না
            if (!petImageContainer.querySelector(`img[src="${pet.image}"]`)) {
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("flex", "justify-center");
                // fixed width + responsive + rounded + shadow
                imgDiv.innerHTML = `
            <img src="${pet.image}" 
                 alt="${pet.breed}" 
                 class="rounded-lg shadow-lg w-[300px] h-[300px] object-cover md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px]" />
        `;
                petImageContainer.appendChild(imgDiv);
            }
        });

    });
};

// Load Specific Category
const loadSpecificPets = async (categoryName) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    const data = await response.json();
    currentPets = data.data;
    displayAllPets(currentPets);
};

// Active Category
function activateCategory(categoryName) {
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active-category");
        btn.style.backgroundColor = "";
    });
    const activeBtn = Array.from(document.querySelectorAll(".category-btn"))
        .find(btn => btn.textContent.trim() === categoryName);
    if (activeBtn) {
        activeBtn.classList.add("active-category");
        activeBtn.style.backgroundColor = "#0e7a81";
    }
    loadSpecificPets(categoryName);
}

// Sort By Price
const shortBtn = document.getElementById("shot-btn");
shortBtn.addEventListener("click", () => {
    const sortedPets = [...currentPets].sort((a, b) => a.price - b.price);
    displayAllPets(sortedPets);
});

loadAllPets();


// hamburger
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
