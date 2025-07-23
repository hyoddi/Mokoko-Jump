export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('mokoko', 'assets/mokoko_original.png');
    }

    create() {
        this.mokoko = this.add.image(600, 500, 'mokoko');
        this.mokoko.setScale(0.8);

        this.titleText = this.add.text(700, 280, 'Mokoko Jump!', {
            fontSize: '100px',
            color: '#000000',
        }).setOrigin(0.7);


        this.startButton = this.add.text(900, 450, 'Start Game', {
            fontSize: '48px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
        }).setOrigin(0.5).setInteractive();

        // 버튼에 클릭 이벤트 추가
        this.startButton.on('pointerdown', () => {
            this.scene.start('Round1'); // 'NextScene'은 다음 씬 이름으로 변경
        });
    }
}