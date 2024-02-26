// Dropdowns
let astrologyDropdown;
let moonDropdown;

//Fortunes (12 of them)
let fortunes = ['All your hard work will soon pay off', 'Your talents will be recognized and suitably rewarded', 'You will have a bad day... soon', 'In order to take, one must first give', 'It is worth reviewing some old lessons', 'Now is the time to try something new', 'Practice makes perfect', 'An acquaintance of the past will affect you in the near future', 'Be careful who you trust... salt and sugar look the same', 'One bad chapter does not mean your story is over', 'Love will soon find you', 'Follow what calls you'];

// Start fortune text as empty until dropdowns selected
let fortuneText = ' ';

// Options to pick a fortune based on moon phase
let fortuneSelect1;
let fortuneSelect2;
let fortuneSelect3;
let fortuneSelect4;

// Making button to activate the fortune dropdowns and reveal your fortune
let activateButton;

// Fish images (to generate a random fish for each fortune)
let fish1;
let fish2;
let fish3;
let fish4;
let fish5;
let fish6;

// Array to put all the fish images in, so as to pick a random one
let fishies = [];

// Original fish image
let fishImage;

// Button sound effect
let fortuneSound;

function preload() {
    // Load button sound
    // (From creator nomiqbomi on freesound.org)
    fortuneSound = loadSound('Sparklesound.mp3');

    // Load all the fish images
    fish1 = loadImage('fishies/Untitled_Artwork-1.png');
    fish2 = loadImage('fishies/Untitled_Artwork-2.png');
    fish3 = loadImage('fishies/Untitled_Artwork-3.png');
    fish4 = loadImage('fishies/Untitled_Artwork-4.png');
    fish5 = loadImage('fishies/Untitled_Artwork-5.png');
    fish6 = loadImage('fishies/Untitled_Artwork-6.png');

    // Array of all fish images, except the original (fish1)
    fishies = [fish2, fish3, fish4, fish5, fish6];

    // Set the original fish image as fish1
    fishImage = fish1;
}

function setup() {
    // Fit canvas to fill whole window
    createCanvas(windowWidth, windowHeight);

    // Make dropdown to pick astrology sign
    astrologyDropdown = createSelect();
    // Style the dropdown menu
    astrologyDropdown.position(windowWidth / 2 - 250, 480);
    astrologyDropdown.style('background-color', 'linen');
    astrologyDropdown.style('border', '3px solid #f21707');
    astrologyDropdown.style('font-family', 'cooper-black-std');
    astrologyDropdown.style('font-size', '17px');
    astrologyDropdown.style('color', '#f21707');
    astrologyDropdown.style('border-radius', '5px');
    astrologyDropdown.style('width', '185px');
    astrologyDropdown.style('padding', '5px');
    // Populate with options for astrology signs
    astrologyDropdown.option('Your zodiac sign');
    astrologyDropdown.option('Aries');
    astrologyDropdown.option('Taurus');
    astrologyDropdown.option('Gemini');
    astrologyDropdown.option('Cancer');
    astrologyDropdown.option('Leo');
    astrologyDropdown.option('Virgo');
    astrologyDropdown.option('Libra');
    astrologyDropdown.option('Scorpio');
    astrologyDropdown.option('Sagittarius');
    astrologyDropdown.option('Capricorn');
    astrologyDropdown.option('Aquarius');
    astrologyDropdown.option('Pisces');
    // The astrology sign you select will choose how the fortunes are sorted
    // astrologyDropdown.changed(sortFortunes);

    // Make dropdown to pick moon phase
    moonDropdown = createSelect();
    // Style the dropdown menu
    moonDropdown.position(windowWidth / 2, 480);
    moonDropdown.style('background-color', 'linen');
    moonDropdown.style('border', '3px solid #f21707');
    moonDropdown.style('font-family', 'cooper-black-std');
    moonDropdown.style('font-size', '17px');
    moonDropdown.style('color', '#f21707');
    moonDropdown.style('border-radius', '5px');
    moonDropdown.style('width', '225px');
    moonDropdown.style('padding', '5px');
    // Populate with options for moon phases
    moonDropdown.option('Current lunar phase');
    moonDropdown.option('New moon');
    moonDropdown.option('First quarter');
    moonDropdown.option('Full moon');
    moonDropdown.option('Last quarter');


    //Make the activate fortune button
    activateButton = createButton("Reveal your fortune!");
    // Click to call the function which will show the fortune!
    activateButton.mouseClicked(activateFortune);
    // Style the button
    activateButton.position(windowWidth / 2 - 140, 550);
    activateButton.style('background-color', '#f21707');
    activateButton.style('font-family', 'cooper-black-std');
    activateButton.style('font-size', '17px');
    activateButton.style('color', 'linen');
    activateButton.style('border-radius', '5px');
    activateButton.style('border', '3px solid #f21707');
    activateButton.style('padding', '6px');
    activateButton.style('width', '225px');
}

function draw() {
    background('linen');

    // Haven't used p5 text much before, so referred to this page in the p5 reference:
    // https://p5js.org/reference/#/p5/text
    // (This bit is just the title)
    textFont('cooper-black-std');
    textAlign(CENTER);
    textSize(28);
    text('FORTUNE TELLER MIRACLE FISH', windowWidth / 2 - 10, 150);
    fill('#f21707');
    // Addition and equal signs, aesthetic add-on
    text('+', windowWidth / 2 - 33, 505);

    // Text of fortune, fortuneText will change based on dropdown choices
    textSize(20);
    text(fortuneText, windowWidth / 2, 420);

    // Add the fish image
    image(fishImage, windowWidth / 2 - 200, 130, 400, 300);

}

// Got the idea to format the dropdown selection to call a function of if statements from this p5 sketch:
// https://editor.p5js.org/aferriss/sketches/SJtxrLp3M
function sortFortunes() {
    let astrologySign = astrologyDropdown.value();

    // Depending on selected astrology sign, change sort
    if (astrologySign == 'Aries' || astrologySign == 'Pisces' || astrologySign == 'Scorpio') {
        // Regular old alphabetical sort
        fortunes.sort();

    } else if (astrologySign == 'Taurus' || astrologySign == 'Aquarius' || astrologySign == 'Libra') {
        // Reverse alphabetical sort
        fortunes.reverse();

    } else if (astrologySign == 'Gemini' || astrologySign == 'Capricorn' || astrologySign == 'Virgo') {
        //Using my approach from Lab 1, selecting this astrology sign will sort the fortunes shortest to longest
        fortunes.sort(function (a, b) {
            return a.length - b.length;
        });
        
    } else if(astrologySign == 'Cancer' || astrologySign == 'Sagittarius' || astrologySign == 'Leo'){
        //Using my approach from Lab 1 again, selecting this astrology sign will sort the fortunes longest to shortest
        //So same as the other if statement for the other signs, just reverse order
        fortunes.sort(function (a, b) {
            return b.length - a.length;
        });
    }
    // For debugging, log what sort version is active
    console.log(fortunes);
}

function activateFortune() {
    // Play sound effect (thanks, p5.sound.js!)
    fortuneSound.play();

    // The astrology sign you select will choose how the fortunes are sorted
    sortFortunes();

    // Randomize options to pick a fortune from the fortunes array, based on moon phase
    // Using p5 random function from reference:
    // https://p5js.org/reference/#/p5/random
    // And this p5 sketch, for getting random array elements:
    // https://editor.p5js.org/mbardin/sketches/wVe_dpmLO
    fortuneSelect1 = floor(random(0, 2));
    fortuneSelect2 = floor(random(3, 5));
    fortuneSelect3 = floor(random(6, 8));
    fortuneSelect4 = floor(random(9, 11));

    // The moon phase you select will choose what array element is picked
    let moonPhase = moonDropdown.value();

    // If the moon phase selected is __, then assign the fortune text to a certain randomized section of the fortunes array
    if (moonPhase == 'New moon') {
        fortuneText = fortunes[fortuneSelect1];
    }
    if (moonPhase == 'First quarter') {
        fortuneText = fortunes[fortuneSelect2];
    }
    if (moonPhase == 'Full moon') {
        fortuneText = fortunes[fortuneSelect3];
    }
    if (moonPhase == 'Last quarter') {
        fortuneText = fortunes[fortuneSelect4];
    }
    //If you don't select a moon phase, no fortune for you!
    if (moonPhase == 'Current lunar phase') {
        fortuneText = ' ';
    }

    // Random image from the fishies array
    let randomFish = random(fishies)

    // Change the fish image to a random one that isn't the original fish
    fishImage = randomFish;
}