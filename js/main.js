'use strict';
window.onload=function(){
    //コンストラクタ作成
    function Card(suit,num){
        this.suit=suit;
        this.num=num;

        this.front;
        this.setFront=function(){
            this.front=`${this.suit}${this.num<10?'0':''}${this.num}.gif`;
        }
    }
    //カード配列作成
    const cards=[];
    const suits=['s','d','h','c'];
    for(let i=0;i<suits.length;i++){
        for(let j=1;j<=13;j++){
            let card=new Card(suits[i],j);
            card.setFront();
            cards.push(card);
        }
    }
    function shuffle(){
        let i=cards.length;
        while(i){
            let index=Math.floor(Math.random()*i--);
            var temp=cards[index];
            cards[index]=cards[i];
            cards[i]=temp;
        }
    }
    shuffle();//シャッフル実行
    const table=document.getElementById('table');
    for(let i=0;i<suits.length;i++){
        let tr=document.createElement('tr');
        for(let j=0;j<13;j++){
            let td=document.createElement('td');
            let tempCard=cards[i*13+j];
            td.classList.add('card','back');
            td.onclick=flip;

            td.num=tempCard.num;
            td.style.backgroundImage=`url(images/${tempCard.front})`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let firstCard=null;
    let flipTimerId=NaN;
    function flip(e){
        let td=e.target;
       // td.classList.toggle('back');
       if(!td.classList.contains('back')|| flipTimerId){
        return;//表のカードをクリックしても何もしない
       }
       td.classList.remove('back');//カードを表にする
       if(firstCard===null){
        firstCard=td;//1枚目だったら今めくったカードをfirstCardに設定
       }else{
        //2枚目だったら1枚目と比較して結果を判定する
        if(firstCard.num===td.num){
            //2枚目が同じだったときの処理
            firstCard.classList.add("fadeout");//消えるやつ
            td.classList.add("fadeout");//消えるやつ
            firstCard=null;
        }else{
            flipTimerId=setTimeout(function(){//1が入っている間は他のをめくれない。
                firstCard.classList.add('back');
                td.classList.add('back');
                flipTimerId=NaN;
                firstCard=null;
            },1200);//1200ミリ秒後に裏に戻す
        }
       }
    }

};
