function setup() { //初始設定函數，只會執行一次
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); // 使畫布不攔截滑鼠事件
  generateSeaweeds(); // 生成海草資料
}

let seaweeds = [];

function generateSeaweeds() {
  for (let i = 0; i < 80; i++) { // 增加海草的數量
    let xBase = random(windowWidth); // 線條底部的 x 座標
    let yBase = windowHeight; // 線條底部的 y 座標
    let segmentLength = random(40, 80) / 10; // 每個枝節的長度
    let numSegments = int(random(4, (windowHeight / 2) / segmentLength)); // 枝節數量，確保不超過畫面中間
    let color = [random(150, 255), random(150, 255), random(150, 255), 200]; // 隨機亮色系顏色，並設置較高透明度
    let width = random(20, 50); // 增加隨機寬度
    seaweeds.push({ xBase, yBase, segmentLength, numSegments, color, width });
  }
}

function draw() {
  clear(); // 清除畫布，使背景透明
  blendMode(BLEND); // 設置 blend 模式
  
  for (let seaweed of seaweeds) {
    let { xBase, yBase, segmentLength, numSegments, color, width } = seaweed;
    stroke(color);
    strokeWeight(width);
    noFill(); // 不填充
    
    beginShape(); // 開始繪製形狀
    
    let x = xBase;
    let y = yBase;
    
    for (let i = 0; i < numSegments; i++) {
      let angle = sin(frameCount * 0.1 + i * 0.5) * 0.5; // 計算每個枝節的角度
      let xEnd = x + sin(angle) * segmentLength; // 使每個枝節左右搖晃
      let yEnd = y - segmentLength; // 每個枝節的 y 座標向上移動
      vertex(xEnd, yEnd); // 添加頂點
      x = xEnd;
      y = yEnd;
    }
    
    endShape(); // 結束繪製形狀
  }
}
