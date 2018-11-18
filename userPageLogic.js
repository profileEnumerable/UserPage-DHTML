



var priority_Node = null;
var status_Node = null;
var spanId = 1;
var lastId = 0;

$(document).mouseup(function () {
    if (showPriorityFlag) {
        $('#priority-container').fadeOut(300);
        showPriorityFlag = false;
    }
    if (showStatusFlag) {
        $('#status-container').fadeOut(300);
        showStatusFlag = false;
    }
});

window.onload = function () {
    //   SoftLogic.UserTaskDB.GetSaveUserTask(onComplete, onError);


    var content = $('.activeContent .content').html();
    $('.activeContent .content').empty();
    $('#content').html(content);

    $('.item').click(function () {
        var ChangeContent = $('#content').html();
        $('.activeContent .content').html(ChangeContent);
        $('.item').removeClass('activeContent');
        $(this).addClass('activeContent');
        content = $('.activeContent .content').html();

        $('.activeContent .content').empty();
        $('#content').html(content);
    });

    $('.design').click(function () {


        if (this.parentNode.id == 'priority-container') {
            priority_Node.style.color = 'white';
            priority_Node.innerHTML = this.innerText || this.textContent;
            priority_Node.style.backgroundColor = this.style.backgroundColor;
        }
        else {
            status_Node.style.color = 'white';
            status_Node.innerHTML = this.innerText || this.textContent;
            status_Node.style.backgroundColor = this.style.backgroundColor;
        }

    });

    $('.input_dotted').keyup(function (event) {

        if (event.keyCode === 13) {
            $('#enterHandler').click();
        }
    });
}

function AddInDB() {
    var taskText = document.getElementById('newTaskText').value;
    AddTaskInContainer(taskText, lastId + 1, false);
}

var showStatusFlag = false;
var parent_Id_status;
function setStatus(statusDiv) {
    if (!showStatusFlag) {
        status_Node = statusDiv;
        var statusContainer = document.getElementById('status-container');
        var positionStatus = statusDiv.getBoundingClientRect();
        statusContainer.style.left = positionStatus.left + -15 + 'px';
        statusContainer.style.top = positionStatus.top + 25 + 'px';
        $('#status-container').fadeIn(300);
        showStatusFlag = true;
    }
    else {
        status_Node = null;
    }
}

var showPriorityFlag = false;
function setPriority(priorityDiv) {
    if (!showPriorityFlag) {
        var priorityContainer = document.getElementById('priority-container');
        var positionPriority = priorityDiv.getBoundingClientRect();
        priority_Node = priorityDiv;
        priorityContainer.style.left = positionPriority.left + -20 + 'px';
        priorityContainer.style.top = positionPriority.top + 20 + 'px';
        $('#priority-container').fadeIn(300);
        showPriorityFlag = true;
    }
    else {
        priority_Node = null;
    }
}

function AddTaskInContainer(taskText, TaskId, saveFlag) {
    if (taskText) {
        lastId = TaskId;
        var readyTampleteTask = document.getElementsByClassName('filledTask')[0].cloneNode(true);
        readyTampleteTask.setAttribute('id', TaskId);
        document.getElementById('taskContainer').appendChild(readyTampleteTask);
        document.getElementsByClassName('taskText')[spanId].innerHTML = taskText;
        $('#' + TaskId).fadeIn(300);
        if (saveFlag) {
            //  SoftLogic.UserTaskDB.AddNewTask(taskText, TaskId, onComplete, onError);
        }
        spanId++;
        document.getElementById('newTaskText').value = null;
    }
}

function DeleteTask(delTask) {
    var del_parentNode = delTask.parentNode.id;
    $('#' + del_parentNode).fadeOut(300);
    //  SoftLogic.UserTaskDB.DeleteTask(delTask.parentNode.id, onComplete, onError);
}

function onComplete(result) {
    if (result) {
        for (var i in result) {
            console.log(i + " " + result[i]);
            AddTaskInContainer(result[i], i, false);
        }
    }
    console.log(result);
}
function onError(error) {
    alert(error._massege);
}
var priorityObj = {
    highest: "#c24332",
    high: "#ff7664",
    low: "#3add7c",
    lowest: "2b7a4d",
}
var statusObj = {
    stopped: "#c24332",
    ['in process']: "#e67e22",
    complete: "#2ecc71",
}

