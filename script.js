document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }]; // Initial position of the snake
    let direction = 'right';
    let food = {};
    let gameInterval;

    // Create the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameContainer.appendChild(cell);
    }

    // Get all cells in the grid
    const cells = document.querySelectorAll('.cell');

    // Function to render the snake and food
    function render() {
        cells.forEach(cell => cell.classList.remove('snake', 'food'));

        snake.forEach(segment => {
            const index = segment.y * gridSize + segment.x;
            cells[index].classList.add('snake');
        });

        const foodIndex = food.y * gridSize + food.x;
        cells[foodIndex].classList.add('food');
    }

    // Generate random food position
    function generateFood() {
        let x, y;
        do {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        } while (snake.some(segment => segment.x === x && segment.y === y));
        food = { x, y };
    }

    // Start the game
    function startGame() {
        generateFood();
        gameInterval = setInterval(moveSnake, 300);
    }

    // Move the snake based on the current direction
    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check if the snake hits the wall or itself
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            clearInterval(gameInterval);
            alert('Game Over');
            document.location.reload();
            return;
        }

        snake.unshift(head);

        // Check if the snake eats the food
        if (head.x === food.x && head.y === food.y) {
            generateFood();
        } else {
            snake.pop();
        }

        render();
    }

    // Listen for arrow key presses
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
            case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
            case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
            case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
        }
    });

    startGame();
});
