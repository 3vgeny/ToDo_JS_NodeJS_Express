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
const FILTER_ACTIVE = "active";
const FILTER_COMPLETED = "completed";
const ACTIVE_CLASS = "active";
const DISABLED = "disabled";
const ENTER = "Enter";
const CHECKBOX = "checkbox";
const DATA_ID = "data-id";
const ESCAPE = "Escape";
const BUTTON_ALL_TASKS = "button-all-tasks";
const BUTTON_ACTIVE_TASKS = "button-active-tasks";
const BUTTON_COMPLETED_TASKS = "button-completed-tasks";
const STEP_PAGINATION = 5;
const BUTTON = "BUTTON";

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
    const currentSelectedTab = selectedTab();
    createPaginationMenu(currentSelectedTab);
    const currentTasksPage = pagination(currentSelectedTab);
    setNumberTasks();
    let allLiTasks = '';
    currentTasksPage.forEach((task) => {
        const tagLi = `<li data-id="${task.id}">
        <input type="checkbox" ${task.isCompleted ? 'checked' : ''}>
        <input class="input" data-id="change-text-task" maxlength="250" autocomplete="off" hidden>
        <span data-id="text-task">${task.text}</span>
        <button class="button button-delete" data-id="delete-task">X</button>
        </li>`;
        allLiTasks+=tagLi;
    });
    listTasks.innerHTML = allLiTasks;
    checkSelectAllTasks();
};

const pagination = (arraySelectedTab) => {
    if (currentPage !== null) {
        const indexFirstTask = currentPage * STEP_PAGINATION;
        const indexLastTask = (currentPage + 1) * STEP_PAGINATION;
        return arraySelectedTab.slice(indexFirstTask, indexLastTask);
    }
 };

const createPaginationMenu = (arrayTask) => {
    const numberPages = Math.ceil(arrayTask.length / 5);
    let pageNumbersPagination = '';
    checkUniqueValuesPages(numberPages);
    for (let i = 0; i < numberPages; i++) {
        let pageNumber = null;
        if (currentPage === i) {
            pageNumber = `<button class="button page active" data-id="${i}">${i + 1}</button>`;
        } else {
            pageNumber = `<button class="button page" data-id="${i}">${i + 1}</button>`;
        }
        pageNumbersPagination += pageNumber;
    }
    paginationMenu.innerHTML = pageNumbersPagination;
};

const checkUniqueValuesPages = (numberPages) => {
    const isCurrentPageMoreAccessible = numberPages > 0 && currentPage > numberPages - 1;
    if (currentPage === null || isCurrentPageMoreAccessible) {
        currentPage = numberPages - 1;
    }
};

const selectedTab = () => {
    switch (filterType) {
        case FILTER_ALL:
            return arrayAllTasks;
        case FILTER_ACTIVE:
            return arrayAllTasks.filter((task) => !task.isCompleted);
        case FILTER_COMPLETED:
            return arrayAllTasks.filter((task) => task.isCompleted);
    }
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
            buttonAllTasks.classList.add(ACTIVE_CLASS);
            buttonActiveTasks.classList.remove(ACTIVE_CLASS);
            buttonCompletedTasks.classList.remove(ACTIVE_CLASS);
            break;
        case FILTER_ACTIVE:
            buttonAllTasks.classList.remove(ACTIVE_CLASS);
            buttonActiveTasks.classList.add(ACTIVE_CLASS);
            buttonCompletedTasks.classList.remove(ACTIVE_CLASS);
            break;
        case FILTER_COMPLETED:
            buttonAllTasks.classList.remove(ACTIVE_CLASS);
            buttonActiveTasks.classList.remove(ACTIVE_CLASS);
            buttonCompletedTasks.classList.add(ACTIVE_CLASS);
            break;
    }
    listTasks.classList.add(ACTIVE_CLASS);
};

const setStyleForEmptyArrayAllTasks = () => {
    buttonAllTasks.classList.remove(ACTIVE_CLASS);
    buttonActiveTasks.classList.remove(ACTIVE_CLASS);
    buttonCompletedTasks.classList.remove(ACTIVE_CLASS);
    listTasks.classList.remove(ACTIVE_CLASS);
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
    const { value: inputText } = inputNewTask;
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
    currentPage = null;
    buttonSelectAllTasks.checked = false;
    render();
};

const onKeyUpInput = (event) => {
    const { code } = event;
    if (code === ENTER) {
        const { value: inputText } = inputNewTask;
        inputNewTask.value = '';
        addNewTaskObject(inputText);
    };
};

const onClickListTasks = (event) => {
    const { target: tag } = event;
    const parentElement = tag.parentElement;
    let idParentElement = parentElement.getAttribute(DATA_ID);
    if (tag.type === CHECKBOX) onClickCheckboxTask(idParentElement);
    if (tag.hasAttribute(DATA_ID)) {
        let dataIdTag = tag.getAttribute(DATA_ID);
        if (dataIdTag === 'delete-task') onClickDeleteTask(idParentElement);
    };
};

const onClickCheckboxTask = (idTagLi) => {
    const currentTask = arrayAllTasks.find((task) => task.id === Number(idTagLi));
    currentTask.isCompleted = !currentTask.isCompleted;
    render();
};

const onClickDeleteTask = (idTagLi) => {
    arrayAllTasks = arrayAllTasks.filter((task) => task.id !== Number(idTagLi))
    render()
}

const onDblclickListTasks = (event) => {
    const { target: tag } = event;
    let dataIdTag = tag?.getAttribute(DATA_ID);
    if (dataIdTag === 'text-task') changeTextTask(tag);
};

const changeTextTask = (tag) => {
    const currentTextTask = tag.textContent;
    const hiddenInput = tag.previousElementSibling;
    tag.hidden = true;
    hiddenInput.hidden = false;
    hiddenInput.value = currentTextTask;
    hiddenInput.focus();
};

const onKeyUpLiskTasks = (event) => {
    const { target: tag, code } = event;
    let dataIdTag = tag?.getAttribute(DATA_ID);
    if (code === ENTER && dataIdTag === 'change-text-task') {
      saveChangeTask(tag.value, tag.parentElement.getAttribute('data-id'));
    };
    if (code === ESCAPE) return render();
};

const saveChangeTask = (newText, idTagLi) => {
    const currentTask = arrayAllTasks.find((task) => task.id === Number(idTagLi));
    if (currentTask.text === newText) return render();
    currentTask.text = newText;
    render();
};

const onBlurListTasks = (event) => {
    const { target: tag, sourceCapabilities } = event;
    let dataIdTag = tag?.getAttribute(DATA_ID);
    if (dataIdTag === 'change-text-task' && sourceCapabilities !== null) {
      saveChangeTask(tag.value, tag.parentElement.getAttribute('data-id'));
    }
};

const onClickSelectAllTasks = (event) => {
    const { target: checkbox } = event;
    if (arrayAllTasks.length > 0) {
        arrayAllTasks.forEach((task) => (task.isCompleted = checkbox.checked));
        render();
    }
};

const onClickDeleteAllTasks = () => {
    arrayAllTasks = arrayAllTasks.filter((task) => !task.isCompleted);
    if (arrayAllTasks.length === 0) {
        return resetToDefaultParams();
    }
    render();
};

const onClickNavigationMenu = (event) => {
    const { target: tag } = event;
    currentPage = 0;
    switch (tag.id) {
        case BUTTON_ALL_TASKS:
            filterType = FILTER_ALL;
            break;
        case BUTTON_ACTIVE_TASKS:
            filterType = FILTER_ACTIVE;
            break;
        case BUTTON_COMPLETED_TASKS:
            filterType = FILTER_COMPLETED;
            break;
    }
    render();
};

const onClickPaginationMenu = (event) => {
    const { target: tag } = event;
    if (tag.tagName === BUTTON) {
        const pageNumber = tag.getAttribute('data-id');
        currentPage = Number(pageNumber);
        render();
    }
};

buttonAddNewTask.addEventListener('click', onClickAddNewTask);
inputNewTask.addEventListener('keyup', onKeyUpInput);
listTasks.addEventListener('click', onClickListTasks);
listTasks.addEventListener('dblclick', onDblclickListTasks);
listTasks.addEventListener('keyup', onKeyUpLiskTasks);
listTasks.addEventListener('blur', onBlurListTasks, true);
buttonSelectAllTasks.addEventListener('click', onClickSelectAllTasks);
buttonDeleteAllTasks.addEventListener('click', onClickDeleteAllTasks);
navigationMenu.addEventListener('click', onClickNavigationMenu);
paginationMenu.addEventListener('click', onClickPaginationMenu);