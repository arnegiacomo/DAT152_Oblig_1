export default class extends HTMLElement {
    #shadow;
    #statuses;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        // If open, property "shadowRoot" will be an outside entrance to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#createStyle();
        this.#createHTML();
        this.#shadow.querySelector('#task-button').disabled = true;
    }

    #createStyle() {
        const style = `
            th, td {
                text-align: left;
                padding: 10px;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.insertAdjacentHTML('beforeend', style);
        this.#shadow.appendChild(styleElement);
        return styleElement;
    }

    #createHTML() {
        const content = `
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
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }

    setStatuseslist(statuses) {
        this.#statuses = statuses;
    }

    enableaddtask() {
        this.#shadow.querySelector('#task-button').disabled = false;
    }

    addtaskCallback(callback) {
        this.#shadow.querySelector('#task-button').addEventListener('click', callback);
    }

    changestatusCallback(callback) {
        this.#shadow.querySelectorAll('.status-select').forEach((selector) => {
            selector.addEventListener('change', function() {

                const id = this.parentNode.parentNode.id;
                const status = selector.options[selector.selectedIndex].text;
                const taskTitle =  this.parentNode.parentNode.firstElementChild.textContent;

                if(confirm('Set ' + '\'' + taskTitle + '\'' + ' to ' + status + '?')) {
                    callback(id, status);
                }

                selector.value = 'DEFAULT';
            }); 
        });
    }

    deletetaskCallback(callback) {
        this.#shadow.querySelectorAll('.remove-button').forEach((deleteButton) => {
            deleteButton.addEventListener('click', function() {
                const id = this.parentNode.parentNode.id;
                const taskName =  this.parentNode.parentNode.firstElementChild.textContent;

                if(confirm('Delete task ' + '\'' + taskName + '\'' + '?')) {
                    callback(id);
                }
            });
        });
    }

    noTask() {
        this.#shadow.getElementById('status-text').innerText = "No tasks were found.";
    }

    showTask(newtask) {
        let statusesString = "";
        this.#statuses.forEach((statusItem) => {
            statusesString += '<option value="'+ statusItem +'">'+ statusItem +'</option>'               
        });
        let newtaskHTML = 
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
            '</td>';
        const wrapper = document.createElement('tr');
        wrapper.setAttribute('id', newtask.id);
        wrapper.insertAdjacentHTML('beforeend', newtaskHTML);
        this.#shadow.querySelector('.task-list-table').appendChild(wrapper);
        this.#shadow.getElementById('status-text').innerText = "";
    }
    
    updateTask(status) {
        const row = this.#shadow.getElementById(status.id);
        row.children[1].innerText = status.status;
    }

    removeTask(id) {
        const row = this.#shadow.getElementById(id);
        row.remove();
    }
}
