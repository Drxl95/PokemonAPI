
let pokemonRepository = (function () {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
   let modalContainer = document.querySelector('#modal-container');


function getAll() {
   return pokemonList;
}
function add(pokemon) {
   pokemonList.push(pokemon);
}
function addListItem(pokemon) {
   let pokeUl = document.querySelector('.pokemon-list');
   let listItem = document.createElement('li');
   let button = document.createElement('button');
   button.innerText = pokemon.name;
   button.classList.add('button-class');
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
         item.imageUrl = details.sprites.front_default;
         item.height = details.height;
         item.types = details.types;
      }).catch(function (e) {
         console.error(e);
      });
   }



function showModal(pokemon) {
   modalContainer.innerHTML = '';
   let modal = document.createElement('div');
   modal.classList.add('modal');
    let closeButtonElement = document.createElement('button'); //creates button to close modal
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal); //when button clicked modal closes

    let titleElement = document.createElement('h1'); //creates title
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement('p'); //creates description
    heightElement.innerText = pokemon.height;

    let typesElement = document.createElement('p');
    typesElement.innerText = pokemon.types;
   

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

 

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');  //makes class visible when modal is open
 }
 
 function hideModal() {
    modalContainer.classList.remove('is-visible');  //removes visibility of class when modal is closed
 }

 window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) { //if user presses escape key, close modal
       hideModal();
    }
 });
 modalContainer.addEventListener('click', (e) => { //closes modal if user clicks outside of it
    let target = e.target;
    if (target === modalContainer) {
       hideModal();
    }
 });

 document.querySelector('.pokemon-list').addEventListener('click', () => {
   showModal(pokemon);
 });

 function showDetails(pokemon) {
   loadDetails(pokemon).then(function () {
      return showModal(pokemon);
   });
}
return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   loadList: loadList,
   loadDetails: loadDetails
};

})();



pokemonRepository.loadList().then(function() {

   pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
   });
});

// let pokemonModal = (function() {
//    let modalContainer = document.querySelector('#modal-container');
//    function showModal(title, text) { //specifying a title and description for each 
//       modalContainer.innerHTML = "";
//       let modal = document.createElement('div');
//       modal.classList.add('modal');

//       let closeButtonElement = document.createElement('button'); //creates button to close modal
//       closeButtonElement.classList.add('modal-close');
//       closeButtonElement.innerText = 'Close';
//       closeButtonElement.addEventListener('click', hidemodal); //when button clicked modal closes

//       let titleElement = document.createElement('h1'); //creates title
//       titleElement.innerText = title;

//       let contentElement = document.createElement('p'); //creates description
//       contentElement.innerText = text;


//       modal.appendChild(closeButtonElement);
//       modal.appendChild(titleElement);
//       modal.appendChild(contentElement);
//       modalContainer.appendChild(modal);

//       modalContainer.classList.add('is visible');  //makes class visible when modal is open
//    }
   
//    function hideModal() {
//       modalContainer.classList.remove('is-visible');  //removes visibility of class when modal is closed
//    }

//    window.addEventListener('keydown', (e) => {
//       if (e.key === 'Escape' && modalContainer.classList.conntains('is-visible')) { //if user presses escape key, close modal
//          hideModal();
//       }
//    });
//    modalContainer.addEventListener('click', (e) => { //closes modal if user clicks outside of it
//       let target = e.target;
//       if (target === modalContainer) {
//          hideModal();
//       }
//    });

//    document.querySelector('#show-modal').addEventListener('click', () => {
//       showModal(loadList, loadDetails);
//    });
// })();






