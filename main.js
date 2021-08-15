const buttonGetTeam = document.getElementById('getTeam')
let basePokemonNumbers = [898, 898, 898, 898, 898, 898]
let drawedNumbers = []
let teamToShow

const teamContainer = document.getElementById('team-container')

buttonGetTeam.addEventListener('click', () => {
	getNewTeam()

	//send requests

	//show the data on screen

	console.log(teamToShow)
	drawedNumbers = []
})

function makeRequest(pokemonToRequest){
	axios
		.get('https://pokeapi.co/api/v2/pokemon/1')
		.then(function (response) {
			// handle success
			console.log(response)
		})
		.catch(function (error) {
			// handle error
			console.log(error)
		})
		.then(function () {
			// always executed
		})
}


function getRandomNumber(max) {
	return Math.floor(Math.random() * (max - 1)) + 1
}

function alreadyDrawed(element, array) {
	return array.find(el => el == element) > 0 ? true : false
}

function getNewTeam() {
	teamToShow = basePokemonNumbers.map(number => {
		let aux = getRandomNumber(number)

		while (alreadyDrawed(aux, drawedNumbers)) {
			aux = getRandomNumber(number)
		}
		drawedNumbers.push(aux)

		return aux
	})
}
