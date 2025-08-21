var randomNum1;
randomNum1 = Math.floor(Math.random() * 6) + 1;
randomNum2 = Math.floor(Math.random() * 6) + 1;

var randomImg1;
randomImg1 = "dice" + randomNum1 + ".png";
document.querySelector(".img1").setAttribute("src", "images/" + randomImg1);

var randomImg2;
randomImg2 = "dice" + randomNum2 + ".png";
document.querySelector(".img2").setAttribute("src", "images/" + randomImg2);

if (randomNum1 > randomNum2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (randomNum2 > randomNum1) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}