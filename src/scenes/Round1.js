export class Round1 extends Phaser.Scene {

    constructor() {
        super('Round1');
    }

    preload() {
        this.load.image('ground', 'assets/ground.jpg');
        this.load.image('mokoko', 'assets/mokoko_original.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('doubleUp', 'assets/doubleUp.png');
    }

    create() {
        this.grounds = [];

        const star = this.physics.add.staticImage(1200, 150, 'star');
        star.setScale(0.15);
        star.refreshBody();

        const doubleUp = this.physics.add.staticImage(700, 400, 'doubleUp');
        doubleUp.setScale(0.15);
        doubleUp.refreshBody();

        const ground1 = this.physics.add.staticImage(400, 550, 'ground');
        ground1.displayWidth = 800;
        ground1.displayHeight = 50;
        ground1.refreshBody();

        const ground2 = this.physics.add.staticImage(1200, 250, 'ground');
        ground2.displayWidth = 800;
        ground2.displayHeight = 50;
        ground2.refreshBody();

        this.grounds.push(ground1, ground2); // 배열에 집어넣기

        this.mokoko = this.physics.add.image(400, 400, 'mokoko');
        this.mokoko.setScale(0.25);
        this.mokoko.setCollideWorldBounds(true);
        this.mokoko.setGravityY(1000);

        // 별 먹으면 출력할 메세지
        this.messageText = this.add.text(400, 100, '', {
            fontSize: '50px',
            color: '#000000',
        }).setOrigin(0.5);


        // 여러 바닥과 충돌
        this.physics.add.collider(this.mokoko, this.grounds);
        
        // 아이템 먹으면 사라지기
        this.physics.add.overlap(this.mokoko, doubleUp, this.collectDoubleUp, null, this);

        this.physics.add.overlap(this.mokoko, star, this.collectStar, null, this);

        // 키보드 입력 받기
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 300;

        if (this.cursors.left.isDown) {
            this.mokoko.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.mokoko.setVelocityX(speed);
        } else {
            this.mokoko.setVelocityX(0);
        }

        // 일정한 높이의 점프 유지
        if (this.mokoko.body.touching.down) {
            this.mokoko.setVelocityY(-500);  // 항상 동일한 높이로 점프
        }
    }


    collectDoubleUp(mokoko, doubleUp){
        doubleUp.destroy();
        mokoko.setVelocityY(-1000);
    }

    collectStar(mokoko, star){
        star.destroy();
        this.messageText.setText('🎉 You Win!! 🎉');

        // 다시 처음으로
        this.time.delayedCall(2000, () => {
            this.scene.start('Start');
        });
    }

}
