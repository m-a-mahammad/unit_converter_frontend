function currentBtnDisplay(btns, currBtn, opts, parent) {
  btns.forEach((u) => {
    u.style.pointerEvents = "auto";
    u.style.color = "#000";
    u.style.borderBottom = "none";
  });
  currBtn.style.pointerEvents = "none";
  currBtn.style.color = "#fff";
  currBtn.style.borderBottom = "3px solid white";
  parent.forEach((s) => {
    s.innerHTML = opts;
  });
}

export { currentBtnDisplay };
