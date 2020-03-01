// Дэлгэцтэй ажиллах controller
var uiController = (function() {
  var DomStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDev: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function(number, type) {
    number = "" + number;
    var x = number
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);

    type === "inc" ? (z = "+ " + z) : (z = "- " + z);
    console.log(z);
    return z;
  };

  return {
    displayDate: function() {
      var today = new Date();

      document.querySelector(DomStrings.dateLabel).textContent =
        today.getFullYear() + " оны " + today.getMonth() + " сарын ";
    },

    changeType: function() {
      var fields = document.querySelectorAll(
        DomStrings.inputType +
          ", " +
          DomStrings.inputDescription +
          ", " +
          DomStrings.inputValue
      );
      nodeListForeach(fields, function(el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DomStrings.addBtn).classList.toggle("red");
    },

    getInput: function() {
      return {
        type: document.querySelector(DomStrings.inputType).value,
        description: document.querySelector(DomStrings.inputDescription).value,
        value: parseInt(document.querySelector(DomStrings.inputValue).value)
      };
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DomStrings.inputDescription + ", " + DomStrings.inputValue
      );
      // Convert List to array
      var fieldsArr = Array.prototype.slice.call(fields);

      // ES 6 стандарт
      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      // Cursor-ыг байрлуулна.
      fieldsArr[0].focus();
      //  fieldsArr.forEach -ээр товчилж 32-р мөрөнд үзүүлсэн байна.
      // console.log((fieldsArr[0] = 0));
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },

    tusviigUzluuleh: function(tusuv) {
      var type;
      tusuv.tusuv > 0 ? (type = "inc") : (type = "exp");
      document.querySelector(DomStrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DomStrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DomStrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );

      tusuv.huvi === 0
        ? (document.querySelector(DomStrings.percentageLabel).textContent =
            tusuv.huvi)
        : (document.querySelector(DomStrings.percentageLabel).textContent =
            tusuv.huvi + "%");
    },

    displayPercentages: function(allPersentages) {
      // Зарлагын NodeList-ыг олох
      var elements = document.querySelectorAll(
        DomStrings.expensePercentageLabel
      );
      // Элемент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function(el, index) {
        el.textContent = allPersentages[index] + "%";
      });
    },

    getDOMstrings: function() {
      return DomStrings;
    },

    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function(item, type) {
      // Орлого зарлагын элементийг агуулсан HTML бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DomStrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DomStrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // HTMl дотроо орлого зарлагын утгуудыг replace ашиглаж өгнө:.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));
      // Бэлтгэсэн HTML -ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    totalIncome > 0
      ? (this.percentage = Math.round((this.value / totalIncome) * 100))
      : (this.percentage = 0);
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: []
    },

    totals: {
      inc: 0,
      exp: 0
    },

    tusuv: 0,

    huvi: 0
  };
  return {
    tusuvTootsooloh: function() {
      // Нийт орлогын нийлбэрийг тооцоолно.
      calculateTotal("inc");
      // Нийт зарлагын нийлбэрийг тооцоолно.
      calculateTotal("exp");

      // Төсвийг шинээр тооцоолно.
      data.tusuv = data.totals.inc - data.totals.exp;

      // Орлого зарлагын хувийг тооцоолно.
      data.totals.inc
        ? (data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100))
        : (data.huvi = 0);
    },

    calcPercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPersentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPersentages;
    },

    tusuvAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },

    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });

      console.log("ids: " + ids);
      var index = ids.indexOf(id);

      console.log("index: " + index);

      if (index !== -1) {
        console.log("Устгах гэж байна.");
        data.items[type].splice(index, 1);
      }
    },

    addItem: function(type, desc, val) {
      var item, id;

      data.items[type].length === 0
        ? (id = 1)
        : (id = data.items[type][data.items[type].length - 1].id + 1);

      type === "inc"
        ? (item = new Income(id, desc, val))
        : (item = new Expense(id, desc, val));

      data.items[type].push(item);

      return item;
    },
    seeData: function() {
      return data;
    }
  };
})();

// Програмын холбогч controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    // 1.Оруулах өгөгдлийг дэлгэцнээс олж авна.
    var input = uiController.getInput();
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн controller луу дамжуулна.
    if (input.description !== "" && input.value > 0) {
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
    } else {
      alert(" Талбарыг бүрэн оруулна уу");
    }
    // Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
    updateTusuv();
  };

  var updateTusuv = function() {
    // 1. Төсвийг тооцоолно.
    financeController.tusuvTootsooloh();
    // 2. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
    var tusuv = financeController.tusuvAvah();

    //3. Төсвийн тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzluuleh(tusuv);

    // 4. Элементүүдийн хувийг тооцоолно
    financeController.calcPercentages();
    // 5. Элементүүдийн хувийг хүлээж авна.
    var allPersentages = financeController.getPercentages();
    // 6. Элементүүдийн хувийг дэлгэцэнд гаргана.
    uiController.displayPercentages(allPersentages);
    // console.log(allPersentages);
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

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);

    document
      .querySelector(DOM.containerDev)
      .addEventListener("click", function(e) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          // 1. Санхүүгийн модулиас type, id ашиглаад устгана
          financeController.deleteItem(type, itemId);

          // 2. Дэлгэц дээрээс устгана.
          uiController.deleteListItem(id);
          // 3. Үлдэгдэл тооцоог шинэчилж харуулна.
          updateTusuv();
        }
      });
  };

  return {
    init: function() {
      console.log("Application started ...");
      uiController.displayDate();
      uiController.tusviigUzluuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventlisteners();
    }
  };
})(uiController, financeController);

appController.init();
