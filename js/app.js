
// Pozycja Furryego, konstruktor
function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

// Pozycja monety, konstruktor
function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

// Cała funkcja gry, konstruktor
function Game() {

    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };

    // Funkcja blokująca powielanie się Furryego
    this.showFurry = function () {
        if (document.querySelector(".furry") != null) {
            this.hideVisibleFurry();
        }
        // Tworzenie furryego na planszy
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    // Tworzenie monety na planszy
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };
    var self = this;

    // Poruszanie Furrym po planszy, funkcja
    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        showFurry();
        checkCoinCollision();
        gameOver();
    };

    // Tworzenie odstępów pomiędzy kolejnymi ruchami Furryego
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

    // funkcja aby Furry się nie powielał
    this.hideVisibleFurry = function () {
        document.querySelector('.furry').classList.remove('furry');
    };
    // Poruszanie Furrym po planszy, event
    document.addEventListener('keydown', function (event) {
        self.turnFurry(event)
    });
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    // Reakcja na złapanie monety
    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score++;
            document.getElementById("number").innerHTML = this.score;
            this.coin = new Coin();
            showCoin();
        }
    };

    // Reakcja na kolizję ze ścianą
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            return clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
        }
    };

    showFurry();
    showCoin();
    startGame();

}

Game();
