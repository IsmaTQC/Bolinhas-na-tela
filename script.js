const qtd         = document.getElementById('txt_qtd') 
const add         = document.getElementById('btn_add')
const rem         = document.getElementById('btn_remover')
const num_objetos = document.getElementById('num_objetos')
const palco       = document.getElementById('palco')


let largurapalco = palco.offsetWidth //quando ocorrer de alterar o tamnho da janela altera tambem a quantidade de bolinhas, offisetwidht tamanho
let alturapalco = palco.offsetHeight //quando ocorrer de alterar o tamnho da janela altera tambem a quantidade de bolinhas, offisetheight altura

let bolas=[]//array
let numbolas=0

class bola {
    constructor(bolas,palco){
        this.tam=Math.floor(Math.random()*15)+10 //criando os tamanhos das bolinhas, e arredondo para 10
        this.r=Math.floor(Math.random()*255) //adcionado cores
        this.g=Math.floor(Math.random()*255) //adcionado cores
        this.b=Math.floor(Math.random()*255) //adcionado cores
        this.px=Math.floor(Math.random()*largurapalco-this.tam) // movimento da bolinha
        this.py=Math.floor(Math.random()*alturapalco-this.tam) // movimento da bolinha
        this.velx=Math.floor(Math.random()*2)+0.5 //velocidade no eixo x
        this.vely=Math.floor(Math.random()*2)+0.10 //velocidade no eixo y
        this.dirx=(Math.random()*10)
        this.diry=(Math.random()*10)
        if(this.dirx > 5) //condição
            1
        else{
            -1
        }
        if(this.diry > 5) //condição
        1
        else{
        -1
        }
        this.palco=palco
        this.bolas=bolas
        this.id=Date.now()+"_"+Math.floor(Math.random()*1000000000000000) //criar as bolinhas, date.now timestamp
        this.desenhar() //responsavel por desenhar a bolinha
        this.controle=setInterval(this.controlar,10)
        this.controle=""
        this.eu=document.getElementById(this.id) //associando objeto no dom
        numbolas++
        num_objetos.innerHTML = numbolas
    }
    minhapos=()=>{
        return this.bolas.indexOf(this)
    }

    remover=()=>{
        clearInterval(this.controle)
        bolas=bolas.filter((b)=>{
            if(b.id!=this.id){
                return b
            }
        })
        this.eu.remove()
        numbolas--
        num_objetos.innerHTML=numbolas
    }

    desenhar=()=>{
        const div=document.createElement('div')
        div.setAttribute("id",this.id)
        div.setAttribute("class","bola")
        div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        this.palco.appendChild(div)
    }//desenhar a bolinha e acrescentar no dom

    colisao_bordas=()=>{
        if(this.px+this.tam >= largurapalco){
            this.dirx=-1
        }else if(this.px <= 0){
            this.dirx=1
        }
        if(this.py+this.tam >= alturapalco){
            this.diry=-1
        }else if(this.py <= 0){
            this.diry=1
        }
    }

    controlar=()=>{
        this.colisao_bordas()
        this.px+=this.dirx*this.velx
        this.py+=this.diry*this.vely
        this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        if((this.px > largurapalco)||(this.py > alturapalco)){
            this.remover()
        }
    }

}

window.addEventListener("resize",()=>{ /* para tratamento do tamanho da tela para remover e adcionar as bolinhas quando aumentamos ou dominuimos o tamanho da janela */
largurapalco = palco.offsetWidth
alturapalco = palco.offsetHeight   

})

add.addEventListener("click",()=>{ //adcionar bolinhas, pegando de quantidade
    const quant = qtd.value
    for(let i=0;i<quant;i++){ //loop para as bolinhas
        //Intaciar novas bolinhas
        bolas.push(new bola(bolas,palco))
    }
})

rem.addEventListener("click",()=>{
    bolas.map((b)=>{
        //remover as bolinha
        b.remover()
    })
})