const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const brushWidth = document.querySelector("#line-width");
ctx.lineWidth = brushWidth.value;

let isPainting = false;

function drawPainting(moveEvent) {
  if (isPainting === true) {
    ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
    ctx.stroke();
    return; // 선을 그리는 동안 moveTo 메소드 작동 금지.
  }

  ctx.moveTo(moveEvent.offsetX, moveEvent.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath(); // 마우스를 떼면 기존 경로 차단.
}

canvas.addEventListener("mousemove", drawPainting);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

function onLineWidth(changeEvent) {
  ctx.lineWidth = changeEvent.target.value;
}

brushWidth.addEventListener("change", onLineWidth);
