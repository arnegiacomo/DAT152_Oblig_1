import TaskBox from '../components/taskbox/main.js';

customElements.define('task-box', TaskBox);

const taskbox = document.querySelector("TASK-BOX");
taskbox.newtaskCallback(
    (task) => {
        console.log(`Have '${task.title}' with status ${task.status}.`);
        taskbox.close();
} );
taskbox.setStatuseslist(["WATING","ACTIVE","DONE", "TEST"]);
taskbox.show();