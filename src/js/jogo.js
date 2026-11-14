const tabuleiro = document.getElementsByClassName("tabuleiro")[0]

console.log(tabuleiro)

const times = ["X", "O"]
let time_jogando = null


const comeco = Math.floor(Math.random()*100) + 1

if(comeco > 50) {
    time_jogando = "X"
} else { time_jogando = "O"}

// ao clicar em uma casa deixar ela selecionada com um "placeholder" da peça do time jogando
// criar uma variavel para guardar o espaço selecionado
// se outro espaço for clicado, tirar o place holder do espaço selecionado anteriormente 
// caso a mesma casa seja clicada 2x, colocar a peça do time jogando e trocar de turno


tabuleiro.addEventListener('click', function(event) {

    const espaco_clicado = checar_espaco(event)
    if(espaco_clicado === null) return

    colocar_peca(espaco_clicado)

})

function checar_espaco(event) {
    const peca_clicada = event.target
    if(!peca_clicada.classList.contains("vazio")) {
            return null
        }
    return peca_clicada
}


function colocar_peca(espaco_clicado) {
        let cor_time = null
        if(time_jogando === "X" ? cor_time = "tim1" : cor_time = "tim2")
        espaco_clicado.innerHTML = `<span class="peca ${cor_time}">${time_jogando}</span>`

        if(time_jogando === "X" ? time_jogando = "O" : time_jogando = "X") {}
}
