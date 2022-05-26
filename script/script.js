/* async function loadPokemon(){
 const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    let data = await response.json()
    console.log(data)
}
loadPokemon() */
document.getElementById('inputField').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        document.getElementById('search').click()
    }
})

document.getElementById('search').addEventListener('click', async function () { // To get input from user
    let feedback = document.getElementById('inputField').value; //input user itself
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${feedback}`); // ${}, see readme -> useful resources // to fetch data from API
    let data = await response.json(); // the actual returned data
    console.log(data);
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`) // ${}, see readme -> useful resources // to fetch data from API
    let data2 = await response2.json();
    console.log(data2);
    const chainFetch = data2.evolution_chain.url;
    const respone3 = await fetch(chainFetch);
    let response4 = await respone3.json();
    console.log(response4);
    /* if(data2.evolves_from_species === null){
        document.getElementById('namePrevEvo').innerHTML= `none, ${data.name} is already the base form`;
        document.getElementById('preEvo').src = "";
    }
    else{
        let preEvoName = data2.evolves_from_species.name;
        document.getElementById('namePrevEvo').innerHTML= preEvoName;
        let preEvoImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvoName}`);
        let fetchResult = await preEvoImage.json();
        console.log(fetchResult);
        document.getElementById('preEvo').src = fetchResult.sprites.other.home.front_default;
    } */
    //1
    if (data.sprites.other.home.front_default !== null) {
        document.getElementById('frontM').src = data.sprites.other.home.front_default;
        document.getElementById('frontM').style.visibility = 'visible';
    } else {
        document.getElementById('frontM').style.visibility = 'hidden';
    }
    //2
    if (data.sprites.other.home.front_shiny !== null) {
        document.getElementById('shinyM').src = data.sprites.other.home.front_default;
        document.getElementById('shinyM').style.visibility = 'visible';
    } else {
        document.getElementById('shinyM').style.visibility = 'hidden';
    }
    //3
    if (data.sprites.other.home.front_female !== null) {
        document.getElementById('frontF').src = data.sprites.other.home.front_default;
        document.getElementById('frontF').style.visibility = 'visible';
    } else {
        document.getElementById('frontF').style.visibility = 'hidden';
    }
    //4
    if (data.sprites.other.home.front_shiny_female !== null) {
        document.getElementById('shinyF').src = data.sprites.other.home.front_default;
        document.getElementById('shinyF').style.visibility = 'visible';
    } else {
        document.getElementById('shinyF').style.visibility = 'hidden';
    }
    document.getElementById('namePokemon').innerHTML = `It's: ${data.name} `; // visual display name
    document.getElementById('numberPokemon').innerHTML = `- Pokédex number: ${data.id}`; // visual display pokédex number
    document.getElementById('frontM').src = data.sprites.other.home.front_default; // front image male
    document.getElementById('shinyM').src = data.sprites.other.home.front_shiny; // front image shiny male
    document.getElementById('frontF').src = data.sprites.other.home.front_female; // front image female
    document.getElementById('shinyF').src = data.sprites.other.home.front_shiny_female; // front image shiny female
    for (let i = 0; i < 6; i++) {
        let li = document.getElementById(`m${i}`)
        li.innerText = data.moves[i].move.name
    }
    for (let i = 0; i < 2; i++) {
        let li = document.getElementById(`t${i}`)
        li.innerText = '';
    }
    for (let i = 0; i < data.types.length; i++) {
        let li = document.getElementById(`t${i}`)
        li.innerText = data.types[i].type.name
    }
    //document.getElementById('moves').innerHTML = data.moves.map(move => move.move.name).slice(0, 5).join('_ '); // get span to display moves, fetch info form API, .slice-> (start#,end#), .join acts as separator
    if (feedback === '132' || feedback === 'ditto') {
        document.getElementById('moves').innerHTML = data.moves[0].move.name;
    }
    let baseEvo = response4.chain.species.name;
    let midEvo = response4.chain.evolves_to.length;
    document.getElementById('baseEvo').innerText = baseEvo;
    let baseImageFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseEvo}`)
    let baseImage = await baseImageFetch.json();
    document.getElementById('baseImage').src = baseImage.sprites.other.home.front_default;
    if (midEvo) {
        let finalEvo = response4.chain.evolves_to[0].evolves_to.length;
        console.log(finalEvo);
        document.getElementById('midEvo').innerText = response4.chain.evolves_to[0].species.name;
        let midImageFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${response4.chain.evolves_to[0].species.name}`);
        let midImage = await midImageFetch.json();
        document.getElementById('midImage').src = midImage.sprites.other.home.front_default;
        document.getElementById('midImage').style.visibility = 'visible';
        if (finalEvo) {
            document.getElementById('finalEvo').innerText = response4.chain.evolves_to[0].evolves_to[0].species.name;
            let finalImageFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${response4.chain.evolves_to[0].evolves_to[0].species.name}`);
            let finalImage = await finalImageFetch.json();
            document.getElementById('finalImage').src = finalImage.sprites.other.home.front_default;
            document.getElementById('finalImage').style.visibility = 'visible';
        }
        else if (finalEvo === 0){
            document.getElementById('finalEvo').innerText = '';
            document.getElementById('finalImage').style.visibility = 'hidden';
        }
    }
    else{
        document.getElementById('midEvo').innerText = '';
        document.getElementById('midImage').style.visibility = 'hidden';
        document.getElementById('finalEvo').innerText = '';
        document.getElementById('finalImage').style.visibility = 'hidden';
    }
})

