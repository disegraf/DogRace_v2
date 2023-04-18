var dogsScale=0.5;
var Carga = new Phaser.Class({

	Extends: Phaser.Scene,
	initialize: function Carga() {
		Phaser.Scene.call(this, {
			key: 'carga',
			active: true
		});
	},

	preload: function () {
		this.load.image('logo', 'img/logo-02.png');
		this.load.image('background', 'img/background-2.jpg');
		this.load.image('buttonFull', 'img/icon-fullscreen-2.png');
		this.load.image('guia', 'img/guia.png');
		this.load.image('plataforma', 'img/scene/plataform.png');
		this.load.image('fence', 'img/scene/fence1.png');
		this.load.image('fenceChain', 'img/scene/fence-chain.png');
		this.load.image('building', 'img/scene/buildings.png');
		this.load.image('post', 'img/scene/post.png');
		this.load.image('barraFill', 'img/bar-fill.png');
		this.load.image('partida', 'img/partida-render.png');
		this.load.image('llegada', 'img/llegada.png');
		
		//choose dogs
		this.load.image('bg-choose', 'img/background.jpg');
		this.load.image('choosePanel', 'img/chooseDogPanel.png');
		this.load.image('btnStart', 'img/start.png');
		dogsScale=1;


		//dogs
		this.load.animation('jsonAnimDog1','img/greyhound/greyhound1_anim.json');
		this.load.animation('jsonAnimDog2','img/greyhound/greyhound2_anim.json');
		this.load.animation('jsonAnimDog3','img/greyhound/greyhound3_anim.json');
		this.load.animation('jsonAnimDog4','img/greyhound/greyhound4_anim.json');
		this.load.animation('jsonAnimDog5','img/greyhound/greyhound5_anim.json');
		this.load.animation('jsonAnimDog6','img/greyhound/greyhound6_anim.json');

		//dogs
		this.load.atlas('greyhound1','img/greyhound/greyhound1.png','img/greyhound/greyhound1_atlas.json');
		this.load.atlas('greyhound2','img/greyhound/greyhound2.png','img/greyhound/greyhound2_atlas.json');
		this.load.atlas('greyhound3','img/greyhound/greyhound3.png','img/greyhound/greyhound3_atlas.json');
		this.load.atlas('greyhound4','img/greyhound/greyhound4.png','img/greyhound/greyhound4_atlas.json');
		this.load.atlas('greyhound5','img/greyhound/greyhound5.png','img/greyhound/greyhound5_atlas.json');
		this.load.atlas('greyhound6','img/greyhound/greyhound6.png','img/greyhound/greyhound6_atlas.json');


		this.load.image('ico-1', 'img/newAssets/ico-1.png');
		this.load.image('ico-2', 'img/newAssets/ico-2.png');
		this.load.image('ico-3', 'img/newAssets/ico-3.png');
		this.load.image('ico-4', 'img/newAssets/ico-4.png');
		this.load.image('ico-5', 'img/newAssets/ico-5.png');
		this.load.image('ico-6', 'img/newAssets/ico-6.png');

		this.load.image('dog-image-1', 'img/newAssets/dog-image-01.png');
		this.load.image('dog-image-2', 'img/newAssets/dog-image-02.png');
		this.load.image('dog-image-3', 'img/newAssets/dog-image-03.png');
		this.load.image('dog-image-4', 'img/newAssets/dog-image-04.png');
		this.load.image('dog-image-5', 'img/newAssets/dog-image-05.png');
		this.load.image('dog-image-6', 'img/newAssets/dog-image-06.png');

		this.load.image('dog-winner-1', 'img/newAssets/dog-winner-01.png');
		this.load.image('dog-winner-2', 'img/newAssets/dog-winner-02.png');
		this.load.image('dog-winner-3', 'img/newAssets/dog-winner-03.png');
		this.load.image('dog-winner-4', 'img/newAssets/dog-winner-04.png');
		this.load.image('dog-winner-5', 'img/newAssets/dog-winner-05.png');
		this.load.image('dog-winner-6', 'img/newAssets/dog-winner-06.png');
		
		this.load.image('panelNumeros', 'img/rank_panel-2.png');
		this.load.atlas('numeros','img/numeros/numeros.png','img/numeros/numeros_atlas.json');
		//dogs
		
		this.load.image('panelGanador', 'img/panel-ganador.png');

		this.load.image('selector', 'img/selector.png');
		this.load.image('refresh', 'img/icon-refresh.png');

		canvasGame = $("#phaser-container canvas");
		/**********************************************/
		/*preload*/
		/**********************************************/
		var bg = this.add.graphics();
		bg.fillStyle(0x000000, 1);
		bg.fillRect(0, 0, canvasGame.width(), canvasGame.height());
		

		var textoCarga = this.add.text((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 30, 'cargando...').setOrigin(0.5);
		textoCarga.setFontSize(12);
		textoCarga.setFontFamily('Helvetica, Arial');

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();

		this.load.on('progress', function (value) {
			console.log(value);

			progressBox.clear();
			progressBox.fillStyle(0x222222, 0.8);
			progressBox.fillRect((25 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) - 20, (50 * canvasGame.width() / 100), 20);

			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			var widthBar = (50 * canvasGame.width() / 100) - 8;
			progressBar.fillRect((25 * canvasGame.width() / 100) + 4, (50 * canvasGame.height() / 100) - 16, (widthBar * value), 12);

			textoCarga.setPosition((50 * canvasGame.width() / 100), (50 * canvasGame.height() / 100) + 10);
			textoCarga.setText('cargando...' + parseInt(value * 100) + "%");
		});

		this.load.on('fileprogress', function (file) {
			//console.log(file.src);
		});

		this.load.on('complete', function () {
			console.log('complete');
			progressBar.destroy();
			progressBox.destroy();
			textoCarga.destroy();
		});

		/**********************************************/
		/*preload*/
		/**********************************************/




	},

	create: function () {

		/*centro del escenario*/
		var screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		var screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.logo = this.add.image(0, 0, 'logo').setScale(1).setOrigin(0.5).setPosition(screenCenterX, screenCenterY);
		this.logo.alpha = 0;

		//agregando efecto de intro
		this.tweens.add({
			targets: this.logo,
			duration: 2500,
			alpha: 1,
			repeat: 0,
			yoyo: true,
			ease: 'Power1',
			onStart: () => console.log("iniciando Animacion"),
			onComplete: function () {
				//game.scene.start('juego');
				game.scene.start('chooseDog');
				game.scene.remove('carga');
				//game.scene.start('panelGanadorFinal');
			}
		});

		this.scale.on('resize', function (gameSize) {
			screenCenterX = canvasGame.width() / 2;
			screenCenterY = canvasGame.height() / 2;
			this.logo.setPosition(screenCenterX, screenCenterY);
		}, this);

	},
	update: function (time, delta) {


	}

});