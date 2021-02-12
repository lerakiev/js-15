import './styles.scss';

window.addEventListener('load', () => {
    const game = document.querySelector('div.game');
    const cells = [...Array(16)].map((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('game__cell');
        if (index) {
            cell.dataset.value = index;
        } else {
            cell.dataset.value = '';
            cell.classList.add('game__cell_dnd');
            // https://htmlacademy.ru/blog/boost/frontend/drag-and-drop
            // https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Drag_and_drop
            // https://learn.javascript.ru/drag-and-drop
            // https://habr.com/ru/post/463463/
            // https://www.w3schools.com/html/html5_draganddrop.asp
            // cell.setAttribute('draggable', true);
            // TODO: addEventListener
            // cell.addEventListener('mousedown')
        }
        return cell;
    });
    // cells.sort(() => Math.random() - 0.5);
    cells.forEach(cell => game.appendChild(cell));
});