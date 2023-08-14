const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 20, 100);
ctx.fillRect(350, 200, 20, 100);

ctx.fillRect(260, 200, 50, 200);
ctx.arc(285, 140, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(265, 130, 10, Math.PI, 2 * Math.PI);
ctx.arc(305, 130, 10, Math.PI, 2 * Math.PI);
ctx.fill();
