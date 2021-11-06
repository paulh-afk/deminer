const allGamePieces = document.querySelectorAll('.case');

const genGameArray = (longueur, largeur) => {
  const arr = [];
  const total = longueur * largeur;
  const bombDifficulty = 12;

  for (let i = 0; i < total; i++) {
    const random = Math.round(Math.random() * total);
    if (random <= bombDifficulty) {
      arr.push({ touched: false, flag: false, bomb: true });
    } else {
      arr.push({ touched: false, flag: false, bomb: false });
    }
  }

  return arr;
};

let gameArray = genGameArray(10, 10);

const bombMap = () => {
  gameArray.map((status, index) => {
    if (status.bomb) {
      allGamePieces[index].innerHTML = '<i class="fas fa-bomb"></i>';
    }
  });
};

bombMap();

const getElementAround = (index, largeur) => {
  const arr = [];
  arr.push(gameArray[index - largeur - 1]);
  arr.push(gameArray[index - largeur]);
  arr.push(gameArray[index - largeur + 1]);

  arr.push(gameArray[index - 1]);
  arr.push(gameArray[index]);
  arr.push(gameArray[index + 1]);

  arr.push(gameArray[index + largeur - 1]);
  arr.push(gameArray[index + largeur]);
  arr.push(gameArray[index + largeur + 1]);

  console.log(arr);

  return arr;
};

const getBombNumberAround = (index, largeur) => {
  const elementAround = getElementAround(index, largeur);
  let bombNumber = 0;
  bombNumber = elementAround.filter((value, index) => {
    if (value === undefined) {
      value = 0;
    }
    return value.bomb;
  }).length;
  return bombNumber;
};

const resetGame = () => {
  alert('Vous avez touchez une bombe, le jeu recommence !');
  allGamePieces.forEach((element, index) => {
    element.innerHTML = '';
    element.classList.remove('touched');
  });
  gameArray = genGameArray(10, 10);

  bombMap();
};

allGamePieces.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (gameArray[index].flag) {
      alert('Vous ne pouvez pas sur cette case car elle a un drapeau !');
    } else {
      gameArray[index].touched = true;
      element.classList.add('touched');

      const bombNumber = getBombNumberAround(index, 10);
      if (gameArray) {
        element.innerHTML = bombNumber;
      }
      if (gameArray[index].bomb) {
        resetGame();
      }
    }
  });
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    gameArray[index].flag = !gameArray[index].flag;
    if (gameArray[index].flag) {
      element.innerHTML = '<i class="far fa-flag"></i>';
    } else {
      element.innerHTML = '';
    }
  });
});
