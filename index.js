const allGamePieces = document.querySelectorAll('.case');
const bombDifficulty = 25;
let gameArray = [];

const genGameArray = (longueur, largeur) => {
  const arr = [];
  const total = longueur * largeur;

  for (let i = 0; i < total; i++) {
    arr.push({ touched: false, flag: false, bomb: false });
  }

  return arr;
};

gameArray = genGameArray(10, 10);

const addBombs = (longueur, largeur, bombDifficulty) => {
  const total = longueur * largeur;
  let i;
  for (i = 0; i < bombDifficulty; i++) {
    const random = Math.round(Math.random() * total);
    if (!gameArray[random].bomb) {
      gameArray[random].bomb = true;
    } else {
      --i;
    }
  }
};

addBombs(10, 10, bombDifficulty);

const bombMap = () => {
  gameArray.map((status, index) => {
    if (status.bomb) {
      allGamePieces[index].innerHTML = '<i class="fas fa-bomb"></i>';
    }
  });
};

// bombMap();

const getElementAround = (index, largeur) => {
  const arr = [];

  if (index % 10 === 0) {
    arr.push(0);
    arr.push(gameArray[index - largeur]);
    arr.push(gameArray[index - largeur + 1]);

    arr.push(0);
    arr.push(gameArray[index]);
    arr.push(gameArray[index + 1]);

    arr.push(0);
    arr.push(gameArray[index + largeur]);
    arr.push(gameArray[index + largeur + 1]);
  } else if (index % 10 === 9) {
    arr.push(gameArray[index - largeur - 1]);
    arr.push(gameArray[index - largeur]);
    arr.push(0);

    arr.push(gameArray[index - 1]);
    arr.push(gameArray[index]);
    arr.push(0);

    arr.push(gameArray[index + largeur - 1]);
    arr.push(gameArray[index + largeur]);
    arr.push(0);
  } else {
    arr.push(gameArray[index - largeur - 1]);
    arr.push(gameArray[index - largeur]);
    arr.push(gameArray[index - largeur + 1]);

    arr.push(gameArray[index - 1]);
    arr.push(gameArray[index]);
    arr.push(gameArray[index + 1]);

    arr.push(gameArray[index + largeur - 1]);
    arr.push(gameArray[index + largeur]);
    arr.push(gameArray[index + largeur + 1]);
  }

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

  // bombMap();
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
      // bombMap();
    }
  });
});
