// Дэлгэцтэй ажиллах controller
var uiController = (function() {})();

// Санхүүтэй ажиллах controller
var financeController = (function() {})();

// Програмын холбогч controller
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    // 1.Оруулах өгөгдлийг дэлгэцнээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн controller луу дамжуулна.
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
    console.log("Дэлгэцээс өгөгдлөө авах хэсэг");
  };
  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
