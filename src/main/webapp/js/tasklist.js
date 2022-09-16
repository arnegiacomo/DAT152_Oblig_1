import TaskList from '../components/tasklist/main.js';

customElements.define('task-list', TaskList);

const tasklist = document.querySelector("task-list");
tasklist.setStatuseslist(["WATING","ACTIVE","DONE"]);

const newtask = {
    "id": 1,
    "title": "Do DAT152 home work",
    "status": "WAITING"
};
tasklist.showTask(newtask);

tasklist.changestatusCallback(
    (id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`)
} );

tasklist.deletetaskCallback(
    (id) => {
        console.log(`Click event on delete button of task ${id}`)
} );

const status = {
        "id": 1,
        "status": "ACTIVE"
};


tasklist.updateTask(status);
tasklist.removeTask(1);

