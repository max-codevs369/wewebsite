function filterSelection(category, clickedBtn) {
      var x = document.getElementsByClassName("gallery-item");

      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("hidden");

        if (category !== "all") {
          if (!x[i].classList.contains(category)) {
            x[i].classList.add("hidden");
          }
        }
      }

      if (clickedBtn) {
        var btns = document.getElementsByClassName("filter-btn");
        
        var activeClasses = ["bg-primary", "text-white", "border-primary"];
        var inactiveClasses = ["bg-white", "text-body-color", "border-stroke", "dark:bg-dark", "dark:text-dark-6"];

        for (var i = 0; i < btns.length; i++) {
          btns[i].classList.remove(...activeClasses);
          btns[i].classList.add(...inactiveClasses);
        }

        clickedBtn.classList.remove(...inactiveClasses);
        clickedBtn.classList.add(...activeClasses);
      }
}