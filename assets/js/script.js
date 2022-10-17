const getPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const poke = async () => {
  const pokemonPromises = []
  
    for (let i = 1; i <= 150; i++) {
      pokemonPromises.push(fetch(getPokemons(i)).then(response => response.json()))
    }

    await Promise.all(pokemonPromises)
      .then(pokemons => {
        console.log(pokemons)
  
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
          const types = pokemon.types.map(typeInfo => typeInfo.type.name)
  
          accumulator += `
          <div class="pokemons ${types[0]}">
          <img alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
          <h2>${pokemon.id}. ${pokemon.name}</h2>
          <p>${types.join(' | ')}</p>
          </div>
          `
          return accumulator
        }, '')
  
        const card = document.querySelector('.cardAll');
        card.innerHTML = lisPokemons
          
        const loading = document.querySelector('.loader');
        loading.style.display = 'none'
          
        const areaSearchPokemon = document.querySelector('.areaSearchPokemon');
        areaSearchPokemon.style.display = 'flex'
          
        const backToTop = document.querySelector('.backToTop');
        backToTop.style.display = 'inline'
        backToTop.style.position = 'fixed'
      })
  
      const loading = document.querySelector('.loading')
      loading.style.display = 'none'
}
  
poke()

const fetchpokemon = async (pokemon) => {
  const responseAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
  if(responseAPI.status === 200){
    const data = await responseAPI.json();
    return data
  }
}

const removeBusc = document.querySelector('.removeBusc');

const renderPokemon = async (pokemon) => {
  const data = await fetchpokemon(pokemon);
  if(data){
    removeBusc.style.display = 'block'

    const pokemons = document.querySelector('.pokemonSelect');
    pokemons.classList.remove('grass', 'water', 'electric', 'bug', 'poison', 'ground', 'fairy', 'fighting', 'psychic', 'fire', 'normal');
    pokemons.classList.add(`${data.types[0].type.name}`);

    const pokemonImg = document.querySelector('.pokemonImg');
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    pokemonImg.alt = `${data.name}`

    const namePokemon = document.querySelector('.namePokemon');
    namePokemon.innerHTML = `${data.id} - ${data.name}`

    const typePokemon = document.querySelector('.typePokemon');
    typePokemon.innerHTML = `${data.types[0].type.name}`
    
    const card = document.querySelector('.cardSpecific');
    card.style.display = 'block'

    const cardAll = document.querySelector('.cardAll');
    cardAll.style.display = 'none'

    card.appendChild(pokemons);

    const backToTop = document.querySelector('.backToTop');
    backToTop.style.position = 'none'
    backToTop.style.display = 'none'
  }
  else{
    window.alert('[404]: pokemon não disponivel')
  }
}

const buscPokemon = document.querySelector('.buscPokemon');

function inputIsEmpty(inputPokemon){
  if(inputPokemon.value === ''){
    return true
  } else{
    return false
  }
}

buscPokemon.addEventListener('click', (e) => {
  e.preventDefault()
  const inputPokemon = document.querySelector('.input-pokemon');

  if(inputIsEmpty(inputPokemon)){
    window.alert('input a pokemon')

    const card = document.querySelector('.cardSpecific');
    card.style.display = 'none'
    
    const cardAll = document.querySelector('.cardAll');
    return cardAll.style.display = 'grid'
  } 

  renderPokemon(inputPokemon.value);
});

removeBusc.addEventListener('click', () => {
  const card = document.querySelector('.cardSpecific');
  card.style.display = 'none'

  const cardAll = document.querySelector('.cardAll');
  cardAll.style.display = 'grid'

  const inputPokemon = document.querySelector('.input-pokemon')
  inputPokemon.value = ''

  const backToTop = document.querySelector('.backToTop');
  backToTop.style.position = 'fixed'
  backToTop.style.display = 'inline'

  removeBusc.style.display = 'none'
})

/* Scroll to top */

const buttonToTopVisible = () => {
  window.scroll({
    top: 0, // subir ao topo
    behavior: 'smooth' // Subir suave
  })
}

const backToTop = document.querySelector('.backToTop')
backToTop.onclick = buttonToTopVisible;
