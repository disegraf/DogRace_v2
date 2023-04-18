var iconFullscreen;
var detectExitFullScreen = false;
var gameScale;
var cantPerritos=6;
var inicioJuego=false;
var delayJuego=2000;
var tiempo=0;
var perritos= [];
var gameEnd=false;
var posicionesPuestoNumero=[1013,832,652,471,291,110];
var dogs=[];
var numeros=[];
let selector;

var juego = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function juego() {
		Phaser.Scene.call(this, {
			key: 'juego',
			active: false
		});
	},
	preload: function () {

	},

	create: function () {

		
		
	var container2 = this.add.container(0, topPer(50));
	
		canvasGame = $("#phaser-container canvas");
		bg = this.add.image(0, 0, 'background').setOrigin(0.5);
		
		
		this.building = this.add.tileSprite(0, 0, 1200, 900, 'building').setOrigin(0,0.5);
		this.plataforma = this.add.tileSprite(-450, 0, 1200, 900, 'plataforma').setOrigin(0,0.5);
		this.partida= this.add.tileSprite(0, 0, 1200, 900, 'partida').setOrigin(0,0.5);
		this.animacionPartida=this.tweens.add({
					targets: this.partida,
					x: -500,
					ease: 'linear',
					duration: 1000,
					delay:delayJuego
		});

		
		this.post = this.add.tileSprite(0, 0, 1200, 900, 'post').setOrigin(0,0.5);
		this.fenceChain = this.add.tileSprite(0, 0, 1200, 900, 'fenceChain').setOrigin(0,0.5);
		

		var container = this.add.container(0, 0);//dentro de container no trabajar porcentajes
		var guia = this.add.sprite(0,0,'guia').setOrigin(0); //guia para ver tamaños
		container.add(this.partida);

		this.llegada=this.add.image(1500, -400, 'llegada').setOrigin(0);//700
		var conLlegada=this.llegada;
		this.tweens.add({
			targets: conLlegada,
			x: -500,
			ease: 'Linear',
			duration: 2000,
			onComplete:  function(){
			},
			delay: 22000
		});/**/
		container.add(this.llegada);


		
		
		//perritos		
		this.animacionDogs=[];
		this.animat=[];
		
		var espacioEntrePerritos=30;
		var tiempoCorrida=12000;
		
		let perrosGanadores = [0, 1, 2, 3, 4, 5];
		perrosGanadores = perrosGanadores.sort(() => Math.random() - 0.5);
		//console.info(perrosGanadores);

		//agregando animaciones iniciales
		for(i=0; i<cantPerritos; i++)
		{
			dogs[i]= this.add.sprite( Phaser.Math.Between(-350, -150) , (-125+(i*espacioEntrePerritos)) ,`greyhound${i+1}` ).play(`run${i+1}`);//.play(`run${i+1}`)
			dogs[i].setScale(dogsScale);
			//this.dogs[i].anims.play('run');
			dogs[i].anims.msPerFrame = 15+i;
			container.add(dogs[i]);
			var tiempoInicial=Phaser.Math.Between(1000, tiempoCorrida/2);
			
			
			//agregando animaciones
			if(perrosGanadores[1]==i)
			{
			   this.tweens.timeline({
				targets: dogs[i],
				ease: 'Cubic.easeOut',
				yoyo: false,	
				loop: 0,				
				tweens:[
					{
						x:500,
						duration: delayJuego,
						onComplete: () => inicioJuego=true,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:700,
						duration: 8000,
					}
				]
				});
			}else if(perrosGanadores[2]==i)
			{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Cubic.easeOut',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:650,
						duration: 7000,
					}
				]
				});
			}else if(perrosGanadores[3]==i)
			{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Cubic.easeOut',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					}
					,
					{
						x:600,
						duration: 8000,
					}
				]
				});
			}else{
				this.tweens.timeline({
				targets: dogs[i],
				ease: 'Cubic.easeOut',
				yoyo: false,	
				loop: 0,
				tweens:[
					{
						x:500,
						duration: delayJuego,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: tiempoInicial,
					},
					{
						x:Phaser.Math.Between(300, 900),
						duration: (tiempoCorrida-tiempoInicial),
					},
					{
						x:Phaser.Math.Between(200, 300),
						duration: (9000),
					}
				]
				});
			}
			//agregando animaciones
			
		}
		container.add(guia);		
		//perritos

		//add fence
		this.fence = this.add.tileSprite(0, 0, 1200, 900, 'fence').setOrigin(0,0.5);
		
		//panel numeros
		var containerNumeros=this.add.container(0, 900);
		this.panelNumero= this.add.image(0, -180, 'panelNumeros').setOrigin(0);
		containerNumeros.add(this.panelNumero);
		//panel numeros

		/* BAR PROGRESS GAME */
		var barraFill = this.add.tileSprite(23, -213, 1140, 45, 'barraFill').setOrigin(0).setScale(0, 1);
		containerNumeros.add(barraFill);
		var tweenBarra=this.tweens.add({
					targets: barraFill,
					scaleX: 1,
					ease: 'Sine.easeIn',
					duration: 23000,
					onComplete:  function(){
						terminarJuego();
						gameEnd=true;
						adjustFinalPositions();
					}
		});
		/* BAR PROGRESS GAME */

		
		///agregando numeros
		
		
		this.tweenNumeros=[];
		for(let i=0;i<6;i++)
		{
			numeros[i]=this.add.image(0, -90, 'numeros', 'num'+(i+1)).setOrigin(0);
			containerNumeros.add(numeros[i]);
			this.tweenNumeros[i]=this.tweens.add({
					targets: numeros[i],
					x: posicionesPuestoNumero[5],
					ease: 'Sine.easeIn',
					duration: 20000
			});/**/
		}
		
		//containerNumeros.add([ this.panelNumero,this.numeroUno,this.numeroDos,this.numeroTres,this.numeroCuatro,this.numeroCinco,this.numeroSeis ]);
		///agregando numeros
		
		selector=this.add.image(0, 0, 'selector').setOrigin(0.5);
		containerNumeros.add(selector);
		
		
		function terminarJuego()
		{
			//this.scene.scene.pause('juego');
			takeShoot();
		}
		
		function adjustFinalPositions()
		{
			console.info(perritos);
			console.info(posicionesPuestoNumero);
			console.info(numeros);
			for(let i = 0 ; i<6; i++)
			{
				numeros[perritos[i].id].x=posicionesPuestoNumero[i];
			}
			
		}
		
		var textureManager = this.textures;
		var imagenCapture=this;
		var camara=this.cameras.main;
		var escena=this.scene;
		var tweenShoot=this.tweens;
		
		function takeShoot()
		{
			$("#phaser-container").addClass("grayScale");
			
		 	this.game.renderer.snapshotArea(0,0, canvasGame.width(), canvasGame.height(), function (image)
			{
				camara.flash(1000);
				camara.on('cameraflashcomplete', function () {
					console.log("camara flash terminado");
					$("#phaser-container").removeClass("grayScale");
				});
				if (textureManager.exists('area'))
				{
					textureManager.remove('area');
				}
				textureManager.addImage('area', image);
				var imageGen=imagenCapture.add.image(canvasGame.width()/2,canvasGame.height()/2, 'area').setOrigin(0.5);
				
				tweenShoot.add({
					targets: imageGen,
					scaleX: 0,
					scaleY: 0,
					x:canvasGame.width()/2,
					y:canvasGame.height()/2,
					ease: 'Sine.easeIn',
					duration: 3000,
					delay:3000,
					onComplete:  function(){
						$("#phaser-container").removeClass("grayScale");
						
						game.scene.start('panelGanadorFinal');
						
						//game.scene.remove('juego');
						
					}
				});

			});
		}
		
		//this.tweens.timeScale = 0.01;
		
		


		iconFullscreen = this.add.image(0, 0, 'buttonFull').setOrigin(0).setInteractive({
			useHandCursor: true
		});
		iconFullscreen.on('pointerdown', function (pointer) {
			fullscreen();
			
		},this);

		

		//fullscreen
		gameScale = this.game.scale;
		function fullscreen() {
			if (this.game.scale.isFullscreen) {
				this.game.scale.stopFullscreen();
				$("#phaser-container").css({
					"height": "100%",
					"width": "100%"
				});
			} else {
				this.game.scale.startFullscreen();
				
			}
		}
		
		
		//ajuste de pantalla
		this.cameras.main.fadeIn(1000);
		this.game.scale.on('enterfullscreen', function () {
			detectExitFullScreen = true;
		});
		
		ajustePantalla();
		this.scale.on('resize', function (gameSize) {
			ajustePantalla();
			
			backgroundCover(bg);
			iconFullscreen.setPosition((leftPer(100)-35),(topPer(0)+10));
			//responsiveImage(container,0,9,0,0);
			//dog1.setPosition(leftPer(50),topPer(50));
			//responsiveImage(dog1C,0.5,2,50,50);
			container.setPosition(0,topPer(50));
			container.setScale(canvasGame.width()/this.game.config.width);

			container2.setPosition(0,topPer(40));
			container2.setScale(canvasGame.width()/this.game.config.width);

			this.plataforma.setPosition(0,topPer(50));
			this.plataforma.setScale(canvasGame.width()/this.game.config.width);

			

			this.fence.setPosition(0,topPer(50));
			this.fence.setScale(canvasGame.width()/this.game.config.width);
			
			this.fenceChain.setPosition(0,topPer(50));
			this.fenceChain.setScale(canvasGame.width()/this.game.config.width);
			
			this.post.setPosition(0,topPer(50));
			this.post.setScale(canvasGame.width()/this.game.config.width);

			this.building.setPosition(0,topPer(50));
			this.building.setScale(canvasGame.width()/this.game.config.width);

			

			
			if(setOrientation()=="horizontal")
			{
				containerNumeros.setPosition(leftPer(10),topPer(100));
				containerNumeros.setScale( canvasGame.width() / this.game.config.width *.8);
			}
			else
			{
				containerNumeros.setPosition(0,topPer(100));
				containerNumeros.setScale(canvasGame.width()/this.game.config.width);
			}
			
		}, this);
		//ajuste de pantalla

		
		
	},
	calculatePositions: function ()
	{
		//perritos
		perritos= [];
		for(let i = 0 ; i<dogs.length; i++)
		{
			perritos.push({ 'id': i , 'posicion': dogs[i].x});
		}
		perritos=perritos.sort(function (x, y) {
			return y.posicion - x.posicion;
		});
			//console.info(perritos);
			//console.table(perritos);
		//perritos
		//actualizando animacion de posiciones
		for(let i = 0 ; i<6; i++)
		{
			this.tweenNumeros[perritos[i].id].updateTo('x', posicionesPuestoNumero[i], true);
			//this.numeros[perritos[i].id].x=this.posicionesPuestoNumero[i];
		}
		//actualizando animacion de posiciones
	},
	update: function (time, delta) {
		tiempo += delta;
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		if(tiempo>=delayJuego && inicioJuego )
		{
			this.plataforma.tilePositionX +=10;
			this.fence.tilePositionX +=10;
			this.building.tilePositionX +=.5;
			this.fenceChain.tilePositionX +=8;
			this.post.tilePositionX +=9;
		}

		if(!gameEnd)this.calculatePositions();

		selector.y=-95;
		selector.x=numeros[selectedDog].x + 28;
		/****************ajuste para el fullscreen****************************/
		if(this.game.scale.isFullscreen)
		{
			$("#phaser-container").css({
					"height": screen.height + "px",
					"width": screen.width + "px"
			});
		}
		/****************ajuste para el fullscreen****************************/
	}
	
});