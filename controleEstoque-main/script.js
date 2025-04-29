// Informações do formulário
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");


produtoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if(nome.value == ''){
        document.getElementById("erro-nome").style.display = 'block';
    }else{
        document.getElementById("erro-nome").style.display = 'none';
    }
});
