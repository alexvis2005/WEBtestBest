// Мини-игра "PC Runner" для страницы блога
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация игры
    initGame();
    
    // Инициализация подписки
    initSubscribeForm();
});

// Игра "PC Runner"
function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const speedElement = document.getElementById('speed');
    
    // Переменные игры
    let gameRunning = false;
    let gamePaused = false;
    let score = 0;
    let highScore = localStorage.getItem('pcRunnerHighScore') || 0;
    let gameSpeed = 1;
    let animationId;
    
    // Игровые объекты
    const player = {
        x: 50,
        y: canvas.height - 60,
        width: 40,
        height: 40,
        velocityY: 0,
        gravity: 0.8,
        jumpPower: -15,
        isJumping: false,
        isDucking: false,
        normalHeight: 40,
        duckHeight: 20
    };
    
    const obstacles = [];
    const bonuses = [];
    
    // Классы для игровых объектов
    class Obstacle {
        constructor() {
            this.width = 20 + Math.random() * 20;
            this.height = 30 + Math.random() * 40;
            this.x = canvas.width;
            this.y = canvas.height - this.height;
            this.speed = 5 * gameSpeed;
            this.type = Math.random() > 0.7 ? 'tall' : 'short';
            
            // Для высоких препятствий
            if (this.type === 'tall') {
                this.height = 60 + Math.random() * 40;
                this.y = canvas.height - this.height;
            }
        }
        
        update() {
            this.x -= this.speed;
        }
        
        draw() {
            ctx.fillStyle = '#ff5555';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Добавляем детали для препятствий
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, 5);
        }
    }
    
    class Bonus {
        constructor() {
            this.width = 20;
            this.height = 20;
            this.x = canvas.width;
            this.y = canvas.height - 100 - Math.random() * 100;
            this.speed = 5 * gameSpeed;
            this.type = Math.random() > 0.5 ? 'cpu' : 'ram';
        }
        
        update() {
            this.x -= this.speed;
        }
        
        draw() {
            if (this.type === 'cpu') {
                ctx.fillStyle = '#55ff55';
                // Рисуем процессор
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = '#33cc33';
                ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
            } else {
                ctx.fillStyle = '#5555ff';
                // Рисуем модуль памяти
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = '#3333cc';
                ctx.fillRect(this.x + 3, this.y + 2, this.width - 6, this.height - 4);
            }
        }
    }
    
    // Инициализация высокого счета
    highScoreElement.textContent = highScore;
    
    // Функции игры
    function drawPlayer() {
        // Рисуем корпус компьютера
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(player.x, player.y, player.width, player.isDucking ? player.duckHeight : player.normalHeight);
        
        // Рисуем экран
        ctx.fillStyle = '#333333';
        ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, (player.isDucking ? player.duckHeight : player.normalHeight) - 10);
        
        // Рисуем кнопку питания
        ctx.fillStyle = '#ff5555';
        ctx.beginPath();
        ctx.arc(player.x + player.width - 10, player.y + (player.isDucking ? player.duckHeight : player.normalHeight) - 10, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Рисуем ноги
        ctx.fillStyle = '#cccccc';
        ctx.fillRect(player.x + 5, player.y + (player.isDucking ? player.duckHeight : player.normalHeight), 8, 10);
        ctx.fillRect(player.x + player.width - 13, player.y + (player.isDucking ? player.duckHeight : player.normalHeight), 8, 10);
    }
    
    function updatePlayer() {
        // Применяем гравитацию
        player.velocityY += player.gravity;
        player.y += player.velocityY;
        
        // Ограничение по земле
        if (player.y > canvas.height - (player.isDucking ? player.duckHeight : player.normalHeight)) {
            player.y = canvas.height - (player.isDucking ? player.duckHeight : player.normalHeight);
            player.velocityY = 0;
            player.isJumping = false;
        }
    }
    
    function jump() {
        if (!player.isJumping && !player.isDucking) {
            player.velocityY = player.jumpPower;
            player.isJumping = true;
        }
    }
    
    function duck() {
        if (!player.isJumping && !player.isDucking) {
            player.isDucking = true;
            setTimeout(() => {
                player.isDucking = false;
            }, 500);
        }
    }
    
    function spawnObstacle() {
        if (Math.random() < 0.02 * gameSpeed) {
            obstacles.push(new Obstacle());
        }
    }
    
    function spawnBonus() {
        if (Math.random() < 0.01 * gameSpeed) {
            bonuses.push(new Bonus());
        }
    }
    
    function updateObstacles() {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].update();
            
            // Удаляем препятствия за пределами экрана
            if (obstacles[i].x < -obstacles[i].width) {
                obstacles.splice(i, 1);
                score += 10;
                scoreElement.textContent = score;
                
                // Увеличиваем скорость каждые 100 очков
                if (score % 100 === 0) {
                    gameSpeed += 0.2;
                    speedElement.textContent = gameSpeed.toFixed(1);
                }
                
                // Обновляем рекорд
                if (score > highScore) {
                    highScore = score;
                    highScoreElement.textContent = highScore;
                    localStorage.setItem('pcRunnerHighScore', highScore);
                }
            }
            
            // Проверка столкновений
            if (checkCollision(player, obstacles[i])) {
                gameOver();
                return;
            }
        }
    }
    
    function updateBonuses() {
        for (let i = bonuses.length - 1; i >= 0; i--) {
            bonuses[i].update();
            
            // Удаляем бонусы за пределами экрана
            if (bonuses[i].x < -bonuses[i].width) {
                bonuses.splice(i, 1);
            }
            
            // Проверка сбора бонусов
            if (checkCollision(player, bonuses[i])) {
                bonuses.splice(i, 1);
                score += 50;
                scoreElement.textContent = score;
            }
        }
    }
    
    function checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + (rect1.isDucking ? rect1.duckHeight : rect1.normalHeight) > rect2.y;
    }
    
    function drawBackground() {
        // Земля
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        
        // Облака
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 3; i++) {
            const cloudX = (canvas.width * i / 3 + (score * 2) % canvas.width) % canvas.width;
            ctx.beginPath();
            ctx.arc(cloudX, 50, 20, 0, Math.PI * 2);
            ctx.arc(cloudX + 25, 45, 25, 0, Math.PI * 2);
            ctx.arc(cloudX + 50, 50, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function drawGameOver() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Игра окончена!', canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = '30px Arial';
        ctx.fillText(`Счёт: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Рекорд: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40);
        
        ctx.font = '20px Arial';
        ctx.fillText('Нажмите "Начать игру" чтобы сыграть снова', canvas.width / 2, canvas.height / 2 + 90);
    }
    
    function gameLoop() {
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем фон
        drawBackground();
        
        if (gameRunning && !gamePaused) {
            // Обновляем и рисуем игрока
            updatePlayer();
            drawPlayer();
            
            // Создаем новые препятствия и бонусы
            spawnObstacle();
            spawnBonus();
            
            // Обновляем и рисуем препятствия
            updateObstacles();
            obstacles.forEach(obstacle => obstacle.draw());
            
            // Обновляем и рисуем бонусы
            updateBonuses();
            bonuses.forEach(bonus => bonus.draw());
            
            // Продолжаем игровой цикл
            animationId = requestAnimationFrame(gameLoop);
        } else if (!gameRunning) {
            // Показываем экран завершения игры
            drawGameOver();
        } else {
            // Игра на паузе
            drawPlayer();
            obstacles.forEach(obstacle => obstacle.draw());
            bonuses.forEach(bonus => bonus.draw());
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('ПАУЗА', canvas.width / 2, canvas.height / 2);
        }
    }
    
    function startGame() {
        if (!gameRunning) {
            // Сброс игры
            gameRunning = true;
            gamePaused = false;
            score = 0;
            gameSpeed = 1;
            player.y = canvas.height - player.normalHeight;
            obstacles.length = 0;
            bonuses.length = 0;
            
            // Обновляем UI
            scoreElement.textContent = score;
            speedElement.textContent = gameSpeed.toFixed(1);
            startBtn.disabled = true;
            startBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Перезапустить';
            pauseBtn.disabled = false;
            
            // Запускаем игровой цикл
            gameLoop();
        } else if (gamePaused) {
            // Продолжаем игру
            gamePaused = false;
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
            gameLoop();
        } else {
            // Перезапуск игры
            gameRunning = false;
            setTimeout(startGame, 100);
        }
    }
    
    function pauseGame() {
        if (gameRunning && !gamePaused) {
            gamePaused = true;
            pauseBtn.innerHTML = '<i class="fas fa-play"></i> Продолжить';
        } else if (gameRunning && gamePaused) {
            gamePaused = false;
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
            gameLoop();
        }
    }
    
    function gameOver() {
        gameRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
        
        // Обновляем рекорд
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('pcRunnerHighScore', highScore);
        }
    }
    
    // Управление с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!gameRunning || gamePaused) return;
        
        switch(e.code) {
            case 'Space':
            case 'ArrowUp':
                e.preventDefault();
                jump();
                break;
            case 'ArrowDown':
                e.preventDefault();
                duck();
                break;
        }
    });
    
    // Управление с кнопок
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', pauseGame);
    
    // Запускаем начальный экран
    drawGameOver();
}

// Форма подписки
function initSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const agree = this.querySelector('input[type="checkbox"]').checked;
            
            // Валидация
            if (!email || !email.includes('@') || !agree) {
                alert('Пожалуйста, введите корректный email и согласитесь с условиями');
                return;
            }
            
            // В реальном проекте здесь был бы код для отправки данных на сервер
            console.log('Email для подписки:', email);
            
            // Показываем сообщение об успехе
            alert('Спасибо за подписку! Вы будете получать новые статьи на указанный email.');
            
            // Очищаем форму
            emailInput.value = '';
            this.querySelector('input[type="checkbox"]').checked = false;
        });
    }
}