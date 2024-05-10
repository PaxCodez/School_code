var saveCode = "#  @0 π0 a0 b1 c2 d0 e1 0 0 0 0 0 0 0 0 0  f0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  g0 0 0 0 0 0 0 0 0 0 0 0 ";

/** Important variables **/
// {
    var scene = "logo";
    var releaseDate = 2018;
    
    smooth();
    noStroke();
    size(600, 600, P2D);
    
    var Segment, Snake, Player, Enemy, Food, MagicFood, Camera, Coin;
    var player;
    var skinChanger;
// }

/** Save code usage **/
// {
    var checkExp = /^#.+\s@[0-9]+\sπ[0-9]+\sa1?[0-9]\sb1?[0-9]\sc1?[0-9]\sd1?[0-9]\se([0-1]\s){10}\sf([0-1]\s){20}\sg([0-1]\s){12}$/;
    
    var hacked = hacked || false;
    
    if (checkExp.test(saveCode) === false) {
        hacked = true;
    }
    
    var nameExp = /^#.+\s@/;
    var scoreExp = /@[0-9]+\sπ/;
    var coinExp = /π[0-9]+\sa/;
    var faceExp = /a1?[0-9]\sb/;
    var headExp = /b1?[0-9]\sc/;
    var colorOneExp = /c1?[0-9]\sd/;
    var colorTwoExp = /d1?[0-9]\se/;
    var facesExp = /e([0-1]\s){10}\sf/;
    var colorsExp = /f([0-1]\s){20}\sg/;
    var achievementsExp = /g([0-1]\s){12}$/;
    
    var stringMatch = function(exp) {
        return String(saveCode.match(exp));
    };
    
    var trimStr = function(str) {
        return str.substring(str.length - 2, 1);
    };
    
    var getExp = function(exp) {
        return trimStr(stringMatch(exp));
    };
    
    var name = getExp(nameExp);
    name = name === " " ? "" : name;
    
    var facesUnlocked = getExp(facesExp).substring(getExp(facesExp).length - 4, 0).split(" ");
    
    var colorsUnlocked = getExp(colorsExp).substring(getExp(colorsExp).length - 4, 0).split(" ");
    
    var achievementsUnlocked = getExp(achievementsExp).substring(getExp(achievementsExp).length - 2, 0).split(" ");
// }

var segSize = 32;
var arenaSize = 1200;

/** Fonts and special Snake font **/
// {
    var headerFade = 0.1;
    
    var fonts = [
        createFont("monospace"),
        createFont("sans-serif Bold")
    ];
    
    var findNextNewline = function(txt, num) {
        for (var i = 0; i < txt.length - num; i++) {
            if (txt[i + num] === "\n") {
                return i;
            }
        }
        return i;
    };
    
    var font = function(txt, x, y, size, spacing, align) {
        var fontX = 0, fontY = 0;
        if (align === CENTER) {
            fontX = -findNextNewline(txt, 0) * spacing / 2 + size / 10;
        }
        for (var letter = 0; letter < txt.length; letter++) {
            pushMatrix();
            translate(x + fontX, y + fontY);
            switch (txt.charAt(letter)) {
                case "A":
                    (rect)(0, 0, size / 4, size, size / 8, 0, 0, 0);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 2, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, size / 8, 0, 0);
                    break;
                case "B":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 2, 0, size / 8, size / 8, 0);
                    (rect)(size / 8 * 3, size / 2, size / 4, size / 2, 0, size / 8, size / 8, 0);
                    break;
                case "C":
                    (rect)(0, 0, size / 4, size, size / 8, 0, 0, size / 8);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 3, 0, size / 8, 0, 0);
                    (rect)(size / 8 * 3, size / 3 * 2, size / 4, size / 3, 0, 0, size / 8, 0);
                    break;
                case "D":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, size / 8, size / 8, 0);
                    break;
                case "E":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8 * 3, size / 4);
                    rect(size / 4, size / 8 * 3, size / 4, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8 * 3, size / 4);
                    break;
                case "F":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8 * 3, size / 4);
                    rect(size / 4, size / 8 * 3, size / 4, size / 4);
                    break;
                case "G":
                    (rect)(0, 0, size / 4, size, size / 8, 0, 0, 8);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 3, 0, size / 8, 0, 0);
                    (rect)(size / 8 * 3, size / 3 * 2, size / 4, size / 3, 0, 0, size / 8, 0);
                    rect(size / 3, size / 2, size / 10 * 3, size / 6);
                    break;
                case "H":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
                    rect(size / 8 * 3, 0, size / 4, size);
                    break;
                case "I":
                    rect(size / 16 * 3, 0, size / 4, size);
                    rect(0, 0, size / 8 * 5, size / 4);
                    rect(0, size / 4 * 3, size / 8 * 5, size / 4);
                    break;
                case "J":
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    rect(size / 4, 0, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, 0, size / 8, 0);
                    (rect)(0, size / 3 * 2, size / 4, size / 3, 0, 0, 0, size / 8);
                    break;  
                case "K":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 2, 0, 0, size / 8, 0);
                    (rect)(size / 8 * 3, size / 2, size / 4, size / 2, 0, size / 8, 0, 0);
                    break;
                case "L":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 3 * 2, size / 4, size / 3, 0, 0, size / 8, 0);
                    break;
                case "M":
                    (rect)(0, 0, size / 5, size, size / 8, 0, 0, 0);
                    rect(size / 4, 0, size / 8, size / 2, size / 30);
                    rect(size / 16 * 3, 0, size / 4, size / 4);
                    (rect)(size / 40 * 17, 0, size / 5, size, 0, size / 8, 0, 0);
                    break;
                case "N":
                    (rect)(0, 0, size / 5, size, 0, size / 8, 0, 0);
                    rectMode(CENTER);
                    pushMatrix();
                    translate(size / 16 * 5, size / 2);
                    rotate(50);
                    rect(0, 0, size / 1.5, size / 4);
                    popMatrix();
                    rectMode(CORNER);
                    (rect)(size / 40 * 17, 0, size / 5, size, size / 8, 0, 0, 0);
                    break;
                case "O":
                    (rect)(0, 0, size / 4, size, size / 8, 0, 0, size / 8);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, size / 8, size / 8, 0);
                    break;
                case "P":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 8 * 5, 0, size / 8, size / 8, 0);
                    break;
                case "Q":
                    (rect)(0, 0, size / 4, size, size / 8, 0, 0, size / 8);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, size / 8, size / 8, 0);
                    rectMode(CENTER);
                    pushMatrix();
                    translate(size / 16 * 9, size / 16 * 13);
                    rotate(45);
                    rect(0, 0, size / 4, size / 4);
                    popMatrix();
                    rectMode(CORNER);
                    break;
                case "R":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 2, 0, size / 8, size / 8, 0);
                    pushMatrix();
                    translate(size / 3, size / 9 * 4);
                    rotate(50);
                    (rect)(0, 0, size / 25 * 13, size / 4, 0, size / 8, 0, 0);
                    popMatrix();
                    break;
                case "S":
                    (rect)(0, 0, size / 4, size / 9 * 5, size / 8, 0, 0, size / 8);
                    rect(size / 4, 0, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size / 3, 0, size / 8, 0, 0);
                    (rect)(size / 8 * 3, size / 28 * 11, size / 4, size / 28 * 17, 0, size / 8, size / 8, 0);
                    (rect)(0, size / 3 * 2, size / 4, size / 3, 0, 0, 0, size / 8);
                    rect(size / 4, size / 28 * 11, size / 4, size / 6);
                    break;
                case "T":
                    rect(size / 16 * 3, 0, size / 4, size);
                    (rect)(0, 0, size / 8 * 5, size / 4, size / 8, size / 8, 0, 0);
                    break;
                case "U":
                    (rect)(0, 0, size / 4, size, 0, size / 8, 0, size / 8);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, 0, size / 4, size, size / 8, 0, size / 8, 0);
                    break;
                case "V":
                    pushMatrix();
                    translate(size / 16 * 3, 0);
                    rotate(80);
                    (rect)(0, 0, size / 1.05, size / 5, size / 15, 0, 0, size / 15);
                    popMatrix();
                    pushMatrix();
                    translate(size / 16 * 7, 0);
                    rotate(280);
                    scale(-1, 1);
                    (rect)(0, 0, size / 1.05, size / 5, size / 15, 0, 0, size / 15);
                    popMatrix();
                    rect(size / 32 * 5, size / 10 * 9, size / 16 * 5, size / 10);
                    break;
                case "W":
                    (rect)(0, 0, size / 5, size, 0, 0, 0, size / 8);
                    rect(size / 4, size / 2, size / 8, size / 2, size / 30);
                    rect(size / 16 * 3, size / 4 * 3, size / 4, size / 4);
                    (rect)(size / 40 * 17, 0, size / 5, size, 0, 0, size / 8, 0);
                    break;
                case "X":
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
    
                    (rect)(size / 8 * 3, 0, size / 4, size / 2, 0, 0, size / 8, 0);
                    (rect)(size / 8 * 3, size / 2, size / 4, size / 2, 0, size / 8, 0, 0);
                    (rect)(0, 0, size / 4, size / 2, 0, 0, 0, size / 8);
                    (rect)(0, size / 2, size / 4, size / 2, size / 8, 0, 0, 0);
                    break;
                case "Y":
                    rect(size / 4, size / 8 * 3, size / 8, size / 4);
    
                    (rect)(size / 8 * 3, 0, size / 4, size / 2, 0, 0, size / 8, 0);
                    (rect)(0, 0, size / 4, size / 2, 0, 0, 0, size / 8);
                    rect(size / 16 * 3, size / 2, size / 4, size / 2);
                    break;
                case "Z":
                    (rect)(0, 0, size / 8 * 5, size / 4, size / 8, 0, 0, 0);
                    (rect)(0, size / 4 * 3, size / 8 * 5, size / 4, 0, 0, size / 8, 0);
                    quad(size / 8 * 5, size / 4, size / 4, size / 4 * 3, 0, size / 4 * 3, size / 8 * 3, size / 4);
                    break;
                case "a":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 2.2, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 2, 0, size / 8, 0, 0);
                    break;
                case "b":
                    (rect)(0, 0, size / 4, size, 0, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 4 * 3, 0, size / 8, size / 8, 0);
                    break;
                case "c":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 3, 0, size / 8, 0, 0);
                    (rect)(size / 8 * 3, size / 3 * 2, size / 4, size / 3, 0, 0, size / 8, 0);
                    break;
                case "d":
                    (rect)(size / 8 * 3, 0, size / 4, size, 0, 0, size / 8, 0);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, size / 8);
                    break;
                case "e":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 5 * 4, size / 8, size / 5);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 3, 0, size / 8, 0, 0);
                    (rect)(size / 8 * 3, size / 4 * 3, size / 4, size / 4, 0, 0, size / 8, 0);
                    rect(0, size / 7 * 4, size / 8 * 5, size / 10);
                    break;
                case "f":
                    (rect)(0, size / 8, size / 4, size / 8 * 7, size / 8, 0, 0, 0);
                    rect(size / 4, size / 8, size / 8 * 3, size / 4);
                    rect(size / 4, size / 2, size / 4, size / 4);
                    break;
                case "g":
                    (rect)(0, size / 4, size / 4, size / 5 * 4, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 5 * 4, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 4 * 5, 0, size / 8, size / 8, 0);
                    rect(0, size / 12 * 16, size / 8 * 3, size / 6);
                    break;
                case "h":
                    (rect)(0, 0, size / 4, size, 0, 0, 0, 0);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 4 * 3, 0, size / 8, 0, 0);
                    break;
                case "i":
                    rect(size / 4, size / 8 * 3, size / 4, size / 8 * 5);
                    rect(size / 8, size / 8 * 3, size / 4, size / 8);
                    ellipse(size / 8 * 3, size / 8, size / 4, size / 4);
                    break;
                case "j":
                    ellipse(size / 2, size / 8, size / 4, size / 4);
                    rect(size / 4, size, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 2, size / 4, size / 4 * 3, 0, 0, size / 8, 0);
                    (rect)(0, size / 12 * 11, size / 4, size / 3, 0, 0, 0, size / 8);
                    break;  
                case "k":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, size / 2, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 3, size / 4, size / 3, 0, 0, size / 8, 0);
                    (rect)(size / 8 * 3, size / 3 * 2, size / 4, size / 3, 0, size / 8, 0, 0);
                    break;
                case "l":
                    rect(0, 0, size / 4, size);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    break;
                case "m":
                    rect(0, size / 4, size / 5, size / 4 * 3);
                    rect(size / 4, size / 4, size / 8, size / 2, size / 30);
                    rect(size / 16 * 3, size / 4, size / 4, size / 4);
                    (rect)(size / 40 * 17, size / 4, size / 5, size / 4 *3, 0, size / 8, 0, 0);
                    break;
                case "n":
                    rect(0, size / 4, size / 4, size / 4 * 3);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 4 * 3, 0, size / 8, 0, 0);
                    break;
                case "o":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 4);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 4 * 3, 0, size / 8, size / 8, 0);
                    break;
                case "p":
                    rect(0, size / 4, size / 4, size);
                    rect(size / 4, size / 4, size / 8, size / 6);
                    rect(size / 4, size / 8 * 5, size / 8, size / 6);
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 20 * 11, 0, size / 8, size / 8, 0);
                    break;
                case "q":
                    (rect)(0, size / 4, size / 4, size / 20 * 11, size / 8, 0, 0, size / 8);
                    rect(size / 4, size / 4, size / 8, size / 6);
                    rect(size / 4, size / 8 * 5, size / 8, size / 6);
                    (rect)(size / 8 * 3, size / 4, size / 4, size, 0, size / 8, 0, size / 8);
                    break;
                case "r":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, size / 8, 0, 0, 0);
                    
                    (rect)(size / 4, size / 4, size / 4, size / 4, 0, size / 8, 0, 0);
                    break;
                case "s":
                    (rect)(0, size / 4, size / 4, size / 2, size / 8, 0, 0, size / 8);
                    (rect)(size / 4, size / 4, size / 8 * 3, size / 16 * 3, 0, size / 8, 0, 0);
                    (rect)(0, size / 16 * 13, size / 8 * 3, size / 16 * 3, 0, 0, 0, size / 8);
                    (rect)(size / 8 * 3, size / 2, size / 4, size / 2, 0, size / 8, size / 8, 0);
                    rect(size / 4, size / 2, size / 4, size / 4);
                    break;
                case "t":
                    rect(size / 16 * 3, 0, size / 4, size);
                    rect(0, size / 4, size / 8 * 5, size / 4);
                    break;
                case "u":
                    (rect)(0, size / 4, size / 4, size / 4 * 3, 0, 0, 0, size / 8);
                    rect(size / 4, size / 4 * 3, size / 8, size / 4);
                    rect(size / 8 * 3, size / 4, size / 4, size / 4 * 3);
                    break;
                case "v":
                    beginShape();
                    vertex(0, size / 4);
                    vertex(size / 32 * 7, size / 4);
                    vertex(size / 32 * 7, size / 12 * 7);
                    bezierVertex(size / 4, size / 4 * 3, size / 8 * 3, size / 4 * 3, size / 32 * 13, size / 12 * 7);
                    vertex(size / 32 * 13, size / 4);
                    vertex(size / 8 * 5, size / 4);
                    bezierVertex(size / 2, size /4 * 5, size / 8, size / 4 * 5, 0, size / 4);
                    endShape();
                    break;
                case "w":
                    (rect)(0, size / 4, size / 5, size / 4 * 3, 0, 0, 0, size / 8);
                    rect(size / 4, size / 2, size / 8, size / 2, size / 30);
                    rect(size / 16 * 3, size / 4 * 3, size / 4, size / 4);
                    (rect)(size / 40 * 17, size / 4, size / 5, size / 4 * 3, 0, 0, size / 8, 0);
                    break;
                case "x":
                    rect(size / 4, size / 2, size / 8, size / 4);
    
                    (rect)(size / 8 * 3, size / 4, size / 4, size / 8 * 3, 0, 0, size / 8, 0);
                    (rect)(size / 8 * 3, size / 8 * 5, size / 4, size / 8 * 3, 0, size / 8, 0, 0);
                    (rect)(0, size / 4, size / 4, size / 8 * 3, 0, 0, 0, size / 8);
                    (rect)(0, size / 8 * 5, size / 4, size / 8 * 3, size / 8, 0, 0, 0);
                    break;
                case "y":
                    rect(size / 4, size / 8 * 5, size / 8, size / 8);
    
                    (rect)(size / 8 * 3, size / 4, size / 4, size, 0, 0, size / 8, 0);
                    (rect)(0, size / 4, size / 4, size / 2, 0, 0, 0, size / 8);
                    rect(0, size / 12 * 13, size / 8 * 3, size / 6);
                    break;
                case "z":
                    (rect)(0, size / 4, size / 8 * 5, size / 4, size / 8, 0, 0, 0);
                    (rect)(0, size / 4 * 3, size / 8 * 5, size / 4, 0, 0, size / 8, 0);
                    quad(size / 8 * 5, size / 2, size / 4, size / 4 * 3, 0, size / 4 * 3, size / 8 * 3, size / 2);
                    break;
                case "2":
                    (rect)(0, 0, size / 8 * 5, size / 4, size / 8, size / 8, 0, 0);
                    rect(0, size / 4 * 3, size / 8 * 5, size / 4);
                    beginShape();
                    vertex(size / 8 * 5, size / 3);
                    bezierVertex(size / 8 * 5, size / 2, size / 4, size / 8 * 5, size / 4, size / 4 * 3);
                    vertex(0, size / 4 * 3);
                    bezierVertex(size / 8, size / 2, size / 4, size / 12 * 5, size / 8 * 3, size / 3);
                    endShape();
                    rect(size / 8 * 3, size / 4, size / 4, size / 11.7);
                    break;
                
            }
            popMatrix();
            fontX += spacing;
            if (txt.charAt(letter) === "\n") {
                fontX = 0;
                fontY += size * 1.1;
                if (align === CENTER) {
                    fontX = -findNextNewline(txt, letter) * spacing / 2;
                }
                continue;
            }
        }
    };
    
    var header = function(txt, x, y, size, spacing, opacity) {
        txt = txt || "";
        x = x || 300;
        y = y || 0;
        size = size || 80;
        spacing = spacing || 60;
        noStroke();
        
        fill(255, 255, 255, (opacity / 20) || 255);
        for (var i = 0; i < 20; i++) {
            font(txt, x + sin(i * 18) * size / 15, y - cos(i * 18) * size / 15, size, spacing, CENTER);
        }
        
        fill(0, 145, 255, opacity || 255);
        font(txt, x, y, size, spacing, CENTER);
    };
// }

/** Variables **/
// {
    var keys = [];
    
    var play = false;
    var mobile = false;
    var delag = false;
    var paused = false;
    var pauseFade = 0;
    
    var enemies = [], food = [], coins = [];
    var objR = 0;
    var removeEnemy, removeFireball, removeCoin;
    
    var fireballs = [];
    var fireStart = 720;
    var fireInterval = 120;
    var fireSize;
    var newHigh = false;
    
    var startSpeed = 2;
    
    var overButton = false;
    
    var click = false;
// }

/** Scene transition **/
var flash = {
    fade: 255,
    display : function() {
        noStroke();
        fill(255, 255, 255, this.fade);
        rect(0, 0, width, height);
        this.fade -= 10;
    },
    reset: function(sceneTo) {
        scene = sceneTo;
        this.fade = 255;
    }
};

/** Smooth motion function **/
var Smooth = function(pos, dest, div) {
    return (dest - pos) / div;
};

/** Logo **/
// {
    var GGlogo = function(x, y, size) {
        noStroke();
    
        fill(0, 180, 0);
        pushMatrix();
        translate(x, y);
        scale(size / 600, size / 600);
        beginShape();
        vertex(-270, 20);
        bezierVertex(-600, 250, -700, 600, -50, 600);
        vertex(-125, 400);
        vertex(-255, 480);
        bezierVertex(-305, 430, -395, 280, -205, 180);
        endShape();
        beginShape();
        vertex(270, 20);
        bezierVertex(600, 250, 700, 600, 50, 600);
        vertex(125, 400);
        vertex(255, 480);
        bezierVertex(305, 430, 395, 280, 205, 180);
        endShape();
        arc(0, 600, 1200, 1300, 249, 291);
        popMatrix();
    };
    
    var xPos = [
        [5, 10, 100],
        [105, 150, 100],
        [80, 250, 10],
        [205, 180, 220],
        [0, 300, 250],
        [355, 0, 0],
        [100, 200, 300],
        [10, 150, 100],
        [100, 200, 150],
        [50, 250, 30],
        [-100, 360, 360],
        [0, 100, 0]
    ];
    
    var yPos = [
        [10, 215, 200],
        [10, 25, 180],
        [5, 220, 220],
        [10, 200, 170],
        [0, 0, 100],
        [210, 25, 210],
        [20, 220, 225],
        [10, 10, 200],
        [10, 5, 190],
        [10, 10, 180],
        [0, 0, 230],
        [0, 0, 100]
    ];
    
    var logo = {
        time : 0,
        fade : 0,
        particles : [],
        pieces : [],
        particle : function() {
            return {
                x : Math.floor(random(600)),
                y : Math.floor(random(600)),
                size : random(10, 20),
                speed : random(3, 5)
            };
        },
        addParticles : function() {
            do {
                this.particles.push(this.particle());
            } while (this.particles.length < 100);
        },
        load : function() {
            background(0, 0, 0);
            GGlogo(176.32, 16.65, 200);
            for (var i = 0; i < 12; i++) {
                this.pieces.push({
                    pos1 : {x : xPos[i][0], y : yPos[i][0]},   
                    pos2 : {x : xPos[i][1], y : yPos[i][1]},    
                    pos3 : {x : xPos[i][2], y : yPos[i][2]},
                    img : get(0, 0, 353, 217),
                    x : Math.floor(random(2)) === 0 ? random(-400, -200) : random(200, 400),
                    y : random(300, 400)
                });
            }
            
            for (var i = 0; i < 40; i++) {
                this.pieces.push({
                    pos1 : {x : random(i * 10 - 100, i * 10 + 100), y : random(-20, 220)},   
                    pos2 : {x : random(i * 10 - 100, i * 10 + 100), y : random(-20, 220)},    
                    pos3 : {x : random(i * 10 - 100, i * 10 + 100), y : random(-20, 220)},
                    img : get(0, 0, 353, 217),
                    x : Math.floor(random(2)) === 0 ? random(-400, -200) : random(200, 400),
                    y : random(300, 400)
                });
            }
            for (var i = 0; i < this.pieces.length; i++) {
                background(0, 0, 0); 
                fill(255, 255, 255);
                noStroke();
                triangle(this.pieces[i].pos1.x, this.pieces[i].pos1.y, this.pieces[i].pos2.x, this.pieces[i].pos2.y, this.pieces[i].pos3.x, this.pieces[i].pos3.y);
                this.pieces[i].img.mask(get(0, 0, 353, 217));
            }
        },
        display : function() {
            imageMode(CORNER);
            
            noStroke();
            background(0, 0, 0);
            
            this.time ++;
            
            pushMatrix();
            translate(124, 183);
            for (var i = 0; i < this.pieces.length; i++) {
                image(this.pieces[i].img, this.pieces[i].x, this.pieces[i].y);
                if (this.time > 60) {
                    this.pieces[i].x += Smooth(this.pieces[i].x, 0, 20);
                    this.pieces[i].y += Smooth(this.pieces[i].y, 0, 20);
                }
            }
            popMatrix();
            fill(0, 0, 0, 255 - map(this.time, 0, 70, 0, 255));
            noStroke();
            rect(0, 0, width, height);
            
            fill(0, 255, 0, 40);
            for (var i = 0; i < this.particles.length; i++) {
                pushMatrix();
                translate(this.particles[i].x, this.particles[i].y);
                rotate(45);
                ellipse(0, 0, this.particles[i].size, this.particles[i].size / 4 * 3);
                popMatrix();
                this.particles[i].x += this.particles[i].speed;
                this.particles[i].y += this.particles[i].speed;
                if (this.particles[i].x > 600) {
                    this.particles[i].x = 0;
                }
                if (this.particles[i].y > 600) {
                    this.particles[i].y = 0;
                }
            }
            
            textFont(fonts[0], 60);
            textAlign(CENTER, CENTER);
            fill(0, 255, 0, this.fade - (this.fade > 140 ? 0 : (Math.floor(random(5)) !== 0 ? 0 : random(40, 100))));
            
            if (this.time > 120) {
                this.fade += Smooth(this.fade, 150, 30);
            }
            
            text("Green Ghost", 300, 500);
            rect(300 - this.fade * 1.5, 550, this.fade * 3, 10);
            
            if (this.time > 420 || click) {
                flash.reset("name");
            }
        }
    };
    
    logo.addParticles();
// }

/** Skin color components **/
// {
    var colors = [
        color(0, 145, 255),   // Blue
        color(0, 200, 0),     // Green
        color(255, 200, 0),   // Orange
        color(255, 0, 0),     // Red
        color(0, 0, 0),       // Black
        color(255, 255, 255), // White
        color(140, 0, 255),   // Purple
        color(0, 200, 200),   // Aqua
        color(100, 100, 100), // Grey
        color(90, 50, 25),    // Brown
        color(175, 135, 35),  // Gold
        color(50, 50, 50),    // Dark grey
        color(255, 255, 0),   // Yellow
        color(0, 0, 100),     // Dark blue
        color(200, 200, 200), // Light grey
        color(255, 100, 255), // Pink
        color(65, 25, 190),   // Indigo
        color(180, 180, 255), // Ice blue
        color(80, 120, 65),   // Fern green
        color(255, 120, 0)    // Orange
    ];
    
    var skinsColors = [
        +getExp(headExp),
        +getExp(colorOneExp),
        +getExp(colorTwoExp)
    ];
    
    var resetColors = [
        +getExp(headExp),
        +getExp(colorOneExp),
        +getExp(colorTwoExp)
    ];
    
    var skinsPlus = [
        0,
        0,
        0
    ];
    
    var skinsNext = [
        0,
        0,
        0
    ];
    
    var colorUnlocks = [
        0, 0, 0, 5, 10, 10, 15, 15, 20, 20, 30, 30, 35, 35, 40, 40, 45, 50, 50, 60
    ];
    
    var colorNames = [
        "Blue",
        "Green",
        "Light orange",
        "Red",
        "Black",
        "White",
        "Purple",
        "Aqua",
        "Grey",
        "Brown",
        "Gold",
        "Dark grey",
        "Yellow",
        "Dark blue",
        "Light grey",
        "Pink",
        "Indigo",
        "Ice blue",
        "Fern green",
        "Orange"
    ];
    
    var prev = function(num) {
        skinsNext[num] = -1;
    };
    
    var next = function(num) {
        skinsNext[num] = 1;
    };
    
    var select = function(num) {
        if (colorsUnlocked[num] === "1") {
            if (num === 0) {
                player.headColor = colors[skinsColors[num]];
                resetColors[0] = skinsColors[num];
            } else {
                player.bodyColors[num - 1] = colors[skinsColors[num]];
                resetColors[num - 1] = skinsColors[num];
            }
        }
    };
    
    var unlock = function(x, y, num) {
        fill(255, 255, 255);
        textFont(fonts[0], 25);
        textAlign(CENTER, CENTER);
        pushMatrix();
        translate(x, y);
        if (player.highScore >= colorUnlocks[skinsColors[num]]) {
            if (num === 0) {
                if (player.headColor === colors[skinsColors[num]]) {
                    text("Selected", 0, 0);
                } else {
                    text("Select", 0, 0);
                }
            } else {
                if (player.bodyColors[num - 1] === colors[skinsColors[num]]) {
                    text("Selected", 0, 0);
                } else {
                    text("Select", 0, 0);
                }
            }
        } else {
            scale(0.7, 1);
            text("Unlocks at " + colorUnlocks[skinsColors[num]], 0, 0);
        }
        popMatrix();
    };
    
    var arrowLeft = function(x, y) {
        noStroke();
        fill(255, 255, 255);
        pushMatrix();
        translate(x, y);
        scale(1 + this.anim / 200, 1 + this.anim / 200);
        triangle(15, -15, 15, 15, -15, 0);
        popMatrix();
    };
    
    var arrowRight = function(x, y) {
        noStroke();
        fill(255, 255, 255);
        pushMatrix();
        translate(x, y);
        scale(1 + this.anim / 200, 1 + this.anim / 200);
        triangle(-15, -15, -15, 15, 15, 0);
        popMatrix();
    };
// }

/** AI designs **/
// { 
    var otherPlayers = [
        {
            name: "Talha Muhib", 
            headColor: colors[0], 
            bodyColors: [colors[6], colors[3]],
            in: false,
            face: 0
        },
        {
            name: "OOPS! Studio!", 
            headColor: colors[6],
            bodyColors: [colors[0], colors[19]],
            in: false,
            face: 7
        },
        {
            name: "Lin Gh.", 
            headColor: colors[4],
            bodyColors: [colors[7], colors[0]],
            in: false,
            face: 0
        },
        {
            name: "Chester Banks", 
            headColor: colors[0],
            bodyColors: [colors[19], colors[3]],
            in: false,
            face: 2
        },
        {
            name: "Tegoon", 
            headColor: colors[1],
            bodyColors: [colors[0], colors[3]],
            in: false,
            face: 1
        },
        {
            name: "avmswimmer", 
            headColor: colors[6],
            bodyColors: [colors[0], colors[1]],
            in: false,
            face: 6
        },
        {
            name: "Josiah The Calculus Way",
            headColor: colors[3], 
            bodyColors: [colors[0], colors[1]],
            in: false,
            face: 3
        },
        {
            name: "Isaac Emerald", 
            headColor: colors[0], 
            bodyColors: [colors[1], colors[4]],
            in: false,
            face: 2
        },
        {
            name: "Coyote", 
            headColor: colors[5],
            bodyColors: [colors[1], colors[0]],
            in: false,
            face: 9
        },
        {
            name: "RandomProgrammer24",
            headColor: colors[9],
            bodyColors: [colors[10], colors[7]],
            in: false,
            face: 0
        },
        {
            name: "ScusX",
            headColor: colors[11],
            bodyColors: [colors[0], colors[12]],
            in: false,
            face: 4
        },
        {
            name: "BB-8",
            headColor: colors[1],
            bodyColors: [colors[1], colors[1]],
            in: false,
            face: 8
        },
        {
            name: "The Phantom Programmer",
            headColor: colors[0],
            bodyColors: [colors[4], colors[3]],
            in: false,
            face: 6
        },
        {
            name: "Kruxe",
            headColor: colors[0],
            bodyColors: [colors[3], colors[4]],
            in: false,
            face: 8
        },
        {
            name: "The 1# Planet Proponent",
            headColor: colors[13],
            bodyColors: [colors[19], colors[6]],
            in: false,
            face: 1
        },
        {
            name: "Green Ghost",
            headColor: colors[8],
            bodyColors: [colors[1], colors[18]],
            in: false,
            face: 6
        },
        {
            name: "AquA217",
            headColor: colors[0],
            bodyColors: [colors[5], colors[14]],
            in: false,
            face: 9
        },
        {
            name: "Flying Scribble",
            headColor: colors[6],
            bodyColors : [colors[15], colors[3]],
            in: false,
            face: 3
        },
        {
            name: "Legolas Greenleaf",
            headColor: colors[16],
            bodyColors: [colors[17], colors[18]],
            in: false,
            face : 8
        }
    ];
    
    var firstNames = [
        "Blue",
        "Epic",
        "Weird",
        "Bob",
        "Pink",
        "Spikey",
        "Random"
    ];
    
    var lastNames = [
        "Joe",
        "Player",
        "Guy",
        "Thing"
    ];
// }

/** Achievement components **/
// {
    var achievementNames = [
        "Shape Shifter",
        "Big Spender",
        "Camouflage",
        "Trapper",
        "Deflect",
        "Growing",
        "Bigger",
        "Huge",
        "Giant",
        "Rich",
        "Tycoon",
        "Money Maker"
    ];
    
    var achievementDescs = [
        "Change your face.",
        "Buy all faces.",
        "Change your\ncolors.",
        "Make another\nsnake run\ninto you.",
        "Block a\nfireball.",
        "Gain five\nbody segments.",
        "Gain twenty\nbody segments.",
        "Gain fifty\nbody segments.",
        "Gain one\nhundred body\nsegments.",
        "Get a total\nof ten coins.",
        "Get a total\nof twenty coins.",
        "Get five coins\nin one try."
    ];
    
    var achievementGoals = [
        function() {
            return player.faceNum !== 0;
        },
        function() {
            for (var i in facesUnlocked) {
                if (facesUnlocked[i] === "0") {
                    return false;
                }
            }
            return true;
        },
        function() {
            return player.headColor !== colors[1] && player.bodyColors[0] !== colors[2] && player.bodyColors[1] !== colors[0];
        },
        function() {
            return player.hasTrapped;
        },
        function() {
            return player.hasDeflected;
        },
        function() {
            return player.length - 2 >= 5;
        },
        function() {
            return player.length - 2 >= 20;
        },
        function() {
            return player.length - 2 >= 50;
        },
        function() {
            return player.length - 2 >= 100;
        },
        function() {
            return player.totalCoins >= 10;
        },
        function() {
            return player.totalCoins >= 20;
        },
        function() {
            return player.curCoins >= 5;
        }
    ];
    
    var achievements = [];
    
    var Achievement = function(x, y, num) {
        this.x = x;
        this.y = y;
        this.name = achievementNames[num];
        this.desc = achievementDescs[num];
        this.size = 100;
        this.fade = 100;
        this.achieved = false;
        this.color = color(255, 255, 255);
    };
    
    Achievement.prototype.display = function() {
        strokeWeight(3);
        stroke(150, 150, 150);
        fill(90, 90, 90);
        ellipse(this.x, this.y, this.size, this.size);
        noStroke();
        (fill)(this.color, this.fade);
        beginShape();
        for (var i = 0; i < 6; i++) {
            vertex(this.x + sin(i * (216)) * this.size / 3, this.y - cos(i * (216)) * this.size / 3);
        }
        endShape();
        if (this.achieved) {
            this.fade = 200;
            this.color = color(0, 145, 255);
        }
    };
    
    var showAchievement = function(name, desc) {
        fill(200, 200, 200);
        textAlign(CENTER, CENTER);
        if (mouseX < 300) {
            rect(mouseX, mouseY, 250, 150);
        } else {
            rect(mouseX - 250, mouseY, 250, 150);
        }
        fill(255, 255, 255);
        textFont(fonts[0], 30);
        text(name, mouseX + (mouseX < 300 ? 125 : -125), mouseY + 20);
        textSize(25);
        text(desc, mouseX + (mouseX < 300 ? 125 : -125), mouseY + 85);
    };
    
    for (var i in achievementNames) {
        achievements.push(new Achievement((i % 4) * 120 + 120, Math.floor(i / 4) * 120 + 200, i));
    }
// }

/** Notification bar constructor **/
// {
    var notifications = [];

    var Notification = function(txt) {
        this.txt = txt;
        this.up = false;
        this.timer = 150;
        this.y = 0;
    };
    
    Notification.prototype.display = function(radius) {
        stroke(150, 150, 150);
        fill(100, 100, 100);
        strokeWeight(3);
        (rect)(0, -60, 350, 60, 0, 0, radius, 0);
        fill(255, 255, 255);
        textFont(fonts[0], 25);
        textAlign(LEFT, TOP);
        text(this.txt, 10, -60);
        if (this.up) {
            this.y += Smooth(this.y, 0, 10);
        } else {
            this.y += Smooth(this.y, 60, 10);
            if (Math.ceil(this.y) >= 60) {
                this.timer --;
            }
        }
        if (this.timer <= 0) {
            this.up = true;
        }
    };
// }

var hexagon = function(x, y, w, h, c) {
    if (c === undefined) {
        beginShape();
        for (var i = 0; i < 7; i++) {
            vertex(x + sin(i * 60) * w + w / 2, y + cos(i * 60) * h + h / 2);
        }
        endShape();
    } else {
        c.canvas.beginShape();
        for (var i = 0; i < 7; i++) {
            c.canvas.vertex(x + sin(i * 60) * w + w / 2, y + cos(i * 60) * h + h / 2);
        }
        c.canvas.endShape();
    }
};

/** Images **/
// {
    var loaded = loaded || false;
    var toGame = toGame || false;
    var curImg = 0;
    
    var circleImg, fillImg, hexImg, bgImg, tileImg1, tileImg2, tileImg3, tileImg4, shadeImg, maskImg1, maskImg2, maskImg3, maskImg4, coinImg;
    var specialHex;
    var loadedImages = [];
    
    var imagesToLoad = [
        {
            display : function() {
                if (this.size === 30) {
                    this.canvas.background(255, 255, 255, 0);
                }
                this.canvas.noStroke();
                this.canvas.fill(255, 255, 255, 10);
                this.canvas.ellipse(300, 300, this.size * 20, this.size * 20);
                this.size --;
                this.percent = map(this.size, 30, 0, 0, 100);
            },
            done : function() {
                return this.size <= 0;
            },
            finish : function() {
                return;
            },
            percent : 0,
            size : 30,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                if (this.y === 0) {
                    this.canvas.background(255, 255, 255, 0);
                }
                for (var i = 0; i < 200; i++) {
                    this.canvas.fill(
                        sin((i + this.y) / 1.5 + 40) * 40 + 100,
                        sin((i + this.y) / 1.5 + 40) * 40 + 100,
                        sin((i + this.y) / 1.5 + 40) * 40 + 100
                    );
                    this.canvas.rect(i, this.y, 1, 1);
                }
                this.y ++;
                this.percent = map(this.y, 0, 230, 0, 100);
            },
            done : function() {
                return this.y >= 230;
            },
            finish : function() {
                return;
            },
            percent : 0,
            y : 0,
            canvas : createGraphics(200, 230, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(0, 0, 0);
                this.canvas.fill(255, 255, 255);
                hexagon(42.4, 58, 115, 115, this);
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
                loadedImages[1].mask(loadedImages[2]);
            },
            percent : 0,
            canvas : createGraphics(200, 230, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(50, 50, 50);
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        specialHex(i * 144 + j * 72 - 532, j * 124 - 235, 80, 80, this);
                    }
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(50, 50, 50);
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        specialHex(i * 144 + j * 72 - 533, j * 124 - 234, 80, 80, this);
                    }
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(50, 50, 50);
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        specialHex(i * 144 + j * 72 - 556, j * 124 - 234, 80, 80, this);
                    }
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(50, 50, 50);
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        specialHex(i * 144 + j * 72 - 533, j * 124 - 338, 80, 80, this);
                    }
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(50, 50, 50);
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        specialHex(i * 144 + j * 72 - 556, j * 124 - 338, 80, 80, this);
                    }
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.background(255, 255, 255, 0);
                for (var i = 0; i < 100; i++) {
                    this.canvas.stroke(0, 0, 0, map(i, 0, 100, 0, 200));
                    this.canvas.line(0, i, width, i);
                }
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 100, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(255, 255, 255, 0);
                this.canvas.fill(255, 255, 255);
                this.canvas.ellipse(600, 600, 1200, 1200);
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(255, 255, 255, 0);
                this.canvas.fill(255, 255, 255);
                this.canvas.ellipse(0, 600, 1200, 1200);
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(255, 255, 255, 0);
                this.canvas.fill(255, 255, 255);
                this.canvas.ellipse(600, 0, 1200, 1200);
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                this.canvas.background(255, 255, 255, 0);
                this.canvas.fill(255, 255, 255);
                this.canvas.ellipse(0, 0, 1200, 1200);
            },
            done : function() {
                return true;
            },
            finish : function() {
                this.percent = 100;
            },
            percent : 0,
            canvas : createGraphics(600, 600, P2D)
        },
        {
            display : function() {
                this.canvas.noStroke();
                if (this.y === 0) {
                    this.canvas.background(255, 255, 255, 0);
                }
                
                for (var i = 0; i < 200; i++) {
                    if (dist(i, this.y, 100, 100) < 98) {
                        this.canvas.fill(80 + (2 + sin(this.y + i)) * 50, 60 + (2 + sin(this.y + i)) * 30, 20 + (2 + sin(this.y + i)) * 5);
                        this.canvas.rect(i, this.y, 1, 1);
                    }
                }
                
                this.canvas.noFill();
                this.canvas.stroke(245, 190, 60);
                this.canvas.strokeWeight(10);
                this.canvas.ellipse(100, 100, 190, 190);
                
                this.canvas.textAlign(CENTER, CENTER);
                this.canvas.textFont(createFont("Sans-serif"), 120);
                this.canvas.fill(260, 205, 75);
                this.canvas.text("1", 100, 100);
                
                this.y ++;
                this.percent = map(this.y, 0, 200, 0, 100);
            },
            done : function() {
                return this.y >= 200;
            },
            finish : function() {
                return;
            },
            percent : 0,
            y : 0,
            canvas : createGraphics(200, 200, P2D)
        }
    ];
// }

specialHex = function(x, y, w, h, c) {
    if (c === undefined) {
        imageMode(CENTER);
        image(fillImg, x + w / 2, y + h / 2, w / 4 * 7, h * 2);
    } else {
        c.canvas.imageMode(CENTER);
        c.canvas.image(loadedImages[1], x + w / 2, y + h / 2, w / 4 * 7, h * 2);
    }
};

/** Button constructor **/
// {
    var Button = function(x, y, w, h, shape, func, pic) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.sides = [];
        this.w = w;
        this.h = h;
        
        if (shape === "hex") {
            for (var i = 0; i < 7; i++) {
                this.sides.push({x : sin(i * 60) * w, y : cos(i * 60) * h});
            }
        }
        
        this.func = func;
        this.pic = pic;
        
        this.pos1 = {x : 0, y : 0};
        this.pos2 = {x : 0, y : 0};
        
        this.fixed1 = {x : 0, y : 0};
        this.fixed2 = {x : 0, y : 0};
        
        this.side1 = 0;
        this.side2 = 0;
        
        this.count = 0;
        
        this.plusW = 0;
        this.plusH = 0;
        
        this.anim = 0;
    };
    
    Button.prototype.display = function(num) {
        noStroke();
        if (this.shape === "rect") {
            fill(90, 90, 90);
            rect(this.x, this.y, this.w, this.h);
            fill(255, 255, 255, map(Math.min(this.plusW, this.plusH), 0, Math.min(this.w, this.h), 0, 100));
            rect(this.x + this.w / 2 - this.plusW / 2, this.y + this.h / 2 - this.plusH / 2, this.plusW, this.plusH);
            this.pic(this.x + this.w / 2, this.y + this.h / 2, num);
        } else if (this.shape === "hex") {
            specialHex(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
            fill(255, 255, 255, map(Math.min(this.plusW, this.plusH), 0, Math.min(this.w, this.h), 0, 100));
            hexagon(this.x - this.plusW / 2, this.y - this.plusH / 2, this.plusW, this.plusH);
            this.pic(this.x, this.y, num);
        }
    };
    
    Button.prototype.collide = function() {
        if (this.shape === "rect") {
            return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
        } else if (this.shape === "hex") {
            this.count = 0;
            
            this.pos1 = {x : 0, y : 0};
            this.pos2 = {x : 0, y : 0};
            
            this.fixed1 = {x : 0, y : 0};
            this.fixed2 = {x : 0, y : 0};
            
            this.side1 = 0;
            this.side2 = 0;
            
            for (var i = 1; i < this.sides.length; i++) {
                this.pos1.x = this.x + this.sides[i].x;
                this.pos2.x = this.x + this.sides[i - 1].x;
                
                this.pos1.y = this.y + this.sides[i].y;
                this.pos2.y = this.y + this.sides[i - 1].y;
                
                
                this.fixed1.x = this.pos1.x;
                this.fixed2.x = this.pos2.x;
                
                this.fixed1.y = this.pos1.y;
                this.fixed2.y = this.pos2.y;
    
                if (this.pos1.x >= this.pos2.x) {
                    this.fixed1.x = this.pos2.x;
                    
                    this.fixed2.x = this.pos1.x;
                    
                    this.fixed1.y = this.pos2.y;
                
                    this.fixed2.y = this.pos1.y;
                }
                
                this.side1 = (this.fixed2.x - this.fixed1.x) * (mouseY - this.fixed1.y);
                this.side2 = (mouseX - this.fixed1.x) * (this.fixed2.y - this.fixed1.y);
                if (this.side1 <= this.side2 && mouseX >= this.fixed1.x && mouseX <= this.fixed2.x) {
                    this.count ++;
                }
            }
            return this.count % 2 === 1 || dist(mouseX, mouseY, this.x, this.y) < (Math.min(this.w, this.h) / 2);
        }
    };
    
    Button.prototype.pack = function(num) {
        if (this.collide()) {
            overButton = true;
            this.plusW += Smooth(this.plusW, this.w, 10);
            this.plusH += Smooth(this.plusH, this.h, 10);
            this.anim += Smooth(this.anim, 100, 10);
            if (click) {
                this.func(num);
            }
        } else {
            this.plusW += Smooth(this.plusW, 0, 10);
            this.plusH += Smooth(this.plusH, 0, 10);
            this.anim += Smooth(this.anim, 0, 10);
        }
        
        this.display(num);
    };
    
    var playB = new Button(
        300, 
        425, 
        80, 
        80, 
        "hex", 
        function() {
            newHigh = false;
            player.reset();
            flash.reset("game");
        },
        function(x, y) {
            noStroke();
            fill(255, 255, 255);
            pushMatrix();
            translate(x, y);
            rotate(map(this.anim, 0, 100, 0, 240));
            beginShape();
            for (var i = 0; i < 3; i++) {
                vertex(sin(i * 120 + 90) * 40, cos(i * 120 + 90) * 40);
            }
            endShape();
            popMatrix();
        }
    );
    
    var settingsB = new Button(
        372, 
        300, 
        80, 
        80, 
        "hex", 
        function() {
            flash.reset("settings");
        },
        function(x, y) {
            noFill();
            stroke(255, 255, 255);
            strokeWeight(15);
            pushMatrix();
            translate(x, y);
            rotate(map(this.anim, 0, 100, 0, 180));
            ellipse(0, 0, this.w / 2, this.h / 2);
            noStroke();
            fill(255, 255, 255);
            for (var i = 0; i < 8; i++) {
                rotate(45);
                quad(-5, -40, 5, -40, 8, -20, -8, -20);
            }
            popMatrix();
        }
    );
    
    var helpB = new Button(
        228, 
        300, 
        80, 
        80, 
        "hex", 
        function() {
            flash.reset("help");
        },
        function(x, y) {
            noFill();
            stroke(255, 255, 255);
            strokeWeight(10);
            strokeCap(SQUARE);
            pushMatrix();
            translate(x, y);
            scale(sin(map(this.anim, 0, 100, 90, 450)), 1);
            arc(0, -15, 40, 40, 225, 450);
            line(0, 0, 0, 25);
            
            noStroke();
            fill(255, 255, 255);
            ellipse(0, 40, 10, 10);
            popMatrix();
        }
    );
    
    var achievementsB = new Button(
        444, 
        425, 
        80, 
        80, 
        "hex", 
        function() {
            flash.reset("achievements");
        },
        function(x, y) {
            noStroke();
            fill(255, 255, 255);
            pushMatrix();
            translate(x, y - 15);
            scale(sin(map(this.anim, 0, 100, 90, 450)), 1);
            arc(0, 0, 40, 60, 0, 180);
            rect(-20, -10, 40, 10);
            rect(-5, 20, 10, 20);
            beginShape();
            vertex(-5, 40);
            vertex(5, 40);
            bezierVertex(5, 43, 5, 50, 10, 50);
            vertex(-10, 50);
            bezierVertex(-5, 50, -5, 43, -5, 40);
            endShape();
            
            noFill();
            stroke(255, 255, 255);
            strokeWeight(5);
            beginShape();
            vertex(-20, 0);
            bezierVertex(-30, -10, -35, 20, -24, 20);
            bezierVertex(-25, 15, -25, 40, -10, 20);
            vertex(10, 20);
            bezierVertex(25, 40, 25, 15, 24, 20);
            bezierVertex(30, 20, 35, -10, 20, 0);
            endShape();
            popMatrix();
            
        }
    );
    
    var skinsB = new Button(
        156, 
        425, 
        80, 
        80, 
        "hex", 
        function() {
            flash.reset("skins");
        },
        function(x, y) {
            fill(255, 255, 255);
            stroke(90, 90, 100);
            strokeWeight(3);
            pushMatrix();
            translate(x, y);
            for (var i = 0; i < 3; i++) {
                ellipse(i * 20 - 20, sin(constrain(map(this.anim, 0, 100, 0, 360) + (i * 30 * map(this.anim, 0, 100, 0, 1)), -20, 360)) * 20, 40, 40);
            }
            popMatrix();
        }
    );
    
    var continueB = new Button(
        300, 
        450, 
        80, 
        80, 
        "hex", 
        function() {
            player.name = name;
            flash.reset("menu");
        },
        function(x, y) {
            noStroke();
            fill(255, 255, 255);
            pushMatrix();
            translate(x, y);
            scale(1 + this.anim / 200, 1 + this.anim / 200);
            rect(-30, -10, 30, 20);
            triangle(0, -20, 0, 20, 30, 0);
            popMatrix();
        }
    );
    
    var backB = new Button(
        0, 
        530,
        70,
        70,
        "rect",
        function() {
            skinsColors = [
                resetColors[0],
                resetColors[1],
                resetColors[2]
            ];
            skinChanger.faceNum = player.faceNum;
            flash.reset("menu");
        },
        function(x, y) {
            noStroke();
            fill(255, 255, 255);
            pushMatrix();
            translate(x, y);
            scale(1 + this.anim / 200, 1 + this.anim / 200);
            rect(0, -7, 20, 14);
            triangle(0, -15, 0, 15, -20, 0);
            popMatrix();
        }
    );
    
    var controlsB = new Button(
        110,
        250,
        380,
        50,
        "rect",
        function() {
            mobile = !mobile;
        },
        function(x, y) {
            textFont(fonts[0], 25);
            textAlign(CENTER, CENTER);
            fill(255, 255, 255);
            text("Controls: " + (mobile ? "Mouse" : "Arrow keys"), x, y);
        }
    );
    
    var graphicsB = new Button(
        110,
        350,
        380,
        50,
        "rect",
        function() {
            delag = !delag;
        },
        function(x, y) {
            textFont(fonts[0], 25);
            textAlign(CENTER, CENTER);
            fill(255, 255, 255);
            text("Graphics: " + (delag ? "Low quality" : "High quality"), x, y);
        }
    );
    
    var continueB2 = new Button(
        20,
        500,
        560,
        50,
        "rect",
        function() {
            toGame = true;
        },
        function(x, y) {
            textFont(fonts[0], 30);
            textAlign(CENTER, CENTER);
            fill(255, 255, 255);
            text("Continue", x, y);
        }
    );
    
    var retryB = new Button(
        530, 
        530,
        70,
        70,
        "rect",
        function() {
            newHigh = false;
            player.reset();
            flash.reset("game");
        },
        function(x, y) {
            noFill();
            stroke(255, 255, 255);
            strokeWeight(5);
            pushMatrix();
            translate(x, y);
            rotate(map(this.anim, 0, 100, 0, 240));
            arc(0, 0, 40, 40, 0, 260);
            rotate(260);
            noStroke();
            fill(255, 255, 255);
            triangle(12, 0, 28, 0, 20, 10);
            popMatrix();
        }
    );
    
    var saveB = new Button(
        530,
        530,
        70,
        70,
        "rect",
        function() {
            println("Copy and paste this text in the area marked \"Paste save code here.\"\nvar saveCode = \"#" + (player.name !== "" ? player.name : " ") + " @" + player.highScore + " π" + player.coins + " a" + player.faceNum + " b" + skinsColors[0] + " c" + skinsColors[1] + " d" + skinsColors[2] + " e" + facesUnlocked.join(" ") + "  f" + colorsUnlocked.join(" ") + "  g" + achievementsUnlocked.join(" ") + " \";");
        },
        function(x, y) {
            pushMatrix();
            translate(x, y);
            scale(1 + this.anim / 200, 1 + this.anim / 200);
            noStroke();
            fill(255, 255, 255);
            beginShape();
            vertex(-15, -20);
            bezierVertex(-20, -20, -20, -20, -20, -15);
            vertex(-20, 15);
            bezierVertex(-20, 20, -20, 20, -15, 20);
            vertex(15, 20);
            bezierVertex(20, 20, 20, 20, 20, 15);
            vertex(20, -15);
            vertex(15, -20);
            endShape();
            fill(100, 100, 100);
            rect(-15, 0, 30, 15, 2);
            rect(-12, -17, 24, 14, 2);
            fill(255, 255, 255);
            rect(3, -14, 5, 8);
            popMatrix();
        }
    );
    
    var skinsButtons = [];

    var selectButtons = [];
    
    for (var i = 0; i < 3; i++) {
        skinsButtons.push({
            left : new Button(
                60,
                323 + i * 60, 
                54,
                54,
                "rect",
                prev,
                arrowLeft
            ),
            right : new Button(
                470,
                323 + i * 60, 
                54,
                54,
                "rect",
                next,
                arrowRight
            )
        });
    }
    
    for (var i = 0; i < 3; i++) {
        selectButtons.push(
            new Button(
                148,
                350 + i * 60,
                144,
                30,
                "rect",
                select,
                unlock
            )
        );
    }
// }

var displayArena = function() {
    fill(150, 150, 150);
    stroke(200, 200, 200);
    strokeWeight(5);
    ellipse(300, 300, arenaSize, arenaSize);
    noStroke();
    imageMode(CORNER);
    image(tileImg1, -300, -300);
    image(tileImg2, 300, -300);
    image(tileImg3, -300, 300);
    image(tileImg4, 300, 300);
};

var quickDist = function(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
};

/** Camera **/
// {
    Camera = function() {
        this.x = 0;
        this.y = 0;
    };
    
    Camera.prototype.move = function(x, y) {
        this.x += Smooth(this.x, Math.round(width / 2 - x), 10);
        this.y += Smooth(this.y, Math.round(height / 2 - y), 10);
    };
    
    Camera.prototype.translate = function() {
        translate(this.x, this.y);
    };
    
    var gameCamera = new Camera();
    // }

var flashes = [];

/** Faces designs and components **/
// {
    var faces = [
        function(size, r, eyeR) {
            rotate(r);
            noStroke();
            fill(255, 255, 255);
            ellipse(-size / 4.5, -size / 2.8, size / 2.8, size / 2.8);
            ellipse(size / 4.5, -size / 2.8, size / 2.8, size / 2.8);
            fill(0, 0, 0);
            pushMatrix();
            translate(-size / 4.5, -size / 2.8);
            rotate(eyeR);
            ellipse(0, -size / 15, size / 4, size / 4);
            popMatrix();
            pushMatrix();
            translate(size / 4.5, -size / 2.8);
            rotate(eyeR);
            ellipse(0, -size / 15, size / 4, size / 4);
            popMatrix();
        },
        function(size, r, eyeR) {
            rotate(r);
            noStroke();
            fill(255, 255, 255);
            arc(-size / 4.5, -size / 3.8, size / 2.8, size / 2.8, 150, 330);
            arc(size / 4.5, -size / 3.8, size / 2.8, size / 2.8, 210, 390);
            fill(0, 0, 0);
            pushMatrix();
            translate(-size / 4.5, -size / 3.8);
            rotate(eyeR);
            ellipse(0, -size / 15, size / 6, size / 6);
            popMatrix();
            pushMatrix();
            translate(size / 4.5, -size / 3.8);
            rotate(eyeR);
            ellipse(0, -size / 15, size / 6, size / 6);
            popMatrix();
        },
        function(size, r) {
            strokeCap(PROJECT);
            rotate(r);
            stroke(0, 0, 0);
            strokeWeight(size / 25);
            fill(0, 0, 0, 150);
            arc(-size / 4.5, -size / 10, size / 5, size / 3.5, 180, 361);
            arc(size / 4.5, -size / 10, size / 5, size / 3.5, 180, 361);
            line(-size / 4.5 - size / 11.2, -size / 10, -size / 4.5 + size / 11.2, -size / 10);
            line(size / 4.5 - size / 11.2, -size / 10, size / 4.5 + size / 11.2, -size / 10);
            beginShape();
            vertex(-size / 4, -size / 2.5);
            vertex(-size / 4.5, -size / 3);
            vertex(-size / 6, -size / 2.5);
            vertex(-size / 9, -size / 3);
            vertex(-size / 20, -size / 2.5);
            vertex(0, -size / 3);
            vertex(size / 20, -size / 2.5);
            vertex(size / 9, -size / 3);
            vertex(size / 6, -size / 2.5);
            vertex(size / 4.5, -size / 3);
            vertex(size / 4, -size / 2.5);
            bezierVertex(size / 4, -size / 1.9, -size / 4, -size / 1.9, -size / 4, -size / 2.5);
            endShape();
            noStroke();
        },
        function(size, r, eyeR) {
            strokeCap(ROUND);
            rectMode(CENTER);
            rotate(r);
            stroke(0, 0, 0);
            strokeWeight(size / 25);
            line(-size / 5, -size / 3, size / 6, -size / 3);
            
            noStroke();
            fill(255, 255, 255);
            rect(-size / 4.5, -size / 10, size / 6, size / 3);
            rect(size / 4.5, -size / 10, size / 6, size / 3);
            
            beginShape();
            vertex(-size / 7, -size / 2.8);
            vertex(-size / 9, -size / 2.3);
            vertex(-size / 13, -size / 2.8);
            vertex(-size / 25, -size / 2.3);
            vertex(0, -size / 2.8);
            vertex(size / 25, -size / 2.3);
            vertex(size / 13, -size / 2.8);
            vertex(size / 9, -size / 2.3);
            vertex(size / 7, -size / 2.8);
            endShape();
            
            fill(0, 0, 0);
            pushMatrix();
            translate(-size / 4.5, -size / 10);
            rect(sin(eyeR) * size / 20, -cos(eyeR) * size / 20, size / 12, size / 6);
            popMatrix();
            pushMatrix();
            translate(size / 4.5, -size / 10);
            rect(sin(eyeR) * size / 20, -cos(eyeR) * size / 20, size / 12, size / 6);
            popMatrix();
    
            rectMode(CORNER);
        },
        function(size, r, eyeR) {
            strokeCap(PROJECT);
            rotate(r);
            stroke(255, 255, 255);
            strokeWeight(size / 30);
            fill(0, 0, 0);
            pushMatrix();
            translate(size / 4, -size / 6);
            rotate(30);
            ellipse(0, 0, size / 4, size / 6);
            popMatrix();
            pushMatrix();
            translate(-size / 4, -size / 6);
            rotate(-30);
            ellipse(0, 0, size / 4, size / 6);
            popMatrix();
            beginShape();
            vertex(-size / 20, -size / 2);
            vertex(-size / 20, -size / 1.5);
            vertex(-size / 10, -size / 1.3);
            vertex(0, -size / 1.4);
            vertex(size / 10, -size / 1.3);
            vertex(size / 20, -size / 1.5);
            vertex(size / 20, -size / 2);
            endShape();
            noStroke();
        },
        function(size, r) {
            rotate(r);
            noStroke();
            fill(255, 255, 255);
            ellipse(-size / 4.5, -size / 2.8, size / 2.8, size / 2.8);
            ellipse(size / 4.5, -size / 2.8, size / 2.8, size / 2.8);
            fill(0, 0, 0);
            pushMatrix();
            translate(-size / 4.5, -size / 2.8);
            rotate(frameCount * 10);
            ellipse(0, -size / 15, size / 6, size / 6);
            popMatrix();
            pushMatrix();
            translate(size / 4.5, -size / 2.8);
            rotate(frameCount * 10 + 180);
            ellipse(0, -size / 15, size / 6, size / 6);
            popMatrix();
        },
        function(size, r) {
            rotate(r);
            noFill();
            stroke(0, 0, 0);
            strokeWeight(size / 15);
            beginShape();
            vertex(-size / 3.5, -size / 4);
            vertex(-size / 5, -size / 8);
            vertex(-size / 11, -size / 4);
            endShape();
            beginShape();
            vertex(size / 3.5, -size / 4);
            vertex(size / 5, -size / 8);
            vertex(size / 11, -size / 4);
            endShape();
            noStroke();
        },
        function(size, r, eyeR) {
            rotate(r);
            noStroke();
            fill(0, 0, 0);
            ellipse(-size / 3.5, -size / 8, size / 9, size / 9);
            ellipse(-size / 6, -size / 3.5, size / 6, size / 6);
            ellipse(size / 3.5, -size / 8, size / 9, size / 9);
            ellipse(size / 6, -size / 3.5, size / 6, size / 6);
            stroke(255, 255, 255);
            strokeWeight(size / 20);
            arc(-size / 15, -size / 2, size / 3, size / 3, 160, 250 + sin(frameCount * 4) * 20);
            arc(size / 15, -size / 2, size / 3, size / 3, 290 - sin(frameCount * 4) * 20, 380);
            noStroke();
        },
        function(size, r, eyeR) {
            rotate(r);
            noStroke();
            fill(255, 255, 255);
            ellipse(0, -size / 5, size / 2, size / 2);
            fill(0, 0, 0);
            pushMatrix();
            translate(0, -size / 5);
            rotate(eyeR);
            ellipse(0, -size / 10, size / 4, size / 4);
            popMatrix();
        },
        function(size, r, eyeR) {
            rotate(r);
            translate(0, size / 10);
            noStroke();
            fill(0, 0, 0);
            beginShape();
            vertex(-size / 3, -size / 1.9);
            bezierVertex(-size / 1.7, -size / 12, size / 10, -size / 12, -size / 10, -size / 1.9);
            bezierVertex(-size / 8, -size / 2, -size / 3.3, -size / 2, -size / 3, -size / 1.9);
            endShape();
            beginShape();
            vertex(size / 3, -size / 1.9);
            bezierVertex(size / 1.7, -size / 12, -size / 10, -size / 12, size / 10, -size / 1.9);
            bezierVertex(size / 8, -size / 2, size / 3.3, -size / 2, size / 3, -size / 1.9);
            endShape();
            pushMatrix();
            noStroke();
            fill(255, 255, 255);
            translate(-size / 4.5, -size / 2.8);
            ellipse(-size / 20, -size / 20, size / 8, size / 8);
            ellipse(size / 20, size / 20, size / 10, size / 10);
            noFill();
            stroke(0, 0, 0);
            strokeWeight(size / 15);
            arc(size / 1.8, size / 8, size / 4, size / 6, 271, 360);
            popMatrix();
            pushMatrix();
            noStroke();
            fill(255, 255, 255);
            translate(size / 4.5, -size / 2.8);
            ellipse(-size / 20, -size / 20, size / 8, size / 8);
            ellipse(size / 20, size / 20, size / 10, size / 10);
            noFill();
            stroke(0, 0, 0);
            strokeWeight(size / 15);
            arc(-size / 1.8, size / 8, size / 4, size / 6, 181, 270);
            popMatrix();
            noStroke();
        }
    ];
    
    var skinCosts = {
        0 : [0, 0],
        1 : [1, 2],
        2 : [9, 4],
        3 : [8, 6],
        4 : [5, 8],
        5 : [6, 10],
        6 : [3, 15],
        7 : [2, 20],
        8 : [7, 25],
        9 : [4, 30]
    };
// }

/** Segment constructor **/
// {
    Segment = function(x, y) {
        this.x = x;
        this.y = y;
        this.size = segSize;
    };

    Segment.prototype.display = function(num, shade) {
        if (
            this.x + gameCamera.x < -segSize ||
            this.x + gameCamera.x > width + segSize ||
            this.y + gameCamera.y < -segSize ||
            this.y + gameCamera.y > height + segSize ||
            dist(this.x, this.y, 300, 300) > arenaSize / 2
        ) {
            return;
        }
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
        if (!delag) {
            imageMode(CENTER);
            image(circleImg, this.x, this.y, this.size, this.size);
        }
        if (shade) {
            fill(30, 30, 30, num);
            noStroke();
            ellipse(this.x, this.y, this.size, this.size);
        }
    };
// }

/** Snake constructor **/
// {
    Snake = function(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.moving = false;
        this.smooth = 0;
        this.eyeAngle = 0;
        this.faceNum = 0;
        
        this.segments = [];
        
        for (var i = 0; i < segSize * 3 / 2; i++) {
            this.segments.unshift(new Segment(this.x, this.y + i));
        }
        
        this.transition = 0;
        this.head = new Segment(this.x, this.y);
        
        this.pos = {x : 0, y : 0};
        
        this.moveFood = false;
        
        this.nameFade = 255;
        
        this.length = 2;
    };
    
    Snake.prototype.display = function() {
        noStroke();
        
        for (var i = 0; i < this.segments.length - 1; i++) {
            this.transition = Math.floor((this.segments.length / (segSize / 2) - (i / (segSize / 2)) - 1) / 4) % 2;
            
            this.transition = Math.max(this.transition, 0);

            fill(this.bodyColors[this.transition]);
            if (i % (segSize / 2) === 0) {
                this.segments[i].display(
                    sin(((this.segments.length / (segSize / 2) - 1 - i / (segSize / 2)) * 30 + 180) + 1) * 40,
                    true
                );
            }
        }
        
        fill(this.headColor);
        this.head.display(
            undefined,
            false
        );
        
        pushMatrix();
        translate(this.x, this.y);
        faces[this.faceNum](segSize, -this.angle, this.eyeAngle);
        popMatrix();
        fill(255, 255, 255, this.nameFade);
        textFont(fonts[0], 25);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y + segSize);
    };
    
    Snake.prototype.collide = function(other) {
        return dist(this.head.x, this.head.y, other.x, other.y) < segSize;
    };
    
    Snake.prototype.touchWall = function() {
        return dist(this.x, this.y, 300, 300) > arenaSize / 2 - segSize / 2;
    };
    
    Snake.prototype.touchSelf = function() {
        for (var i = 0; i < this.segments.length - segSize * 2; i++) {
            if (this.collide(this.segments[i])) {
                return true;
            }
        }
        return false;
    };
    
    Snake.prototype.moveForward = function() {
        this.moving = true;
        this.x -= sin(this.angle);
        this.y -= cos(this.angle);
        this.head.x = this.x;
        this.head.y = this.y;
        this.segments.push(new Segment(this.x, this.y));
    };
    
    Snake.prototype.moveLeft = function() {
        this.eyeAngle -= 4;
        this.angle += this.speed / 3 * 5;
    };
    
    Snake.prototype.moveRight = function() {
        this.eyeAngle += 4;
        this.angle -= this.speed / 3 * 5;
    };
// }

/** Player constructor **/
// {
    Player = function(x, y) {
        Snake.call(this, x, y);
    
        this.speed = startSpeed;
        this.headColor = colors[+getExp(headExp)];
 
        this.bodyColors = [colors[+getExp(colorOneExp)], colors[+getExp(colorTwoExp)]];
        
        this.score = 0;
        this.highScore = +getExp(scoreExp);
        
        this.coins = +getExp(coinExp);
        this.totalCoins = this.coins;
        this.curCoins = 0;
        
        this.name = name;
        
        this.timer = 600;
        
        this.faceNum = +getExp(faceExp);
        
        this.hasTrapped = false;
        this.hasDeflected = false;
        this.touchFire = false;
    };
    
    Player.prototype = Object.create(Snake.prototype);
    
    Player.prototype.move = function() {
        for (var i = 0; i < Math.ceil(this.speed); i++) {
            this.moveForward();
        }
        
        while (this.segments.length > this.length * (segSize / 2)) {
            this.segments.shift();
        }
        this.checkFood();
        
        if (!mobile) {
            if (keys[LEFT]) {
                this.moveLeft();
            }
            if (keys[RIGHT]) {
                this.moveRight();
            }
        } else {
            if (this.checkMouse() === "left") {
                this.moveLeft();
                while (this.checkMouse() === "right") {
                    this.angle --;
                    this.eyeAngle = 0;
                }
            } else if (this.checkMouse() === "right") {
                this.moveRight();
                while (this.checkMouse() === "left") {
                    this.angle ++;
                    this.eyeAngle = 0;
                }
            } 
        }
        
        this.timer --;
        if (this.timer < 1) {
            this.nameFade -= 10;
        }
        
        this.eyeAngle -= this.eyeAngle > 0 ? 2 : 0;
        this.eyeAngle += this.eyeAngle < 0 ? 2 : 0;
        this.eyeAngle = constrain(this.eyeAngle, -35, 35);
    };
    
    Player.prototype.checkFood = function() {
        for (var i = 0; i < food.length; i++) {
            if (this.collide(food[i])) {
                this.speed += 0.01;
                this.length ++;
                this.score ++;
                if (food[i] instanceof MagicFood) {
                    this.length ++;
                    this.score += 9;
                    food.splice(i, 1);
                    return;
                }
                food[i].move();
                this.moveFood = true;
                while (this.moveFood) {
                    this.moveFood = false;
                    for (var j = 0; j < this.segments.length; j++) {
                        if (dist(this.segments[j].x, this.segments[j].y, food[i].x, food[i].y) < segSize) {
                            food[i].move();
                            this.moveFood = true;
                        }
                    }
                }
            }
        }
    };
    
    Player.prototype.reset = function() {
        this.x = 300;
        this.y = 300;
        this.moving = false;
        this.angle = 0;
        this.segments = [];
        
        for (var i = 0; i < segSize * 3 / 2; i++) {
            this.segments.unshift(new Segment(this.x, this.y + i));
        }
        
        this.head = new Segment(this.x, this.y);
        this.speed = startSpeed;
        this.score = 0;
        
        this.nameFade = 255;
        this.timer = 200;
        
        this.length = 2;
        
        this.curCoins = 0;
        this.touchFire = false;
    };
    
    Player.prototype.checkMouse = function() {
        this.pos.x = (this.x + gameCamera.x) - sin(this.angle) * 50;
        this.pos.y = (this.y + gameCamera.y) - cos(this.angle) * 50;
    
        this.check1 = ((this.x + gameCamera.x) - this.pos.x) * (mouseY - this.pos.y);
        this.check2 = (mouseX - this.pos.x) * ((this.y + gameCamera.y) - this.pos.y);
        
        if (this.check1 > this.check2) {
            return "left";
        } 
        if (this.check1 < this.check2) {
            return "right";
        }
    };
    
    Player.prototype.showScore = function() {
        textFont(fonts[0], 50);
        textAlign(LEFT, TOP);
        fill(255, 255, 255);
        text("Score: " + this.score +"\nCoins: " + this.coins, 5, 0);
    };
    
    Player.prototype.touchEnemy = function() {
        for (var i = 0; i < enemies.length; i++) {
            for (var j = 0; j < enemies[i].segments.length - 1; j++) {
                if (dist(this.x, this.y, enemies[i].segments[j].x, enemies[i].segments[j].y) < segSize) {
                    return true;
                }
            }
        }
        return false;
    };
// }

/** Enemy constructor **/
// {
    Enemy = function(x, y, angle, num) {
        Snake.call(this, x, y);
        
        this.angle = angle;
        
        this.num = num;
        
        this.foodNum = 0;
        
        this.check1 = 0;
        this.check2 = 0;
        
        if (this.isFull()) {
            this.name = firstNames[Math.floor(random(firstNames.length))] + " " + lastNames[Math.floor(random(lastNames.length))];
            
            this.headColor = colors[Math.floor(random(colors.length))];
            this.bodyColors = [colors[Math.floor(random(colors.length))], colors[Math.floor(random(colors.length))]];
            this.faceNum = Math.floor(random(faces.length));
        } else {
            this.person = Math.floor(random(otherPlayers.length));
            
            while (otherPlayers[this.person].in) {
                this.person = Math.floor(random(otherPlayers.length));
            }
            
            this.name = otherPlayers[this.person].name;
            this.headColor = otherPlayers[this.person].headColor;
            this.bodyColors = otherPlayers[this.person].bodyColors;
            this.faceNum = otherPlayers[this.person].face;
            otherPlayers[this.person].in = true;
        }
        
        for (var i = 0; i < this.segments.length; i++) {
            this.segments[i].x += sin(angle) * i;
            this.segments[i].y += cos(angle) * i;
        }
        
        this.inside = false;
        
        this.speed = startSpeed;
    };
    
    Enemy.prototype = Object.create(Snake.prototype);
    
    Enemy.prototype.move = function() {
        this.findFood();
        
        if (this.moveToFood() === "left") {
            this.moveLeft();
            while(this.moveToFood() === "right") {
                this.angle --;
                this.eyeAngle = 0;
            }
        } else if (this.moveToFood() === "right") {
            this.moveRight();
            while(this.moveToFood() === "left") {
                this.angle ++;
                this.eyeAngle = 0;
            }
        }
        
        for (var i = 0; i < Math.ceil(this.speed); i++) {
            this.moveForward();
        }
        
        while (this.segments.length > this.length * (segSize / 2)) {
            this.segments.shift();
        }
        
        this.checkFood();
        
        this.eyeAngle -= this.eyeAngle > 0 ? 2 : 0;
        this.eyeAngle += this.eyeAngle < 0 ? 2 : 0;
        this.eyeAngle = constrain(this.eyeAngle, -35, 35);
        
        if (dist(this.x, this.y, 300, 300) < arenaSize / 2 + segSize / 2) {
            this.inside = true;
        }
    };
    
    Enemy.prototype.findFood = function() {
        this.foodNum = 0;
        for (var i = 0; i < food.length; i++) {
            if (
                quickDist(this.x, this.y, food[i].x, food[i].y) < 
                quickDist(this.x, this.y, food[this.foodNum].x, food[this.foodNum].y)) {
                this.foodNum = i;
            }
        }
    };
    
    Enemy.prototype.moveToFood = function() {
        this.pos.x = this.x - sin(this.angle) * 50;
        this.pos.y = this.y - cos(this.angle) * 50;
    
        this.check1 = (this.x - this.pos.x) * (food[this.foodNum].y - this.pos.y);
        this.check2 = (food[this.foodNum].x - this.pos.x) * (this.y - this.pos.y);
        
        if (this.check1 > this.check2) {
            return "left";
        } 
        if (this.check1 < this.check2) {
            return "right";
        }
    };
    
    Enemy.prototype.checkFood = function() {
        if (this.collide(food[this.foodNum])) {
            this.speed += 0.01;
            this.length ++;
            if (food[this.foodNum] instanceof MagicFood) {
                food.splice(this.foodNum, 1);
                return;
            }
            this.moveFood = true;
            food[this.foodNum].move();
            while (this.moveFood) {
                this.moveFood = false;
                for (var j = 0; j < this.segments.length; j++) {
                    if (dist(this.segments[j].x, this.segments[j].y, food[this.foodNum].x, food[this.foodNum].y) < segSize) {
                        food[this.foodNum].move();
                        this.moveFood = true;
                    }
                }
            }
        }
    };
    
    Enemy.prototype.die = function() {
        for (var i = 1; i < player.segments.length; i++) {
            if (dist(this.x, this.y, player.segments[i].x, player.segments[i].y) < segSize) {
                return true;
            }
        }
        return false;
    };
    
    Enemy.prototype.touchEnemy = function() {
        for (var i = 0; i < enemies.length; i++) {
            for (var j = 0; j < enemies[i].segments.length - 1; j++) {
                if (dist(this.x, this.y, enemies[i].segments[j].x, enemies[i].segments[j].y) < segSize && i !== this.num) {
                    return true;
                }
            }
        }
        return false;
    };
    
    Enemy.prototype.isFull = function() {
        for (var i = 0; i < otherPlayers.length; i++) {
            if (!otherPlayers[i].in) {
                return false;
            }
        }
        return true;
    };
// }

/** Food constructor **/
// {
    Food = function(x, y) {
        this.originX = x;
        this.originY = y;
        this.x = this.originX;
        this.y = this.originY;
        this.turnAmount = random(360);
        this.colorAmount = random(255);
        this.fade = 0;
        this.color = null;
    };
    
    Food.prototype.display = function(mult) {
        this.fade += Smooth(this.fade, 20, 10);
        this.x = this.originX + sin(frameCount * mult + this.turnAmount) * 10;
        this.y = this.originY - cos(frameCount * mult + this.turnAmount) * 10;
        
        if (
            this.x + segSize + gameCamera.x < 0 ||
            this.x - segSize + gameCamera.x > width ||
            this.y + segSize + gameCamera.y < 0 ||
            this.y - segSize + gameCamera.y > height
        ) {
            return;
        }
        
        noStroke();
        colorMode(HSB);
        this.color = color((frameCount + this.colorAmount) % 255, 255, 255, this.fade);
        fill(this.color);
        
        for (var i = 0; i < 10; i++) {
            ellipse(this.x + sin(i * 36) * 5, this.y - cos(i * 36) * 5, segSize / 6 * 7, segSize / 6 * 7);
        }
        
        if (!delag && this.fade > 15) {
            imageMode(CENTER);
            image(circleImg, this.x, this.y, segSize, segSize);
        }
        
        colorMode(RGB);
    };
    
    Food.prototype.move = function() {
        this.turnAmount = random(360);
        this.colorAmount = random(255);
        
        this.originX = random(-arenaSize / 2, arenaSize / 2) + width / 2;
        this.originY = random(-arenaSize / 2, arenaSize / 2) + height / 2;
        
        while (dist(this.originX, this.originY, width / 2, height / 2) >= arenaSize / 2 - segSize / 2) {
            this.originX = random(-arenaSize / 2, arenaSize / 2) + width / 2;
            this.originY = random(-arenaSize / 2, arenaSize / 2) + height / 2;
        }
        this.x = this.originX;
        this.y = this.originY;
        this.fade = 0;
    };
// }

/** Magic Food constructor **/
// {
    MagicFood = function(x, y) {
        this.originX = x;
        this.originY = y;
        this.x = this.originX;
        this.y = this.originY;
        this.turnAmount = random(360);
        this.colorAmount = random(255);
        this.fade = 0;
        this.color = null;
        this.timer = 0;
    };
    
    MagicFood.prototype.display = function(mult) {
        this.fade += Smooth(this.fade, 20, 10);
        this.x = this.originX + sin(frameCount * mult + this.turnAmount) * 10;
        this.y = this.originY - cos(frameCount * mult + this.turnAmount) * 10;
        
        if (
            this.x + segSize + gameCamera.x < 0 ||
            this.x - segSize + gameCamera.x > width ||
            this.y + segSize + gameCamera.y < 0 ||
            this.y - segSize + gameCamera.y > height
        ) {
            return;
        }
        
        noStroke();
        
        fill(255, 255, 255, map(this.fade, 0, 20, 0, 150));
        pushMatrix();
        translate(this.x, this.y);
        rotate(frameCount);
        for (var i = 0; i < 4; i++) {
            rotate(90);
            beginShape();
            vertex(0, 0);
            bezierVertex(-segSize / 6, -segSize / 3, -segSize / 4, -segSize / 3 * 2, -segSize / 6, -segSize);
            vertex(segSize / 4, -segSize);
            bezierVertex(segSize / 8, -segSize / 3 * 2, -segSize / 10, -segSize / 3, 0, 0);
            endShape();
        }
        popMatrix();
        
        colorMode(HSB);
        this.color = color((frameCount + this.colorAmount) % 255, 255, 255, this.fade);
        fill(this.color);
        
        for (var i = 0; i < 10; i++) {
            ellipse(this.x + sin(i * 36) * 5, this.y - cos(i * 36) * 5, segSize / 6 * 7, segSize / 6 * 7);
        }
        
        if (!delag && this.fade > 15) {
            imageMode(CENTER);
            image(circleImg, this.x, this.y, segSize, segSize);
        }
        
        colorMode(RGB);
        
        this.timer ++;
    };
    
    MagicFood.prototype.despawn = function() {
        return this.timer > 1200;
    };
// }

/** Fireball constructor **/
// {
    var Fireball = function(x, y, size, angle) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.sizePlus = Math.floor(random(360));
        this.particles = [];
        this.speed = random(player.speed, player.speed + 3);
        this.flares = [];
        this.flareAngle = random(360);
        this.flareSize = random(this.size / 2);
    };
    
    Fireball.prototype.display = function() {
        if (frameCount % 5 === 0 && !delag) {
            this.particles.push(this.particle());
            colorMode(RGB);
        }
        for (var i = this.particles.length - 1; i > -1; i--) {
            (fill)(this.particles[i].color, this.particles[i].fade);
            ellipse(this.particles[i].x, this.particles[i].y, this.particles[i].size, this.particles[i].size);
            this.particles[i].fade -= 2;
            if (this.particles[i].fade < 0) {
                this.particles.splice(i, 1);
            }
        }
        noStroke();
        fill(255, 100, 0, 100);
        ellipse(this.x, this.y, this.size * 1.1, this.size * 1.1);
        fill(255, 50, 0);
        ellipse(this.x, this.y, this.size, this.size);
        pushMatrix();
        translate(this.x, this.y);
        rotate(this.angle + 90);
        scale(1 + sin(frameCount * 10 + this.sizePlus) * 0.2, 1);
        triangle(0, -this.size / 2, this.size, -this.size / 3, 0, -this.size / 6);
        triangle(0, this.size / 3, this.size * 1.2, 0, 0, -this.size / 3);
        triangle(0, this.size / 2, this.size / 1.3, this.size / 3, 0, this.size / 6);
        popMatrix();
        fill(255, 255, 255, 5);
        if (!delag) {
            imageMode(CENTER);
            image(circleImg, this.x, this.y, this.size, this.size);
        }
        if (frameCount % 15 === 0) {
            this.flares.push(this.flare());
            colorMode(RGB);
        }
        for (var i = this.flares.length - 1; i > -1; i--) {
            fill(this.flares[i].color);
            pushMatrix();
            translate(this.x + this.flares[i].x, this.y + this.flares[i].y);
            rotate(this.angle);
            beginShape();
            vertex(-this.flares[i].size / 2, 0);
            vertex(0, this.flares[i].size);
            vertex(this.flares[i].size / 2, 0);
            bezierVertex(this.flares[i].size / 4, -this.flares[i].size / 3 * 2, -this.flares[i].size / 4, -this.flares[i].size / 3 * 2, -this.flares[i].size / 2, 0);
            endShape();
            popMatrix();
            this.flares[i].size += this.flares[i].veloc;
            this.flares[i].veloc -= 0.1;
            if (this.flares[i].size < 0) {
                this.flares.splice(i, 1);
            }
        }
    };
    
    Fireball.prototype.move = function() {
        this.x += sin(this.angle) * this.speed;
        this.y -= cos(this.angle) * this.speed;
    };
    
    Fireball.prototype.pack = function() {
        if (!paused) {
            this.move();
        }
        this.detect();
        this.display();
    };
    
    Fireball.prototype.particle = function() {
        colorMode(HSB);
        return {x : this.x + sin(this.angle + 90) * Math.floor(random(-this.size / 3, this.size / 3)), y : this.y - cos(this.angle + 90) * Math.floor(random(-this.size / 3, this.size / 3)), size: Math.floor(random(7, 15)), color : color(Math.floor(random(35)), 255, 255), fade : 190};
    };
    
    Fireball.prototype.flare = function() {
        colorMode(HSB);
        this.flareAngle = random(360);
        this.flareSize = random(this.size / 2);
        return {x : sin(this.flareAngle) * this.flareSize, y : -cos(this.flareAngle) * this.flareSize, size : 0, veloc : 2, color : color(Math.floor(random(15, 30)), 255, 255)};
    };
    
    Fireball.prototype.out = function() {
        return dist(this.x, this.y, 300, 300) > arenaSize / 2;
    };
    
    Fireball.prototype.detect = function() {
        for (var i = 0; i < enemies.length; i++) {
            if (dist(enemies[i].x, enemies[i].y, this.x, this.y) < segSize / 2 + this.size / 2) {
                removeEnemy(i);
                continue;
            }
            for (var j = 0; j < enemies[i].segments.length; j++) {
                if (dist(enemies[i].segments[j].x, enemies[i].segments[j].y, this.x, this.y) < segSize / 2 + this.size / 2) {
                    this.angle = this.angle + 180;
                }
            }
        }
        if (dist(player.x, player.y, this.x, this.y) < segSize / 2 + this.size / 2) {
            player.touchFire = true;
            return;
        }
        for (var i = 0; i < player.segments.length; i++) {
            if (dist(player.segments[i].x, player.segments[i].y, this.x, this.y) < segSize / 2 + this.size / 2) {
                this.angle = this.angle + 180;
                this.move();
                player.hasDeflected = true;
            }
        }
    };
// } 

/** Coin constructor **/
// {
    Coin = function(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0;
    };
    
    Coin.prototype.display = function() {
        imageMode(CENTER);
        image(coinImg, this.x, this.y, segSize, segSize);
    };
    
    Coin.prototype.move = function() {
        this.x += sin(this.angle) * 2;
        this.y -= cos(this.angle) * 2;
        if (dist(this.x, this.y, 300, 300) > arenaSize / 2) {
            this.x = width - (this.x + segSize);
            this.y = height - (this.y + segSize);
        }
    };
    
    Coin.prototype.detect = function(x, y) {
        if (dist(this.x, this.y, x, y) < 150) {
            this.angle = atan2(this.y - y, this.x - x) + 90;
        } else {
            this.angle ++;
        }
    };
// }

player = new Player(width / 2, height / 2);

/** Skin changer **/
skinChanger = {
    faceNum : player.faceNum,
    left : new Button(
        60,
        263, 
        54,
        54,
        "rect",
        function(self) {
            self.faceNum --;
            if (self.faceNum < 0) {
                self.faceNum = faces.length - 1;
            }
        },
        arrowLeft
    ),
    right : new Button(
        470,
        263, 
        54,
        54,
        "rect",
        function(self) {
            self.faceNum ++;
            if (self.faceNum >= faces.length) {
                self.faceNum = 0;
            }
        },
        arrowRight
    ),
    buy : new Button(
        170,
        210,
        260,
        40,
        "rect",
        function(self) {
            if (player.coins >= skinCosts[self.faceNum][1] && facesUnlocked[skinCosts[self.faceNum][0]] === "0") {
                facesUnlocked[skinCosts[self.faceNum][0]] = "1";
                player.coins -= skinCosts[self.faceNum][1];
                player.faceNum = skinCosts[self.faceNum][0];
            } else if (facesUnlocked[skinCosts[self.faceNum][0]] === "1") {
                player.faceNum = skinCosts[self.faceNum][0];
            }
        },
        function(x, y, self) {
            fill(255, 255, 255);
            textFont(fonts[0], 25);
            textAlign(CENTER, CENTER);
            if (skinCosts[self.faceNum][0] === player.faceNum) {
                text("Selected", x, y);
            } else if (facesUnlocked[skinCosts[self.faceNum][0]] === "1") {
                text("Select", x, y);
            } else {
                text("Buy for " + skinCosts[self.faceNum][1] + " coins", x, y);
            }
        }
    ),
    pack : function() {
        pushMatrix();
        translate(380, 350); 
        faces[skinCosts[this.faceNum][0]](120, 0, 0);
        popMatrix();
        this.left.pack(this);
        this.right.pack(this);
        this.buy.pack(this);
    },
    reset : function() {
        this.faceNum = player.faceNum;
    }
};

/** Game setup and functions **/
// {
    for (var i = 0; i < 20; i++) {
        food.push(new Food(0, 0));
        food[i].move();
    }
    
    removeEnemy = function(enemy) {
        otherPlayers[enemies[enemy].person].in = false;
        for (var i = 0; i < enemies[enemy].segments.length; i++) {
            if (i % (segSize / 2) === 0) {
                flashes.push({x : enemies[enemy].segments[i].x, y : enemies[enemy].segments[i].y, size : segSize});
            }
        }
        enemies.splice(enemy, 1);
    };
    
    removeFireball = function(fireball) {
        flashes.push({x : fireballs[fireball].x, y : fireballs[fireball].y, size : segSize, color : color(255, 50, 0)});
        for (var i = 0; i < fireballs[fireball].particles.length; i++) {
            flashes.push({x : fireballs[fireball].particles[i].x, y : fireballs[fireball].particles[i].y, size : fireballs[fireball].particles[i].size, color : fireballs[fireball].particles[i].color});
        }
        fireballs.splice(fireball, 1);
    };
    
    removeCoin = function(coin) {
        flashes.push({x : coins[coin].x, y : coins[coin].y, size : segSize});
        player.coins ++;
        player.totalCoins ++;
        coins.splice(coin, 1);
    };
    
    var screenShot = {
        x : 300,
        y : 500,
        r : 0,
        size : 0,
        pic : undefined,
        display : function() {
            pushMatrix();
            translate(this.x, this.y);
            rotate(this.r);
            scale(this.size, this.size);
            image(this.pic, 0, 0);
            popMatrix();
            this.r += Smooth(this.r, 390, 10);
            this.size += Smooth(this.size, 1, 10);
        },
        take : function() {
            this.r = 0;
            this.size = 0;
            this.pic = get(player.x + gameCamera.x - 50, player.y + gameCamera.y - 50, 100, 100); 
        }
    };
// }

/** Image loading **/
// {
    var dots = [];
    
    for (var i = 0; i < 5; i++) {
        dots.push({r : i * 60});
    }
    
    var loadStr = "";
    var loadPercent = 0;
    
    var shine = function(x, w) {
        fill(255, 255, 255, 40 + sin(x * 2 + frameCount * 3) * 20);
        quad(x, 0, x + w, 0, x - 50 + w, 600, x - 50, 600);
    };
    
    var load = function() {
        if (!loaded) {
            imagesToLoad[curImg].display();
        
            
            if (imagesToLoad[curImg].done()) {
                loadedImages.push(imagesToLoad[curImg].canvas.get());
                imagesToLoad[curImg].finish();
                curImg ++;
            }
        }
        
        background(50, 50, 50);
        
        shine(30, 100);
        shine(250, 30);
        shine(300, 60);
        shine(500, 50);
        
        if (!loaded) {
            for (var i = 0; i < dots.length; i++) {
                noStroke();
                fill(dots[i].r / 9 * 5 + 20);
                pushMatrix();
                translate(width / 2, height / 2);
                rotate(dots[i].r);
                ellipse(-50, 0, 30, 30);
                popMatrix();
                dots[i].r += Smooth(dots[i].r, 360, 20);
                if (dots[i].r > 359) {
                    dots[i].r = 0;
                }
            }
            
            fill(230, 230, 230);
            textAlign(CENTER, CENTER);
            textFont(fonts[1], 80);
            text("Loading" + loadStr, 300, 100);
            if (frameCount % 20 === 0) {
                loadStr += ".";
                loadStr = loadStr.length > "...".length ? "" : loadStr;
            }
            loadPercent = 0;
            
            for (var i in imagesToLoad) {
                loadPercent += imagesToLoad[i].percent;
            }
            loadPercent = Math.floor(loadPercent / imagesToLoad.length);
            
            rect(300 - map(loadPercent, 0, 100, 0, 280), 500, map(loadPercent, 0, 100, 0, 560), 50);
            fill(0, 0, 0);
            textSize(40);
            text(loadPercent + "%", 300, 525);
            
            if (curImg >= imagesToLoad.length) {
                loaded = true;
                circleImg = loadedImages[0];
                fillImg = loadedImages[1];
                hexImg = loadedImages[2];
                bgImg = loadedImages[3];
                tileImg1 = loadedImages[4];
                tileImg2 = loadedImages[5];
                tileImg3 = loadedImages[6];
                tileImg4 = loadedImages[7];
                shadeImg = loadedImages[8];
                maskImg1 = loadedImages[9];
                maskImg2 = loadedImages[10];
                maskImg3 = loadedImages[11];
                maskImg4 = loadedImages[12];
                coinImg = loadedImages[13];
                
                tileImg1.mask(maskImg1);
                tileImg2.mask(maskImg2);
                tileImg3.mask(maskImg3);
                tileImg4.mask(maskImg4);
                
                logo.load();
            }
        } else {
            fill(230, 230, 230);
            textAlign(CENTER, CENTER);
            textFont(fonts[1], 80);
            text("Loaded", 300, 100);
            continueB2.pack();
        }
    };
// }

var enterName = function() {
    textFont(fonts[0], 30);
    textAlign(LEFT, CENTER);
    background(50, 50, 50);
    shine(30, 100);
    shine(250, 30);
    shine(300, 60);
    shine(500, 50);
    noStroke();
    fill(140, 140, 140);
    rect(150, 280, 300, 40);
    fill(0, 0, 0);
    text(name + ((frameCount % 60 > 30 && name.length < 16) ? "|" : ""), 155, 300);
    if (name.length < 1) {
        fill(0, 0, 0, 150);
        text("Player", 170, 300);
    }
    header("Enter your name", 300, 40, 40, 32);
    continueB.pack();
};

var colorDisplay = function(y, color1, color2, amount) {
    noStroke();
    fill(lerpColor(color1, color2, amount));
    ellipse(380, y, 120, 120);
    if (!delag) {
        imageMode(CENTER);
        image(circleImg, 380, y, 120, 120);
    }
};

var menuX = -100;
var menuFood = function(x) {
    noStroke();
    colorMode(HSB);
    fill(frameCount % 255, 255, 255, 20);
    
    for (var i = 0; i < 10; i++) {
        ellipse(x + sin(i * 36) * 20, 200 - cos(i * 36) * 20, 150, 150);
    }
    
    if (!delag) {
        imageMode(CENTER);
        image(circleImg, x, 200, 150, 150);
    }
    
    colorMode(RGB);
};

var menuSnake = function(x) {
    pushMatrix();
    translate(x, -50);
    noStroke();
    for (var i = 10; i > 0; i--) {
        if (i === 1) {
            fill(colors[1]);
        } else {
            fill(Math.floor((i - 2) / 4) % 2 === 0 ? colors[2] : colors[0]);
        }
        ellipse(-sin(i * 25 - 10) * 60, 200 + i * (75 - i * 3), 150 - i * 10, 150 - i * 10);
        fill(0, 0, 0, sin(((-i + 6) * 30 + 180) + 1) * 40);
        ellipse(-sin(i * 25 - 10) * 60, 200 + i * (75 - i * 3), 150 - i * 10, 150 - i * 10);
        if (!delag) {
            imageMode(CENTER);
            image(circleImg, -sin(i * 25 - 10) * 60, 200 + i * (75 - i * 3), 150 - i * 10, 150 - i * 10);
        }
    }
    
    fill(255, 255, 255);
    ellipse(20, 255, 50, 50);
    ellipse(-40, 255, 50, 50);
    fill(0, 0, 0);
    ellipse(27, 252, 30, 30);
    ellipse(-33, 252, 30, 30);
    popMatrix();
};

var showDate = function() {
    textAlign(LEFT, BOTTOM);
    textFont(fonts[0], 10);
    text("©" + releaseDate + (year() > releaseDate ? ("-" + year()) : "") + " Green Ghost", 10, 590);
};

var instructionsY = 0;

/** Full game **/
var game = function() {
    background(50, 50, 50);
    pushMatrix();
    gameCamera.move(player.x, player.y);
    gameCamera.translate();
    displayArena();
    
    for (var i = 0; i < food.length; i++) {
        food[i].display(1);
        if (food[i] instanceof MagicFood && food[i].despawn()) {
            food.splice(i, 1);
        }
    }
    if (!paused) {
        player.move();
    }
    player.display();
    
    for (var i = enemies.length - 1; i > -1; i--) {
        if (!paused) {
            enemies[i].move();
        }
        enemies[i].display();
        if (enemies[i].touchEnemy() || enemies[i].touchWall()) {
            removeEnemy(i);
            continue;
        }
        if (enemies[i].die()) {
            player.hasTrapped = true;
            food.push(new MagicFood(enemies[i].x, enemies[i].y));
            removeEnemy(i);
        }
    }
    
    for (var i = fireballs.length - 1; i > -1; i--) {
        fireballs[i].pack();
        if (fireballs[i].out()) {
            removeFireball(i);
        }
    }
    
    for (var i = coins.length - 1; i > -1; i--) {
        coins[i].detect(player.x, player.y);
        if (!paused) {
            coins[i].move();
        }
        coins[i].display();
        if (player.collide(coins[i])) {
            player.curCoins ++;
            removeCoin(i);
        }
    } 
    
    for (var i =  flashes.length - 1; i > -1; i--) {
        (fill)(flashes[i].color || color(255, 255, 255), map(flashes[i].size, segSize, segSize * 2, 100, 0));
        ellipse(flashes[i].x, flashes[i].y, flashes[i].size, flashes[i].size);
        if (!paused) {
            flashes[i].size += 2;
        }
        if (flashes[i].size > segSize * 2) {
            flashes.splice(i, 1);
        }
    }
    popMatrix();
    
    if (player.score > player.highScore) {
        newHigh = true;
    }
    player.highScore = Math.max(player.highScore, player.score);
    
    if (player.touchWall() || player.touchSelf() || player.touchEnemy() || player.touchFire) {
        enemies = [];
        fireballs = [];
        coins = [];
        fireStart = 720;
        screenShot.take();
        flash.reset("gameOver");
    }
    
    player.showScore();
    
    if (frameCount % 600 === 0 && !paused) {
        objR = Math.floor(random(360));
        enemies.push(
            new Enemy(
                300 + sin(objR) * (arenaSize / 2 - segSize),
                300 + cos(objR) * (arenaSize / 2 - segSize), 
                -atan2(
                    sin(objR) * (arenaSize / 2 - segSize),
                    cos(objR) * (arenaSize / 2 - segSize)
                ),
                enemies.length
            )
        );
    }
    
    if (frameCount % 1000 === 0 && !paused) {
        objR = Math.floor(random(360));
        coins.push(
            new Coin(
                300 + sin(objR) * random(arenaSize / 2 - segSize * 2),
                300 - cos(objR) * random(arenaSize / 2 - segSize * 2)
            )
        );
        while (player.collide(coins[coins.length - 1])) {
            objR = Math.floor(random(360));
            coins[coins.length - 1].x = 300 + sin(objR) * random(arenaSize / 2 - segSize * 2);
            coins[coins.length - 1].y = 300 - cos(objR) * random(arenaSize / 2 - segSize * 2);
        }
    }
    
    fireStart --;
    if (fireStart < 0 && frameCount % fireInterval === 0 && !paused) {
        objR = Math.floor(random(360));
        fireSize = random(40, 60);
        fireballs.push(
            new Fireball(
                300 + sin(objR) * (arenaSize / 2 - fireSize / 2),
                300 - cos(objR) * (arenaSize / 2 - fireSize / 2), 
                fireSize,
                -atan2(
                    sin(objR) * (arenaSize / 2 - fireSize / 2),
                    -cos(objR) * (arenaSize / 2 - fireSize / 2) 
                ) + Math.floor(random(-40, 40))
            )
        );
    }
    
    if (paused) {
        pauseFade += Smooth(pauseFade, 255, 10);
    } else {
        pauseFade += Smooth(pauseFade, 0, 10);
    }
    noStroke();
    fill(0, 0, 0, map(pauseFade, 0, 255, 0, 100));
    rect(0, 0, width, height);
    textFont(fonts[0], 40);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, pauseFade);
    text("Move your mouse over\nthe screen to unpause.", 300, 300);
};

/** Menu scenes **/
// {
    var menu = function() {
        background(255, 255, 255);
        image(bgImg, 300, 300);
        menuSnake(menuX);
        menuX += Smooth(menuX, 150, 20);
        menuFood(600 - menuX);
        image(shadeImg, 300, 550);
        playB.pack();
        settingsB.pack();
        achievementsB.pack();
        skinsB.pack();
        helpB.pack();
        saveB.pack();
        showDate();
        textFont(fonts[0], 30);
        textAlign(LEFT, TOP);
        text("High score: " + player.highScore, 10, -1);
        textAlign(RIGHT, TOP);
        text("Last score: " + player.score, 590, -1);
        header("Snake 2", 300, 40, 80, 64, headerFade);
        if (flash.fade < 10) {
            headerFade += Smooth(headerFade, 5100, 30);
        }
    };
    
    var achievementsPage = function() {
        background(255, 255, 255);
        image(bgImg, 300, 300);
        for (var i in achievements) {
            achievements[i].display();
        }
        for (var i in achievements) {
            if (dist(mouseX, mouseY, achievements[i].x, achievements[i].y) < achievements[i].size / 2) {
                showAchievement(achievements[i].name, achievements[i].desc);
            }
        }
        backB.pack();
        header("Achievements", 300, 40, 60, 48);
    };
    
    var skinsPage = function() {
        background(255, 255, 255);
        image(bgImg, 300, 300);
        for (var i = skinsColors.length - 1; i > -1; i--) {
            colorDisplay(350 + i * 60, colors[skinsColors[i]], colors[skinsColors[i] + skinsNext[i]], skinsPlus[i]);
            skinsButtons[i].left.pack(i);
            skinsButtons[i].right.pack(i);
            if (skinsColors[i] !== skinsColors[i] + skinsNext[i]) {
                if (skinsColors[i] + skinsNext[i] < 0) {
                    skinsNext[i] = colors.length - 1;
                }
                if (skinsColors[i] + skinsNext[i] >= colors.length) {
                    skinsNext[i] = -colors.length + 1;
                }
                skinsPlus[i] += 0.1;
                if (skinsPlus[i] > 1) {
                    skinsColors[i] = skinsColors[i] + skinsNext[i];
                    skinsPlus[i] = 0;
                    skinsNext[i] = 0;
                }
            }
            fill(255, 255, 255);
            textFont(fonts[0], 28);
            textAlign(CENTER, CENTER);
            text("Color " + (skinsColors[i] + skinsNext[i] + 1) + "/" + colors.length, 220, 335 + i * 60);
            selectButtons[i].pack(i);
        }
        skinChanger.pack();
        backB.pack();
        header("Skins", 300, 40, 80, 64);
        textFont(fonts[0], 30);
        textAlign(LEFT, TOP);
        fill(255, 255, 255);
        text("Coins: " + player.coins, 10, -1);
    };
    
    var settings = function() {
        background(255, 255, 255);
        image(bgImg, 300, 300);
        header("Settings", 300, 40, 80, 64);
        controlsB.pack();
        graphicsB.pack();
        backB.pack();
    };
    
    var instructions = function() {
        textAlign(CENTER, TOP);
        textFont(fonts[0], 25);
        background(255, 255, 255);
        image(bgImg, 300, 300);
        fill(255, 255, 255);
        text("Click and drag or use the\nscroller on your mouse to scroll.", 300, 120 + instructionsY);
        textSize(28);
        text("You are a snake. Use\nthe arrow keys/mouse (You can\nchange the controls in the\nsettings) to control the snake\nand eat food.\n\nDon't run into yourself,\nthe border of the arena,\nother snakes, or fireballs.\n\nYou can, however,\ndeflect fireballs with\nyour body. And if\nanother snake runs into\nyou, it turns into a\nmagic piece of food\nworth ten points\nand two segments.\n\nEat and collect\ncoins to buy new skins!\nUnlock new colors as\nyou get longer!\nYou can also unlock\nachievements in various\nways (see achievements).", 300, 200 + instructionsY);
        backB.pack();
        if (instructionsY + 105 > 0) {
            header("Instructions", 300, 40 + instructionsY, 60, 48);
        }
    };
      
    var gameOver = function() {
        image(bgImg, 300, 300);
        header("Game Over", 300, 40, 60, 48);
        noStroke();
        fill(0, 0, 0, 50);
        rect(100, 250, 400, 200);
        textFont(fonts[0], 40);
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        text("Score: " + player.score, 300, 290);
        text("High Score: " + player.highScore, 300, 350);
        text("Coins: " + player.coins, 300, 410);
        screenShot.display();
        if (newHigh) {
            textSize(40);
            fill(0, 0, 0, 20);
            for (var i = 0; i < 20; i++) {
                text("New high score!", 300 + sin(i * 18) * 10, 200);
            }
            fill(255, 255, 255);
            text("New high score!", 300, 200);
        }
        backB.pack();
        retryB.pack();
    };
// }

/** Draw function **/
draw = function() {
    imageMode(CENTER);
    cursor(overButton ? "pointer" : "default");
    overButton = false;
    if (!loaded || !toGame) {
        load();
    } else {
        switch (scene) {
            case "logo":
                logo.display();
                break;
            case "menu":
                menu();
                break;
            case "name":
                enterName();
                break;
            case "game":
                game();
                break;
            case "achievements":
                achievementsPage();
                break;
            case "skins":
                skinsPage();
                break;
            case "settings":
                settings();
                break;
            case "help":
                instructions();
                break;
            case "gameOver":
                gameOver();
                break;
        }
        
        if (scene !== "logo") {
            for (var i in achievementGoals) {
                if (achievementGoals[i]() && achievementsUnlocked[i] === "0") {
                    achievementsUnlocked[i] = "1";
                    achievements[i].achieved = true;
                    notifications.push(new Notification("Achievement unlocked:\n" + achievementNames[i] + "!", notifications.length));
                }
            }
            for (var i in colorUnlocks) {
                if (player.highScore >= colorUnlocks[i] && colorsUnlocked[i] === "0") {
                    colorsUnlocked[i] = "1";
                    notifications.push(new Notification("Color unlocked:\n" + colorNames[i] + "!", notifications.length));
                }
            }
        }
        
        pushMatrix();
        for (var i in notifications) {
            if (i < 3) {
                translate(0, notifications[i].y);
                notifications[i].display((i > (Math.min(notifications.length, 3) - 2)) ? 20 : 0);
            }
        }
        popMatrix();
        for (var i in notifications) {
            if (notifications[i].up && notifications[i].y - 2 < 0) {
                notifications.splice(i, 1);
            }
        }
        flash.display();
    }
    click = false;
};

/** Click function **/
mouseClicked = function() {
    click = true;
};

/** Scroll function **/
mouseScrolled = function() {
    // jshint noarg : false
    try {
        if (scene === "help") {
            mouseScrolled.caller.arguments[0].preventDefault();
            instructionsY += mouseScroll * 10;
            instructionsY = constrain(instructionsY, -500, 0);
        }
    } catch (e) {}
};

/** Drag function **/
mouseDragged = function() {
    if (scene === "help") {
        instructionsY -= pmouseY - mouseY;
        instructionsY = constrain(instructionsY, -500, 0);
    }
};

/** Checks if the mouse is out of the canvas **/
mouseOut = function() {
    paused = true;
};

/** Checks if the mouse is over of the canvas **/
mouseOver = function() {
    paused = false;
};

/** Key function **/
keyPressed = function() {
    keys[keyCode] = true;
};

/** Key released function **/
keyReleased = function() {
    keys[keyCode] = false;
};

/** Key typed function **/
keyTyped = function() {
    if (scene === "name") {
        if (key.code === 8) {
            name = name.slice(0, -1);
        } else if (key.code === 10) {
            player.name = name;
            flash.reset("menu");
        } else {
            name += String(key);
        }
        name = name.length > 16 ? name.slice(0, -1) : name;
    }
};

if (hacked) {
    throw {
        message: "Error: Hacking is not allowed!"
    };
}

println("Liked this game? Please consider checking out this one! \nkhanacademy.org/cs/i/6449281631830016");
