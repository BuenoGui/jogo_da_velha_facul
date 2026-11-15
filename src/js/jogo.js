const tabuleiro = document.getElementsByClassName("tabuleiro")[0]

for (let i = 0; i < 9; i++) {
    tabuleiro.innerHTML += `<div class="espaco vazio ${i}"></div>`
}

const times = ["X", "O"]
let time_jogando = null

const comeco = Math.floor(Math.random()*100) + 1

const inicios_horizontal = [0, 3, 6]
const inicios_vertical = [0,1,2]
const inicios_diagonal_esquerda = [0]
const inicios_diagonal_direita = [2]

const inicios = [
    inicios_horizontal, inicios_vertical, inicios_diagonal_esquerda, inicios_diagonal_direita
]

// console.log(inicios)

if(comeco > 50) {
    time_jogando = "X"
} else { time_jogando = "O"}

// ao clicar em uma casa deixar ela selecionada com um "placeholder" da peça do time jogando
// criar uma variavel para guardar o espaço selecionado
// se outro espaço for clicado, tirar o place holder do espaço selecionado anteriormente 
// caso a mesma casa seja clicada 2x, colocar a peça do time jogando e trocar de turno


tabuleiro.addEventListener('click', function(event) {

    const espaco_clicado = checar_espaco(event)
    if(espaco_clicado === null) {
        return
    }

    colocar_peca(espaco_clicado)

    if(checar_vitoria(time_jogando) === String) {
        return checar_vitoria(time_jogando)
    }

    trocar_times()

})

function trocar_times() {
    if(time_jogando === "X" ? time_jogando = "O" : time_jogando = "X") {}
}

function checar_espaco(event) {
    const peca_clicada = event.target
    if(!peca_clicada.classList.contains("vazio")) {
            return null
        }
    return peca_clicada
}

function colocar_peca(espaco_clicado) {
        let cor_time = null
        if(time_jogando === "X" ? cor_time = "X" : cor_time = "O")
        espaco_clicado.innerHTML = `<span class="peca ${cor_time}">${time_jogando}</span>`

        // remove o vazio da div para não ficar trocando infinito
        espaco_clicado.classList.remove("vazio")
}

function checar_horizontal(pecas) {

    const index_vitoria = []
    
    inicios_horizontal.forEach(inicio => {
        if(pecas.includes(inicio) && pecas.includes(inicio + 1) && pecas.includes(inicio + 2)) { 
            index_vitoria.push(inicio) 
        }
    });
    
    if(index_vitoria.length === 0) {
        return null
    }

    return index_vitoria

}

function checar_vitoria(time_jogando) {
    const pecas = tabuleiro.querySelectorAll(`.${time_jogando}`)

    if(pecas.length < 3) {
        return false
    }

    const pecas_time_jogando = []

    pecas.forEach(peca => {
        pecas_time_jogando.push(Number(peca.parentElement.classList[1]))
    });

    const ganhou_horizontal = checar_horizontal(pecas_time_jogando)

    if(ganhou_horizontal === null) { 
        return console.log("ningue ganhou")
    }

    console.log("ganhou na horizontal, index: " + ganhou_horizontal)
    
}
