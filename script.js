let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function decide() {
    const r = Math.random();
    if (r <= 1 / 3) return '✊';
    else if (r <= 2 / 3) return '✋';
    else return '✌️';
}

document.querySelectorAll('.options').forEach((value) => value.addEventListener('click', result));

function result(param) {
    let user;
    if(typeof param !== 'string'){
        user = param.target.innerText;
    }else{
        user = param;
    }

    const computer = decide();
    console.log(user);

    if (user === '✋') {
        if (computer === '✋') r = 'Tie!';
        else if (computer === '✊') r = 'You win!'
        else r = 'You lose!';
    } else if (user === '✊') {
        if (computer === '✊') r = 'Tie!';
        else if (computer === '✌️') r = 'You win!'
        else r = 'You lose!';
    } else {
        if (computer === '✌️') r = 'Tie!';
        else if (computer === '✋') r = 'You win!'
        else r = 'You lose!';
    }

    if (r === 'You win!') score.wins += 1;
    else if (r === 'You lose!') score.losses += 1;
    else score.ties += 1;

    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.results').innerText = `${r}`;
    document.querySelector('.choice').innerText = `You choose ${user} and the computer choose ${computer}.`;
    updateScoreElement();
}



function updateScoreElement() {
    document.querySelector('.scoree').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.results').innerText = 'Score has been reset!';
    document.querySelector('.choice').innerText = '';
});


isAutoPlaying = false;
const autoPlayButton = document.querySelector('.auto-play-button');
autoPlayButton.addEventListener('click', () => {
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            const playerMove = decide();
            result(playerMove);
        }, 1000);

        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
});


