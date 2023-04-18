var detectExitFullScreen = false;
var gameScale;
var iconFullscreen;
var selectedDog=-1;

var panelChooseDog = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function panelChooseDog() {
		Phaser.Scene.call(this, {
			key: 'chooseDog',
			active: false
		});
	},
	create: function () {

		canvasGame = $("#phaser-container canvas");
		var thisGame = this;
		this.bgChooseDog = this.add.image(leftPer(50), topPer(50), 'bg-choose').setOrigin(0.5);

		this.container = this.add.container(0, topPer(50));
		this.guia = this.add.sprite(0,0,'guia').setOrigin(0);
		this.container.add(this.guia);

		this.panelChoose = this.add.image(0, 0, 'choosePanel').setOrigin(0.5).setScale(1);
		this.container.add(this.panelChoose);

		this.btnStart = this.add.image( 0, 300, 'btnStart').setOrigin(0.5).setScale(.7).setAlpha(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.btnStart);

		this.imageIconDogs=[];
		this.imageDogs=[];

		/* IMAGE DOGS */
		this.imageDogs[0]=this.add.sprite(0,-50,`dog-image-1`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[0]);

		this.imageDogs[1]=this.add.sprite(0,-50,`dog-image-2`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[1]);

		this.imageDogs[2]=this.add.sprite(0,-50,`dog-image-3`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[2]);

		this.imageDogs[3]=this.add.sprite(0,-50,`dog-image-4`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[3]);

		this.imageDogs[4]=this.add.sprite(0,-50,`dog-image-5`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[4]);

		this.imageDogs[5]=this.add.sprite(0,-50,`dog-image-6`).setScale(0).setOrigin(0.5).setAlpha(0);
		this.container.add(this.imageDogs[5]);
		/* IMAGE DOGS */

		/* IMAGE DOG ICONS */
		this.imageIconDogs[0]=this.add.sprite(-250,-143,`ico-1`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[0]);

		this.imageIconDogs[1]=this.add.sprite(250,-143,`ico-2`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[1]);

		this.imageIconDogs[2]=this.add.sprite(-250,0,`ico-3`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[2]);

		this.imageIconDogs[3]=this.add.sprite(250,0,`ico-4`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[3]);

		this.imageIconDogs[4]=this.add.sprite(-250,145,`ico-5`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[4]);

		this.imageIconDogs[5]=this.add.sprite(250,145,`ico-6`).setScale(0).setOrigin(0.5).setInteractive({
			useHandCursor: true
		});
		this.container.add(this.imageIconDogs[5]);
		/* IMAGE DOG ICONS */

		/* ADD TWEEN TOP PANEL CHOOSE */
		
		this.tweens.add({
			targets: [
				thisGame.panelChoose,
				thisGame.imageIconDogs[0],
				thisGame.imageIconDogs[1],
				thisGame.imageIconDogs[2],
				thisGame.imageIconDogs[3],
				thisGame.imageIconDogs[4],
				thisGame.imageIconDogs[5],
				thisGame.imageDogs[0],
				thisGame.imageDogs[1],
				thisGame.imageDogs[2],
				thisGame.imageDogs[3],
				thisGame.imageDogs[4],
				thisGame.imageDogs[5]
			],
			scaleX: 1,
			scaleY: 1,
			ease        : 'Quad.easeOut',
			duration    : 800,
			yoyo        : false,
			repeat      : 0,
			delay		: 0
		});
		/* ADD TWEEN TOP PANEL CHOOSE */


		for(let i=0 ;i<this.imageIconDogs.length;i++)
		{
			this.imageIconDogs[i].on('pointerdown', function (pointer) {
				desactivateRestDogs(this.imageIconDogs, this.imageDogs);
				this.imageIconDogs[i].setAlpha(1);
				this.imageDogs[i].setAlpha(1);
				this.btnStart.setAlpha(1);
				selectedDog=i;
			}, this);

			this.imageIconDogs[i].on('pointerover', function (pointer) {
				this.imageIconDogs[i].setAlpha(1);
			}, this);

			this.imageIconDogs[i].on('pointerout', function (pointer) {
				if(selectedDog!=i && selectedDog!=-1 ) this.imageIconDogs[i].setAlpha(0.5);
			}, this);
		}

		/* SELECT FIRST BY DEFAULT */
		desactivateRestDogs(this.imageIconDogs, this.imageDogs);
		this.imageIconDogs[0].setAlpha(1);
		this.imageDogs[0].setAlpha(1);
		this.btnStart.setAlpha(1);
		selectedDog=0;
		/* SELECT FIRST BY DEFAULT */


		function desactivateRestDogs(arrayIconDogs, arrayImageDogs)
		{
			for(let i=0 ;i<arrayIconDogs.length;i++)
			{
				arrayIconDogs[i].setAlpha(0.25);
			}
			for(let i=0 ;i<arrayImageDogs.length;i++)
			{
				arrayImageDogs[i].setAlpha(0);
			}
		}


		iconFullscreen = this.add.image((leftPer(100) - 35), (topPer(0) + 10), 'buttonFull').setOrigin(0).setInteractive({
			useHandCursor: true
		});
		iconFullscreen.on('pointerdown', function (pointer) {
			fullscreen();

		}, this);

		this.btnStart.on('pointerdown', function (pointer) {
			if( selectedDog!=-1 )
			{
				game.scene.start('juego');
				game.scene.remove('chooseDog');
			}
		}, this);

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

			backgroundCover(this.bgChooseDog);
			iconFullscreen.setPosition((leftPer(100) - 35), (topPer(0) + 10));

			this.container.setPosition(leftPer(50), topPer(50));
			
			if(setOrientation()=="horizontal")
			{
				this.container.setScale(canvasGame.width() / this.game.config.width * .7);
			}
			else
			{
				this.container.setScale(canvasGame.width() / this.game.config.width * 1.5);
			}
			
		}, this);
		//ajuste de pantalla
	},
	update: function (time, delta) {
		tiempo += delta;
		//ajuste para los botones interactivos
		this.game.scale.resize(canvasGame.width(), canvasGame.height());
		/****************ajuste para el fullscreen****************************/
		if (this.game.scale.isFullscreen) {
			$("#phaser-container").css({
				"height": screen.height + "px",
				"width": screen.width + "px"
			});
		}
		/****************ajuste para el fullscreen****************************/
	}
});