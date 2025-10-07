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
    const data = await res.json();

    console.log(data)
}

const displayAllPets=(pets)=>{
    const petsContainer=document.getElementById("pets-container")
    petsContainer.innerHTML ="";

    for (const pet of pets){
        const petCard= document.createElement("div");
        petCard.innerHTML=`
        
        
        
        `
    }
}
loadAllPets()