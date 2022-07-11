import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef();
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    console.log("log");
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      setInterval(() => {
        draw(ctx);
      }, 1000);
    }
  }, [canvasRef]);

  const draw = (ctx) => {
    ctx.save();
    ctx.clearRect(0, 0, 600, 600);
    ctx.translate(300, 300);

    ctx.save();

    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    // 获取当前 时，分，秒
    let time = new Date();
    let hour = time.getHours() % 12;
    let min = time.getMinutes();
    let sec = time.getSeconds();
    setCurrentTime(time.toLocaleTimeString());

    // 时针
    ctx.rotate(
      ((2 * Math.PI) / 12) * hour +
        ((2 * Math.PI) / 12) * (min / 60) -
        Math.PI / 2
    );
    ctx.beginPath();
    // moveTo设置画线起点
    ctx.moveTo(-10, 0);
    // lineTo设置画线经过点
    ctx.lineTo(40, 0);
    // 设置线宽
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.closePath();
    // 恢复成上一次save的状态
    ctx.restore();
    // 恢复完再保存一次
    ctx.save();

    //分针
    ctx.rotate(
      ((2 * Math.PI) / 60) * min +
        ((2 * Math.PI) / 60) * (sec / 60) -
        Math.PI / 2
    );

    ctx.beginPath();
    // moveTo设置画线起点
    ctx.moveTo(-10, 0);
    // lineTo设置画线经过点
    ctx.lineTo(60, 0);
    // 设置线宽
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
    // 恢复成上一次save的状态
    ctx.restore();
    // 恢复完再保存一次
    ctx.save();

    //秒针
    ctx.rotate(((2 * Math.PI) / 60) * sec - Math.PI / 2);
    ctx.beginPath();
    // moveTo设置画线起点
    ctx.moveTo(-10, 0);
    // lineTo设置画线经过点
    ctx.lineTo(80, 0);
    // 设置线宽
    ctx.lineWidth = 1;
    ctx.strokeStyle = "pink";
    ctx.stroke();
    ctx.closePath();
    // 恢复成上一次save的状态
    ctx.restore();
    // 恢复完再保存一次
    ctx.save();

    ctx.restore();
    ctx.restore();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>{currentTime}</div>
        <canvas id="canvas" width={600} height={600} ref={canvasRef}></canvas>
      </header>
    </div>
  );
}

export default App;
