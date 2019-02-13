function removeLoadingIndicator() {
  let loading = document.getElementById('loading');
  loading.remove();
}



function createLoadingIndicator() {
  let loading = document.createElement('p')
  loading.id = 'loading';
  loading.innerHTML = 'Loading...';
  return loading;
}




function placePokemonImage(pokemonData) {
  // We want the loading indicator to be removed once a successful request has been made and completed. A good place for this would be inside our placePokemonImage function which is called only when a successful response is received from our HTTP request.
  removeLoadingIndicator();

  let path = pokemonData.sprites.front_default;
  let name = pokemonData.name;
  console.log(path);

  // Now we can create our img tag setting its src and alt attributes to address requirement #7.
  let image = document.createElement('img');
  image.src = path;
  image.alt = name;

  let pokemonListItem = document.getElementById(name.toLowerCase());
  pokemonListItem.appendChild(image);
}




function fetchPokemon(event) {
  let pokemon = event.target.pokemon.value.toLowerCase();

  /*
  First we create our XHR object. Then we create a url variable set to a template literal string of the Pokeapi endpoint which contains the pokemon variable we created earlier.
  We then use .open() to specify our request method, GET, and the URL using our url variable. Finally, we call .send().
  */
  let request = new XMLHttpRequest(); // XHR OBJECT
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`; // URL ENDPOINT
  request.open('GET', url); // INITIALIZE REQUEST$
  request.send(); // MAKE REQUEST

  // response handler
  request.onreadystatechange = function () {
    // Handle response here
    if (request.readyState === 4) { // verifying the response was received AND completed.
      // Request is finished. Response is ready!
      if (request.status === 200) {
        // Good to go!
        // parsing the response from our HTTP request.
        let response = JSON.parse(request.responseText);
        console.log(response);
        placePokemonImage(response);
      } else {
        // There was a problem.
        console.log('There was a problem with the request.');
      }
    }
  };
}



function addToPokedex(event) {
  event.preventDefault();
  let name = event.target.pokemon.value;
  let description = event.target.description.value;

  let pokemonContainer = document.createElement('div');
  pokemonContainer.id = name.toLowerCase();
  let pokemonContent = document.createElement('p');
  pokemonContent.innerHTML = `${name} - ${description}`;
  pokemonContainer.appendChild(pokemonContent);

  let list = document.getElementById('pokemon-list');
  list.appendChild(pokemonContainer);

  // Note how our function returns the loading object rather than adding it to the DOM directly.
  let loadingIndicator = createLoadingIndicator();
  pokemonContainer.appendChild(loadingIndicator);
}

function clearForm() {
  document.getElementById('pokedex').reset();
}

document.addEventListener('DOMContentLoaded', function () {
  let form = document.getElementById('pokedex');
  form.addEventListener('submit', function () {
    addToPokedex(event);
    fetchPokemon(event);
    clearForm();
  });
});