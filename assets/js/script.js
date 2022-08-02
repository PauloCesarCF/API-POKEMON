const getPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(905).fill().map((_, index) =>
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
    pokemons.classList.remove('grass');
    pokemons.classList.remove('water');
    pokemons.classList.remove('electric');
    pokemons.classList.remove('bug');
    pokemons.classList.remove('poison');
    pokemons.classList.remove('ground');
    pokemons.classList.remove('fairy');
    pokemons.classList.remove('fighting');
    pokemons.classList.remove('psychic');
    pokemons.classList.remove('fire');
    pokemons.classList.remove('normal');
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
  }
  else{
    window.alert('[404]: pokemon não disponivel')
  }

}

const buscPokemon = document.querySelector('.buscPokemon');

buscPokemon.addEventListener('click', () => {
  const inputpokemon = document.querySelector('.input-pokemon');

  renderPokemon(inputpokemon.value);

  if(String(inputpokemon.value.toLowerCase()) === '' || inputpokemon.value === '0' || Number(inputpokemon.value) >= 906){
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

  removeBusc.style.display = 'none'
})