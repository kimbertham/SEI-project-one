function init() {



  //DOM elements
  const gameGrid = document.querySelector('.grid')
  const startButton = document.querySelector('.start-button')

  //grid specs 
  const gridArray = []
  const height = 30
  const width = 30

 
  for (let yPosition = 0; yPosition < height; yPosition++) { // two loops for height and width
    const rowArray = [] // creates 
    for (let xPosition = 0; xPosition < width; xPosition++){
      const cell = { snake: 0, food: 0 } // object to store the snakes specs
      cell.element = document.createElement('div')
      gameGrid.appendChild(cell.element) // store the cell div on the board
      rowArray.push(cell) // add it into a row
      cell.element.textContent = `${xPosition}, ${yPosition}` // keep track of the coordinates
      cell.element.style.fontSize = '8px' 
    }
    gridArray.push(rowArray) // add row into board
  }
  

  function createSnakeFood(){

    const appleXPosition = Math.floor(Math.random() * width)
    const appleYPosition = Math.floor(Math.random() * height)

    gridArray[appleXPosition][appleYPosition].food = 1
    // apple is placed randomy on the board by generating random numbers for array indexes
    console.log(`${appleXPosition}${appleYPosition}`)
  }


  //! Snake specs
  let snakeYPosition
  let snakeXPosition
  let snakeDirection
  let snakeLength


  function restartGame(){
    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++) {
        gridArray[yPosition][xPosition].snake = 0
        gridArray[yPosition][xPosition].food = 0
      }
    }

    snakeYPosition = Math.floor(height / 2)
    snakeXPosition = Math.floor(width / 2)
    snakeLength = 5
    snakeDirection = 'Up'

    
    createSnakeFood()
  }

  restartGame()

  //snake food 


  function theGame(){


    // FUNCTIONING PART OF THE GAME!! HERE LOOP TO MAKE THE SNAKE PRESET, CLASS WILL GET ADDED BASED ON THIS!!!!!! 
    // GOTTA MANIPULTE THE VARIABLES TO MAKE THE MOVEMENT APPEAR DIFF
    //! gridArray[yPosition][xPosition ] <------- (LOOP - LOCAL TO LOOP) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][] 
    //! gridArray[snakeXPosition][snakeYPosition] // <------- (GAME - LOCAL TO FUNCTION) THE POSITION OF THE SNAKE IS WHATEVER IS FED IN [][]

    for (let yPosition = 0; yPosition < height; yPosition++) { 
      for (let xPosition = 0; xPosition < width; xPosition++){

        if (gridArray[yPosition][xPosition].snake > 0) {
          gridArray[yPosition][xPosition].element.classList.add('snake-head') 
          gridArray[yPosition][xPosition].snake-- // THE NUMVER OF ITERATIONS THE CLASS IS ON THE BOARD FOR, STATING HOW  LONG ITLL MEET THE CONDITION OF THE LOOP AND DECREASE BY ONE ADTER EVERY LOOP INCREMENTALLY, 
          console.log('loop')
        } else if (gridArray[yPosition][xPosition].food === 1) {
          gridArray[yPosition][xPosition].element.classList.add('snake-food')
        } else {
          gridArray[yPosition][xPosition].element.classList.remove('snake-head')    ///  REMOVES THE CLASS IF THE SNAKE
          gridArray[yPosition][xPosition].element.classList.remove('snake-food')     // OR SNAKE FOOD IS NOT AT POSITION INDEX
        }
      }
    }
    


    // handling the movement of the snake, none of this is called untill triggered by a keyboard event /// ! DEAFULT UP SETTING MOVES
    function handleDirectionKeys(event) {
      switch (event.key) {
        case 'ArrowRight':
          snakeDirection = 'Right'
          break
        case 'ArrowLeft': 
          snakeDirection = 'Left'
          break
        case 'ArrowUp':
          snakeDirection = 'Up'
          break
        case 'ArrowDown':
          snakeDirection = 'Down'
          break
      }
      console.log('working')
    }
    switch (snakeDirection) {
      case 'Right' :
        snakeXPosition++
        break
      case 'Left' :
        snakeXPosition--
        break
      case 'Up' : 
        snakeYPosition--
        break
      case 'Down': 
        snakeYPosition++
        break
    }
    document.addEventListener('keyup', handleDirectionKeys)
    

    // ------------------------------------------------


    // making the game loser is the walls are rouched by making the numbers outside of the width and height accessible for adding a class
    if ( snakeXPosition < 0 || snakeXPosition >= width || snakeYPosition < 0 || snakeYPosition >= height)  {
      console.log('called')
      restartGame()
    }
    //-----------------------
    // making game win a "point" by collecting food divs and gaining length
    if (gridArray[snakeYPosition][snakeXPosition].food === 1) {
      gridArray[snakeYPosition][snakeXPosition].element.classList.remove('snake-food')
      gridArray[snakeYPosition][snakeXPosition].food = 0
      console.log('food collected')
      snakeLength++
      gridArray[snakeYPosition][snakeXPosition].food = 0
      createSnakeFood()
    }





    
    // HERE!!!! would be where the first.. " viewable active moment of the game starts" !!!!! 
    gridArray[snakeYPosition][snakeXPosition].snake = snakeLength
    // console.log( `${[snakeYPosition]} ${[snakeXPosition]}.snake = ${snakeLength}`)




    // console.log('loop game')

    const timer = setTimeout(theGame, 500 / snakeLength)
  //gameLoop
  }
  //gameLoop
  
  




  startButton.addEventListener('click', theGame )




}
window.addEventListener('DOMContentLoaded' , init)