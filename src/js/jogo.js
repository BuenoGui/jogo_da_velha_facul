const tabuleiro = document.getElementsByClassName("tabuleiro")[0]

console.log(tabuleiro)

const times = ["x", "o"]
let time_jogando = null


const comeco = Math.floor(Math.random()*100) + 1

if(comeco > 50) {
    time_jogando = "x"
} else { time_jogando = "o"}

console.log(time_jogando)
// ao clicar em uma casa deixar ela selecionada com um "placeholder" da peça do time jogando
// criar uma variavel para guardar o espaço selecionado
// se outro espaço for clicado, tirar o place holder do espaço selecionado anteriormente 
// caso a mesma casa seja clicada 2x, colocar a peça do time jogando e trocar de turno


tabuleiro.addEventListener('click', function(event) {
    console.log(event.target)

    const espaco_clicado = event.target

    console.log(espaco_clicado.classList)

    if(espaco_clicado.classList.contains("vazio")) {
        let cor_time = null
        if(time_jogando === "x" ? cor_time = "tim1" : cor_time = "tim2")
        espaco_clicado.innerHTML = `<span class="${cor_time}">${time_jogando}</span>`
    }



})


