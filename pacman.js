document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const highScoreDisplay = document.getElementById('highScore')
  const levelDisplay = document.getElementById('level')
  const livesDisplay = document.getElementById('lives')
  const width = 28 // 28 x 28 = 784 Squares
  let totalPellets = 0

  let lives = 3
  if (sessionStorage.getItem('lives') !== null)
    lives = parseInt(sessionStorage.getItem('lives'))
  let score = 0
  if (sessionStorage.getItem('score') !== null)
    score = parseInt(sessionStorage.getItem('score'))

  let highScore = 0
  if (sessionStorage.getItem('highScore') !== null)
    highScore = sessionStorage.getItem('highScore')

  let level = 1
  if (sessionStorage.getItem('level') !== null)
    level = parseInt(sessionStorage.getItem('level'))

  let pelletsEaten = 0

  let speedBoost = 100
  if (sessionStorage.getItem('speedBoost') !== null)
    speedBoost = parseInt(sessionStorage.getItem('speedBoost'))

  highScoreDisplay.innerHTML = highScore
  scoreDisplay.innerHTML = score
  levelDisplay.innerHTML = level
  livesDisplay.innerHTML = lives

  //layout grid
  const layout1 = [
    0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
    4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4,
    0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,
    0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0
  ]
  const layout2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 2, 2, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 2, 2, 2, 2, 2, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 3, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 3, 0,
    0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  const layout3 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 4,
    0, 1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
    4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0,
    0, 1, 1, 1, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 0, 1, 0,
    4, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  const layout4 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 2, 2, 2, 1, 0, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 2, 2, 2, 1, 0, 1, 0, 4, 0, 0, 0, 2, 2, 0, 0, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 1, 1, 1, 4, 0, 2, 2, 2, 2, 2, 2, 4, 4, 1, 1, 1, 1, 0, 0, 0, 1, 0,
    4, 1, 1, 1, 1, 1, 0, 1, 0, 4, 0, 2, 2, 2, 2, 2, 2, 0, 4, 0, 1, 0, 1, 1, 1, 1, 1, 4,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 4, 4, 2, 2, 2, 2, 2, 2, 0, 4, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 1, 2, 2, 2, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 2, 2, 2, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
    0, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  //legend
  // 0 - wall
  // 1 - pac dot
  // 2 - ghost lair
  // 3 - power pellet
  // 4 - empty

  const layouts = [layout1, layout2, layout3, layout4]
  const squares = []

  //select board
  switch (level) {
    case 1:
      layout = layouts[1]
      break
    case 2:
      layout = layouts[0]
      break
    case 3:
      layout = layouts[2]
      break
    case 4:
      layout = layouts[3]
      break
    default:
      layout = layouts[Math.floor(Math.random() * layouts.length)]
      break
  }
  //draw board
  ghostLair = []
  ghostLairIndex = 0
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to board
      if (layout[i] === 0) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 1) {
        squares[i].classList.add('pac-dot')
        totalPellets++
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
        ghostLair[ghostLairIndex] = i
        ghostLairIndex += 1
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
        totalPellets++
      }
    }
  }
  createBoard()

  //pacman position
  let pacmanCurrentIndex = 462

  squares[pacmanCurrentIndex].classList.add('pac-man')
  let pacDirection = 0
  function pacmanDirection(e) {
    switch (e.keyCode) {
      case 37:
        if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {
          pacDirection = -1
        }
        break
      case 38:
        if (!squares[pacmanCurrentIndex - width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
          pacDirection = -width
        }
        break
      case 39:
        if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
          pacDirection = 1
        }
        break
      case 40:
        if (!squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
          pacDirection = width
        }
        break
    }
  }

  //move pacman
  function movePacman(e) {
    pacmanTimer = setInterval(function () {
      squares[pacmanCurrentIndex].classList.remove('pac-man')
      if (!squares[pacmanCurrentIndex + pacDirection].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + pacDirection].classList.contains('ghost-lair')) {

        pacmanCurrentIndex += pacDirection
        //tunnels
        //left to right
        if (pacmanCurrentIndex === 392) {
          pacmanCurrentIndex = 419
          pacDirection = -1
        }
        else if (pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391
          pacDirection = -1
        }
        else if (pacmanCurrentIndex === 672) {
          pacmanCurrentIndex = 111
          pacDirection = -1
        }
        //up to down
        else if (pacmanCurrentIndex === 7) {
          pacmanCurrentIndex = 763
          pacDirection = -width
        }
        else if (pacmanCurrentIndex === 20) {
          pacmanCurrentIndex = 776
          pacDirection = -width
        }
        else if (pacmanCurrentIndex === 9) {
          pacmanCurrentIndex = 774
          pacDirection = -width
        }
        //down to up
        else if (pacmanCurrentIndex === 419) {
          pacmanCurrentIndex = 392
          pacDirection = 1
        }
        else if (pacmanCurrentIndex === 391) {
          pacmanCurrentIndex = 364
          pacDirection = 1
        }
        else if (pacmanCurrentIndex === 111) {
          pacmanCurrentIndex = 672
          pacDirection = 1
        }
        //down to up
        else if (pacmanCurrentIndex === 763) {
          pacmanCurrentIndex = 7
          pacDirection = width
        }
        else if (pacmanCurrentIndex === 776) {
          pacmanCurrentIndex = 20
          pacDirection = width
        }
        else if (pacmanCurrentIndex === 774) {
          pacmanCurrentIndex = 9
          pacDirection = width
        }
      }
      pacdotEaten()
      powerPelletEaten()
      checkForGameOver()
      checkForWin()
      squares[pacmanCurrentIndex].classList.add('pac-man')
      ghosts.forEach(ghost => {
        checkForGhostEaten(ghost, ghost.direction)
      })
    }, 300)
  }
  movePacman()
  document.addEventListener('keyup', pacmanDirection)

  //when a pacdot is eaten by pacman
  function pacdotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score += 10
      pelletsEaten++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }
  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet') && ghosts[0].isScared === false) {
      score += 50
      pelletsEaten++
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // class for ghost enemies
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.currentIndex = startIndex
      this.speed = speed + speedBoost
      this.isScared = false
      this.timerId = NaN
      this.direction = 0
    }
  }

  //all of the ghosts
  ghosts = [
    new Ghost('blinky', ghostLair[Math.floor(Math.random() * ghostLair.length)], 300),
    new Ghost('pinky', ghostLair[Math.floor(Math.random() * ghostLair.length)], 500),
    new Ghost('inky', ghostLair[Math.floor(Math.random() * ghostLair.length)], 400),
    new Ghost('clyde', ghostLair[Math.floor(Math.random() * ghostLair.length)], 550),
    new Ghost('sue', ghostLair[Math.floor(Math.random() * ghostLair.length)], 550),
    new Ghost('funky', ghostLair[Math.floor(Math.random() * ghostLair.length)], 350),
    new Ghost('kinky', ghostLair[Math.floor(Math.random() * ghostLair.length)], 400),
    new Ghost('orson', ghostLair[Math.floor(Math.random() * ghostLair.length)], 300)
  ]

  //draw ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })

  //move ghosts function
  ghosts.forEach(ghost => {
    moveGhost(ghost)
  })
  function moveGhost(ghost) {
    const directions = [-1, 1, -width, width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.direction = direction

    ghost.timerId = setInterval(function () {
      //if direction does not hit wall or ghost, move there
      if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        ghost.currentIndex + direction > 27 && ghost.currentIndex + direction < 755 &&
        ghost.currentIndex + direction % 28 !== 0 && ghost.currentIndex + direction + 1 % 28 !== 0) {

        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex += direction

        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
        ghost.direction = direction
      }
      //checks to see if ghost is scared
      if (ghost.isScared == true) {
        squares[ghost.currentIndex].classList.add(ghost.className, 'scared-ghost')
      }
      checkForGhostEaten(ghost, direction)

      checkForGameOver()
    }, ghost.speed)

  }
  //checks if ghost is scared and pacman has eaten the ghost
  function checkForGhostEaten(ghost, direction) {
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score += 200
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    } else if (ghost.isScared && squares[ghost.currentIndex + direction].classList.contains('pac-man') && pacDirection === -direction) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      squares[ghost.currentIndex + direction].classList.add(ghost.className, 'ghost', 'scared-ghost')
      squares[ghost.currentIndex + direction].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score += 200
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    } else if (ghost.isScared && squares[pacmanCurrentIndex + pacmanDirection].classList.contains(ghost.className, 'ghost', 'scared-ghost') && pacDirection === -direction) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      squares[ghost.currentIndex + direction].classList.add(ghost.className, 'ghost', 'scared-ghost')
      squares[ghost.currentIndex + direction].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score += 200
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }

  }

  function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      lives -= 1
      if (lives === 0) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        clearInterval(pacmanTimer)
        document.removeEventListener('keyup', movePacman)
        //if new score is higher than the highscore, let it become the highscore
        if (highScore < score) {
          highScore = score
          sessionStorage.setItem('highScore', highScore)
        }
        let killedBy = ""
        //checks to see who killed pacman
        if (squares[pacmanCurrentIndex].classList.contains('blinky')) {
          killedBy = "Blinky"
        } else if (squares[pacmanCurrentIndex].classList.contains('pinky')) {
          killedBy = "Pinky"
        } else if (squares[pacmanCurrentIndex].classList.contains('inky')) {
          killedBy = "Inky"
        } else if (squares[pacmanCurrentIndex].classList.contains('clyde')) {
          killedBy = "Clyde"
        } else if (squares[pacmanCurrentIndex].classList.contains('sue')) {
          killedBy = "Sue"
        } else if (squares[pacmanCurrentIndex].classList.contains('funky')) {
          killedBy = "Funky"
        } else if (squares[pacmanCurrentIndex].classList.contains('kinky')) {
          killedBy = "Kinky"
        } else if (squares[pacmanCurrentIndex].classList.contains('orson')) {
          killedBy = "Orson"
        }
        //reset score and speedboost
        sessionStorage.setItem('lives', 3)
        sessionStorage.setItem('score', 0)
        sessionStorage.setItem('level', 1)
        sessionStorage.setItem('speedBoost', 100)
        setTimeout(function () { alert(`Game Over! Your score was ${score}! You were killed by ${killedBy}!`); }, 500)
        setTimeout(function () { window.location.reload(false) }, 5000)

      } else if(lives > 0) {
        livesDisplay.innerHTML = lives
        if(lives > 1)
          setTimeout(function () { alert(`You have ${lives} lives left!`); }, 500)
        else 
          setTimeout(function () { alert(`You have ${lives} life left!`); }, 500)
        
        ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost')
        ghost.currentIndex = ghost.startIndex
        ghost.direction = 0
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        })
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        pacmanCurrentIndex = 462
        pacDirection = 0
        squares[pacmanCurrentIndex].classList.add('pac-man')
      }

    }
  }
  function checkForWin() {
    if (pelletsEaten === totalPellets) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      clearInterval(pacmanTimer)
      document.removeEventListener('keyup', movePacman)
      //increase speedboost if cap isn't reached
      if (speedBoost > 0) {
        speedBoost -= 10
        sessionStorage.setItem('speedBoost', speedBoost)
      }
      level++
      sessionStorage.setItem('score', score)
      sessionStorage.setItem('level', level)
      sessionStorage.setItem('lives', lives)
      setTimeout(function () { alert(`Level ${level - 1} Beaten! Press ok to continue!`); }, 500)
      setTimeout(function () { window.location.reload(false) }, 5000)
    }
  }


})