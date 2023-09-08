type Point = {
  x: number;
  y: number;
};

export const lineAtAngle = (
  x1: number,
  y1: number,
  length: number,
  angle: number,
  canvas: CanvasRenderingContext2D
): Point => {
  canvas.beginPath();
  canvas.moveTo(x1, y1);
  const radians = angle * (Math.PI / 180);
  const x2 = x1 + Math.cos(radians) * length;
  const y2 = y1 + Math.sin(radians) * length;
  canvas.lineTo(x2, y2);
  if (angle === -90) {
    canvas.strokeStyle = "blue";
  } else if (angle > -90 && angle < -45) {
    canvas.strokeStyle = "green";
  } else {
    canvas.strokeStyle = "black";
  }
  canvas.stroke();
  canvas.closePath();
  return { x: x2, y: y2 };
};
