const hammer = document.querySelector('.hammer');
document.addEventListener('mousemove', (e) => {
  // e.pageX (문서기준) , e.offsetX(요소기준), e.clientX(브라우저 화면,뷰포트 기준)
  hammer.style.left = e.clientX + 'px';
  hammer.style.top = `${e.clientY}px`;
});
document.addEventListener('mousedown', ()=> {
  hammer.style.transform = 'rotate(-90deg)';
});
document.addEventListener('mouseup', ()=> {
  hammer.style.transform = 'rotate(-45deg)';
});
hammer.style.display = 'none';
const countDownDisplay = document.querySelector('.countdown');
let startCountdown = 6;
/* 5-> 4-> 3-> 2-> 1-> 0-> 'game start'-> '게임시작코드'   setInterval활용  */
const startCount = () => {
  startCountdown--;
  countDownDisplay.innerHTML = startCountdown;      
  if( startCountdown === -1 ){
    countDownDisplay.innerHTML = '게임 시작';
  }
  if( startCountdown < -1 ){
    clearInterval( gameBegin );
    startGame();//countDownDisplay.innerHTML = 'GAME REAL CODE ...';
  }
}
startCount();
let gameBegin = setInterval( startCount, 1000 );

let playTime = 20;
let gameScore = 0;
let nameNum;  // .m(1~9)  이름 정의 랜덤 변수
let clickable = false;  //1번 클릭반응( 연속클릭 방지 ) 상태변수
let timer;     // play시간 카운트다운 타이머
let targetTimer; // 랜덤 등장 타이밍

const timeArea = document.querySelector('.time_section>.time');
const scoreArea = document.querySelector('.score_section>.score');
const playStage = document.querySelector('.play_area');
const resultStage = document.querySelector('.end');

const startGame = () => {
  hammer.style.display = 'block';
  countDownDisplay.style.display = 'none';
  document.body.style.cursor = 'none';
  scoreArea.textContent = gameScore;
  timer = setInterval( countDown, 1000 ); //timer 카운트다운
  targetTimer = setInterval( randomTarget, 1000 ); //targetTimer 랜덤 실행
}

const countDown = () => {
  timeArea.innerHTML = playTime;
  playTime--;
  if( playTime<0 ){
    clearInterval(timer);
    clearInterval(targetTimer);
    playStage.style.display = 'none';
    resultStage.style.display = 'block';
    document.querySelector('.end .score').textContent = gameScore * 1;
    hammer.style.display = 'none';
    document.body.style.cursor = 'default';
  }
}
const randomTarget = () => {
  nameNum = Math.ceil( Math.random()*9 ); //1~9 정수 랜덤  ---  Math.floor(Math.random()*9) + 1
  imgNum = Math.ceil(Math.random()*2);
  const target = document.querySelector(`.m${nameNum} .n${imgNum}`);
  target.style.display = 'block';
  clickable = true;
  setTimeout(()=>{  
    target.style.display='none';
    clickable=false;  
  }, 700);
}
document.querySelectorAll('.tables>.n1').forEach((img) => {
  const originalSrc = img.src;
  img.addEventListener('mousedown', ()=>{
    if( clickable ){
      gameScore++;
      scoreArea.innerHTML = gameScore;
      img.src = 'images/gondo_hit.png'
      clickable = false;  // 연속클릭 방지 효과
      setTimeout(() => {
        img.src = originalSrc;
      }, 300);
    }
  })
});
document.querySelectorAll('.tables>.n2').forEach((img) => {
  const originalSrc = img.src;
  img.addEventListener('mousedown', ()=>{
    if( clickable ){
      gameScore--;
      scoreArea.innerHTML = gameScore;
      img.src = 'images/manyoung_hit.png'
      clickable = false;  // 연속클릭 방지 효과
      setTimeout(() => {
        img.src = originalSrc;
      }, 300);
    }
  })
});

document.querySelector('.end .again').addEventListener('click', ()=>{
  //모든 변수, 요소의 상태 초기화 선언
  window.location.reload();  //문서 새로 고침
});
