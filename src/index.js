import Game from './modules/game';

new Game();

if (module.hot) {
    module.hot.accept();
}