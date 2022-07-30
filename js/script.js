async function fetchPokemon() {
  const getPokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`

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

      const card = document.querySelector('.card');

      card.innerHTML = lisPokemons
    })

    const loading = document.querySelector('.loading')
    loading.style.display = 'none'
}

fetchPokemon();
