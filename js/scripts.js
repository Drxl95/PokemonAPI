
let pokemonRepository = (function () {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
   let searchInput = document.querySelector("#searchIn");
   let pokemon = "";

   function add(pokemon) {
      pokemonList.push(pokemon);
   }

   function getAll() {
      return pokemonList;
   }

   function addListItem(pokemon) {
      let pokeUl = document.querySelector('.list-group');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn');
      button.classList.add('btn-primary');
      listItem.classList.add('group-list-item');
      button.setAttribute("data-target", "#my-modal");
      button.setAttribute("data-toggle", "modal");
      listItem.appendChild(button);
      pokeUl.appendChild(listItem);
      button.addEventListener('click', function (event) {
         showDetails(pokemon)
      });
   }


   function loadList() {
      return fetch(apiUrl).then(function (response) {
         return response.json();
      }).then(function (json) {
         json.results.forEach(function (item) {
            let pokemon = {
               name: item.name,
               detailsUrl: item.url
            };
            add(pokemon);
         });
      }).catch(function (e) {
         console.error(e);
      })
   }

   function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
         return response.json();
      }).then(function (details) {
         //Add details to item
         item.imageUrl = details.sprites.front_default;
         item.imageUrlBack = details.sprites.back_default;
         item.height = details.height;
         // pokemon types
         item.types = [];
         for (var i = 0; i < details.types.length; i++) {
            item.types.push(details.types[i].type.name);
         }
         //pokemon abilities
         item.abilities = [];
         for (var i = 0; i < details.abilities.length; i++) {
            item.abilities.push(details.abilities[i].ability.name);
         }
      }).catch(function (e) {
         console.error(e);
      });
   }

   function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
         showModal(item);
      });
   }

   function showModal(item) {
      pokemonRepository.loadDetails(item).then(function () {
         let modalBody = $(".modal-body");
         let modalTitle = $(".modal-title");
         let modalHeader = $(".modal-header");

         //clears previous content in modal
         modalTitle.empty();
         modalBody.empty();

         //create elenebtb for pokemon name
         let nameElement = $("<h1>" + item.name + "</h1>");

         //create img element
         let imageElementFront = $('<img class="modal-img" style="width:50%">');
         imageElementFront.attr("src", item.imageUrl);
         let imageElementBack = $('<img class="modal-img" style="width:50%">');
         imageElementBack.attr("src", item.imageUrlBack);

         //create element for pokemon height 
         let heightElement = $("<p>" + "Height : " + item.height + "</p>");

         //pokemon types
         let typesElement = $("<p>" + "Types : " + item.types + "</p>");

         //pokemon abilities 
         let typesAbilities = $("<p>" + "Abilities : " + item.abilities + "</p>");

         //eventlistener to for search  bar
         searchInput.addEventListener('input', function () {
            let listPokemon = document.querySelectorAll('.group-list-item');
            let value = searchInput.value.toUpperCase();

            listPokemon.forEach(function (pokemon) {
               if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
                  pokemon.style.display = '';
               } else {
                  pokemon.style.display = 'none'
               }
            })
         });

         modalTitle.append(nameElement);
         modalBody.append(imageElementFront);
         modalBody.append(imageElementBack);
         modalBody.append(heightElement);
         modalBody.append(typesElement);
         modalBody.append(typesAbilities);

         $('#my-modal').modal('toggle');
      });
   }


   return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
   };

})();



pokemonRepository.loadList().then(function () {

   pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
   });
});




