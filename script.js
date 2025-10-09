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
        petsContainer.innerHTML = `  <div class="grid p-20 text-center space-y-5 bg-[#b6e0e3a1] w-[900px] hover:bg-[#0e7a81a1]  container mx-auto rounded-2xl shadow-2xl ">
            <img class="mx-auto" src="./images/error.webp" alt="">
            <h1 class="font-bold text-4xl ">No Information Available</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at <br>
                its layout. The point of using Lorem Ipsum is that it has a.</p>

        </div>`;
        return;
    }
    // pet image container 
    const petImageContainer = document.getElementById("pet-image-container");

    pets.forEach((pet) => {
        const petCard = document.createElement("div");

        petCard.innerHTML = `
            <div class="p-5 shadow-xl rounded-lg border-2 hover:shadow-2xl transition duration-300 hover:-translate-y-2 relative hover:bg-[#84e8efa1] ">
                <img src="${pet.image}" alt="" class="rounded-lg w-full h-48 object-cover">
                <h1 class="font-bold text-2xl mt-3 mb-3">${pet.breed ? pet.breed : "No Name Found"}</h1>
                <p>Breed: ${pet.breed ? pet.breed : "No Name Found"}</p>
                <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : "No Birth Info"}</p>
                <p>Gender: ${pet.gender ? pet.gender : "No Gender Info"}</p>
                <p>Price: ${pet.price ? pet.price : "No Price Given"}</p>
            
            <div class="mt-3 flex justify-center gap-2">
                <button class="btn like-btn text-[#0e7a81]  hover:bg-[#0e7a81a1] hover:text-black text-lg"><i class="fa-solid fa-thumbs-up"></i></button>
                <button class="btn text-[#0e7a81] font-bold hover:bg-[#0e7a81a1] hover:text-black text-lg">Adopt</button>
                <button class="btn text-[#0e7a81] font-bold hover:bg-[#0e7a81a1] hover:text-black text-lg" onclick="showPetDetails(${pet.petId})">Details</button>

            </div>

            </div>
        `;

        petsContainer.appendChild(petCard);

        // Like Button Functionality

        const likeBtn = petCard.querySelector(".like-btn");
        likeBtn.addEventListener("click", () => {

            if (!petImageContainer.querySelector(`img[src="${pet.image}"]`)) {
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("flex", "justify-center");

                imgDiv.innerHTML = `
            <img src="${pet.image}" 
                 alt="${pet.breed}" 
                 class="rounded-lg shadow-lg w-[300px] h-[300px] object-cover md:w-[250px] md:h-[250px] sm:w-[200px] sm:h-[200px] transition duration-300 hover:-translate-y-2 relative" />
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

// Show Pet Details in Modal
const showPetDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json();
    const pet = data.petData;

    // Modal elements
    document.getElementById("modal-name").textContent = pet.breed || "No Name Found";
    document.getElementById("modal-img").src = pet.image || "";
    document.getElementById("modal-details").textContent = pet.pet_details || "No Description Found";
    document.getElementById("modal-breed").textContent = pet.breed || "Unknown";
    document.getElementById("modal-category").textContent = pet.category || "Unknown";
    document.getElementById("modal-gender").textContent = pet.gender || "Unknown";
    document.getElementById("modal-birth").textContent = pet.date_of_birth || "Unknown";
    document.getElementById("modal-vaccine").textContent = pet.vaccinated_status || "Unknown";
    document.getElementById("modal-price").textContent = pet.price || "N/A";

    // Show modal
    document.getElementById("petDetailsModal").showModal();
};


// hamburger
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});
