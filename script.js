(function () {
    "use strict";

    var STEPS = [1, 1.15, 1.3, 1.45];
    var STORAGE_KEY = "font-scale-index";
    var root = document.documentElement;
    var desktopQuery = window.matchMedia("(min-width: 601px)");

    function getMaxIndex() {
        return desktopQuery.matches ? STEPS.length - 2 : STEPS.length - 1;
    }

    function readSavedIndex() {
        var saved = parseInt(localStorage.getItem(STORAGE_KEY), 10);
        if (isNaN(saved) || saved < 0 || saved >= STEPS.length) {
            return 0;
        }
        return saved;
    }

    var currentIndex = readSavedIndex();

    function applyScale() {
        var maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        root.style.setProperty("--font-scale", STEPS[currentIndex]);
        try {
            localStorage.setItem(STORAGE_KEY, currentIndex);
        } catch (e) {
        }
    }

    function handleClick(event) {
        var maxIndex = getMaxIndex();
        var action = event.currentTarget.getAttribute("data-font-action");
        if (action === "increase" && currentIndex < maxIndex) {
            currentIndex++;
        } else if (action === "decrease" && currentIndex > 0) {
            currentIndex--;
        } else if (action === "reset") {
            currentIndex = 0;
        }
        applyScale();
    }

    desktopQuery.addEventListener("change", applyScale);

    document.addEventListener("DOMContentLoaded", function () {
        applyScale();
        var buttons = document.querySelectorAll("[data-font-action]");
        buttons.forEach(function (btn) {
            btn.addEventListener("click", handleClick);
        });
    });
})();