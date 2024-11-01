$(document).ready(() => {
  fetchBoard();
  $("#validate").click(() => validateBoard());
  $("#reset").click(() => {
    fetchBoard();
    hideMessage(message);
  });
});

const fetchBoard = () => {
  $.getJSON(
    "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1",
    (data) => {
      var board = data.board;
      var number = "";
      for (var i = 0; i < board.length; i++) {
        number +=
          '<input type="text" maxlength="1" ' +
          (board[i] === "x" ? "" : 'value="' + board[i] + '" readonly') +
          ">";
      }
      $("#sudoku-board").html(number);
    }
  );
};

const showMessage = (message, color) => {
  $("#message").text(message).css("background-color", color).show();
};

const hideMessage = (message) => {
  $("#message").text(message).hide();
};

const validateBoard = () => {
  var isValid = true;
  $("#sudoku-board input").each(function () {
    if (
      !$(this).val() ||
      isNaN($(this).val()) ||
      $(this).val() <= 0 ||
      $(this).val() > 9
    ) {
      isValid = false;
      return false;
    }
  });

  if (isValid) {
    showMessage("Checking solution...", "darkcyan");
    checkSolution();
  } else {
    showMessage("Please fill all cells with numbers 1-9.", "red");
  }
};

const checkSolution = () => {
  $.getJSON(
    "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuSolutions/1",
    (data) => {
      var solution = data.solution;
      var userSolution = "";
      $("#sudoku-board input").each(function () {
        userSolution += $(this).val();
      });

      if (userSolution === solution) {
        showMessage("You solved the Sudoku. Not so dumb!", "green");
      } else {
        showMessage("Incorrect solution. Please try again.", "red");
      }
    }
  );
};
