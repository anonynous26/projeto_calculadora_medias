// Seleciona o formulário de atividades pelo ID
const form = document.getElementById('form-atividade');

// Define as imagens para os resultados de aprovação e reprovação
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />';

// Arrays para armazenar as atividades e suas respectivas notas
const atividades = [];
const notas = [];

// Define os spans para exibir o resultado final (aprovado ou reprovado)
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Solicita ao usuário a nota mínima para aprovação e converte para número
const notaMinima = parseFloat(prompt("Qual a nota mínima para aprovação?"));

// Variável para armazenar as linhas da tabela
let linhas = '';

// Adiciona um evento de submissão ao formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    adicionaLinha(); // Adiciona uma nova linha à tabela
    atualizaTabela(); // Atualiza a tabela com as novas informações
    atualizaMediaFinal(); // Atualiza a média final e o resultado
});

// Função para adicionar uma nova linha na tabela
function adicionaLinha() {
    // Obtém os valores dos inputs de nome e nota da atividade
    const inputNomeAtividade = document.getElementById('nome-atividade');  
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi cadastrada
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já está cadastrada`);
    } else {
        // Adiciona a atividade e a nota aos arrays
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Cria uma nova linha para a tabela
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`; // Nome da atividade
        linha += `<td>${inputNotaAtividade.value}</td>`; // Nota da atividade
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // Imagem de aprovado/reprovado
        linha += '</tr>';

        // Adiciona a nova linha à variável de linhas
        linhas += linha;
    }

    // Limpa os campos de input
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// Função para atualizar a tabela com as linhas armazenadas
function atualizaTabela() {
    const tabela = document.querySelector('tbody'); // Seleciona o corpo da tabela
    tabela.innerHTML = linhas; // Atualiza o conteúdo da tabela
}

// Função para atualizar a média final e o resultado
function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); // Calcula a média final

    // Atualiza o valor da média final no HTML
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);

    // Atualiza o resultado (aprovado ou reprovado) com base na média final
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; 
}

// Função para calcular a média final das notas
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Soma todas as notas armazenadas no array
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Retorna a média (soma das notas dividido pelo número de notas)
    return somaDasNotas / notas.length;
}
