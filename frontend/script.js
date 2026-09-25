const buttonAddNewTask = document.getElementById('button-add-new-task');
const inputNewTask = document.getElementById('input-new-task');
const listTasks = document.querySelector('.list-tasks');
const buttonSelectAllTasks = document.getElementById('button-select-all-tasks');
const buttonDeleteAllTasks = document.getElementById('button-delete-completed-tasks');
const navigationMenu = document.querySelector('nav');
const buttonAllTasks = document.getElementById('button-all-tasks');
const buttonActiveTasks = document.getElementById('button-active-tasks');
const buttonCompletedTasks = document.getElementById('button-completed-tasks');
const paginationMenu = document.getElementById('pagination-bar');

const FILTER_ALL = "all";
const DISABLED = "disabled";
const FILTER_ACTIVE = "active";
const ENTER = "Enter";

let arrayAllTasks = [];
let filterType = FILTER_ALL;
let currentPage = null;

const render = () => {
    console.log('render');
    console.log(arrayAllTasks);
    
    
    if (arrayAllTasks.length > 0) {
        setStyleForCurrentTab();
        unlockInaccessibleButtons();
    } else {
        setStyleForEmptyArrayAllTasks();
        lockInaccessibleButtons();
    }
    checkCompletedTask();
    setNumberTasks();
    let allLiTasks = '';
    arrayAllTasks.forEach((task) => {
        const tagLi = `<li data-id="${task.id}">
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''}>
        <input class="input" maxlength="250" autocomplete="off" hidden>
        <span id="text-task">${task.text}</span>
        <button class="button button-delete" id="delete-task">X</button>
        </li>`;
        allLiTasks+=tagLi;
    });
    listTasks.innerHTML = allLiTasks;
    checkSelectAllTasks();
};

const lockInaccessibleButtons = () => {
    buttonSelectAllTasks.setAttribute(DISABLED, DISABLED);
    buttonDeleteAllTasks.setAttribute(DISABLED, DISABLED);
    buttonAllTasks.setAttribute(DISABLED, DISABLED);
    buttonActiveTasks.setAttribute(DISABLED, DISABLED);
    buttonCompletedTasks.setAttribute(DISABLED, DISABLED);
};
  
const unlockInaccessibleButtons = () => {
    buttonSelectAllTasks.removeAttribute(DISABLED);
    buttonDeleteAllTasks.removeAttribute(DISABLED);
    buttonAllTasks.removeAttribute(DISABLED, DISABLED);
    buttonActiveTasks.removeAttribute(DISABLED, DISABLED);
    buttonCompletedTasks.removeAttribute(DISABLED, DISABLED);
};

const setStyleForCurrentTab = () => {
    switch (filterType) {
        case FILTER_ALL:
            buttonAllTasks.classList.add(FILTER_ACTIVE);
            buttonActiveTasks.classList.remove(FILTER_ACTIVE);
            buttonAllTasks.classList.remove(FILTER_ACTIVE);
            break;
        case FILTER_ACTIVE:
            buttonAllTasks.classList.add(FILTER_ACTIVE);
            buttonActiveTasks.classList.remove(FILTER_ACTIVE);
            buttonAllTasks.classList.remove(FILTER_ACTIVE);
            break;
        case FILTER_COMPLETED:
            buttonAllTasks.classList.add(FILTER_ACTIVE);
            buttonActiveTasks.classList.remove(FILTER_ACTIVE);
            buttonAllTasks.classList.remove(FILTER_ACTIVE);
            break;
    }
    listTasks.classList.add(FILTER_ACTIVE);
};

const setStyleForEmptyArrayAllTasks = () => {
    buttonAllTasks.classList.remove(FILTER_ACTIVE);
    buttonActiveTasks.classList.remove(FILTER_ACTIVE);
    buttonCompletedTasks.classList.remove(FILTER_ACTIVE);
    listTasks.classList.remove(FILTER_ACTIVE);
};

const countTasks = () => {
    const allTasks = arrayAllTasks.length;
    const activeTasks = arrayAllTasks.filter((task) => task.isCompleted === false).length;
    const completedTasks = allTasks - activeTasks;
    return [allTasks, activeTasks, completedTasks];
};

const setNumberTasks = () => {
    const numberTasks = countTasks();
    buttonAllTasks.textContent = `All (${numberTasks[0]})`;
    buttonActiveTasks.textContent = `Active (${numberTasks[1]})`;
    buttonCompletedTasks.textContent = `Completed (${numberTasks[2]})`;
};

const checkSelectAllTasks = () => {
    if (arrayAllTasks.length > 0) {
      buttonSelectAllTasks.checked = arrayAllTasks.every((task) => task.isCompleted);
    } else {
      buttonSelectAllTasks.checked = false;
    }
};

const checkCompletedTask = () => {
    if (arrayAllTasks.every(task => !task.isCompleted)) {
      buttonDeleteAllTasks.setAttribute(DISABLED, DISABLED);
    } else {
      buttonDeleteAllTasks.removeAttribute(DISABLED);
    }
}

const onClickAddNewTask = () => {
    console.log('onClickAddNewTask');
    
    const inputText = inputNewTask.value;
    inputNewTask.value = '';
    addNewTaskObject(inputText);
}

const addNewTaskObject = (inputText) => {
    let idNewTask = arrayAllTasks.length ? arrayAllTasks.at(-1).id + 1 : 0;
    arrayAllTasks.push({id: idNewTask, text: inputText, isCompleted: false});
    resetToDefaultParams();
}

const resetToDefaultParams = () => {
    filterType = FILTER_ALL;
    buttonSelectAllTasks.checked = false;
    render();
};

const onKeyUpInput = (event) => {
    const code = event.code;
    if (code === ENTER) {
        const { value: inputText } = inputNewTask;
        inputNewTask.value = '';
        addNewTaskObject(inputText);
    };
};

buttonAddNewTask.addEventListener('click', onClickAddNewTask);
inputNewTask.addEventListener('keyup', onKeyUpInput);