/* async function loadPokemon(){
 const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    let data = await response.json()
    console.log(data)
}
loadPokemon() */

document.getElementById('search').addEventListener('click',async function(){ // To get input from user
    let feedback = document.getElementById('inputField').value; //input user itself
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${feedback}`) // ${}, see readme -> useful resources // to fetch data from API
    let data = await response.json() // the actual returned data
    console.log(data);
    document.getElementById('namePokemon').innerHTML = `It's: ${data.name}`; // visual display name
    document.getElementById('frontM').src = data.sprites.other.home.front_default; // front image male
    document.getElementById('shinyM').src = data.sprites.other.home.front_shiny; // front image shiny male
    document.getElementById('frontF').src = data.sprites.other.home.front_female; // front image female
    document.getElementById('shinyF').src = data.sprites.other.home.front_shiny_female; // front image shiny female
    document.getElementById('moves').innerHTML = data.moves.map(move => move.move.name).slice(0, 5).join('_ ') // get span to display moves, fetch info form API, .slice-> (start#,end#), .join acts as separator
    if(feedback === '132' || feedback === 'ditto'){
        document.getElementById('moves').innerHTML = data.moves[0].move.name;
    }
})

