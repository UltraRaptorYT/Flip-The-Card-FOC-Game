const config = {
	gridSize: 5, // grid size = n x n
	numberOfFiles: 15, // number of different shapes
};

config.numberOfCards = config.numberOfFiles * 2; // number of cards

const resize = () => {
	let vh = window.innerHeight * 0.01;
	console.log(vh);
	// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

$(document).ready(() => {
	resize();
	$('#game').addClass('d-none');
	$('#timer').hide();
	$('#col').hide();
	sessionStorage.clear();
	sessionStorage.setItem('flip', false);
	document.body.style.justifyContent = 'center';
});

document.addEventListener('resize', () => {
	resize();
});
var startTime = true;
var count = 0;
var tries = 0;

const flip = (index) => {
	if (sessionStorage.getItem('flip') === 'false') {
		if (!document.getElementById(`card${index}`).classList.contains('is-flipped')) {
			document.getElementById(`card${index}`).classList.add('is-flipped');
			if (sessionStorage.getItem('card') === null) {
				sessionStorage.setItem('card', 1);
				sessionStorage.setItem('flip', false);
			} else {
				sessionStorage.setItem('card', parseInt(sessionStorage.getItem('card')) + 1);
				if (sessionStorage.getItem('card') !== '1') {
					sessionStorage.clear();
					sessionStorage.setItem('flip', true);
					tries++;
					var cardArr = [];
					var indexArr = [];
					for (var i = 0; i < document.getElementById('grid').children.length; i++) {
						if (document.getElementById('grid').children[i].getElementsByClassName('tile__inner')[0].classList.contains('is-flipped')) {
							cardArr.push(
								document
									.getElementById('grid')
									.children[i].getElementsByClassName('tile__inner')[0]
									.getElementsByClassName('tile__face--back')[0]
									.getElementsByTagName('img')[0]
									.src.split('cards/')[1]
									.split('.')[0]
							);
							indexArr.push(i);
						}
					}
					if (new Set(cardArr).size != cardArr.length) {
						for (var i of indexArr) {
							document.getElementById('grid').children[i].getElementsByClassName('tile__inner')[0].classList.remove('is-flipped');
							document.getElementById('grid').children[i].getElementsByClassName('tile__inner')[0].classList.add('flipped_perm');
							count++;
						}
						setTimeout(() => {
							if (count >= numberOfCards) {
								startTime = false;
								alert(`You complete game in ${tries} tries and ${document.getElementById('timer').innerText}`);
							}
						}, 1000);
					}
					setTimeout(() => {
						for (var i = 0; i < document.getElementById('grid').children.length; i++) {
							if (
								document.getElementById('grid').children[i].getElementsByClassName('tile__inner')[0].classList.contains('is-flipped')
							) {
								document.getElementById('grid').children[i].getElementsByClassName('tile__inner')[0].classList.remove('is-flipped');
							}
						}
						sessionStorage.setItem('flip', false);
					}, 1000);
				}
			}
		}
	}
};

const start = () => {
	setInterval(startTimer, 10);
	$('#timer').show();
	$('#col').show();
	$('#start').addClass('d-none');
	$('#start').removeClass('d-flex');
	$('#game').removeClass('d-none');
	$('#game').addClass('d-flex');
	document.getElementById('grid').style.gridTemplateColumns = `repeat(${config.numberOfCards / config.gridSize}, 1fr)`;
	document.getElementById('grid').style.gridTemplateRows = `repeat(${config.gridSize}, 1fr)`;
	var array = [];
	for (var j = 0; j < 2; j++) {
		for (var i = 1; i <= config.numberOfFiles; i++) {
			array.push(i);
		}
	}
	cardsArray = [...Array(config.numberOfCards).keys()].map((n) => n + 1); // Populate array of n size from 1 to n
	document.getElementById('colNum').style.gridTemplateColumns = `repeat(${config.numberOfCards / config.gridSize}, 1fr)`;
	document.getElementById('rowNum').style.gridTemplateRows = `repeat(${config.gridSize}, 1fr)`;
	for (var u = 1; u <= config.numberOfCards / config.gridSize; u++) {
		$('#colNum').append(`<p class="Number">${u}</p>`);
	}
	for (var u = 1; u <= config.gridSize; u++) {
		$('#rowNum').append(`<p class="Number">${u}</p>`);
	}
	array = shuffleArray(array);
	cardsArray = shuffleArray(cardsArray);
	for (var i = 0; i < config.numberOfCards; i++) {
		document.getElementById('grid').innerHTML += `
    <div class="tile">
      <div class="tile__inner"  id="card${i}" onClick="flip(${i})">
        <div class="tile__face tile__face--front">
          <img src="./src/card-back/${cardsArray[i]}.png">
        </div>
        <div class="tile__face tile__face--back">
          <img src="./src/cards/${array[i]}.png" />
        </div>
      </div>
    </div>`;
	}
};

// <h2>
//   ${i + 1}R$
//   {Math.floor(i / ((config.numberOfCards) / config.gridSize)) + 1}
//   C$
//   {1 + Math.floor(i % ((config.numberOfCards) / config.gridSize))}
// </h2>;

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
let minutes = 00;
let seconds = 00;
let tens = 00;
const Minutes = document.querySelector('.mins');
const Seconds = document.querySelector('.seconds');
const Tens = document.querySelector('.tens');

function startTimer() {
	if (startTime) {
		tens++;
		if (tens <= 9) {
			Tens.innerHTML = '0' + tens;
		}
		if (tens > 9) {
			Tens.innerHTML = tens;
		}
		if (tens > 99) {
			seconds++;
			Seconds.innerHTML = '0' + seconds;
			tens = 0;
			Tens.innerHTML = '0' + 0;
		}
		if (seconds > 9) {
			Seconds.innerHTML = seconds;
		}
		if (seconds > 59) {
			minutes++;
			Minutes.innerHTML = '0' + minutes;
			seconds = 0;
			Seconds.innerHTML = '0' + 0;
		}
		if (minutes > 9) {
			Minutes.innerHTML = minutes;
		}
	}
}
