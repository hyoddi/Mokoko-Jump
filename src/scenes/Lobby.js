export class Lobby extends Phaser.Scene {
    constructor() {
        super('Lobby');
    }

    preload() {
        this.load.spritesheet('mokoko_lobby', 'assets/mokoko_sprite.png', {
            frameWidth: 644,
            frameHeight: 644,
        });
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.mokoko = this.add.sprite(centerX, centerY + 500, 'mokoko_lobby', 0);
        this.mokoko.setInteractive();
        this.input.setDraggable(this.mokoko); // 드래그 가능하게 설정

        const originalX = this.mokoko.x;
        const originalY = this.mokoko.y;
        const hoverOffset = 100;

        // hover 애니메이션
        this.mokoko.on('pointerover', () => {
            this.tweens.add({
                targets: this.mokoko,
                y: originalY - hoverOffset,
                duration: 200,
                ease: 'Power2',
            });
        });

        this.mokoko.on('pointerout', () => {
            this.tweens.add({
                targets: this.mokoko,
                y: originalY,
                duration: 200,
                ease: 'Power2',
            });
        });

        // 클릭하면 프레임 전환
        let isClicked = false;
        this.mokoko.on('pointerdown', () => {
            isClicked = !isClicked;
            this.mokoko.setFrame(isClicked ? 1 : 0);
        });

        // 드래그 동작
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            this.mokoko.setFrame(1);
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // 드래그 종료 후 원래 위치로 부드럽게 복귀
        this.input.on('dragend', (pointer, gameObject) => {
            this.tweens.add({
                targets: gameObject,
                x: originalX,
                y: originalY,
                duration: 300,
                ease: 'Back.easeOut',
            });

            this.mokoko.setFrame(0);
        });
    }
}
