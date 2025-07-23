import { Start } from './scenes/Start.js';
import { Round1 } from './scenes/Round1.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade', // ← 여기서 아케이드 물리 엔진 사용을 명시
        arcade: {
        gravity: { y: 500 }, // y축으로 중력 설정
        debug: true // 디버그 모드 (충돌 박스 등 시각화됨)
        }
    },
    backgroundColor: '#FFFFFF',
    pixelArt: false,
    scene: [
        Start,Round1
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            