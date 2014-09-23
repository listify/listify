define(function(require, exports, module) {
	var View            = require('famous/core/View');
	var Surface         = require('famous/core/Surface');
	var Transform       = require('famous/core/Transform');
	var StateModifier   = require('famous/modifiers/StateModifier');
	var HeaderFooter    = require('famous/views/HeaderFooterLayout');
	var ImageSurface    = require('famous/surfaces/ImageSurface');
	var InputSurface 		= require('famous/surfaces/InputSurface');
	var EventHandler    = require('famous/core/EventHandler');
	var ContentView  	  = require('views/ContentView')
	var GridView  		  = require('views/GridView')
	var Modifier   		  = require("famous/core/Modifier");
	var TouchSync   		= require("famous/inputs/TouchSync");
	var Transitionable  = require("famous/transitions/Transitionable");
	var Easing   				= require('famous/transitions/Easing');
	var GridLayout 			= require("famous/views/GridLayout");
	var Modifier 		    = require("famous/core/Modifier");
	var TouchSync   		= require("famous/inputs/TouchSync");
	var Transitionable 	= require("famous/transitions/Transitionable");
	var Easing 					= require('famous/transitions/Easing');

	eventHandler = new EventHandler();
	// defines grid view on the same scope as PageView to allow accessibility
	var gridView = [];

	function PageView() {
		View.apply(this, arguments);

		_createLayout.call(this);
		_createHeader.call(this);
		_createGrid.call(this);

		// console.log('this1: ', this)
		_createEventsRouter.call(this);
	}

	PageView.prototype = Object.create(View.prototype);
	PageView.prototype.constructor = PageView;

	PageView.DEFAULT_OPTIONS = {
		headerSize: 44
	};

	function _createLayout() {
		this.layout = new HeaderFooter({
			headerSize: this.options.headerSize
		});

		var layoutModifier = new StateModifier({
			transform: Transform.translate(0, 0, 0.1)
		});
		this.add(layoutModifier).add(this.layout);
	}

	function _createHeader() {
		var backgroundSurface = new Surface({
			content: "L I S T I F Y",
			properties: {
				backgroundColor: "#9797A3",
				textAlign: "center",
			}
		});

		this.layout.header.add(backgroundSurface);
	}

	function _createGrid() {

		// defines Grid Layout
		var grid = new GridLayout({
			dimensions: [3, 2]
		});

		// creates an array of all the surfaces of the grid
		grid.sequenceFrom(gridView);

		imgObject = {
			1: './assets/pic1.jpg',
			2: './assets/pic2.jpg',
			3: './assets/pic3.jpg',
			4: './assets/pic4.jpg',
			5: './assets/pic5.jpg',
			6: './assets/pic6.jpg'
		};

		// protects and privatizes gridbox
		var gridBox;

		for(var i = 1; i < 8; i++) {
			gridBox = new ImageSurface({
	  		// content: imgObject[1+i],
	  		content: imgObject[i],
	  		size: [undefined, undefined],
	  		properties: {
	  			lineHeight: '200px',
	  			textAlign: 'center',
	  			class: i
	  		}
	  	});
	  	gridView.push(gridBox);
	  }

	  function _setEmiters() {
		  for(var i = 0; i < gridView.length; i++) {
		  	var holder = gridView[i];
		  	// console.log(gridView[i]);
		  	function _listening() {
		  		this.on('click', function() {
		  			eventHandler.emit('flipImage');
		  			console.log(this.properties.class);
		  			// _animateContentIn.call(this);
		  		}.bind(this))
		  	};
		  	_listening.call(holder);
		  }
	  }
	  _setEmiters.call(this);

		this.layout.content.add(grid);
	}

	// creates a router to allow binding of emitted events to PageView
	function _createEventsRouter () {
		// this will call animateContentIn when 'flipImage' is heard
		// and it will pass in the 'this' that _createEventsRouter is
		// attached to as the paramater for animateContentIn
		eventHandler.on('flipImage', this.animateContentIn.bind(this));
	}

	// animateContentIn will ONLY run if the 'this' it is bound to is 
	// an instance of PageView
	PageView.prototype.animateContentIn = function(e) {
		console.log('animateContentIn');
		console.log('this2: ', this);
		this.layout.content.set(gridView[2]);

		  // this.contentModifier = new Modifier({
		  // 	transform: Transform.translate(0, this.options.screenHeight, 50)
		  // });
	}

	// eventHandler.on('flipImage', function() {
	// 	console.log(this);
	// })

	module.exports = PageView;
})