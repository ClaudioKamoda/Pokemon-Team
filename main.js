const buttonGetTeam = document.getElementById('getTeam')

let basePokemonNumbers = [898, 898, 898, 898, 898, 898] //Array to be mapped with the biggest Pokémon number
let drawedNumbers = [] //Array to store the already drawed numbers and avoid repetition
let teamToShow //array with the pokemon numbers
let dataToShow //array with the html to show in the page

const teamContainer = document.getElementById('team-container')

buttonGetTeam.addEventListener('click', () => {
	getNewTeam()

	Promise.all(
		teamToShow.map(pokemonNumber => {
			return makeRequest(pokemonNumber)
		})
	).then(function (results) {
		console.log(results)

		dataToShow = results.map(info => {
			let types = []

			for (i in info.data.types) {
				types.push(
					`<div class="type ${
						info.data.types[i].type.name
					}">${info.data.types[i].type.name.toUpperCase()}</div>`
				)
			}

			return `<div class="pokemon-container">
			<div class="pkm-number-name">
				<p id="pkm-number">#${info.data.id}</p>
				<p id="pkm-name">${
					info.data.name.charAt(0).toUpperCase() +
					info.data.name.slice(1)
				}</p>
			</div>
			<img
				id="pkm-image"
				src=${info.data.sprites.other['official-artwork'].front_default}
				alt="Pokémon Image"
			/>
			<div id="pkm-types">
				${types.join('')}
			</div>
			<div class="pkm-stats">
				<div class="stat">
					<p>HP</p>
					<p id="hp">${info.data.stats[0].base_stat}</p>
				</div>
				<div class="stat">
					<p>ATK</p>
					<p id="atk">${info.data.stats[1].base_stat}</p>
				</div>
				<div class="stat">
					<p>DEF</p>
					<p id="def">${info.data.stats[2].base_stat}</p>
				</div>
				<div class="stat">
					<p>SPA</p>
					<p id="sp-atk">${info.data.stats[3].base_stat}</p>
				</div>
				<div class="stat">
					<p>SPD</p>
					<p id="sp-def">${info.data.stats[4].base_stat}</p>
				</div>
				<div class="stat">
					<p>SPE</p>
					<p id="spe">${info.data.stats[5].base_stat}</p>
				</div>
			</div>
		</div>`
		})
		teamContainer.innerHTML = dataToShow.join('')
	})

	drawedNumbers = []
})

function makeRequest(pokemonToRequest) {
	return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonToRequest}`)
}

function getRandomNumber(max) {
	return Math.floor(Math.random() * (max - 1)) + 1
}

function alreadyDrawed(element, array) {
	return array.find(el => el == element) > 0 ? true : false
}

function getNewTeam() {
	//generates 6 random numbers between 1 and 898 without repetitions
	teamToShow = basePokemonNumbers.map(number => {
		let aux = getRandomNumber(number)

		while (alreadyDrawed(aux, drawedNumbers)) {
			aux = getRandomNumber(number)
		}
		drawedNumbers.push(aux)

		return aux
	})
}
