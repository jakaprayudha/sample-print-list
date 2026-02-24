function axis(ctx, w, h, maxX, step = 100) {
  ctx.beginPath();
  ctx.moveTo(0, h - 20);
  ctx.lineTo(w, h - 20);
  ctx.stroke();

  ctx.font = "12px monospace";

  for (let i = 0; i <= maxX; i += step) {
    let x = (i / maxX) * w;

    ctx.beginPath();
    ctx.moveTo(x, h - 20);
    ctx.lineTo(x, h - 15);
    ctx.stroke();

    ctx.fillText(i, x - 8, h);
  }

  // unit label kanan
  ctx.fillText("fL", w - 20, h);
}
function gate(ctx, x, h) {
  ctx.setLineDash([5, 5]);

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, h - 20);
  ctx.stroke();

  ctx.setLineDash([]);
}

function curve(ctx, points) {
  ctx.beginPath();

  ctx.moveTo(points[0][0], points[0][1]);

  for (let p of points) {
    ctx.lineTo(p[0], p[1]);
  }

  ctx.stroke();
}

function chart(id, type) {
  const c = document.getElementById(id);
  const ctx = c.getContext("2d");

  c.width = 260;
  c.height = 140;

  let w = c.width;
  let h = c.height;

  if (type === "wbc") {
    axis(ctx, w, h, 400);

    gate(ctx, 70, h);
    gate(ctx, 140, h);

    curve(ctx, [
      [0, 100],
      [40, 40],
      [80, 60],
      [120, 90],
      [160, 100],
      [220, 80],
      [300, 70],
      [380, 90],
    ]);
  }

  if (type === "rbc") {
    axis(ctx, w, h, 250);

    curve(ctx, [
      [0, 120],
      [40, 90],
      [80, 30],
      [110, 20],
      [150, 60],
      [200, 110],
    ]);
  }
  if (type === "plt") {
    axis(ctx, w, h, 25, 5);

    // garis gate seperti alat
    gate(ctx, (20 / 25) * w, h);

    curve(ctx, [
      [0, 120],
      [30, 60],
      [60, 30],
      [90, 40],
      [120, 70],
      [160, 100],
      [200, 120],
    ]);
  }
}

chart("wbc", "wbc");
chart("rbc", "rbc");
chart("plt", "plt");
