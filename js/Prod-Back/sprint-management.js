(function() {
  var currentSprint;

  $("#delete-sprint").click(function() {
    $("#" + currentSprint.id).fadeOut(300);
    $("#" + currentSprint.id).remove();
  });

  $(".counter-esimate-btn").click(function() {
    var sprintConfig = document.getElementById("sprint-managment");

    var positionSprConf = this.getBoundingClientRect();

    sprintConfig.style.left = positionSprConf.left - 40 + "px";
    sprintConfig.style.top = positionSprConf.top + 50 + "px";

    $("#sprint-managment").fadeIn(300);

    var managmentBlock = this.parentNode;

    currentSprint = managmentBlock.parentNode;
  });
})();
