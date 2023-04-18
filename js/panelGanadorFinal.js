var panelGanadorFinal = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function juego() {
        Phaser.Scene.call(this, {
            key: 'panelGanadorFinal',
            active: false
        });
    },
    create: function () {

        console.log(`Winners dogs are ${perritos[0].id}, ${perritos[1].id} and ${perritos[2].id} `);

        let winnersDogs=[];
        winnersDogs[0]="dog-winner-"+(parseInt(perritos[0].id)+1);
        winnersDogs[1]="dog-winner-"+(parseInt(perritos[1].id)+1);
        winnersDogs[2]="dog-winner-"+(parseInt(perritos[2].id)+1);



        let bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.7);
        bg.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        this.panelGanadorFinal=this.add.image(0, -20, 'panelGanador').setOrigin(0.5).setScale(0.7);
        this.containerPopUpGanadores=this.add.container(leftPer(50),topPer(50));
        this.containerPopUpGanadores.add(this.panelGanadorFinal);





        
     this.first=this.add.image(-121, -121, winnersDogs[0]).setOrigin(0).setScale(0.5);
        this.containerPopUpGanadores.add(this.first);

        this.second=this.add.image(-300, -90, winnersDogs[1]).setOrigin(0).setScale(0.5);
        this.containerPopUpGanadores.add(this.second);

        this.third=this.add.image(50, -90, winnersDogs[2]).setOrigin(0).setScale(0.5);
        this.containerPopUpGanadores.add(this.third);

        this.btnRefresh=this.add.image(190, -195, 'refresh').setOrigin(0.5).setScale(.8).setInteractive({
			useHandCursor: true
		});
        this.containerPopUpGanadores.add(this.btnRefresh);

        this.btnRefresh.on('pointerdown', function (pointer) {
            location.reload();
        }, this);

        //results 
      let textStatus="YOU LOSE";
        if(parseInt(selectedDog)==parseInt(perritos[0].id))
        {
            textStatus="YOU WIN";
        }
       console.log(`DOG WINNER: ${parseInt(perritos[0].id)} - DOG CHOOSED: ${parseInt(selectedDog)}`);
    //results        
        this.textStatusInGame = this.add.text(0, -210, textStatus, {
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fontSize: '28px',
            align: 'center',
            color: '#ffffff',
        });
        this.textStatusInGame.setOrigin(0.5);
        this.containerPopUpGanadores.add(this.textStatusInGame);







        this.scale.on('resize', function () {

            if(setOrientation()=="horizontal")
            {
                this.containerPopUpGanadores.setScale(1.35);
                
            }else
            {
                this.containerPopUpGanadores.setScale(.7);
            }

            this.containerPopUpGanadores.setPosition(leftPer(50),topPer(50));
            /**/
        }, this);

        this.scale.on('resize', function () {
            
           bg.clear();
           bg.fillStyle(0x000000, 0.7);
           bg.fillRect(0, 0, canvasGame.width(), canvasGame.height());
			
		}, this);

    }
});