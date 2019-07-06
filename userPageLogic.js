var priority_Node = null;
var status_Node = null;
var spanId = 1;
var lastId = 0;
var backlogContainer;

$(document).mouseup(function() {
  if (showPriorityFlag) {
    $("#priority-container").fadeOut(300);
    showPriorityFlag = false;
  }
  if (showStatusFlag) {
    $("#status-container").fadeOut(300);
    showStatusFlag = false;
  }
  $("#sprint-managment").fadeOut(300);

  $(document).ready(function() {
    $("input").keypress(function(event) {
      return event.keyCode === 13 ? false : true;
    });
  });
});

//SoftLogic.UserTaskDB.GetSaveUserTask(onComplete, onError) // need to return collection sprints and one backlog

backlogContainer = document.getElementById("taskContainer");

var viewSection = $("#content");

var content = $(".activeContent .content").html();
$(".activeContent .content").empty();
viewSection.html(content);

sprintDragDrop();

$(".item").click(function() {
  var ChangeContent = viewSection.html();
  $(".activeContent .content").html(ChangeContent);
  $(".item").removeClass("activeContent");
  $(this).addClass("activeContent");
  content = $(".activeContent .content").html();

  $(".activeContent .content").empty();
  viewSection.html(content);

  if (viewSection.children(".productContainer").length > 0) {
    backlogDragDrop();
  } else {
    sprintDragDrop();
  }
});

$(".design").click(function() {
  if (this.parentNode.id === "priority-container") {
    priority_Node.style.color = "white";
    priority_Node.innerHTML = this.innerText || this.textContent;
    priority_Node.style.backgroundColor = this.style.backgroundColor;
  } else {
    status_Node.style.color = "white";
    status_Node.innerHTML = this.innerText || this.textContent;
    status_Node.style.backgroundColor = this.style.backgroundColor;
  }
});

$("#newTaskText").keyup(function(event) {
  if (event.keyCode === 13) {
    $("#enterHandler").click();
  }
});

$(".create-sprint").click(function(event) {
  if (event.screenX != 0) {
    event.preventDefault();
    var lastSprint = document.getElementById("sprint-backlog-container")
      .lastElementChild;
    var sprintItemTemplate = $(".sprint-backlog-item")[0].cloneNode(true);

    if (lastSprint !== null) {
      var newSprintId =
        "sprint-item-" + (parseInt(lastSprint.id.split("-")[2]) + 1);
    } else {
      newSprintId = "sprint-item-1";
    }

    sprintItemTemplate.setAttribute("id", newSprintId);

    document
      .getElementById("sprint-backlog-container")
      .appendChild(sprintItemTemplate);

    sprintItemTemplate.getElementsByClassName(
      "sprint-name"
    )[0].innerHTML = newSprintId;

    $("#" + newSprintId).fadeIn(300);
  }
});

$("#delete-sprint").click(function() {
  $("#" + currentSprint.id).fadeOut(300);
  $("#" + currentSprint.id).remove();
});

$(".sprint-dropp-area").bind("DOMSubtreeModified", function(event) {
  //console.log(event.originalEvent.target);
});

var currentSprint;

function ResetPosition(obj) {
  obj.style.left = 0;
  obj.style.top = 0;

  obj.style.zIndex = "0";
}

function backlogDragDrop() {
  var draggUserTask;

  $(".draggUserItem").draggable({
    stop: function() {
      for (let index = 0; index < 2; index++) {
        $(".overlayDiv")[0].remove();
      }
      ResetPosition(this);
    },
    start: function() {
      this.style.zIndex = "200";

      if (this.getElementsByClassName("sprint-task")[0] === undefined) {
        for (let index = 0; index < 3; index++) {
          var dropContainer = document.getElementsByClassName("droppUserItem")[
            index
          ];

          if (!dropContainer.contains(this)) {
            var overlayDiv = document.createElement("div");

            overlayDiv.setAttribute("class", "overlayDiv");

            dropContainer.appendChild(overlayDiv);
          }
        }
      }
    },
    drag: function() {
      draggUserTask = this;
    }
  });

  var overlayDiv;

  $(".droppUserItem").droppable({
    drop: function() {
      this.appendChild(draggUserTask);
    },

    over: function() {
      overlayDiv = this.getElementsByClassName("overlayDiv")[0];

      if (overlayDiv !== undefined) {
        overlayDiv.style.backgroundColor = "#f3f9f4";
        overlayDiv.style.border = "3px dashed #14892c";
      }
    },

    out: function() {
      if (overlayDiv !== undefined) {
        overlayDiv.style.backgroundColor = "";
        overlayDiv.style.border = "";
      }
    }
  });
}

function sprintDragDrop() {
  var dragSprintTask;

  $(".sprint-dragg-task").draggable({
    stop: function() {
      ResetPosition(this);
    },
    start: function() {
      this.style.zIndex = "1000";
    },
    drag: function() {
      dragSprintTask = this;
    }
  });

  $(".sprint-dropp-area").droppable({
    drop: function() {
      var hintdropp = this.getElementsByClassName("hintPlaceDrop")[0];

      if (hintdropp !== undefined) {
        hintdropp.remove();
      }
      this.appendChild(dragSprintTask);
    }
  });
}

function managmentSprint(event) {
  var sprintConfig = document.getElementById("sprint-managment");

  var positionSprConf = event.getBoundingClientRect();

  sprintConfig.style.left = positionSprConf.left - 40 + "px";
  sprintConfig.style.top = positionSprConf.top + 50 + "px";

  $("#sprint-managment").fadeIn(300);

  var managmentBlock = event.parentNode;

  currentSprint = managmentBlock.parentNode;
}

function AddInDB() {
  var taskText = document.getElementById("newTaskText").value;

  var taskObj = { TaskText: taskText, Id: lastId + 1 };

  AddTaskInContainer(taskObj, true);
}

var showStatusFlag = false;
var parent_Id_status;

function setStatus(statusDiv) {
  if (!showStatusFlag) {
    status_Node = statusDiv;
    var statusContainer = document.getElementById("status-container");
    var positionStatus = statusDiv.getBoundingClientRect();
    statusContainer.style.left = positionStatus.left + -15 + "px";
    statusContainer.style.top = positionStatus.top + 25 + "px";
    $("#status-container").fadeIn(300);
    showStatusFlag = true;
  } else {
    status_Node = null;
  }
}

var showPriorityFlag = false;

function setPriority(priorityDiv) {
  if (!showPriorityFlag) {
    var priorityContainer = document.getElementById("priority-container");
    var positionPriority = priorityDiv.getBoundingClientRect();
    priority_Node = priorityDiv;
    priorityContainer.style.left = positionPriority.left + -20 + "px";
    priorityContainer.style.top = positionPriority.top + 20 + "px";
    $("#priority-container").fadeIn(300);
    showPriorityFlag = true;
  } else {
    priority_Node = null;
  }
}

function SetPriorityStatus(sourseContent, classItem, taskObj, nameProp) {
  var text = Object.keys(sourseContent)[taskObj[nameProp]];

  var obj = readyTampleteTask.getElementsByClassName(classItem)[0];

  if (text) {
    obj.innerHTML = text;
    obj.style.backgroundColor = sourseContent[text];
    obj.style.color = "white";
  }
}

var readyTampleteTask;

function GetCurrentCountTask(id) {
  return document.getElementById(id).childNodes.length - 1 + " item(s)";
}

function AddTaskInContainer(taskObj, saveFlag) {
  var trimedTaskText = taskObj.TaskText.trim();

  if (trimedTaskText.length != 0) {
    lastId = taskObj.Id;
    readyTampleteTask = document
      .getElementsByClassName("filledTask")[0]
      .cloneNode(true);
    readyTampleteTask.setAttribute("id", taskObj.Id);

    document.getElementById("taskContainer").appendChild(readyTampleteTask);
    document.getElementsByClassName("taskText")[
      spanId
    ].innerHTML = trimedTaskText;

    SetPriorityStatus(priorityObj, "sprint-priority", taskObj, "PriorityId");
    SetPriorityStatus(statusObj, "status", taskObj, "StatusId");

    $("#" + taskObj.Id).fadeIn(300);

    if (saveFlag) {
      //SoftLogic.UserTaskDB.AddNewTask(taskObj.TaskText, taskObj.Id, onComplete, onError);
    }

    $(".backlog-counter")[0].innerHTML = GetCurrentCountTask("taskContainer");

    spanId++;

    document.getElementById("newTaskText").value = null;
  }
}

function DeleteTask(delTask) {
  spanId--;
  var del_parentNode = delTask.parentNode.id;
  $("#" + del_parentNode).fadeOut(300);
  $("#" + del_parentNode).remove();

  $(".backlog-counter")[0].innerHTML = GetCurrentCountTask("taskContainer");

  //SoftLogic.UserTaskDB.DeleteTask(delTask.parentNode.id, onComplete, onError); check this
}

function onComplete(result) {
  console.log(result);
}

function onError(error) {
  alert(error._massege);
}

var priorityObj = {
  highest: "#c24332",
  high: "#ff7664",
  low: "#3add7c",
  lowest: "2b7a4d"
};

var statusObj = {
  stopped: "#c24332",
  ["in process"]: "#e67e22",
  complete: "#2ecc71"
};
