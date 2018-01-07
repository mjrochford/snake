const canvas = document.getElementById("gc");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelectorAll("h1")[0];
const hiScoreText = document.querySelectorAll("h1")[1];
const pauseButton = document.querySelector("button");
const startImg = document.querySelector("img");

canvas.width = canvas.height = 600;
startImg.height = startImg.width = canvas.height;


const gridSize = 20;

let score = 0;
let hiScore = 0;

let px = py = 0;
let vx = 1;
let vy = 0;
const tail = [];
let length = 5;

let apx = Math.round(Math.random() * gridSize);
let apy = Math.round(Math.random() * gridSize);

let playing = false;

const game = setInterval(update, 70);

pauseButton.addEventListener("click", function() {
  playing = !playing;
  startImg.style.display = 'none'
  if (!playing)
    pauseButton.textContent = "Play";
  else
    pauseButton.textContent = "Pause";
});

function update() {
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

    if (apx == px && apy == py) {
      apx = Math.round(Math.random() * (canvas.height / gridSize - 1));
      apy = Math.round(Math.random() * (canvas.height / gridSize - 1));
      length++;
      score++;
      scoreText.textContent = scoreText.textContent.substring(0, 8) + score;

    }

    for (let i = 0; i < tail.length; i++) {
      if (tail[i][0] == px && tail[i][1] == py) {
        length = 5;
        if (score > hiScore)
          hiScore = score;
        score = 0;
        scoreText.textContent = scoreText.textContent.substring(0, 8) + score;
        hiScoreText.textContent = hiScoreText.textContent.substring(0, 13) + hiScore;
      }
    }

    drawPlayer();
  }
}

document.addEventListener("keydown", function (event) {
  if (playing) {
    if (event.keyCode == 37 && vx != 1) {
      vx = -1;
      vy = 0;
    } else if (event.keyCode == 38 && vy != 1) {
      vy = -1;
      vx = 0;
    } else if (event.keyCode == 39 && vx != -1) {
      vx = 1;
      vy = 0;
    } else if (event.keyCode == 40 && vy != -1) {
      vy = 1;
      vx = 0;
    }
  }
});

function drawPlayer() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.height, canvas.width);

  ctx.fillStyle = "#f00";
  ctx.fillRect(apx * gridSize, apy * gridSize, gridSize, gridSize);

  ctx.fillStyle = "#DDD";
  ctx.fillRect(px * gridSize, py * gridSize, gridSize, gridSize);

  for (let i = 0; i < tail.length; i++) {
    ctx.fillRect(tail[i][0] * gridSize, tail[i][1] * gridSize, gridSize, gridSize);
  }
}
