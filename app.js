// Дэлгэцтэй ажиллах controller
var uiController = (function() {
  var DomStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DomStrings.inputType).value,
        description: document.querySelector(DomStrings.inputDescription).value,
        value: document.querySelector(DomStrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DomStrings;
    }
  };
})();

// Санхүүтэй ажиллах controller
var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
})();

// Програмын холбогч controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    console.log(uiController.getInput());
    // 1.Оруулах өгөгдлийг дэлгэцнээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн controller луу дамжуулна.
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
  };

  var setupEventlisteners = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Application started ...");
      setupEventlisteners();
    }
  };
})(uiController, financeController);

appController.init();
