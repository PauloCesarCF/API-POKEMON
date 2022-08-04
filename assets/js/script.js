const getPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(300).fill().map((_, index) =>
  fetch(getPokemons(index + 1)).then(response => response.json()));
  
const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {
    const elementsTypes = types.map(typeInfo => typeInfo.type.name)
  
    accumulator += `
    <div class="pokemons ${elementsTypes[0]}">
    <img class"pokemon" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
    <h2>${id} - ${name}</h2>
    <p>${elementsTypes.join(' | ')}</p>
    </div>
    `
    return accumulator
  }, '');

const insertPokemonIntoPage = pokemons => {
    const card = document.querySelector('.cardAll');
    card.innerHTML = pokemons

    const loading = document.querySelector('.loader');
    loading.style.display = 'none'
    
    const areaSearchPokemon = document.querySelector('.areaSearchPokemon');
    areaSearchPokemon.style.display = 'flex'

    const backToTop = document.querySelector('.backToTop');
    backToTop.style.display = 'inline'
    backToTop.style.position = 'fixed'
}

const fetchPokemon = generatePokemonPromises();

Promise.all(fetchPokemon)
  .then(generateHTML)
  .then(insertPokemonIntoPage)

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

buscPokemon.addEventListener('click', () => {
  const inputPokemon = document.querySelector('.input-pokemon');

  renderPokemon(inputPokemon.value);

  if(inputIsEmpty(inputPokemon)){
    window.alert('[404]: Pokemon indisponivel ou campo não preenchido');

    removeBusc.style.display = 'none'

    const card = document.querySelector('.cardSpecific');
    card.style.display = 'none'
  
    const cardAll = document.querySelector('.cardAll');
    cardAll.style.display = 'grid'
  } 
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