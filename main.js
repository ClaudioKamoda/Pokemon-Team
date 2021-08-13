const pokemonContainer = document.getElementsByClassName('pokemon-container')[0]
const plusContainer = document.getElementsByClassName('plus-container')[0]
const inputContainer = document.getElementsByClassName('input-container')[0]

const plus = document.getElementById('plus-sign')

plusContainer.plus.addEventListener('click', () => {
	plusContainer.classList.add('hide')
	inputContainer.classList.remove('hide')
})
