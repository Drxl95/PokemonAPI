let pokemonList = [

      {
         name: 'Charizard',
         height: 1.7,
         types: ['Monster','Dragon']
      },
   
      {
         name: 'Pikachu',
         height: 0.4,
         types: ['Field','Fairy']
      },
   
      {
         name: 'Snorlax',
         height: 2.1,
         types:  ['Monster']
      }
]

//Lists the name of the pokemon and their height//

for (let i = 0; i < pokemonList.length; i++) {
   // if (pokemonList[i].name = 'Charizard'){
   //    document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.');
   // }else if (pokemonList[i].name = 'Pikachu'){
   //    document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.');

   // }else {
   //    document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.');
   // }

   //If the pokemon's height is above 1.5, it will say its a big pokemon//
   // if (pokemonList[i].height >= 1.5) {
   //    document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.' + '-Wow, that\'s a big pokemon!');
   // }
   if (pokemonList[i].height >= 1.5) {
      document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.' + '-Wow, that\'s a big pokemon!');
   }
   else {
      document.write(pokemonList[i].name + ' is' + pokemonList[i].height +' meters tall.');
   }
}


