const tabuleiro = document.getElementsByClassName("tabuleiro")[0]
const timer = document.getElementsByClassName("timer")[0]

for (let i = 0; i < 9; i++) {
    tabuleiro.innerHTML += `<div class="espaco vazio espaco-${i}"></div>`
}

const times = ["X", "O"]
let time_jogando = null

const comeco = Math.floor(Math.random()*100) + 1

const inicios_horizontal = [0, 3, 6]
const inicios_vertical = [0,1,2]
const inicios_diagonal_esquerda = [0]
const inicios_diagonal_direita = [2]

const dicionario_direcoes_passos = {
    horizontal: 1,
    vertical: 3,
    diagonal_esquerda: 4,
    diagonal_direita: 2
}

if(comeco > 50) {
    time_jogando = "X"
} else { time_jogando = "O"}

let timer_id = null;
let jogadas = 0

let linhas_vitorias = 0

// ao clicar em uma casa deixar ela selecionada com um "placeholder" da peça do time jogando
// criar uma variavel para guardar o espaço selecionado
// se outro espaço for clicado, tirar o place holder do espaço selecionado anteriormente 
// caso a mesma casa seja clicada 2x, colocar a peça do time jogando e trocar de turno

let vitoria = null

tabuleiro.addEventListener('click', function(event) {

    const espaco_clicado = checar_espaco(event)
    if(espaco_clicado === null) {
        return
    }

    if(jogadas < 1) {
        comecar_contador()
    }
    jogadas++

    if(linhas_vitorias > 0) { return }

    colocar_peca(espaco_clicado)

    const vitorias = checar_vitoria(time_jogando)

    trocar_times()


    if(vitorias === null ) {
        return console.log("ninguem ganhou ainda")
    }

    // SE ALGUEM GANHOU, então...
    // para o contador e imprimi a vitoria
    
    
    // checa a direção que ganhou
    for(const index in vitorias) {
        if(vitorias[index] != null) {
            vitoria = vitorias
            linhas_vitorias++
            parar_contador()
        }
    }

    if(linhas_vitorias < 1) { return }


    // para cada linha de vitoria ativar o HIGHLIGHT nas colunas
    // pegar a direção e linha inicial
    for(let i = 0; i < linhas_vitorias; i++) {
        for(const direcao in vitoria) {
            if(vitoria[direcao] == null) { continue }
            const casa_inicial = vitoria[direcao]

            console.log(casa_inicial[0], direcao)
            highlight(casa_inicial[0], direcao)

        }


    }

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

function checar_vertical(pecas) {

    const index_vitoria = []

    inicios_vertical.forEach(inicio => {
        if(pecas.includes(inicio) && pecas.includes(inicio + 3) && pecas.includes(inicio + 6)) {
            index_vitoria.push(inicio)
        }
    })

    if(index_vitoria.length === 0) {
        return null
    }
        
    return index_vitoria
}

function checar_diagonal_direita(pecas) {

    const index_vitoria = []
    const inicio = inicios_diagonal_direita[0]

    if(pecas.includes(inicio) && pecas.includes(inicio + 2) && pecas.includes(inicio + 4)) {
        index_vitoria.push(inicio)
        return index_vitoria
    }

    return null

}

function checar_diagonal_esquerda(pecas) {

    const index_vitoria = []
    const inicio = inicios_diagonal_esquerda[0]

    if(pecas.includes(inicio) && pecas.includes(inicio + 4) && pecas.includes(inicio + 8)) {
        index_vitoria.push(inicio)
        return index_vitoria
    }
    
    return null 

}

function checar_vitoria(time_jogando) {

    const pecas = tabuleiro.querySelectorAll(`.${time_jogando}`)
    const pecas_time_jogando = []
    
    pecas.forEach(peca => {
        pecas_time_jogando.push(Number(peca.parentElement.classList[1].split("-")[1]))
    });

    if(pecas.length < 3) {
        return null
    }

    let ganhou = {
        horizontal: null,
        vertical: null,
        diagonal_esquerda: null,
        diagonal_direita: null
    }

    // aqui pega o valo
    ganhou.horizontal = checar_horizontal(pecas_time_jogando)
    ganhou.vertical = checar_vertical(pecas_time_jogando)
    ganhou.diagonal_direita = checar_diagonal_direita(pecas_time_jogando)
    ganhou.diagonal_esquerda = checar_diagonal_esquerda(pecas_time_jogando)

    return ganhou
}

function highlight(casa_inicial, direcao) {
    let casas = []
    const pasos = dicionario_direcoes_passos[direcao]
    console.log(pasos)

    for(let i = 0; i< 3; i++) {
        const casa_atual_obj = document.getElementsByClassName(`espaco-${casa_inicial + (pasos * i)}`)[0]

        casa_atual_obj.classList.add(`casa_vitoria_${i}`)

        casas.push(casa_atual_obj)
    }

    console.log(casas)

}

// TIMER

function comecar_contador() {
    let segundos = 0

    timer_id = setInterval(() => {
        segundos += 0.01
        timer.textContent = `${segundos.toFixed(2)}`
    }, 10)

}

function parar_contador() {
    clearInterval(timer_id)
    timer_id = null
}

function zerar_contador() {
    parar_contador()
    timer.textContent = "0.00"
}