import './styles.scss';

window.addEventListener('load', () => {
  const game = document.querySelector('div.game');
  const cells = [ ...Array(16) ].map((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('game__cell');
    cell.dataset.value = index ? index : '';
    if (index) {
      // TODO: addEventListener
      // cell.ad
    }
    return cell;
  });
  cells.sort(() => Math.random() - 0.5);
  cells.forEach(cell => game.appendChild(cell));
});
