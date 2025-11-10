import { currentBtnDisplay } from "./add-tab-contents.util.js";
import { lengthOpts, tempOpts, weightOpts } from "./constants.js";

const lengthBtn = document.getElementById("lengthTab");
const weightBtn = document.getElementById("weightTab");
const tempBtn = document.getElementById("tempTab");
const resetBtn = document.getElementById("resetBtn");

const calcForm = document.getElementById("conversion_form");

const unitBtns = document.querySelectorAll(".unitBtn");
const selectBtn = document.querySelectorAll(".selectBtn");

const lengthInp = document.getElementById("lengthInp");

const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const conversionResult = document.querySelector(".conversion_result");
const calcResult = document.querySelector(".calc_result");

lengthBtn.addEventListener("click", () => {
  calcForm.style.display = "block";
  conversionResult.style.display = "none";
  currentBtnDisplay(unitBtns, lengthBtn, lengthOpts, selectBtn);
});
weightBtn.addEventListener("click", () => {
  calcForm.style.display = "block";
  conversionResult.style.display = "none";
  currentBtnDisplay(unitBtns, weightBtn, weightOpts, selectBtn);
});
tempBtn.addEventListener("click", () => {
  calcForm.style.display = "block";
  conversionResult.style.display = "none";
  currentBtnDisplay(unitBtns, tempBtn, tempOpts, selectBtn);
});
resetBtn.addEventListener("click", () => {
  calcForm.style.display = "block";
  conversionResult.style.display = "none";
});

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.endsWith("#weight")) {
      currentBtnDisplay(unitBtns, weightBtn, weightOpts, selectBtn);
      return;
    } else if (window.location.href.endsWith("#temperature")) {
      currentBtnDisplay(unitBtns, tempBtn, tempOpts, selectBtn);
      return;
    } else {
      currentBtnDisplay(unitBtns, lengthBtn, lengthOpts, selectBtn);
    }
  });
})();

window.addEventListener("DOMContentLoaded", () => {
  calcForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const value = lengthInp.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    const res = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        length: value,
        fromUnit: from,
        toUnit: to,
      }),
    });

    const { result, resultUnit, lengthUnit } = JSON.parse(await res.text());
    calcForm.style.display = "none";
    conversionResult.style.display = "block";
    calcResult.textContent = `${value}${lengthUnit} = ${result}${resultUnit}`;
  });
});
