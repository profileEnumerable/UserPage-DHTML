(function() {
  var taskManagment = {
    sortTask: function(parent, compareElem, orderPriorities) {
      if (typeof parent === "string") {
        parent = document.querySelector(parent);
      }

      var children = Array.from(parent.children); //creating array for sorting
      var compareProps = Object.keys(orderPriorities);

      children.sort(function(left, right) {
        var txtL = left.querySelector(compareElem).textContent;
        var txtR = right.querySelector(compareElem).textContent;

        if (compareProps.indexOf(txtL) < compareProps.indexOf(txtR)) {
          return -1;
        } else if (compareProps.indexOf(txtL) > compareProps.indexOf(txtR)) {
          return 1;
        }
        return 0;
      });

      for (let i = 0; i < children.length; i++) {
        parent.appendChild(children[i]);
      }
    }
  };

  window.taskManagment = taskManagment;
})();
