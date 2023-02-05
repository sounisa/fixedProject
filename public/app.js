const apiURL = ""
const postBtn = document.querySelector("#postbtn")
const editBtnSubmit = document.querySelector('#editBtnSubmit')
let deleteThis = document.querySelectorAll(".x")

getData() //function that shows the pokemons already in DB

$('#show').on('click', () => { //post new pokemon button
    $('.logo').hide();
    $('.center').show();
    $('#show').hide();
})


$('#close-postbtn').on('click', () => { //x on post pokemon form
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
})

$('#close-editbtn').on('click', () => { //x on edit pokemon form
    $('.editHideForm').hide();
    $('.logo').show();
    $('#show').show();
})


$('.home-container').on('click', () => { //logo home button
    window.location.reload(true);
} )


//GET ALL
async function getData() {
    const response = await fetch(`${apiURL}pokemons`)
    const data = await response.json() 
    console.log(data)
    showAllPokemons(data)
    //postData(data)
}
function showAllPokemons(data) {
    for (let i = 0; i < data.length; i++) {
        let pokeCard = document.createElement('span') //PokemonCard 
        pokeCard.className = "pokemon-card"
        pokeCard.id = data[i].name
        let pokeName = document.createElement('div')//Pokemon's Name
        pokeName.className = "pokeName"
        pokeName.textContent = data[i].name
        let pokeType = document.createElement('div')//Pokemon's Type
        pokeType.className = "pokeType"
        pokeType.textContent = data[i].type
        let pokeHp = document.createElement('div')//Pokemon's HP
        pokeHp.className = "pokeHp"
        pokeHp.textContent = `${data[i].hp} HP`
        let deleteBtn = document.createElement('button')//delete button
        deleteBtn.className= "x"
        deleteBtn.id = data[i].id
        deleteBtn.textContent = "X"
        addListenerToDeleteButton(deleteBtn)//add listener to each delete button
        let editBtn = document.createElement('button')//edit button
        editBtn.className= "editBtn"
        editBtn.id = data[i].id //IMPORTANT TO EDIT w/ pokemon's ID
        editBtn.title = data[i].name
        editBtn.textContent = "Edit Pokemon"
        addListenerToEditButton(editBtn)//add listener to each edit button
        let pokeContainer = document.querySelector('.all-pokemons-container')
        pokeCard.appendChild(deleteBtn)
        pokeCard.appendChild(editBtn)
        pokeCard.appendChild(pokeName)
        pokeCard.appendChild(pokeType)
        pokeCard.appendChild(pokeHp)
        //pokeCard.style.color = data[i].color
        pokeContainer.appendChild(pokeCard)
    }
}
//add New Pokemon Button, get values, post new pokemon
postBtn.addEventListener("click", function (e) {
    e.preventDefault();
    $('.center').hide();
    $('.logo').show();
    $('#show').show();
    const newPokeName = document.getElementById('pokemon-name').value
    const newPokeType = document.getElementById('pokemon-type').value
    const newPokeHp = document.getElementById('pokemon-hp').value
    alert(`${newPokeType} Type Pokemon: ${newPokeName} with HP: ${newPokeHp} was added to your Pokedex`)
    $('#testCard').remove();
    postNewPokemon(newPokeName, newPokeType, newPokeHp)
});
//POST
const postNewPokemon = async (newPokeName, newPokeType, newPokeHp) => {
    let options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "name": `${newPokeName}`,
            "type": `${newPokeType}`,
            "hp": newPokeHp
        })
    }

    let response = await fetch((`${apiURL}pokemons`), options)
    let reQuery = await response.json()
    //window.location.reload(true);
}

    
//adds event listener to x attached to that pokemoncard, if clicked, deletes pokemon
function addListenerToDeleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", function (e) {
        $(deleteBtn).closest('span').remove();
        deletePokemon(deleteBtn)
    })
}
//DELETE 1
const deletePokemon = async (deleteBtn) => {
    let options = {
        method: 'DELETE'
    }
    let response = await fetch(`${apiURL}pokemons/${deleteBtn.id}`, options)
    let newQuery = await response.json() 
}

//adds event listener to edit button
function addListenerToEditButton(editBtn) {
    editBtn.addEventListener("click", function (e) {
        $('.logo').hide() //hide pokemon logo
        $('#show').hide() //hide pokeball
        $('.editHideForm').show() //show edit form
        $('.nameOfPokemonEditing').text(editBtn.title)

        addListenerToEditBtnSubmit(editBtn)
    })
}

//event listenter to edit SUBMIT button thats in form
// editBtnSubmit.addEventListener("click", function (e) {
//     e.preventDefault();
//     $('.center').hide();
//     $('.logo').show();
//     $('#show').show();
//     let editPokeName = document.getElementById('pokemon-name').value
//     let editPokeType = document.getElementById('pokemon-type').value
//     let editPokeHp = document.getElementById('pokemon-hp').value
//     $('#testCard').remove();
//     updatePokemon(editPokeName, editPokeType, editPokeHp)
// });

function addListenerToEditBtnSubmit (editBtn) {
    editBtnSubmit.addEventListener('click', () =>{
        e.preventDefault();
        $('.center').hide();
        $('.logo').show();
        $('#show').show();
        let editPokeName = document.getElementById('editPokemonName').value
        let editPokeType = document.getElementById('editPokemonType').value
        let editPokeHp = document.getElementById('editPokemonHp').value
        $('#testCard').remove();
        console.log(editPokeName)
        updatePokemon(editPokeName, editPokeType, editPokeHp, editBtn)
    })
}



const updatedPokemon = async (editPokeName, editPokeType, editPokeHp, editBtn) => {
    let options = {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
    },
        body: JSON.stringify({
        name: `${editPokeName}`,
        type: `${editPokeType}`,
        hp: editPokeHp
        })
    }
    let response = await fetch(`${apiURL}pokemons/${editBtn.id}`, options)
    let dataWithUpdates = await response.json()
    console.log(dataWithUpdates)
}