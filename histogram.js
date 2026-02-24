function drawAxis(ctx, width, height, maxX) {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  // axis
  ctx.beginPath();
  ctx.moveTo(0, height - 10);
  ctx.lineTo(width, height - 10);
  ctx.stroke();

  // ticks
  ctx.font = "9px monospace";

  for (let i = 0; i <= maxX; i += 100) {
    let x = (i / maxX) * width;
    ctx.beginPath();
    ctx.moveTo(x, height - 10);
    ctx.lineTo(x, height - 5);
    ctx.stroke();

    ctx.fillText(i, x - 5, height);
  }
}

function drawGate(ctx, x, height) {
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height - 10);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawCurve(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);

  for (let p of points) {
    ctx.lineTo(p[0], p[1]);
  }

  ctx.stroke();
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
    drawAxis(ctx, w, h, 300);

    // gates
    drawGate(ctx, 50, h);
    drawGate(ctx, 100, h);
    drawGate(ctx, 150, h);

    // curve shape BC-2800 style
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
    drawAxis(ctx, w, h, 300);

    drawGate(ctx, 90, h);

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
    drawAxis(ctx, w, h, 25);

    drawCurve(ctx, [
      [0, 60],
      [3, 40],
      [6, 20],
      [10, 10],
      [15, 20],
      [20, 40],
      [25, 60],
    ]);
  }
}

createChart("wbc", "wbc");
createChart("rbc", "rbc");
createChart("plt", "plt");
