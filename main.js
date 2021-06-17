'use strict'
const canvas = document.getElementById('canvas'); // Получаем элемент canvas
const ctx = canvas.getContext('2d'); // Превращаем в 2Д конте
const storeDestroy = ['right', 'up', 'left', 'down']; //Хранит направления
let report = 0;
let end = false;
let quantity = 5;
let gus = new Image();
// Фон
const bg = new Image(); //Создаёт элемент img
bg.src = 'image/background_1.png'; //Даёт элементу img ссылку на изображение 
const enemys = constructorEnemys(); //Создаёт вражеские танки
const  enemysBullets = createsEnemysBullet() //Создаёт пули

// Объект моего танка
const myTank = { 
    x: 200,
    y: 300,
    visual: new Image(),
    exists: true,
    direction: 'right',
    move: true,
    edit: null,
    editVisual: function(){
       if(this.direction === 'right'){ 
           if(this.edit <= 6){
              this.visual.src = 'image/myTank/1betoMyTankR.png';
           }else if(this.edit <= 12){
              this.visual.src = 'image/myTank/2betoMyTankR.png';
           }else{
              this.visual.src = 'image/myTank/3betoMyTankR.png';
              if(this.edit >= 18){
                 this.edit = 0;
              };
           }
       }else if(this.direction === 'up'){
           if(this.edit <= 6){
              this.visual.src = 'image/myTank/1betoMyTankU.png';
           }else if(this.edit <= 12){
              this.visual.src = 'image/myTank/2betoMyTankU.png';
           }else{
              this.visual.src = 'image/myTank/3betoMyTankU.png';
              if(this.edit >= 18){
                  this.edit = 0;
              };
           };
       }else if(this.direction === 'left'){
          if(this.edit <= 6){
              this.visual.src = 'image/myTank/1betoMyTankL.png';
          }else if(this.edit <= 12){
              this.visual.src = 'image/myTank/2betoMyTankL.png';
          }else{
              this.visual.src = 'image/myTank/3betoMyTankL.png';
              if(this.edit >= 18){
                  this.edit = 0;
              };
          };
       }else if(this.direction === 'down'){
          if(this.edit <= 6){
              this.visual.src = 'image/myTank/1betoMyTankD.png';
          }else if(this.edit <= 12){
              this.visual.src = 'image/myTank/2betoMyTankD.png';
          }else{
              this.visual.src = 'image/myTank/3betoMyTankD.png';
              if(this.edit >= 18){
                  this.edit = 0;
              };
           };
       };
       this.edit++;
   }
};

// Объект моей пули
const myTankBullet = {
    x: null,
    y: null,
    exists: false,
    direction: null,
    visual: new Image()
};

// Создаёт вражеские танки с помощью конструктора
function constructorEnemys(){
    let enemys = [];
    let x;
    let y;
    let iteration = 1;
    let XMax;
    let YMax;
    let XMin;
    let YMin;
    let passage = [];
    let answer;
    function bulenCheck(bulen){
       return bulen === true;
    };
    enemys[0] = new Enemys(Math.floor(Math.random() * (1700 - 400) + 200), Math.floor(Math.random() * (825 - 200) + 100));
    while(iteration < 5){
       x = Math.floor(Math.random() * (1700 - 400) + 200);
       y = Math.floor(Math.random() * (825 - 200) + 100);
       XMax = x + 200;
       YMax = y + 200; 
       XMin = x - 100;
       YMin = y - 100;
       for(let i = 0; i < enemys.length; i++){
           passage[i] = enemys[i].x > XMax || enemys[i].x < XMin || enemys[i].y > YMax || enemys[i].y < YMin;
       };
       answer = passage.every(bulenCheck);
       if(answer && iteration < 5){
           enemys[iteration] = new Enemys(x, y);   
           iteration++;
       };
    };
   return enemys;
}; 

// Cлушатель событий нажатие клавиш
addEventListener('keydown', (e)=>{ // Задаёт направления танка
    if(e.keyCode === 87){
       myTank.direction = 'up'; 
    }else if(e.keyCode === 68){
       myTank.direction = 'right';
    }else if(e.keyCode === 83){
       myTank.direction = 'down';
    }else if(e.keyCode === 65){
       myTank.direction = 'left';
    };
    if(e.keyCode === 32 && !myTankBullet.exists){
       myTankBullet.direction = myTank.direction;
       if(myTankBullet.direction === 'right' || myTankBullet.direction === 'left'){
           myTankBullet.visual.src = 'image/bulletRL.png';
       }else if(myTankBullet.direction === 'up' || myTankBullet.direction === 'down'){
           myTankBullet.visual.src = 'image/bulletUD.png';
       };
       myTankBullet.x = myTank.x;
       myTankBullet.y = myTank.y;
       myTankBullet.exists = true; 
    };   
});

// Функция запускает игру с помощью requestAnimationFrame
function game(){ 
   ctx.clearRect(0, 0, 1700, 825); 
   ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    
    if(myTank.exists){
       animationMyTank();
    };
    if(myTankBullet.exists){
       animationMyTankBullet();
    };
    if(explosion.exists){
       explode();
    }; 
    animationEnemys();
    enemyShot();
    
     stop = requestAnimationFrame(game);  
    win();
    if(end){
       gameOver();
    };
};
 
// Анимирует мой танк
function animationMyTank(){
   //accident();
   myTank.editVisual();
   if(myTank.visual.complete){
   if(myTank.direction === 'up' && myTank.y >= 0){
       ctx.drawImage(myTank.visual, myTank.x, myTank.y -= 2, 50, 50); 
    }else if(myTank.direction === 'right' && myTank.x <= canvas.width - 50){
       ctx.drawImage(myTank.visual, myTank.x += 2, myTank.y, 50, 50);
    }else if(myTank.direction === 'down' && myTank.y <= canvas.height - 50){
       ctx.drawImage(myTank.visual, myTank.x, myTank.y += 2, 50, 50);
    }else if(myTank.direction === 'left' && myTank.x >= 0){
      ctx.drawImage(myTank.visual, myTank.x -= 2, myTank.y, 50, 50);
    }else{
      ctx.drawImage(myTank.visual, myTank.x, myTank.y, 50, 50);
    };
    }
};

// Анимирует мою пулю
function animationMyTankBullet(){
    checkingHitsEnemyTank(); 
    checksCollisionsBullet();
    if(myTankBullet.direction === 'up'){
       ctx.drawImage(myTankBullet.visual, myTankBullet.x, myTankBullet.y -= 8, 30, 20);
    }else if(myTankBullet.direction === 'right'){
       ctx.drawImage(myTankBullet.visual, myTankBullet.x += 8, myTankBullet.y, 30, 20);
    }else if(myTankBullet.direction === 'down'){
       ctx.drawImage(myTankBullet.visual, myTankBullet.x, myTankBullet.y  += 8, 30, 20);
    }else if(myTankBullet.direction === 'left'){
       ctx.drawImage(myTankBullet.visual, myTankBullet.x -= 8, myTankBullet.y, 30, 20);
    };
};

// Функция проверяет столкновения пули моего танка
function checksCollisionsBullet(){
    if(myTankBullet.x > canvas.width || myTankBullet.x < 0 || 
      myTankBullet.y > canvas.height || myTankBullet.y < 0){
       myTankBullet.exists = false;
    };
};

// Анимация вражеских танков
function animationEnemys(){
    for(let i = 0; i < enemys.length; i++){
       enemysCollisions();
       collisionsBetweenEnemys();
        if(enemys[i].exists){
          enemys[i].editVisual();
           if(enemys[i].distance <= 0 || enemys[i].distance === null){
              enemys[i].assignDirection();
          };
           if(enemys[i].visual.complete){
          if(enemys[i].direction === 'up'){
              ctx.drawImage(enemys[i].visual, enemys[i].x, enemys[i].y--, 50, 50);
          }else if(enemys[i].direction === 'right'){
              ctx.drawImage(enemys[i].visual, enemys[i].x++, enemys[i].y, 50, 50);
          }else if(enemys[i].direction === 'down'){
              ctx.drawImage(enemys[i].visual, enemys[i].x, enemys[i].y++, 50, 50);
          }else if(enemys[i].direction === 'left'){
              ctx.drawImage(enemys[i].visual, enemys[i].x--, enemys[i].y, 50, 50);
          };
          enemys[i].distance--;
       };  
       }
   };
};

// Проверяет столкновения с рамкой
function enemysCollisions(){
    for(let i = 0; i < enemys.length; i++){
       if(enemys[i].x >= 1500 && enemys[i].direction === 'right'){
           enemys[i].direction = 'left';
       }else if(enemys[i].x <= 150 && enemys[i].direction === 'left'){
           enemys[i].direction = 'right';
       }else if(enemys[i].y <= 150 && enemys[i].direction === 'up'){
           enemys[i].direction = 'down';
       }else if(enemys[i].y >= 620 && enemys[i].direction === 'down'){
           enemys[i].direction = 'up';
       };
    };
};

// Проверяет столкновения между танками врага 
function collisionsBetweenEnemys(){
    let direction;
    for(let elem of enemys){
       if(myTank.direction === 'right' && myTank.x + 60 >= elem.x && myTank.x + 60 <= elem.x + 60 &&  // дОДЕЛАТЬ
          (myTank.y <= elem.y + 60 &&  myTank.y >= elem.y - 50) || 
          (myTank.y + 60 >= elem.y + 60 && myTank.y + 60 <= elem.y - 50)){
           myTank.move = false;
           elem.direction = 'up';
           console.log('right');
       };
       for(let i = 0; i < enemys.length; i++){ 
           if(elem.direction === 'left' && elem.x === enemys[i].x + 60 && 
           (elem.y <= enemys[i].y + 60 &&  elem.y >= enemys[i].y - 50) || 
           (elem.y + 60 >= enemys[i].y + 60 && elem.y + 50 <= enemys[i].y - 50)){                                                     
              elem.direction = 'right';
              enemys[i].direction = 'left';
          }else if(elem.direction === 'right' && elem.x + 60 === enemys[i].x && 
          (elem.y <= enemys[i].y + 60 &&  elem.y >= enemys[i].y - 50) || 
          (elem.y + 60 >= enemys[i].y + 60 && elem.y + 60 <= enemys[i].y - 50)){
              elem.direction = 'left';
              enemys[i].direction = 'right';
          }else if(elem.direction === 'up' && elem.y === enemys[i].y + 60 && 
          (elem.x <= enemys[i].x + 60 &&  elem.x >= enemys[i].x - 50) || 
          (elem.x + 60 >= enemys[i].x + 60 && elem.x + 60 <= enemys[i].x - 50)){
              elem.direction = 'down';
              enemys[i].direction = 'up';
          }else if(elem.direction === 'down' && elem.y + 60 === enemys[i].y && 
          (elem.x <= enemys[i].x + 60 &&  elem.x >= enemys[i].x - 50) || 
          (elem.x + 60 >= enemys[i].x + 60 && elem.x + 60 <= enemys[i].x - 50)){
              elem.direction = 'up';
              enemys[i].direction = 'down';
          };
       };
   };
};

//Проверка попаданий по вражескому танку
function checkingHitsEnemyTank(){
    let integration;
    let count;
    for(let i = 0; i < enemys.length; i++){
         if(myTankBullet.direction === 'left' || myTankBullet.direction === 'right'){
             integration = myTankBullet.x;
             count = myTankBullet.x + 8;
         }else if(myTankBullet.direction === 'up' || myTankBullet.direction === 'down'){
             integration = myTankBullet.y;
             count = myTankBullet.y + 8;
         };
         while(count > integration){
           if(enemys[i].exists){
              if((myTankBullet.direction === 'left' || myTankBullet.direction === 'right') && enemys[i].x === integration && myTankBullet.y <= enemys[i].y + 40 &&  myTankBullet.y >= enemys[i].y - 10){
                  console.log('1: hits');
                  explosion.x = myTankBullet.x;
                  explosion.y = myTankBullet.y;
                  enemys[i].exists = false;
                  myTankBullet.exists = false;
                  explosion.exists = true;
                  quantity--;
              }else if((myTankBullet.direction === 'up' || myTankBullet.direction === 'down') && enemys[i].y === integration && myTankBullet.x <= enemys[i].x + 40 && myTankBullet.x >= enemys[i].x - 10){
                  console.log('2: hits');
                  explosion.x = myTankBullet.x;
                  explosion.y = myTankBullet.y;
                  enemys[i].exists = false;
                  myTankBullet.exists = false;
                  explosion.exists = true;
                  explosion.pause = true;
                  quantity--;
              };
          };
           integration++;
       };
    };
};

// Оюбъект взрыв
const explosion = {
    x: null,
    y: null,
    issue: 1,
    speed: 10,
    visual: new Image,
    exists: false,
    pause: 0,
    width: 50,
    height: 50
};

// Анимация взрыва
function explode(){
    explosion.visual.src = 'image/explosionImage/blast' + explosion.issue + '.png';
    ctx.drawImage(explosion.visual, explosion.x - 50, explosion.y - 50, explosion.width, explosion.height);
    explosion.pause++;
    if(explosion.pause === 0 || explosion.pause === 2 || explosion.pause === 4 || explosion.pause === 6 || explosion.pause === 8 ||
      explosion.pause === 10){
       explosion.issue++;
       explosion.width += 20;
       explosion.height += 20;
    }else if (explosion.pause > 19) { 
       explosion.exists = false;
       explosion.pause = 0;
       explosion.issue = 0;
       explosion.width = 50;
       explosion.height = 50;
    };
};

// Конструктор вражеских танков
function Enemys(x, y){ 
    this.x = x;
    this.y = y;
    this.visual = new Image(); //Создаёт элемент img
    this.exists = true;
    this.bullet = false;
    this.direction = null;
    this.distance = null;
    this.edit = 0;
    this.destroy = ()=>{
       this.exists = false;
    };
    this.bulletCreate = ()=>{
       this.bullet = true;
    };
    this.bulletDestroy = ()=>{
      this.bullet = false;
    };
    this.assignDirection = ()=>{
       this.direction = storeDestroy[Math.floor(Math.random() * 4)];
       this.distance = Math.floor(Math.random() * (canvas.height - 300) + 300);
    };
    this.editVisual = ()=>{ 
          if(this.direction === 'up'){
              if(this.edit < 5){
                   this.visual.src = 'image/enemyTank/1betoEnemyTankU.png';
              }else if(this.edit < 10){
                   this.visual.src = 'image/enemyTank/2betoEnemyTankU.png';
              }else if(this.edit < 15){
                   this.visual.src = 'image/enemyTank/3betoEnemyTankU.png';
              }else{
                   this.visual.src = 'image/enemyTank/4betoEnemyTankU.png';
                   if(this.edit > 21){ 
                      this.edit = 0;
                  };   
              };
          }else if(this.direction === 'right'){
              if(this.edit < 5){
                   this.visual.src = 'image/enemyTank/1betoEnemyTankR.png';
              }else if(this.edit < 10){
                   this.visual.src = 'image/enemyTank/2betoEnemyTankR.png';
              }else if(this.edit < 15){
                   this.visual.src = 'image/enemyTank/3betoEnemyTankR.png';
              }else{
                   this.visual.src = 'image/enemyTank/4betoEnemyTankR.png';
                   if(this.edit > 21){ 
                      this.edit = 0;
                  };   
              };
          }else if(this.direction === 'down'){
              if(this.edit < 5){
                   this.visual.src = 'image/enemyTank/1betoEnemyTankD.png';
              }else if(this.edit < 10){
                   this.visual.src = 'image/enemyTank/2betoEnemyTankD.png';
              }else if(this.edit < 15){
                   this.visual.src = 'image/enemyTank/3betoEnemyTankD.png';
              }else{
                   this.visual.src = 'image/enemyTank/4betoEnemyTankD.png';
                   if(this.edit > 21){ 
                      this.edit = 0;
                  };   
              };
          }else if(this.direction === 'left'){
              if(this.edit < 5){
                   this.visual.src = 'image/enemyTank/1betoEnemyTankL.png';
              }else if(this.edit < 10){
                   this.visual.src = 'image/enemyTank/2betoEnemyTankL.png';
              }else if(this.edit < 15){
                   this.visual.src = 'image/enemyTank/3betoEnemyTankL.png';
              }else{
                   this.visual.src = 'image/enemyTank/4betoEnemyTankL.png';
                   if(this.edit > 21){ 
                      this.edit = 0;
                  };   
              };
          };
          this.edit++;
       //console.log(enemys[i].visual); //Test
       };  
    };

// Конструктор пули
function EnemysBullet(){
    this.x = null;
    this.y = null;
    this.exists = false;
    this.direction = null;
    this.visual = new Image()
};

// Создаёт пули с помощью конструктора
function createsEnemysBullet(){
    let enemysBullets = [];
    for(let i = 0; i < enemys.length; i++){
        enemysBullets[i] = new EnemysBullet();
    };
   return enemysBullets;
};

// Анимирует вражеские пули
function enemyShot(){
    let enemy;
    for(let i = 0; i < enemysBullets.length; i++){
            enemy = enemysBullets[i];
            checkEnemyBullet(enemy);
       //console.log(enemy); //Test
       bulletEnemyCollisionCheck(enemy);
       if(!enemy.exists){
           enemy = restartShot(enemy, i);
           //console.log(enemy); // Test
       }else if(enemy.exists && enemy.direction === 'right'){
           enemy.visual.src = 'image/bulletRL.png';
           //console.log(enemy); // Test
           ctx.drawImage(enemy.visual, enemy.x += 8, enemy.y, 30, 40);
       }else if(enemy.exists && enemy.direction === 'left'){
           enemy.visual.src = 'image/bulletRL.png';
           //console.log(enemy.visual + ' ' + enemy.x  + ' ' + enemy.y) // Test
           ctx.drawImage(enemy.visual, enemy.x -= 8, enemy.y, 30, 40);
       }else if(enemy.exists && enemy.direction === 'up'){
           enemy.visual.src = 'image/bulletUD.png';
          // console.log(enemy.x); //Test
           ctx.drawImage(enemy.visual, enemy.x, enemy.y -= 8, 30, 40);
       }else if(enemy.exists && enemy.direction === 'down'){
           enemy.visual.src = 'image/bulletUD.png';
           //console.log(enemy.x); //Test
           ctx.drawImage(enemy.visual, enemy.x, enemy.y += 8, 30, 40);
       };
    };
};

// Проверяет столкновения пули с рамкой
function bulletEnemyCollisionCheck(enemy){
    if(enemy.x >= 1680 || enemy.x <= 0 || enemy.y >= 800 || enemy.y <= 0){ 
       enemy.exists = false;
    };
};
 
// Перезапускает пулю
function restartShot(enemy, i){
       if(enemys[i].exists){
           enemy.direction = enemys[i].direction;
           enemy.x = enemys[i].x;
           enemy.y = enemys[i].y;
           enemy.exists = true;
           let audio = new Audio;
           audio.src = 'audio/scifi-film.mp3';
          // audio.autoplay = true;
           //console.log(enemy); //Test
      };
    return enemy;
};

// Проверка попадания по моему танку 
function checkEnemyBullet(enemy){
    let unter;
    if(enemy.direction === 'right' || enemy.direction === 'left'){
        unter = enemy.x;
    }else if(enemy.direction === 'up' || enemy.direction === 'down'){
        unter = enemy.y;
    };
    for(let i = 8; i > 0; i--){
       if(myTank.exists){
           if((enemy.direction === 'right' || enemy.direction === 'left') && 
           unter === myTank.x && 
           myTank.y - 20 <= enemy.y &&  myTank.y - 20 <= enemy.y + 30 &&   
           myTank.y + 60 >= enemy.y && myTank.y + 60 >= enemy.y + 30){
              enemy.exists = false;
              myTank.exists = false;
              end = true;
             // console.log('1: ' + myTank.exists);
              
          }else if((enemy.direction === 'up' || enemy.direction === 'down') &&
          unter === myTank.y &&
          myTank.x - 20 <= enemy.x &&  myTank.x - 20 <= enemy.x + 40 && 
          myTank.x + 60 >= enemy.x && myTank.x + 60 >= enemy.x + 40){
              enemy.exists = false;
              myTank.exists = false;
              end = true;
             // console.log('2: ' + myTank.exists);
          };
          unter--;
       };
   };
};


// Объевляет конец игры
function gameOver(){
    console.log(report);
    //ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    explosion.x = myTank.x;
    explosion.y = myTank.y;
    explosion.exists = true;
    explode();
    report++;
    if(report > 9){
       ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
       ctx.fillStyle = '#B22222';
       ctx.font = '250px  Impact';
       ctx.fillText('Game Over', 320, 400);
       cancelAnimationFrame(stop);
    };  
};

// Функция победы 
function win(){ 
   if(quantity <= 0){
        ctx.fillStyle = '#FFFF00';
        ctx.font = '250px  Impact';
        ctx.fillText('Wenner!!!', 320, 400);
   };
};

/*
// Проверка врезания в вражеского танка
function accident(){ // Доделать 
   let enemy;
   let direction; 
   for(let i = 0; i < enemys.length; i++){ 
       enemy = enemys[i];
       if(myTank.direction === 'right' && myTank.x === enemy.x && 
         (enemy.y >= myTank.y && enemy.y <= myTank.y + 50)||
         (myTank.y <= enemy.y + 50 && myTank.y + 50 >= enemy.y + 50)){
           direction = myTank.direction;
           myTank.direction = null;
           console.log(enemy.y + ' ' + myTank.y);
       }//else if(myTank.y <= enemy[i].y += 1){
       // }
   }
};
*/

myTank.visual.src = 'image/myTank/myTankR.png';
window.requestAnimationFrame(game); // запускает игру с помощью requestAnimationFrame 






