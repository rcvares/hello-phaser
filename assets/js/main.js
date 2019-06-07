function principal () {
	var config = {
		type: Phaser.AUTO,
		width: window.innerWidth,
		height: window.innerHeight,
		backgroundColor: '#b3e6ff',
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 500 }
			}
		},
		scene: {
			preload: preload,
			create: create,
			update: update,
		}
	};

	var game = new Phaser.Game(config)
}

function preload() {
	this.load.image('sky', 'assets/sprites/sky.png');
	this.load.image('ground', 'assets/sprites/platform.png');
	this.load.image('block', 'assets/sprites/block.png')
	this.load.image('star', 'assets/sprites/star.png');
	this.load.atlas(
    	'hamtaro',
    	'assets/sprites/hamham.png',
    	'assets/sprites/hamtaro.json'
  	)
}

function create() {
	ceu = this.add.image(400, 300, 'sky').setScale(4)
	piso = this.physics.add.staticGroup();
	piso.create(0, 1000, 'ground')
	piso.create(0, 660, 'ground');
	piso.create(400, 660, 'ground');
	piso.create(800, 660, 'ground');
	piso.create(1200, 660, 'ground');
	piso.create(0, 500, 'block')
	piso.create(450, 420, 'block');
	piso.create(950, 200, 'block');

	personagem = this.physics.add.sprite(400, 400, 'hamtaro')
	personagem.setBounce(0.1);
	personagem.setCollideWorldBounds(true);

	estrelas = this.physics.add.group({
    	key: 'star',
    	repeat: 20,
    	setXY: { x: 100, y: 0, stepX: 75 }
    })
    
    titulo = this.add.text(100, 50, 'Hamtarooo!', {
    	fontFamily: 'Arial',
    	fontSize: 20,
    	fontWeight: 'bold',
    	color: 'white',
    })

    this.physics.add.collider(personagem, piso);
  	this.physics.add.collider(estrelas, piso);

  	cursors = this.input.keyboard.createCursorKeys();

  	this.anims.create({
  		key: 'esquerda',
  		frames: this.anims.generateFrameNames('hamtaro', {
  			prefix: 'hamtaro_',
  			start: 4,
  			end: 6
  		}),
  		repeat: -1,
  		duration:300
  	});

  	this.anims.create({
  		key: 'direita',
  		frames: this.anims.generateFrameNames('hamtaro', {
  			prefix: 'hamtaro_',
  			start: 1,
  			end: 3
  		}),
  		repeat: -1,
  		duration: 300
  	});

  	this.anims.create({
  		key: 'parado',
  		frames: this.anims.generateFrameNames('hamtaro', {
  		prefix: 'hamtaro_',
  		start: 11 ,
  		end: 12 
  		}) ,
  		repeat: -1,
  		duration: 300
  	});	

  	this.physics.add.overlap(
  		personagem,
  		estrelas,
  		pegarEstrela,
  		null,
  		this
  	);
}

function update() {
	if (cursors.left.isDown) {
		personagem.setVelocityX(-320);
		personagem.anims.play('esquerda', true);
	}
	else if (cursors.right.isDown) {
		personagem.setVelocityX(320);
		personagem.anims.play('direita', true);
	}
	else if (cursors.up.isDown && personagem.body.touching.down) {
		personagem.setVelocityY(-500);
	}
	else {
		personagem.setVelocityX(0);
		personagem.anims.play('parado');
	}
}
function pegarEstrela (personagem, star) {
	star.disableBody(true, true);
}

window.onload = principal;