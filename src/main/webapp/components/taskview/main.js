export default class extends HTMLElement {
    #tasklists
    #taskboxes

    constructor() {
        super();
        this.#tasklists = document.querySelectorAll('task-list');
        this.#taskboxes = document.querySelectorAll('task-box');

        this.#getAllstatuses();
        this.#getTasklist();

        const taskboxes = this.#taskboxes;
        const tasklists = this.#tasklists;
        const view = this;
        
        this.#tasklists.forEach((tasklist) => {
            tasklist.addtaskCallback(function() {
                taskboxes.forEach((taskbox) => {
                    taskbox.show();
                });
            });
        });

        this.#taskboxes.forEach((taskbox) => {
            taskbox.newtaskCallback(this.#postTask);
            taskbox.newtaskCallback(function() {
                taskbox.close();
            });
        });
    }

    async #getAllstatuses() {
        try {
            const response = await fetch('../TaskServices/api/services/allstatuses');
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        this.#taskboxes.forEach((taskbox) => {
                            taskbox.setStatuseslist(object.allstatuses);
                        });
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }

    async #getTasklist() {
        try {
            const response = await fetch('../TaskServices/api/services/tasklist');
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        this.#tasklists.forEach((tasklist) => {
                            object.tasks.forEach((task) => {
                                tasklist.showTask(task);
                            });
                            if(object.tasks.length == 0) {
                                tasklist.noTask();
                            }
                            tasklist.enableaddtask();
                        });
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }

    async #postTask(task) {
        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(task),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch("../TaskServices/api/services/task", requestSettings);
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {

                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server. Reason: " + e);
        }
    }

    async #putTask(task) {

    }

    async #deleteTask(task) {
        
    }
}