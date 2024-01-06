let game = document.querySelector(".box");
let image = document.querySelector("#img img");
let placeChoices = document.querySelectorAll("#choice h3");
let answer = document.querySelector("#name h3");
let score = document.querySelector("#score");
let sc = 0;

let live = document.querySelector("#live");
let life = 5;

let audio = document.getElementById("audio")

let xml = new XMLHttpRequest();

xml.onload = function(){
    let data = JSON.parse(this.responseText);
    let index =0;
    image.src  = data.animal[index].img;
    let answerCorrect = data.animal[index].name;
    let randomChoice = [answerCorrect];
    while(randomChoice.length<3){
        let randomIndex = Math.floor(data.choices.length * Math.random());
        let choice = data.choices[randomIndex];
        if(!randomChoice.includes(choice)){
            randomChoice.push(choice);
        }
    }
    randomChoice.sort(function(){return 0.5 - Math.random()});
    for(let i=0; i<placeChoices.length;i++){
        placeChoices[i].innerHTML = randomChoice[i];
    }

    placeChoices.forEach(place =>{
        place.addEventListener("click", function(){
            if(place.innerHTML == answerCorrect){
                answer.innerHTML = place.innerHTML;
                answer.style.background = "#70ca70";
                answer.style.color = "#eee";
                sc++;
                score.innerHTML = sc;
                audio.src = "audio/bonneReponse.m4a";
                audio.play();
                index++;
                setTimeout(function(){
                    if(index<data.animal.length){
                        answer.innerHTML ="Answer";
                        answer.style.background = "#eee";
                        answer.style.color = "#4b8183";
                        image.src  = data.animal[index].img;
                        answerCorrect = data.animal[index].name;
                        randomChoice = [answerCorrect];
                        while(randomChoice.length<3){
                            randomIndex = Math.floor(data.choices.length * Math.random());
                            choice = data.choices[randomIndex];
                            if(!randomChoice.includes(choice)){
                                randomChoice.push(choice);
                            }
                        }
                        randomChoice.sort(function(){return 0.5 - Math.random()});
                        for(let i=0; i<placeChoices.length;i++){
                            placeChoices[i].innerHTML = randomChoice[i];
                        }
                    }
                    else{
                        game.style.visibility = "hidden";
                        audio.src = "audio/congratulation.m4a";
                        audio.play();
                        let st = "Congratulation!!";
                        end(st, sc);
                    }
                },2000)

            }
            else{
                answer.innerHTML = place.innerHTML;
                answer.style.background = "#e86969";
                answer.style.color = "#eee";
                life--;
                live.innerHTML = life;
                audio.src = "audio/Wronganswer.m4a";
                audio.play();
                if(life > 0){
                    index++;
                    setTimeout(function(){
                        if(index<data.animal.length){
                            answer.innerHTML ="Answer";
                            answer.style.background = "#eee";
                            answer.style.color = "#4b8183";
                            image.src  = data.animal[index].img;
                            answerCorrect = data.animal[index].name;
                            randomChoice = [answerCorrect];
                            while(randomChoice.length<3){
                                randomIndex = Math.floor(data.choices.length * Math.random());
                                choice = data.choices[randomIndex];
                                if(!randomChoice.includes(choice)){
                                    randomChoice.push(choice);
                                }
                            }
                            randomChoice.sort(function(){return 0.5 - Math.random()});
                            for(let i=0; i<placeChoices.length;i++){
                                placeChoices[i].innerHTML = randomChoice[i];
                            }
                        }
                    },1000)
                }else{
                    game.style.visibility = "hidden";
                    audio.src = "audio/gameOver.m4a";
                    audio.play();
                    let st = "Game over!!";
                    end(st, sc);
                }
            }
        })
    })
}

function end(situation, scor){
    let box = document.createElement("div");
    let titel = document.createElement("h1");
    let titelNode = document.createTextNode(situation);
    titel.appendChild(titelNode);
    box.appendChild(titel);
    box.classList.add("end");
    titel.classList.add("h1");

    let endScore = document.createElement("h2");
    let endScoreTxt = document.createTextNode(" your score is: " + scor);
    endScore.appendChild(endScoreTxt);
    box.appendChild(endScore);

    let btn = document.createElement("button");
    let btnNode = document.createTextNode("Play again");
    btn.appendChild(btnNode)
    btn.classList.add("btn");
    box.appendChild(btn);
    
    btn.addEventListener("click", function(){
        location.reload();
    })
    document.body.appendChild(box);

}


xml.open("GET", "animal.json");
xml.send();

