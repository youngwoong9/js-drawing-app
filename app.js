const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const colors = [
  "#e74c3c",
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
];

let pointX;
let pointY;

function onMove(moveEvent) {
  const color = colors[Math.floor(Math.random() * colors.length)];

  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.strokeStyle = color;
  ctx.lineTo(moveEvent.offsetX, moveEvent.offsetY);
  ctx.stroke();

  canvas.addEventListener("click", onClick);
}

canvas.addEventListener("mousemove", onMove);

function onClick(clickEvent) {
  pointX = clickEvent.offsetX;
  pointY = clickEvent.offsetY;
}
