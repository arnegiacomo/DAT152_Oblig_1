const template = document.createElement('template');
template.innerHTML = `
  <style>
    th, td {
        text-align: left;
        padding: 10px;
    }
  </style>

  <div class="task-list">
    <p id="status-text">Waiting for server data.</p>
    <button id="task-button">New Task</button>

    <br>
    <br>

    <table class="task-list-table">
        <tr>
            <th>Task</th>
            <th>Status</th>
        </tr>
    </table>
  </div>
`;

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#task-button').disabled = true;
    }

    setStatuseslist(statuses) {
        this.statuses = statuses;
    }

    enableaddtask() {
        this.shadowRoot.querySelector('#task-button').disabled = false;
    }

    addtaskCallback(callback) {
        this.shadowRoot.querySelector('#task-button').addEventListener('click', callback);
    }

    changestatusCallback(callback) {
        this.shadowRoot.querySelectorAll('.status-select').forEach((selector) => {
            selector.onchange = function() {
                const id = this.parentNode.parentNode.id;
                const status = selector.options[selector.selectedIndex].text;
                const taskTitle =  this.parentNode.parentNode.firstElementChild.textContent;

                if(confirm('Set ' + '\'' + taskTitle + '\'' + ' to ' + status + '?')) {
                    callback(id, status);
                }

                selector.value = 'DEFAULT';
            }
        });
    }

    deletetaskCallback(callback) {
        this.shadowRoot.querySelectorAll('.remove-button').forEach((deleteButton) => {
            deleteButton.onclick = function() {
                const id = this.parentNode.parentNode.id;
                const taskName =  this.parentNode.parentNode.firstElementChild.textContent;

                if(confirm('Delete task ' + '\'' + taskName + '\'' + '?')) {
                    callback(id);
                }
            }
        });
    }

    noTask() {
        this.shadowRoot.getElementById('status-text').innerText = "No tasks were found.";
    }

    showTask(newtask) {
        let statusesString = "";
        this.statuses.forEach((statusItem) => {
            statusesString += '<option value="'+ statusItem +'">'+ statusItem +'</option>'               
        });
        const newtaskHTML = 
        '<tr id="'+ newtask.id + '">' + 
            '<td class="task-title">'+ newtask.title +'</td>' +
            '<td class="current-status">'+ newtask.status +'</td>' +
            '<td>' +
                '<select class="status-select">' +
                    '<option selected disabled value="DEFAULT">&lt;Modify&gt;</option>' + 
                    statusesString +
                '</select>' +
            '</td>' + 
            '<td>' +
                '<button class="remove-button">Remove</button>' +
            '</td>' +
        '</tr>';
        this.shadowRoot.querySelector('.task-list-table').insertRow().innerHTML = newtaskHTML;
    }

    updateTask(status) {
        const row = this.shadowRoot.getElementById(status.id);
        row.children[1].innerText = status.status;
    }

    removeTask(id) {
        const row = this.shadowRoot.getElementById(id);
        row.remove();
    }
}

window.customElements.define('task-list', TaskList)

// setStatusesList
/* const tasklist = document.querySelector("task-list");
tasklist.setStatuseslist(["WATING","ACTIVE","DONE"]); */

// enableaddtask
/* const tasklist = document.querySelector("task-list");
tasklist.enableaddtask(); */

// addtaskCallback
/* const tasklist = document.querySelector("task-list");
tasklist.enableaddtask();
tasklist.addtaskCallback(
    () => { console.log("Click event on 'New task button'") }
); */

// changestatusCallback
/* const tasklist = document.querySelector("task-list");
tasklist.changestatusCallback(
    (id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`)
} );
 */

// deletetaskCallback
/* const tasklist = document.querySelector("task-list");
tasklist.deletetaskCallback(
    (id) => {
        console.log(`Click event on delete button of task ${id}`)
} ); */

// noTask
/* const tasklist = document.querySelector("task-list");
tasklist.noTask(); */

// showTask
/* const tasklist = document.querySelector("task-list");
const newtask = {
    "id": 5,
    "title": "Do DAT152 home work",
    "status": "ACTIVE"
};
tasklist.showTask(newtask); */

// updateTask
/* const tasklist = document.querySelector("task-list");
const status = {
    "id": 1,
    "status": "ACTIVE"
};
tasklist.updateTask(status); */

// removeTask
/* const tasklist = document.querySelector("task-list");
tasklist.removeTask(1); */