// Version 1.1
/* eslint semi: ['error', 'always'] */

const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');
const scoreText = document.querySelectorAll('h1')[0];
const hiScoreText = document.querySelectorAll('h1')[1];
const pauseButton = document.querySelector('button');
const startImg = document.querySelector('img');

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const gridSize = w < 610 ? 15 : 20;

canvas.width = canvas.height = gridSize * Math.round(w / gridSize);
startImg.height = startImg.width = canvas.width;

let score = 0;
let hiScore = 0;

let px = 0;
let py = 0;
let vx = 1;
let vy = 0;
const tail = [];
let length = 5;

let apx = Math.round(Math.random() * gridSize);
let apy = Math.round(Math.random() * gridSize);

let playing = false;

setInterval(update, 70);

pauseButton.addEventListener('click', function () {
  playing = !playing;
  startImg.style.display = 'none';
  if (!playing) {
    pauseButton.textContent = 'Play';
  } else {
    pauseButton.textContent = 'Pause';
  }
});

function update () {
  if (playing) {
    tail.unshift([px, py]);
    while (tail.length > length) {
      tail.pop();
    }
    px += vx;
    py += vy;

    if (px > canvas.width / gridSize - 1) {
      px = 0;
    } else if (px < 0) {
      px = canvas.width / gridSize;
    } else if (py > canvas.height / gridSize - 1) {
      py = 0;
    } else if (py < 0) {
      py = canvas.height / gridSize;
    }

    if (apx === px && apy === py) {
      apx = Math.round(Math.random() * (canvas.height / gridSize - 1));
      apy = Math.round(Math.random() * (canvas.height / gridSize - 1));
      length++;
      score++;
      scoreText.textContent = scoreText.textContent.substring(0, 8) + score;
    }

    for (let i = 0; i < tail.length; i++) {
      if (tail[i][0] === px && tail[i][1] === py) {
        length = 5;
        if (score > hiScore) {
          hiScore = score;
        }
        score = 0;
        scoreText.textContent = scoreText.textContent.substring(0, 8) + score;
        hiScoreText.textContent = hiScoreText.textContent.substring(0, 13) + hiScore;
      }
    }

    drawPlayer();
  }
}

document.addEventListener('keydown', function (event) {
  if (playing) {
    if (event.keyCode === 37 && vx !== 1) {
      vx = -1;
      vy = 0;
    } else if (event.keyCode === 38 && vy !== 1) {
      vy = -1;
      vx = 0;
    } else if (event.keyCode === 39 && vx !== -1) {
      vx = 1;
      vy = 0;
    } else if (event.keyCode === 40 && vy !== -1) {
      vy = 1;
      vx = 0;
    }
  }
});

let x1;
let x2;
let y1;
let y2;

document.addEventListener('touchstart', function (event) {
  x1 = event.touches[0].clientX;
  y1 = event.touches[0].clientY;
});

document.addEventListener('touchend', function (event) {
  x2 = event.changedTouches[0].clientX;
  y2 = event.changedTouches[0].clientY;

  if (x2 - x1 > 0 && Math.abs(y2 - y1) < Math.abs(x2 - x1) && vx !== -1) {
    vx = 1;
    vy = 0;
  } else if (x2 - x1 < 0 && Math.abs(y2 - y1) < Math.abs(x2 - x1) && vx !== 1) {
    vx = -1;
    vy = 0;
  } else if (y2 - y1 > 0 && Math.abs(y2 - y1) > Math.abs(x2 - x1) && vy !== -1) {
    vx = 0;
    vy = 1;
  } else if (y2 - y1 < 0 && Math.abs(y2 - y1) > Math.abs(x2 - x1) && vy !== 1) {
    vx = 0;
    vy = -1;
  }
});

function drawPlayer () {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  ctx.fillStyle = '#f00';
  ctx.fillRect(apx * gridSize, apy * gridSize, gridSize, gridSize);

  ctx.fillStyle = '#DDD';
  ctx.fillRect(px * gridSize, py * gridSize, gridSize, gridSize);

  for (let i = 0; i < tail.length; i++) {
    ctx.fillRect(tail[i][0] * gridSize, tail[i][1] * gridSize, gridSize, gridSize);
  }
}
