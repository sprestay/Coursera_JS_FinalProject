function set_new_emoji(){
        var emojis = ['🐮', '🐮', '🐻', '🐻', '🐯', '🐯', 
                        '🐶', '🐶', '🐱', '🐱', '🦁', '🦁'];
        
        document.getElementById('map').innerHTML = "";
        for(let i = 0; i < 12; i++) {
                let card = document.createElement('div');
                card.classList.add('card');
                let front = document.createElement('div');
                front.classList.add('front');
                let back = document.createElement('div');
                back.classList.add('back');
                let emoji = document.createElement('p');
                emoji.classList.add('emoji');
                let rand = Math.floor(Math.random() * emojis.length);
                emoji.textContent = emojis[rand];
                emojis.splice(rand, 1);
                back.append(emoji);
                card.append(front, back);
                document.getElementById('map').append(card);
        }
}

class Timer {
        constructor() {
                this.time = null;
                this.timeID = null;
        }
        run_timer() {
                this.time = 59;
                this.timeID = setInterval(this.timer.bind(this), 1000);
        }

        timer() {
                var el = document.getElementById('timer');
                
                if (this.time < 10)
                        el.textContent = "00:0" + String(this.time);
                else
                        el.textContent = "00:" + String(this.time);

                this.time--;
                this.stop_timer();  
        }

        stop_timer() {
                if (pairs.length == 12 && this.time >= 0) {
                        document.getElementById('modal').style.display = "block";
                        document.getElementById('result_msg').textContent = "Win";
                        document.getElementById('button').textContent = "Play Again";
                        clearInterval(this.timeID);
        
                } else if (this.time < 0)
                {       
                        document.getElementById('modal').style.display = "block";
                        document.getElementById('result_msg').textContent = "Lose";
                        document.getElementById('button').textContent = "Try again";
                        clearInterval(this.timeID);
                }
        }
}


window.onload = set_new_emoji(); // сгенерирувовать случайные картинки

document.getElementById('map').addEventListener('click', function list(event){
        var t = event.target;
        if(t.className == 'front') {
                t.parentNode.style.transform = "rotateY(180deg)";
                check_pairs(t.parentNode.getElementsByClassName('emoji')[0]);
                if (timer.time == null)
                        timer.run_timer();
        }
});

var pairs = [];
var previos = [];
var timer = new Timer();

function check_pairs(current) {
        for(let el in pairs)
                if (pairs[el] == current)
                        return

        if (previos.length > 0){
                for (let elem in previos){
                        if (previos[elem] == current)
                                return;
                }
                if (previos.length == 2){
                        previos[0].parentNode.style = "background-color: white; border: 5px solid white;";
                        previos[0].parentNode.parentNode.style.transform="rotateY(0deg)";
                        previos[1].parentNode.style = "background-color: white;  border: 5px solid white;";
                        previos[1].parentNode.parentNode.style.transform="rotateY(0deg)";
                        previos = [];
                        previos.push(current);
                        return;
                } else {
                        let last = previos[0];
                        if (last.textContent == current.textContent){
                                current.parentNode.style = "background-color: #5AD66F; border: 5px solid #5AD66F;";
                                last.parentNode.style='background-color: #5AD66F; border: 5px solid #5AD66F;';
                                pairs.push(current, last);
                                timer.stop_timer();
                        } else {
                                current.parentNode.style = "background-color: #F44336; border: 5px solid #F44336;";
                                last.parentNode.style = "background-color: #F44336; border: 5px solid #F44336;";
                                previos.push(current);
                                return;
                        }
                        previos = [];
                }

        } else
                previos.push(current);

}

document.getElementById('button').onclick = function (){
        set_new_emoji();
        document.getElementById('modal').style.display = "none";
        document.getElementById('timer').textContent = "01:00";
        pairs = [];
        previos = [];
        timer.run_timer();
}
