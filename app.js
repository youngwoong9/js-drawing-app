// HTML에서 캔버스 가져오기
const canvas = document.querySelector("canvas");
// 2d 붓 생성.
const ctx = canvas.getContext("2d");

// 캔버스 크기 정하기
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH; //캔버스 너비
canvas.height = CANVAS_HEIGHT; //캔버스 높이
ctx.lineCap = "round";
// 마우스 움직임으로 선 긋기
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

// 범위에 따라 선 굵기 정하기
const brushWidth = document.querySelector("#line-width");
ctx.lineWidth = brushWidth.value;

function onLineWidthChange(changeEvent) {
  ctx.lineWidth = changeEvent.target.value;
}

brushWidth.addEventListener("change", onLineWidthChange);

// 범위에 따라 색 고르기.
const colorRange = document.querySelector("#color");

function onColorChange(changeEvent) {
  ctx.strokeStyle = changeEvent.target.value;
  ctx.fillStyle = changeEvent.target.value;
}

colorRange.addEventListener("change", onColorChange);

// 옵션에 따라 색 고르기.
const colorOptions = document.querySelectorAll(".color-option");

function onColorClick(clickEvent) {
  const colorValue = clickEvent.target.dataset.color;

  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  colorRange.value = colorValue;
}

colorOptions.forEach((colorBox) =>
  colorBox.addEventListener("click", onColorClick)
);

// 선분 버튼 or 채우기 버튼 고르기
const modeBtn = document.querySelector("#mode-btn");
let isFilling = false;

function onModeClick() {
  if (isFilling === true) {
    isFilling = false;
    modeBtn.innerText = "🖌️Draw";
  } else {
    isFilling = true;
    modeBtn.innerText = "🧪Fill";
  }
}

modeBtn.addEventListener("click", onModeClick);

// 채우기 모드 구현.
function onCanvasClick() {
  if (isFilling === true) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //옵션 버튼 누름(ctx.fillStyle(색상) 바뀜) -> canvas 마우스 누름(채운 사각형 구현)
  }
}

canvas.addEventListener("mousedown", onCanvasClick);

//초기화 버튼 구현.
const destroyBtn = document.querySelector("#destroy-btn");

function onDestroyClick() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

destroyBtn.addEventListener("click", onDestroyClick);

//지우개 버튼 구현.
const eraserBtn = document.querySelector("#eraser-btn");

function onEraserClick() {
  ctx.strokeStyle = "white"; // 지우개 모드 상태에서는 선분 상태이므로 isFilling 값을 false로 해야 정상 작동.
  isFilling = false;
  modeBtn.innerText = "draw-mode";
}

eraserBtn.addEventListener("click", onEraserClick); //지우개 버튼 클릭 시 자동으로 선분 상태로 돌아가는 bug 있음.

//canvas에 image 구현
const fileInput = document.querySelector("#file");

function onFileChange(changeEvent) {
  const file = changeEvent.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;

  function onInputCanvas() {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }

  image.addEventListener("load", onInputCanvas);
}

fileInput.addEventListener("change", onFileChange);

// 더블 클릭 시 text를 canvas에 붙이기.
const textInput = document.querySelector("#text");

function onDoubleClick(dblclickEvent) {
  const text = textInput.value;

  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "bold 60px sans-serif";
    ctx.fillText(text, dblclickEvent.offsetX, dblclickEvent.offsetY);
    ctx.restore();
  }
}

canvas.addEventListener("dblclick", onDoubleClick);

//image 저장 구현.
const saveBtn = document.querySelector("#save");

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing";
  a.click();
}

saveBtn.addEventListener("click", onSaveClick);
