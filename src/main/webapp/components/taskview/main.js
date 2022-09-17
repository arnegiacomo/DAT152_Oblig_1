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
        
        this.#tasklists.forEach((tasklist) => {
            tasklist.addtaskCallback(function() {
                taskboxes.forEach((taskbox) => {
                    taskbox.show();
                });
            });
        });

        this.#taskboxes.forEach((taskbox) => {
            taskbox.newtaskCallback(this.#postTask.bind(this));
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
                        console.log(object);
                        this.#taskboxes.forEach((taskbox) => {
                            taskbox.setStatuseslist(object.allstatuses);
                        });
                        this.#tasklists.forEach((tasklist) => {
                            tasklist.setStatuseslist(object.allstatuses);
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
                            console.log(object);
                            object.tasks.forEach((task) => {
                                tasklist.showTask(task);
                            });
                            if(object.tasks.length == 0) {
                                tasklist.noTask();
                            }
                            tasklist.enableaddtask();
                            tasklist.changestatusCallback(this.#putTask.bind(this));
                            tasklist.deletetaskCallback(this.#deleteTask.bind(this));
                        });
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
                        console.log(object);
                        this.#tasklists.forEach((tasklist) => {
                            tasklist.showTask(object.task);
                            console.log(object.task);
                        });
                        // TODO kan ikke forandre nye tasks pga de ikke har ID, reload nødvendig
                        // Dette skyldes feil i API-et
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

    async #putTask(id, status) {
        const obj = {
            "status" : status
        }
        const requestSettings = {
            "method": "PUT",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(obj),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch("../TaskServices/api/services/task/" + id, requestSettings);
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        console.log(object);
                        const newStatus = {
                            "status" : object.status,
                            "id" : object.id
                        }
                        this.#tasklists.forEach((tasklist) => {
                            tasklist.updateTask(newStatus);
                        });
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

    async #deleteTask(id) {
        const requestSettings = {
            "method": "DELETE",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch("../TaskServices/api/services/task/" + id, requestSettings);
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        console.log(object);
                        this.#tasklists.forEach((tasklist) => {
                            tasklist.removeTask(id);
                        });
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
}