let currentPokemon;
let allPokemons = [];
let Audio_Pokemon = new Audio('sounds/poke.mp3');
let Audio_load = new Audio('sounds/load.mp3');



// LOAD POKEMON 

async function loadPokemon() { //asynchrone Funktion; lade Pokemon von API

    document.getElementById('pokedex').innerHTML = ``;
    for (let i = 0; i <= 150; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`; //lade von URL
        let response = await fetch(url); //beziehe Daten von URL
        currentPokemon = await response.json(); //wandle Text in Json um
        allPokemons.push(currentPokemon);
        console.log('Loaded Pokemon', currentPokemon);
        renderPokemonInfo(i);

    }

    document.getElementById('loading').classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
}



function renderPokemonInfo(i) {


    let type2 = allPokemons[i].types[1];
    let id;

    if (type2) {
        type2 = allPokemons[i].types[1].type.name[0].toUpperCase() + allPokemons[i].types[1].type.name.substring(1);

    } else {
        type2 = ``;
    }

    if (allPokemons[i].id > 9) {
        id = '0' + allPokemons[i].id;
    }
    if (allPokemons[i].id < 10) {
        id = '00' + allPokemons[i].id;
    }
    if (allPokemons[i].id > 99) {
        id = allPokemons[i].id;
    }

    document.getElementById('pokedex').innerHTML += `<div onclick="bigPokemonCard(${id},${i})" id="card${id}" class="pokemonContainer"><div><div class="centerIdName"><span class="styleid">${`#` + id}</span>
    <span class="centerName">${allPokemons[i]['species']['name'][0].toUpperCase() + allPokemons[i]['species']['name'].substring(1)}</span></div>
    <img  id="pic${id}"  class="pics" src="${allPokemons[i].sprites.front_default}"><div id="spaceBetweenType" class="typeSpaceBetween"><div class="styleType">${allPokemons[i].types[0].type.name[0].toUpperCase() + allPokemons[i].types[0].type.name.substring(1)}</div>
    <div id="${allPokemons[i].id}" class="d-none styleType">${type2}</div></div></div></div>`;
    checkIfSecondType(type2, i);

    checkBgColor(i, id);
}



function checkIfSecondType(type2, i) {
    if (type2) {
        document.getElementById(`${allPokemons[i].id}`).classList.remove(`d-none`);
    }
}

// GIVE BG-Color

function checkBgColor(i, id) {
    if (allPokemons[i].types[0].type.name === 'grass' || 'bug' || 'poison') {
        document.getElementById(`card${id}`).classList.add('bgGreen');
    }

    if (allPokemons[i].types[0].type.name === 'fire') {
        document.getElementById(`card${id}`).classList.add('bgRed');
    }

    if (allPokemons[i].types[0].type.name === 'water') {
        document.getElementById(`card${id}`).classList.add('bgBlue');
    }

    if (allPokemons[i].types[0].type.name === 'electric') {
        document.getElementById(`card${id}`).classList.add('bgYellow');
    }

    if (allPokemons[i].types[0].type.name === 'normal') {
        document.getElementById(`card${id}`).classList.add('bgGrey');
    }

    if (allPokemons[i].types[0].type.name === 'fairy') {
        document.getElementById(`card${id}`).classList.add('bgGrey');
    }

    if (allPokemons[i].types[0].type.name === 'ground') {
        document.getElementById(`card${id}`).classList.add('bgBrown');
    }

    if (allPokemons[i].types[0].type.name === 'fighting') {
        document.getElementById(`card${id}`).classList.add('bgBrown');
    }

    if (allPokemons[i].types[0].type.name === 'rock') {
        document.getElementById(`card${id}`).classList.add('bgBrown');
    }

    if (allPokemons[i].types[0].type.name === 'psychic') {
        document.getElementById(`card${id}`).classList.add('bgPurple');
    }

    if (allPokemons[i].types[0].type.name === 'ghost') {
        document.getElementById(`card${id}`).classList.add('bgPurple');

    }
}


// SEARCH POKEMON

function searchForPokemon() {
    let searchPokemon = document.getElementById('searchPokemon').value;
    document.getElementById('pokedex').innerHTML = ``;
    for (let i = 0; i <= 150; i++) {

        if (allPokemons[i]['species']['name'].toLowerCase().startsWith(searchPokemon.toLowerCase())) {
            renderPokemonInfo(i)
        }
    }
    if (searchPokemon == ``) {
        renderPokemonInfo(i);
    }
}

// OPEN - CLOSE Infos

function bigPokemonCard(id, i) {
    
     Audio_Pokemon.play();

    if (allPokemons[i].id > 9) {
        id = '0' + allPokemons[i].id;
    }
    if (allPokemons[i].id < 10) {
        id = '00' + allPokemons[i].id;
    }
    if (allPokemons[i].id > 99) {
        id = allPokemons[i].id;
    }
    let ability2 = allPokemons[i].abilities[1];
    if(ability2) {
        ability2 = allPokemons[i].abilities[1].ability.name[0].toUpperCase() + allPokemons[i].abilities[1].ability.name.substring(1);
    } else ability2 = ``;

    if (!document.getElementById(`card${id}`).classList.contains('bigPokemonCenter')) {
        document.getElementById(`card${id}`).classList.add('bigPokemonCenter');
        document.getElementById(`card${id}`).innerHTML += `<div id="extraAttributes" class="addAttributes">
        <span class="addSpaceAttributes">Height: ${allPokemons[i].height} Inch</span>
        <span class="addSpaceAttributes">Weight: ${allPokemons[i].weight} Pounds</span>
        <span class="addSpaceAttributes">Base-experience: ${allPokemons[i].base_experience}</span>
        <span class="addSpaceAttributes">Attacks: ${allPokemons[i].abilities[0].ability.name[0].toUpperCase() + allPokemons[i].abilities[0].ability.name.substring(1)} ${ability2}</span></div>`;
    }         
    else {
        document.getElementById(`card${id}`).classList.remove('bigPokemonCenter');
        let remove = document.getElementById(`extraAttributes`);
        remove.remove();
    }
}