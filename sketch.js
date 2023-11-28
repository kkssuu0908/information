let img;
let canvas;
let selectedNumber = null;
let fallBalls = [];
let maxNumberInput;
let minRangeInput, maxRangeInput, numBallsInput;
let drawButton;
let resetButton;
let backButton;

function preload(){
  img=loadImage(".jpg");
}

function setup() {
  createCanvas(600, 600);

  // Check if the buttons and inputs exist before creating them
  if (!drawButton) {
    // "기존 뽑기" 버튼 생성
    drawButton = createButton('기존 뽑기').position(10, 620).mousePressed(setupDefaultDrawing);
  }

  if (!resetButton) {
    // "범위 뽑기" 버튼 생성
    resetButton = createButton('범위 뽑기').position(120, 620).mousePressed(setupRangeDrawing);
  }

  // 초기 그림 그리기 함수 호출
  draw();
}

function goToInitialScreen() {
  // 모든 버튼 및 입력 필드 제거
  removeAllElements();

  // "기존 뽑기" 버튼 생성
  drawButton = createButton('기존 뽑기').position(10, 620).mousePressed(setupDefaultDrawing);

  // "범위 뽑기" 버튼 생성
  resetButton = createButton('범위 뽑기').position(120, 620).mousePressed(setupRangeDrawing);

  // 초기 그림 그리기 함수 호출
  draw();
}

function setupDefaultDrawing() {
  // 모든 버튼 및 입력 필드 제거
  removeAllElements();

  // 최대 수 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최대 수 선택:').position(10, 610).style('color', 'green');
  maxNumberInput = createInput('').position(150, 610).attribute('placeholder', '최대 수').style('color', 'green');

  // "뽑기" 버튼 생성
  drawButton = createButton('뽑기').position(150, 640).mousePressed(drawDefaultBall);

  // "그림판 초기화" 버튼 생성
  resetButton = createButton('그림판 초기화').position(340, 620).mousePressed(resetCanvas);

  // "처음 화면으로 돌아가기" 버튼 생성
  backButton = createButton('처음 화면으로 돌아가기').position(450, 620).mousePressed(goToInitialScreen);

  // 초기 그림 그리기 함수 호출
  draw();

  // 뽑기 버튼 참조하여 버튼 활성화
  drawButton.removeAttribute('disabled');
}

function setupRangeDrawing() {
  // 모든 버튼 및 입력 필드 제거
  removeAllElements();

  // 최소 범위 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최소 범위 선택:').position(10, 600).style('color', 'green');
  minRangeInput = createInput('').position(160, 600).attribute('placeholder', '최소').style('color', 'green');

  // 최대 범위 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '최대 범위 선택:').position(10, 630).style('color', 'green');
  maxRangeInput = createInput('').position(160, 630).attribute('placeholder', '최대').style('color', 'green');

  // 뽑을 공의 수 입력 필드 및 라벨 생성 및 초기값 설정
  createElement('label', '뽑을 공의 갯수 선택:').position(10, 660).style('color', 'green');
  numBallsInput = createInput('').position(160, 660).attribute('placeholder', '개').style('color', 'green');

  // "뽑기" 버튼 생성
  drawButton = createButton('뽑기').position(160, 720).mousePressed(drawRangeBall);

  // "그림판 초기화" 버튼 생성
  resetButton = createButton('그림판 초기화').position(270, 720).mousePressed(resetCanvas);

  // "처음 화면으로 돌아가기" 버튼 생성
  backButton = createButton('처음 화면으로 돌아가기').position(400, 720).mousePressed(goToInitialScreen);

  // 초기 그림 그리기 함수 호출
  draw();

  // 뽑기 버튼 참조하여 버튼 활성화
  drawButton.removeAttribute('disabled');
}

function resetCanvas() {
  // 그림판 초기화
  fallBalls = [];
  // "뽑기" 버튼 활성화
  if (drawButton) {
    drawButton.removeAttribute('disabled');
  }
  // 다시 그리기
  draw();
}

function draw() {
  // 배경 설정
  image(img,20,10,200,100);
  // 이미 뽑힌 공들을 그리는 함수 호출
  drawDrawnBalls();
}

function drawDrawnBalls() {
  let x = 30;
  let y = 100;

  fallBalls.forEach((ball) => {
    fill(255, 0, 0);
    ellipse(x, y, 30, 30);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    fill('green'); // Set text color to green
    text(ball, x, y);

    x += 40;
    if (x > 570) {
      x = 30;
      y += 40;
    }
  });
}

function drawDefaultBall() {
  // 입력 필드에서 입력된 숫자를 가져오기
  let maxNumber = int(maxNumberInput.value());

  // 입력값이 유효한지 확인하고 0보다 큰지 검사
  if (!isNaN(maxNumber) && maxNumber > 0) {
    let newBall;
    do {
      // 무작위로 공을 선택
      newBall = floor(random(maxNumber)) + 1;
    } while (fallBalls.includes(newBall)); // 이미 뽑은 공인 경우 다시 선택
    fallBalls.push(newBall); // 선택된 공을 배열에 추가
  } else {
    selectedNumber = "유효하지 않은 입력";
  }

  // 뽑은 후에 모든 숫자가 뽑힌 경우 뽑기 버튼을 비활성화
  if (fallBalls.length === maxNumber) {
    drawButton.attribute('disabled', true);
  }
}

function drawRangeBall() {
  // 최소 범위에서 최대 범위까지의 숫자 범위를 가져오기
  let minRange = int(minRangeInput.value());
  let maxRange = int(maxRangeInput.value());

  // 입력된 숫자를 가져오기
  let numBalls = int(numBallsInput.value());

  // 입력값이 유효한지 확인하고 0보다 큰지 검사
  if (!isNaN(numBalls) && numBalls > 0 && minRange < maxRange) {
    if (fallBalls.length < numBalls) {
      let newBall;
      do {
        newBall = floor(random(minRange, maxRange + 1));
      } while (fallBalls.includes(newBall));
      fallBalls.push(newBall);
    } else {
      selectedNumber = "모든 숫자 뽑힘";
    }
  }

  // 뽑은 후에 모든 숫자가 뽑힌 경우 뽑기 버튼을 비활성화
  if (fallBalls.length === numBalls) {
    drawButton.attribute('disabled', true);
  }
}

function removeAllElements() {
  // 모든 버튼 및 입력 필드 제거
  selectAll('button').forEach(button => button.remove());
  selectAll('input').forEach(input => input.remove());
  selectAll('label').forEach(label => label.remove());
  if (backButton) {
    backButton.remove();
  }
}