const template2 = document.createElement('template');
template2.innerHTML = `
    <style>
        /* The Modal (background) */
        .task-box {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }

        /* The Close Button */
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
    </style>

<!-- The Modal -->
<div class="task-box">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <label for="input-field">Title: </label>
    <input type="text" class="input-field" name="input-field"><br><br>
    <label for="status-select">Status: </label>
    <select class="status-select"></select>
    <br>
    <br>
    <button id="modal-button">Add Task</button>
  </div>

</div>

`;


class TaskBox extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template2.content.cloneNode(true));

        const taskBox = document.querySelector("task-box");
        var span = taskBox.shadowRoot.querySelector(".close");
        span.onclick = function() {
            taskBox.close();
        }

        function keyPress (e) {
            if(e.key === "Escape") {
                taskBox.close();
            }
        }
    }

    show() {
        let statusesString = "";
        this.statuses.forEach((statusItem) => {
            statusesString += '<option value="'+ statusItem +'">'+ statusItem +'</option>'               
        });

        const modal = this.shadowRoot.querySelector('.task-box');
        modal.style.display = "block";
        this.shadowRoot.querySelector('.status-select').innerHTML = statusesString;
    }

    setStatuseslist(list) {
        this.statuses = list;
    }

    newtaskCallback(callback) {  
        const shadowRoot = this.shadowRoot;
        shadowRoot.getElementById('modal-button').addEventListener('click', function() {
            let task = new Object();
            task.title = shadowRoot.querySelector(".input-field").value;
            task.status = shadowRoot.querySelector(".status-select").value;
            callback(task);
        });

    }

    close() {
        const modal = this.shadowRoot.querySelector('.task-box');
        modal.style.display = "none";
    }
}

window.customElements.define('task-box', TaskBox)



const taskbox = document.querySelector("TASK-BOX");
taskbox.newtaskCallback(
    (task) => {
        console.log(`Have '${task.title}' with status ${task.status}.`);
        taskbox.close();
} );
taskbox.setStatuseslist(["WATING","ACTIVE","DONE", "TEST"]);
taskbox.show();