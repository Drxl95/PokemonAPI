
let pokemonRepository = (function () {
   let pokemonList = [
         {
            name: 'Charizard',
            height: 1.7,
            types: ['Monster',' Dragon']
         },
   
         {              
            name: 'Pikachu',              
            height: 0.4,               
            types: ['Field',' Fairy']              
         },             

         {              
            name: 'Snorlax',              
            height: 2.1,               
            types:  ['Monster']              
         }              
   ];
function getAll() {
   return pokemonList;
}
function add(pokemon) {
   pokemonList.push(pokemon);
}
return {
   add: add,
   getAll: getAll
};
})();



pokemonRepository.getAll().forEach(function(pokemon) {
   document.write(pokemon.name + ' is ' + pokemon.height + ' meters tall and is type: ' + pokemon.types + '. ');
});




// for (let i = 0; i < pokemonList.length; i++) {   //Lists the name of the pokemon and their height//
//    if (pokemonList[i].height >= 1.5) {     //If the pokemon's height is above 1.5, it will say its a big pokemon//
//       document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.' + '-Wow, that\'s a big pokemon!');
//    }
//    else {
//       document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.');
//    }
// }


