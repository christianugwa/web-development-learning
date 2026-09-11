const score = JSON.parse(localStorage.getItem ('score')) || {wins: 0, losses: 0,  ties: 0};

/*if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}*/

  let isAutoPlaying = false;
  let intervalId;

  const autoButton = document.querySelector('.js-auto-play-button')

  autoButton.addEventListener('click' , ogButton = () => {
    autoPlay()
  })

  let changeButton = document.querySelector('.auto-play-button')

  function autoPlay() {
    if (!isAutoPlaying) {
    intervalId = setInterval(() => {
    const playerMove = pickComputermove();
    playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    changeButton.textContent = 'Stop Playing'
   }
    else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    changeButton.textContent = 'Auto Play';
   }
  }

  updateScoreElement ();

  document.querySelector('.js-rock-button').addEventListener('click' , () => {
    playGame('Rock');
  });
  document.querySelector('.js-paper-button').addEventListener('click' , () => {
    playGame('Paper');
  });
  document.querySelector('.js-scissors-button').addEventListener('click' , () => {
    playGame('Scissors');
  });

  document.body.addEventListener('keydown' , (event) => {
    if (event.key === 'r') {
      playGame('Rock')
    } else if (event.key === 'p') {
      playGame('Paper')
    } else if (event.key === 's') {
      playGame('Scissors')
    } else if (event.key === 'a') {
      autoPlay()
    } else if (event.key === 'Backspace') {
      resetScore();
    }
  })

  document.querySelector('.js-reset-score-button').
  addEventListener('click' , () => {
    resetScore();
  })

  let confirmationBox = document.querySelector('.js-question-div');


  function resetScore() {
    confirmationBox.innerHTML = 
    'Are you sure you want to reset the score? <button class="yes-button js-yes-button">Yes</button> <button class="no-button js-no-button">No</button>'

    document.querySelector('.js-yes-button').addEventListener ('click' , () => {
      score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement ();

    confirmationBox.innerHTML = ''; })

    document.querySelector('.js-no-button').addEventListener ('click' , () => {
      confirmationBox.innerHTML = '';
    })
  
  }

  function playGame(playerMove) {

  const computerMove = pickComputermove() ;
  
  let result = '';
  
  if (playerMove === 'Scissors') {

    if (computerMove === 'Paper') {
      result = 'You Win.';
    } else if (computerMove === 'Rock') {
      result = 'You Lose.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
  
  } else if (playerMove === 'Paper') {

    if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Rock') {
      result = 'You Win.';
    } else if (computerMove === 'Scissors') {
      result = 'You Lose.';
    }

  } else if (playerMove === 'Rock') { 

    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You Lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You Win.';
    }

  }

  if (result === 'You Win.') {
    score.wins += 1;
  } else if (result === 'You Lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }



  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement ();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
  <img src="Images-JAvascript/${playerMove}-emoji.png" class="move-icon" >
  <img src="Images-JAvascript/${computerMove}-emoji.png" class="move-icon">
  Computer`;

}

function updateScoreElement () {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputermove () {

  const randomNumber = Math.random ();
  
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3 ) {
    computerMove = 'Paper';
  } else if ( randomNumber >= 1/3 && randomNumber < 2/3 ) {
    computerMove = 'Rock';
  } else if ( randomNumber >= 2/3 && randomNumber < 1 ) {
    computerMove = 'Scissors';
  }

  return computerMove;

}