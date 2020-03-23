var pokemons = new Array
var pokemonList = document.getElementById('pokemonList');

loadPokemons();


function loadPokemons() {
  var promises = [];
  for(let i=1; i<= 151; i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then(results =>{
    pokemons = results;
    console.log(pokemons);
    var counts = 10
    var addcount = document.getElementById('addBtn');
    addcount.addEventListener('click', ()=>{
      counts +=10;
      displayPokemon(pokemons,counts)
    });
    displayPokemon(pokemons, counts);
    var searchBar = document.getElementById('name');
    searchBar.addEventListener('keyup', function filter (){
      if(searchBar.value != ""){
        var name = searchBar.value.toLowerCase();
        pokemons = results.filter(pokemon => !pokemon.name.search(name));
        addcount.style.display = 'none';
        displayPokemon(pokemons, pokemons.length);
      }else{
        counts = 10;
        addcount.style.display = 'block';
        pokemons = results;
        displayPokemon(pokemons, counts);
      }
    });
    

    // var cards = document.querySelectorAll('.card');
    // var searchBar = document.getElementById('name');
    // searchBar.addEventListener('keyup', function filter (){
    //   var name = searchBar.value;
    //   if(searchBar.value != ""){
    //     cards.forEach(card =>{
    //       if(card.id.search(name)){
    //         card.classList.add('noShow');
    //       }else{
    //         card.classList.remove('noShow');
    //       }
    //     });
    //   }else{
    //     cards.forEach(card =>{
    //       card.classList.remove('noShow');
    //     });
    //   }
    // });
    
  });
}

function displayPokemon(pokemons, showPokemon){
  var shownPokemons = new Array;
  for (let i = 0; i < showPokemon; i++) {
    shownPokemons.push(pokemons[i]);
  }
  const pokemonHTMLString = shownPokemons.map(pokemon =>
    `
    <li 
    class="card ${pokemon.types.map(types => types.type.name).join(' ')}"
    id="${pokemon.name}"
    ">
      <div class="img_div">
        <img src="${pokemon.sprites.front_default}" alt="image">
      </div>
      <div class="container">
        <h2>${pokemon.name}</h2>
        <p class="type">Type: ${pokemon.types.map(types => types.type.name).join(', ')}</p>
        <h3>Abilities</h3>
        <ul class="abilities">
        <li>${pokemon.abilities.map(ability=> ability.ability.name).join('</li><li>')}</li>
        </ul>
      </div>
		</li>
    `
  ).join('');
  pokemonList.innerHTML = pokemonHTMLString;
}

function loadClasses(){
  fetch('https://pokeapi.co/api/v2/type')
}