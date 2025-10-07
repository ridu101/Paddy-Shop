// ------------------- Categories ----------------------

const loadCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await response.json();
    displayCategories(data.categories);
}

const displayCategories= (categories )=>{
    const container= document.getElementById("category-container")
    container.innerHTML=""
    for ( const category of categories){
        const div = document.createElement("div")

        div.innerHTML=`
        <div class=" flex items-center">
            <img class=" flex justify-center" src="${category.category_icon}" alt="">
            <button  class=" flex items-center gap-2 bg-[#0e7a81] hover:bg-[#0e7a81a1]  rounded-lg font-bold text-xl  btn ">${category.category}</button>
        </div>
            
       
        `
        container.appendChild(div);
    }
}
loadCategories()

//---------------------------Cards--------------------------------

const loadAllPets= async () =>{
    const res= await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await res.json()
    displayAllPets(data.pets)

    
}

const displayAllPets=(pets)=>{
    const petsContainer=document.getElementById("pets-container")
    petsContainer.innerHTML ="";

    for (const pet of pets){
        const petCard= document.createElement("div");
        petCard.innerHTML=`
        <div class="p-5 shadow-xl rounded-lg w-[312px] h-full">
                    <div>
                        <img class="rounded-lg" src="${pet.image}" alt="">
                        <h1 class="font-bold text-2xl">${pet.category}</h1>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-table-cells-large"></i> <p>Breed:${pet.breed}</p></div>
                        <div class="flex items-center space-x-3 mt-5"><i class="fa-solid fa-calendar"></i><p>Birth: ${pet.date_of_birth}</p></i></div>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-mars-stroke-up"></i><p>Gender:${pet.gender}</p></i></div>
                        <div class="flex items-center space-x-3"><i class="fa-solid fa-dollar-sign"></i><p>Price: ${pet.price}</p></i></div>
                        
                    </div>
                   
                    <div class=" space-x-2 mt-5 flex justify-center">
                        
                        <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="btn"> Adopt</button>
                        <button class="btn"> Details</button>
                    </div>
                 </div>
        `
        petsContainer.appendChild(petCard)
    }
}
loadAllPets()