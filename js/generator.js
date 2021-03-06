var adjectives = [];
var things = [];
var adjectivesGet = new XMLHttpRequest();
adjectivesGet.open('GET', 'adjectives.txt');
adjectivesGet.onreadystatechange = function() {
	if (adjectivesGet.readyState == 4 && adjectivesGet.status == 200) {
		adjectives = adjectivesGet.responseText.trim().split("\n");
	}
}
adjectivesGet.send();

var thingsGet = new XMLHttpRequest();
thingsGet.open('GET', 'things.txt');
thingsGet.onreadystatechange = function() {
	if (thingsGet.readyState == 4 && thingsGet.status == 200) {
		things = thingsGet.responseText.trim().split("\n");
	}
}
thingsGet.send();

function getRandomWord(wordBucket) {
	return wordBucket.shuffle().pop().toCamelCase();
}

function generateName(adjectives, things) {

	var name = "";
	var styleIndex = Math.floor(10 * Math.random() + 1);
	switch(styleIndex) {
		case 10:
			name = getRandomWord(things) + " of the " + getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
		case 9:
			name = getRandomWord(adjectives) + " " + getRandomWord(things) + " of the " + getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
		case 8:
			name = getRandomWord(adjectives) + " " + getRandomWord(things) + " of the " + getRandomWord(things);
			break;
		case 7:
			name = getRandomWord(things) + " " + getRandomWord(things) + " " + getRandomWord(things);
			break;
		case 6:
			name = getRandomWord(adjectives) + " " + getRandomWord(things) + " of " + getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
		case 5:
			name = getRandomWord(things) + " of " + getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
		case 4:
			name = getRandomWord(adjectives) + " " + getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
		case 3:
		case 2:
		case 1:
		default:
			name = getRandomWord(adjectives) + " " + getRandomWord(things);
			break;
	}

	var modifierIndex = Math.floor(3 * Math.random() + 1);
	switch(modifierIndex) {
		case 3:
			name += " Pub";
			break;
		case 2:
			name += " Tavern";
			break;
		case 1:
		default:
			name = "The " + name;
			break;
	}
	return name;
}

function recoverSign(event) {
	document.getElementById("suggest").innerHTML = this.innerHTML;
}

document.getElementById("generate").addEventListener('click', function() {
	var name = generateName(adjectives, things);
	document.getElementById("suggest").innerHTML = name;
	var historyItem = document.createElement("li");
	historyItem.addEventListener('click', recoverSign);
	historyItem.innerHTML = name;
	var historyList = document.getElementById("history");
	historyList.insertBefore(historyItem, historyList.firstChild);
	var historyElements = document.getElementById("history").getElementsByTagName("li");
});

var historyElements = document.getElementById("history").getElementsByTagName("li");
for(var element = historyElements[0], i = 0; i < historyElements.length; element = historyElements[i++]) {
		element.addEventListener('click', recoverSign);
}


String.prototype.toCamelCase = function() {
	var words = this.split(" ");
	for(var i = 0; i < words.length; i++)
	{
		words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length);
	}
	
	return words.join(" ");
}

Array.prototype.shuffle = function() {
	var array = this;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}