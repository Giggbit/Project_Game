let joinGameBtn = document.getElementsByClassName('btn_play')
for(let i=0; i< joinGameBtn.length; i++){
    joinGameBtn[i].addEventListener('click', () => {alert("Join game button")})
}

let createGameBtn = document.getElementsByClassName('btn_creategame')
for(let i=0; i< joinGameBtn.length; i++){
    createGameBtn[i].addEventListener('click', () => {alert("Create game button")})
}

let profileBtn = document.getElementsByClassName('btn_profile')
for(let i=0; i< joinGameBtn.length; i++){
    profileBtn[i].addEventListener('click', () => {alert("Profile button")})
}

let infoBtn = document.getElementsByClassName('btn_info')
for(let i=0; i< joinGameBtn.length; i++){
    infoBtn[i].addEventListener('click', () => {alert("Info button")})
}
