const getPokemons = fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0").then(r=>r.json()).then(data => {
    return data;
});

const getPokemonImage = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
  return data.sprites.front_default;
});

const getPokemonGif = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.sprites.versions["generation-v"]["black-white"].animated.front_default;
});

const getPokemonId = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.id;
});

const getPokemonHeight = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.height;
});  

const getPokemonWeight = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return data.weight;
});

const getPokemonAbilites = (pokemonUrl) => fetch(pokemonUrl).then(r=>r.json()).then(data => {
    return (data.abilities).length;
});

const getPokemonsInfo = async (pokemons) => {
    for(let i=0; i<pokemons.length; i++) {
    pokemons[i].image = await getPokemonImage(pokemons[i].url);
    pokemons[i].id = await getPokemonId(pokemons[i].url);
    pokemons[i].gif = await getPokemonGif(pokemons[i].url);
    pokemons[i].height = await getPokemonHeight(pokemons[i].url);
    pokemons[i].weight = await getPokemonWeight(pokemons[i].url);
    pokemons[i].abilities = await getPokemonAbilites(pokemons[i].url);
  }
  return pokemons;
}

window.onload = async () => {
    let data = await getPokemons;
    let pokemons = await getPokemonsInfo(data.results);
    
    //console.log(pokemons);

    for(let i=0; i<pokemons.length; i++) {
    
        let container = document.createElement("div");
        container.className = "card";
        //container.setAttribute('pokemonId', pokemons[i].id);

        let pokemonButton = document.createElement("span");
        pokemonButton.className = "card-button";
        pokemonButton.id = pokemons[i].id;

        let pokemonName = document.createElement("h1");
        pokemonName.className = "pokemon-name";
        pokemonName.innerText = pokemons[i].name;

        let pokemonImage = document.createElement("img");
        pokemonImage.className = "pokemon-img";
        pokemonImage.src = pokemons[i].image;
        
        container.appendChild(pokemonButton);
        container.appendChild(pokemonName);
        container.appendChild(pokemonImage);

        document.getElementById("pokemon-cards").appendChild(container);
    }

    const modal = document.querySelector('.modal');
    const modalDescription = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalTittle = document.querySelector('.modal-tittle');
    const modalImg = document.querySelector('.modal-img');
    const pokemonList = document.querySelectorAll('.card');

    pokemonList.forEach((list, index) => {
        const view = list.querySelector('.card-button');
        
        view.addEventListener('click', () => {
            modalTittle.innerText = pokemons[index].name;
            modalImg.src = pokemons[index].gif;
            let text = "Altura: " + pokemons[index].height + "\nPeso: " + pokemons[index].weight + "\nHabiliades: " + pokemons[index].abilities;
            modalDescription.innerText = text;
            modal.style.display = 'flex';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

};


