function addToPokedex(event) {
  event.preventDefault();
  let name = event.target.pokemon.value;
  let description = event.target.description.value;

  let listItem = document.createElement('li');
  let list = document.getElementById('pokemon-list');

  listItem.innerHTML = `${name} - ${description}`;
  list.appendChild(listItem);
}

function clearForm() {
  document.getElementById('pokedex').reset();
}

document.addEventListener('DOMContentLoaded', function () {
  let form = document.getElementById('pokedex');
  form.addEventListener('submit', function () {
    addToPokedex(event);
    clearForm();
  });
});