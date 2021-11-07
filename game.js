var game={
	init:function(){
		game.canvas=document.getElementById("gamecanvas");
		game.context=game.canvas.getContext("2d");

		game.hideScreens();
		game.showScreen("gamestartscreen");
	},

	hideScreens:function(){
		var screens=document.getElementsByClassName("gamelayer");
		for(let i = screens.length - 1; i >= 0; i--){
			var screen=screens[i];

			screen.style.display="none";
		}
	},

	hideScreen:function(id){
		var screen=document.getElementById(id);
		screen.style.display="none";
	},

	showScreen:function(id){
		var screen=document.getElementById(id);
		screen.style.display="block";
	},

	showLevelScreen:function(){
		game.hideScreens();
		game.showScreen("levelselectscreen");
	}
};

window.addEventListener("load", function(){
	game.init();
	levels.init();
	loader.init();
});

var levels={


	data:[{
		//First Level
		foreground: "desert-foreground",
		background: "clouds-background",
		entities:[]
	},{
		//second level
		foreground: "desert-foreground",
		background: "clouds-background",
		entities: []
	}],

	init:function(){
		var levelSelectScreen=document.getElementById("levelselectscreen");

		var buttonClickHandler=function(){
			game.hideScreen("levelselectscreen");

			levels.load(this.value-1)
		};

		for (let i = 0; i < levels.data.length; i++) {
			var button=document.createElement("input");

			button.type = "button";
			button.value = (i + 1); 
			button.addEventListener("click", buttonClickHandler);

			levelSelectScreen.appendChild(button);
	}
},

load:function(number){
}

};

var loader={
	loaded: true,
	loadedCount:0,
	totalCount:0,


	init:function(){
		var mp3Support, oggSupport;

		var audio=document.createElement("audio");

		if (audio.canPlayType) {
			mp3Support = "" !== audio.canPlayType("audio/mpeg");
			oggSupport = "" !== audio.canPlayType("audio/ogg; codecs=\"vorbis\"");
		}else{
			mp3Support = false;
			oggSupport = false;
		}
		loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
	},

	loadImage: function(url) {
	this.loaded = false;
	this.totalCount++;
	game.showScreen("loadingscreen");
	var image = new Image();
	image.addEventListener("load", loader.itemLoaded, false);
	image.src = url;
	return image;
	},

	soundFileExtn: ".ogg",
	loadSound: function(url) {
	this.loaded = false;
	this.totalCount++;
	game.showScreen("loadingscreen");
	var audio = new Audio();
	audio.addEventListener("canplaythrough", loader.itemLoaded, false);
	audio.src = url + loader.soundFileExtn;
	return audio;
	},
	itemLoaded: function(ev) {
	/* Stop listening for event type (load or canplaythrough) for this item
	now that it has been loaded*/
	ev.target.removeEventListener(ev.type, loader.itemLoaded, false);
	loader.loadedCount++;
	document.getElementById("loadingmessage").innerHTML = "Loaded " + loader.loadedCount
	+ " of " + loader.totalCount;
	if (loader.loadedCount === loader.totalCount) {
	// Loader has loaded completely..
	// Reset and clear the loader
	loader.loaded = true;
	loader.loadedCount = 0;
	loader.totalCount = 0;
	// Hide the loading screen
	game.hideScreen("loadingscreen");



	// and call the loader.onload method if it exists
	if (loader.onload) {
	loader.onload();
	loader.onload = undefined;
}
}
}
};

