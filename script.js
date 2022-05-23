/* async function loadPokemon(){
 const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    let data = await response.json()
    console.log(data)
}
loadPokemon() */

document.getElementById('search').addEventListener('click',async function(){
    let feedback = document.getElementById('inputField').value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${feedback}`) // see readme -> useful resources
    let data = await response.json()
    console.log(data);
})