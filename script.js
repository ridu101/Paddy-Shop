// ------------------- Categories ----------------------

const loadCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    displayCategories(data.categories);
}

const displayCategories = (categories) => {
    const container = document.getElementById("category-container")
    container.innerHTML = ""
    for (const category of categories) {
        const div = document.createElement("div")

        div.innerHTML = `
 <div class="flex items-center justify-between w-full px-16">
    <img src="${category.category_icon}" alt="" class="w-10 h-10">
    <button onclick="activateCategory('${category.category}')" 
        class="category-btn flex items-center gap-2 hover:bg-[#0e7a81a1] rounded-lg font-bold text-xl px-4 py-2">
        ${category.category}
    </button>
</div>
`

        container.appendChild(div);
    }
}
loadCategories()

//---------------------------Cards--------------------------------

const loadAllPets = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await res.json()
    displayAllPets(data.pets)


}

const displayAllPets = (pets) => {
    const petsContainer = document.getElementById("pets-container")
    petsContainer.innerHTML = "";

    if (!pets || pets.length == 0) {
        petsContainer.innerHTML = `
    <div class="p-20 grid justify-center text-center bg-[#d7f0f2a1] rounded-xl shadow-2xl mt-20         
        mb-20 w-[990px] h-[490px]">
        <div class="flex mx-auto"> <img class="" src="./images/error.webp" alt=""></div>
        <h1 class="font-bold text-4xl">No Information Available</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.</p>

    </div>`
    }

    for (const pet of pets) {
        const petCard = document.createElement("div");
        petCard.innerHTML = `
        <div class="p-5 shadow-xl rounded-lg w-[312px] h-full border-[3px] hover:bg-[#b8e7eaa1]  hover:shadow-xl transition duration-300 hover:-translate-y-2">
                    <div>
                        <img class="rounded-lg" src="${pet.image}" alt="">
                        <h1 class="font-bold text-2xl mt-5 mb-5">${pet.breed}</h1>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-table-cells-large"></i> <p>Breed:${pet.breed}</p></div>
                        <div class="flex items-center space-x-3 "><i class="fa-solid fa-calendar"></i><p>Birth: ${pet.date_of_birth}</p></i></div>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-mars-stroke-up"></i><p>Gender:${pet.gender}</p></i></div>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-dollar-sign"></i><p>Price: ${pet.price}</p></i></div>
                        
                    </div>
                   
                    <div class=" space-x-2 mt-5 flex justify-center">
                        
                        <button class="btn like-btn hover:bg-[#0e7a81a1] hover:text-black"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="btn text-[#0e7a81] text-lg font-bold hover:bg-[#0e7a81a1] hover:text-black " > Adopt</button>
                        <button class="btn text-[#0e7a81] text-lg font-bold hover:bg-[#0e7a81a1] hover:text-black"> Details</button>
                    </div>
                 </div>
        `
        petsContainer.appendChild(petCard)

        // ------------ Pet Image Show Functionality-----------------

        const likeButtons = document.querySelectorAll('.like-btn');
        const petContainer = document.getElementById('pet-image-container');

        let i = 0;
        for (const button of likeButtons) {
            const pet = pets[i];

            button.addEventListener('click', () => {
                // চেক করা হচ্ছে এই pet আগে থেকে আছে কি না
                const alreadyAdded = petContainer.querySelector(`img[src="${pet.image}"]`);

                if (!alreadyAdded) {
                    // যদি না থাকে, তখন যোগ করো
                    petContainer.innerHTML += `
                <div class="flex justify-center mt-5">
                    <img src="${pet.image}" alt="Liked Pet" class="rounded-lg shadow-lg w-[300px]" />
                </div>
            `;
                }
            });

            i++;
        }

    }
}
loadAllPets()

// -----------------------load specific pets --------------

const loadSpecificPets = async (name) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
    const data = await response.json();
    displayAllPets(data.data)
}

// -------------- Active Class Functionality ------------------
function activateCategory(categoryName) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active-category');
        btn.style.backgroundColor = '';
    });

    const activeBtn = Array.from(document.querySelectorAll('.category-btn'))
        .find(btn => btn.textContent.trim() === categoryName);

    if (activeBtn) {
        activeBtn.classList.add('active-category');
        activeBtn.style.backgroundColor = '#0e7a81';
    }

    loadSpecificPets(categoryName);
}
