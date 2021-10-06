const squares = document.querySelectorAll(".grid div");
var direction = 1;
const basket = [93, 92, 91];
var start = 0;
var rain = [];
var num = 0;
/*grid is created dynamically when the page is loaded */
function create() {
    var grid = document.querySelector(".grid");

    for (let c = 0; c < 100; c++) {
        var div = document.createElement("div");
        grid.appendChild(div);
    }
    return;
}


document.addEventListener("DOMContentLoaded", () => {

    create();
    basket1();
}, false);


/*mangoes are created putting them in an array */
function createRain() {
    var num = Math.floor(Math.random() * 10);
    rain.push(num);
    start += 2;
    if (start > 60) {
        return;
    }
    if (start === 60) {

        done(score() - 1);
        rain.forEach(index => squares[index].classList.remove("rain"));

    }
}
/**each member of array is moved by one box */
function moveRain() {
    let squares = document.querySelectorAll(".grid div");
    rain.forEach(index => squares[index].classList.remove("rain"));
    for (let c = 0; c < rain.length - 1; c++) {
        rain[c] = rain[c] + 10;

    }

    if (rain[0] > 99) {
        rain.shift();
    }

    if (squares[rain[0]].classList.contains("basket")) {
        rain.shift();
        if (start < 60) {

            score();
        }
    }

    rain.forEach(index => squares[index].classList.add("rain"));
}
setInterval(createRain, 2000);
setInterval(moveRain, 1000);

/**basket is created  */
function basket1() {

    let squares = document.querySelectorAll(".grid div");

    let basket = [93, 92, 91];

    basket.forEach(index => squares[index].classList.add("basket"));

}
/**basket is moved by adding and substracting members of basket array */
function basketMove(dirx) {

    let squares = document.querySelectorAll(".grid div");
    if (dirx === -1 && basket[0] > basket[2]) {
        basket.reverse();
    } else if (dirx === 1 && basket[0] < basket[2]) {
        basket.reverse();
    }
    let tail = basket.pop();
    squares[tail].classList.remove("basket");

    basket.unshift(basket[0] + dirx);

    squares[basket[0]].classList.add("basket");

}

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 39 && basket[0] < 99) {

        direction = 1;
        basketMove(direction);

    } else if (e.keyCode === 37 && basket[0] > 90) {
        direction = -1;

        basketMove(direction);

    }
});

/**the number of mangoes caught are recorded */
function score() {
    var score1 = document.getElementById("score");
    num++;
    score1.innerHTML = num;
    return num;

}
/** after sometime the results are displayed */
function done(mangoes) {
    let grid = document.querySelector(".grid");

    let table = document.getElementById("table");
    let marks = document.getElementById("score");
    marks.innerHTML = mangoes;
    grid.style.visibility = "collapse";
    table.innerHTML = `<h1>${mangoes} mangoes caught enjoy</h1>`;

}