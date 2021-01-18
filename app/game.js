





import {Quote} from './quote.js'
class Game {
currentStep = 0;
lastStep = 7;

    quotes = [{
        text:'santiago',
        category : 'What is the capital of Chile?'
    },
    {
        text:'vatican City',
        category : 'What is the smallest country in the world?'
    },
    {
        text:'marek zemla',
        category : 'who made this application'
    },
    {
        text:'java script',
        category : 'in what language is this application written'
    },
    {
        text:'polish',
        category : 'what nationality is the creator of this game'
    }];
    constructor({lettersWrapper,categorysWrapper,wordWrapper,outputsWrapper}){
        this.lettersWrapper= lettersWrapper;
        this.categorysWrapper=categorysWrapper;
        this.wordWrapper=wordWrapper;
        this.outputsWrapper=outputsWrapper

        const{text,category} = this.quotes[Math.floor(Math.random()*this.quotes.length)];
        this.categorysWrapper.innerHTML=category;
        // this.wordWrapper.innerHTML= text;
        this.quote = new Quote(text);
    }

guess(letter,event){
    event.target.disabled = true;
    if (this.quote.guess(letter)){
        this.drawQuote();
    }else{
        this.currentStep++
        document.getElementsByClassName('step')[this.currentStep].style.opacity=1;
        if(this.currentStep == this.lastStep ){
            this.loosing();
        }
    }
    
}
drawLetters(){
    for(let i=0; i<26;i++){
        const label = (i+10).toString(36);
        const button = document.createElement('button');
        button.innerHTML= label;
        button.addEventListener('click', (event)=>this.guess(label,event))
        this.lettersWrapper.appendChild(button)
    }
}

drawQuote(){
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if(!content.includes('_')){
        this.winning();
    }
}
start(){
    document.getElementsByClassName('step')[this.currentStep].style.opacity=1;
    this.drawLetters();
    this.drawQuote();
    
}

winning(){
    this.wordWrapper.innerHTML = 'You Won'
    this.lettersWrapper.innerHTML='';
}
loosing(){
    this.wordWrapper.innerHTML = 'You lost'
    this.lettersWrapper.innerHTML='';
}
}

const game = new Game({
             lettersWrapper:document.getElementById('letters'),
             categorysWrapper:document.getElementById('category'),
             wordWrapper:document.getElementById('word'),
             outputsWrapper:document.getElementById('output'),
         });

         game.start();
