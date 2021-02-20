import './styles.scss';

window.addEventListener('load', () => {
    const game = document.querySelector('div.game');

    const $shuffle = (cells) => cells.sort(() => Math.random() - 0.5);
    const $remove = (parent) => (child) => parent.removeChild(child);
    const $removeAll = (parent) => [...parent.childNodes].map($remove(parent));
    const $create = (parent) => ({ empty = false, index = '', }) => {
        const cell = document.createElement('div');
        cell.classList.add('game__cell');
        cell.dataset.empty = empty;
        cell.dataset.value = index;
        if (empty) {
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
        parent.appendChild(cell);
        return cell;
    };
    const $createAll = (parent, cells) => cells.map($create);

    const cells = [...Array(16)].map((_, index) => {
        return {
            ...!index && { empty: true, },
            ...index && { index, },
        };
    });
    $shuffle(cells);
    $createAll(game, cells);
});