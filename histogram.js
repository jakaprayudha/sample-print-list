function scaleX(value, maxX, width) {
  return (value / maxX) * width;
}

function drawAxis(ctx, width, height, maxX) {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, height - 10);
  ctx.lineTo(width, height - 10);
  ctx.stroke();

  ctx.font = "9px monospace";

  for (let i = 0; i <= maxX; i += maxX / 3) {
    let x = scaleX(i, maxX, width);

    ctx.beginPath();
    ctx.moveTo(x, height - 10);
    ctx.lineTo(x, height - 5);
    ctx.stroke();

    ctx.fillText(Math.round(i), x - 6, height);
  }
}

function drawGate(ctx, value, maxX, width, height) {
  let x = scaleX(value, maxX, width);

  ctx.save();
  ctx.setLineDash([4, 4]);

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height - 10);
  ctx.stroke();

  ctx.restore();

  return x; // return posisi pixel untuk label
}

function drawCurve(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);

  for (let p of points) {
    ctx.lineTo(p[0], p[1]);
  }

  ctx.stroke();
}

function drawVerticalLabel(ctx, text, x, height) {
  ctx.save();

  ctx.translate(x, height / 2);
  ctx.rotate(-Math.PI / 2);

  ctx.font = "bold 9px monospace";
  ctx.textAlign = "center";

  ctx.fillText(text, 0, 0);

  ctx.restore();
}

function createChart(id, type) {
  const c = document.getElementById(id);
  const ctx = c.getContext("2d");

  c.width = 180;
  c.height = 70;

  const w = c.width;
  const h = c.height;

  ctx.lineWidth = 1.2;

  if (type === "wbc") {
    const maxX = 300;

    drawAxis(ctx, w, h, maxX);

    let g1 = drawGate(ctx, 50, maxX, w, h);
    let g2 = drawGate(ctx, 100, maxX, w, h);
    let g3 = drawGate(ctx, 150, maxX, w, h);

    drawVerticalLabel(ctx, "WBC", g3, h);

    drawCurve(ctx, [
      [0, 50],
      [20, 40],
      [40, 30],
      [60, 35],
      [80, 45],
      [100, 50],
      [130, 45],
      [160, 30],
      [200, 25],
      [240, 20],
      [280, 35],
      [300, 50],
    ]);
  }

  if (type === "rbc") {
    const maxX = 300;

    drawAxis(ctx, w, h, maxX);

    let g = drawGate(ctx, 90, maxX, w, h);

    drawVerticalLabel(ctx, "RBC", g, h);

    drawCurve(ctx, [
      [0, 60],
      [40, 50],
      [70, 20],
      [100, 5],
      [130, 20],
      [160, 50],
      [200, 65],
    ]);
  }

  if (type === "plt") {
    const maxX = 25;

    drawAxis(ctx, w, h, maxX);

    let g = drawGate(ctx, 15, maxX, w, h);

    drawVerticalLabel(ctx, "PLT", g, h);

    drawCurve(ctx, [
      [0, 60],
      [20, 40],
      [40, 20],
      [80, 10],
      [120, 20],
      [150, 40],
      [180, 60],
    ]);
  }
}

createChart("wbc", "wbc");
createChart("rbc", "rbc");
createChart("plt", "plt");
