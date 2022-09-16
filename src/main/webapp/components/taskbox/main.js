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

        const taskBox = document.querySelector("task-box");
        var span = taskBox.#shadow.querySelector(".close");
        span.onclick = function() {
            taskBox.close();
        }

        function keyPress (e) {
            if(e.key === "Escape") {
                taskBox.close();
            }
        }
    }

    #createStyle() {
        const style = `
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
        `;
        const styleElement = document.createElement('style');
        styleElement.insertAdjacentHTML('beforeend', style);
        this.#shadow.appendChild(styleElement);
        return styleElement;
    }

    #createHTML() {
        const content = `
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
        const wrapper = document.createElement('div');
        wrapper.insertAdjacentHTML('beforeend', content);
        this.#shadow.appendChild(wrapper);
        return wrapper;
    }

    show() {
        let statusesString = "";
        this.#statuses.forEach((status) => {
            const option = new Option(status, status);
            this.#shadow.querySelector('.status-select').appendChild(option);
        });

        const modal = this.#shadow.querySelector('.task-box');
        modal.style.display = "block";
    }

    setStatuseslist(list) {
        this.#statuses = list;
    }

    newtaskCallback(callback) {  
        const shadow = this.#shadow;
        shadow.getElementById('modal-button').addEventListener('click', function() {
            let task = {
                title : shadow.querySelector(".input-field").value,
                status : shadow.querySelector(".status-select").value
            };
            callback(task);
        });

    }

    close() {
        const modal = this.#shadow.querySelector('.task-box');
        modal.style.display = "none";
    }
}