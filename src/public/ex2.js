
//show level List
let levelList = [
    { level: 0, name: 'Play with stupid computer' },
    { level: 1, name: 'Play with intelligent computer' },
    { level: 3, name: 'Play against a friend' }
  
  ]
  
  const chooseLevel = document.getElementById("chooseLevel")
  
  levelList.forEach(lv => {
    const option = document.createElement('option')
    option.value = lv.name
    option.textContent = lv.name
    chooseLevel.appendChild(option)
  })
  
  let levelCurrent = 0
  function checkLevelCurrent() {
    levelName = document.getElementById("chooseLevel").value
    const levelString = levelList.filter(lv => lv.name == levelName).map(lv => lv.level).toString()
    levelCurrent = parseInt(levelString)
    return levelCurrent
  }
  
  
  
  let currentPlayer = 'X'
  let board = ['', '', '', '', '', '', '', '', '']
  let gameActive = true
  let checkIfWin = false
  let checkComputer = false
  
  function handleClick(index) {

    checkComputer = false
  
    if (levelCurrent === 3) {
      if (gameActive && board[index] === '') {
        board[index] = currentPlayer
        updateBoard()
        checkWinner()
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      }
    }
  
    if (levelCurrent === 0) {
      if (gameActive && board[index] === '') {
        board[index] = currentPlayer
        updateBoard()
        if(checkWin(board)){checkWinner()}
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        checkComputer = true
        // autoPlayEasy()
        if(!checkWin(board)){autoPlayEasy()}
      }
    }
  
    if (levelCurrent === 1) {
      if (gameActive && board[index] === '') {
        board[index] = currentPlayer
        updateBoard()
        if(checkWin(board)){checkWinner()}
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        checkComputer = true
        if(!checkWin(board)){autoPlayHard()}
      }
    }
  
  }
  
  
  function updateBoard() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
      cell.textContent = board[index]
    })
  }
  
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false

        if(checkComputer) {alert(`computer wins!`)} else {alert(`congratuation, you win!!!`)}
        // alert(`Player ${board[a]} wins!`)
        // newGame()
      }
    }
  
    if (!board.includes('') && gameActive) {
      gameActive = false
      alert('It\'s a draw! ')
      // newGame()
    }
  }
  
  
  function checkWin(boardCheck) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]
  
    let checkIfWin = false
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (boardCheck[a] && boardCheck[a] === boardCheck[b] && boardCheck[a] === boardCheck[c]) {
        checkIfWin = true
      }
    }
  
    return checkIfWin
  }
  
  
  function autoPlayEasy() {
    //find empty position
    let indexOfEmptyCell = board.indexOf('')
  
    //play at any empty position
    board[indexOfEmptyCell] = currentPlayer
    updateBoard()
    checkWinner()
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  }
  
  
  function autoPlayHard() {
  
    //find array empty position
    var emptyPositions = board.reduce(function (acc, cell, index) {
      if (cell === '') {
        acc.push(index)
      }
      return acc
    }, [])
  
    //find where enemy have 2 hand next together
    var boardCheck = [].concat(board)
    var nextPlay = emptyPositions[0]
  
    //Check the position where enemy can win
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X' //change roles
    for (var i = 0; i < emptyPositions.length; i++) {
      const position = emptyPositions[i]
      boardCheck[position] = currentPlayer
      if (checkWin(boardCheck)) {
        nextPlay = position; break
      }
      boardCheck[position] = ''
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'  //back to computer roles
  
    // play at position enemy can win 
    board[nextPlay] = currentPlayer
    updateBoard()
    checkWinner()
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  
  }
  
  
  function newGame() {
    currentPlayer = 'X'
    board = ['', '', '', '', '', '', '', '', '']
    gameActive = true
    updateBoard()
  }