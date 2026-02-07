document.addEventListener("DOMContentLoaded", () =>{



function startSnake() {

    const board = document.getElementById("board");
    const scoreText = document.getElementById("score");

    board.innerHTML = "";

    const SIZE = 20;
    const SPEED = 150;

    let score = 0;
    let highScore = localStorage.getItem("snakeHighScore") || 0;

    let direction = { x: 0, y: 0 };
    let snake = [{ x: 10, y: 10 }];
    let food = getRandomFood();

    const cells = [];

    // створюємо поле
    for (let i = 0; i < SIZE * SIZE; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        board.appendChild(cell);
        cells.push(cell);
    }

    updateScore();
    draw();

    const interval = setInterval(moveSnake, SPEED);

    function updateScore() {
        scoreText.textContent = `Score: ${score} | Record: ${highScore}`;
    }

    function draw() {
        cells.forEach(c => c.className = "cell");

        snake.forEach(p => {
            cells[p.y * SIZE + p.x].classList.add("snake");
        });

        cells[food.y * SIZE + food.x].classList.add("food");
    }

    function moveSnake() {
        if (direction.x === 0 && direction.y === 0) return;

        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        if (
            head.x < 0 || head.x >= SIZE ||
            head.y < 0 || head.y >= SIZE ||
            snake.some(p => p.x === head.x && p.y === head.y)
        ) {
            clearInterval(interval);
            alert(`Game Over\nScore: ${score}\nRecord: ${highScore}`);
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("snakeHighScore", highScore);
            }

            food = getRandomFood();
            updateScore();
        } else {
            snake.pop();
        }

        draw();
    }

    function getRandomFood() {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * SIZE),
                y: Math.floor(Math.random() * SIZE)
            };
        } while (snake.some(p => p.x === pos.x && p.y === pos.y));
        return pos;
    }

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
        if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
        if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
        if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
    });
};

    

});
