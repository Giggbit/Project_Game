// console.log('test')

class Knight {
    #step
    #person
    #map
    #sky
    #jumping = false;
    #jumpHeight;
    #movingLeft = false;
    #movingRight = false;
    #initialTop;

    #gravity = 0.4;
    #velocutyY = 0;
    //test field(костыли)
    #newTop = 0 ;
    
    constructor(person_name, map_name) {
        this.#jumpHeight = 600;
        this.#step = 50;
        this.#person = document.getElementById(person_name);
        this.#initialTop = parseInt(getComputedStyle(this.#person).top);
        this.#map = document.getElementById(map_name);
        this.checkCollisions(); 
        //requestAnimationFrame(update);
    }

    update() {
        requestAnimationFrame(update);
        this.#velocutyY += this.#gravity;
        this.#person.style.top = Math.max(parseInt(getComputedStyle(this.#person).top) + velocityY, 0) + 'px';
        this.checkCollisions();
    }

    setMoveLeft(value){
        this.#movingLeft = value;
    }

    setMoveRight(value){
        this.#movingRight = value;
    }

    getStep() {
        return this.#step;
    }
    
    setStep(value) {
        this.#step = parseInt(value);
    }
    
    moveRight() {
        this.#movingRight = true;
        const currentLeft = parseInt(getComputedStyle(this.#map).left);
        this.#map.style.left = (currentLeft - this.#step) + 'px'; // Сдвигаем карту влево
        this.#person.style.transform = 'scaleX(1)';
        obj.checkCollisions()
        this.#newTop = parseInt(getComputedStyle(this.#person).top)
    }
    
    moveLeft() {
        this.#movingLeft = true;
        const currentLeft = parseInt(getComputedStyle(this.#map).left);
        this.#map.style.left = (currentLeft + this.#step) + 'px'; // Сдвигаем карту вправо
        this.#person.style.transform = 'scaleX(-1)';
        obj.checkCollisions()
        this.#newTop = parseInt(getComputedStyle(this.#person).top)
    }

    jump(obj) {
        if (this.#jumping) return;
        this.#jumping = true;
        const jumpDuration = 800; // Длительность анимации прыжка
        let jumpDirection =0; // 0 - straight, 1 - right, -1 -left
        let startTime = null;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            if (progress < jumpDuration) {
                const newY = this.#initialTop - this.#jumpHeight * Math.sin((progress / jumpDuration) * Math.PI);
                this.#person.style.top = newY + 'px';

                 if (this.#movingLeft) {
                    this.moveLeft();
                    jumpDirection = -1; // -1 - left
                }
                if (this.#movingRight) {
                    this.moveRight();
                    jumpDirection = 1; // 1 - right
                }
                
                requestAnimationFrame(animate);
            } else {
                this.#person.style.top = this.#initialTop + 'px';
                this.#jumping = false;
            }
            // if(jumpDirection == 1){     //я не знаю, как это работает, но оно решает проблему проваливания в текстуру острова, если прыгать на него 
            //     obj.checkCollisions()
            // }
            // else if(jumpDirection == -1){
            //     obj.checkCollisions()
            // }
            // else{
            //     this.checkCollisions()
            // }
            this.checkCollisions();   //всё, теперь знаю.. но оставлю это тут на всякий случай
        };

        requestAnimationFrame(animate);
        this.checkCollisions();
    }

    // isInCenter(){
    //     if(parseInt(getComputedStyle(this.#person).top) !== this.#initialTop){
    //         console.log("Before\nCurrent top: " + parseInt(getComputedStyle(this.#person).top) + "\nInitial top: " + this.#initialTop +"\nMap top: "+ this.#map.style.top)
    //         this.#map.style.top = (parseInt(getComputedStyle(this.#map).top) - (parseInt(getComputedStyle(this.#person).top) + this.#initialTop) ) + 'px';
    //         this.#person.style.top = this.#initialTop + 'px';
    //         console.log("After\nCurrent top: " + parseInt(getComputedStyle(this.#person).top) + "\nInitial top: " + this.#initialTop + "\nMap top: " + this.#map.style.top)
    //     }
    // }

    checkCollisions() {
        const playerRect = this.#person.getBoundingClientRect();
        const islands = document.querySelectorAll('.mainIslands, .secondaryIslands');
    
        for (const island of islands) {
            const islandRect = island.getBoundingClientRect();
            if (
                playerRect.right > islandRect.left &&
                playerRect.left < islandRect.right &&
                playerRect.bottom > islandRect.top &&
                playerRect.top < islandRect.bottom
            ) {
                //console.log("you are in")
                const playerLeft = parseInt(getComputedStyle(this.#person).left);
                const playerTop = parseInt(getComputedStyle(this.#person).top);
                
                const overlapLeft = playerRect.right - islandRect.left;
                const overlapRight = islandRect.right - playerRect.left;
                const overlapTop = playerRect.bottom - islandRect.top;
                const overlapBottom = islandRect.bottom - playerRect.top;
                if (overlapLeft < overlapRight && overlapLeft < overlapTop && overlapLeft < overlapBottom) {
                    // Столкновение слева
                    this.#person.style.left = (playerLeft - overlapLeft) + 'px';
                    //console.log('bump')
                } else if (overlapRight < overlapLeft && overlapRight < overlapTop && overlapRight < overlapBottom) {
                    // Столкновение справа      
                    this.#person.style.left = (playerLeft + overlapRight) + 'px';
                } else if (overlapTop < overlapLeft && overlapTop < overlapRight && overlapTop < overlapBottom) {
                    // Столкновение сверху острова
                    //this.#initialTop = (this.#initialTop - overlapTop)+ 'px';
                    this.#person.style.top = (playerTop - overlapTop) + 'px';
                    
                    console.log('bump')
                }
                 else {
                    // Столкновение снизу острова
                    this.#person.style.top = (playerTop + overlapBottom) + 'px';
                }
            }
        }
    }
}

obj = new Knight('myPlayer','map');


document.addEventListener('keydown', (event) => {
    
    const key = event.key;
    if (key === 'a' || key === "ф") {
        obj.setMoveLeft(true);
        obj.moveLeft();
    } else if (key === 'd'  || key === "в") {
        obj.setMoveRight(true);
        obj.moveRight();
    } else if (key === 'ц' || key == 'w') {
        obj.jump(obj);
        //obj.isInCenter();
    }
   
});

document.addEventListener('keyup', (event) => {
   
    const key = event.key;
    if (key === 'a' || key === "ф") {
        obj.setMoveLeft(false);
    } else if (key === 'd' || key === "в") {
        obj.setMoveRight(false);
    }
});



 