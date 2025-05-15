// Informações do formulário
//armazenando em variaveis os campos do formulário
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");
const notificacao = document.getElementById("notificacao-conteudo");
const thbody = document.getElementById("produtos-lista");



//escondendo a notificação até que a pagina seja chamada

notificacao.style.display = 'none';

//listas para armazenar os dados do formulário
const categorias = [];
const produtos = [];

//função para exibir uma notificação
function exibirNotificacao(mensagem, status){
    //armazenando variaveis e a div e o spam que guardam a mensagem de notificação
  
    const messageEl = document.getElementById("notificacao-mensagem");


    //o textcontent é responsavel por alterar o texto guardado no messageEl,
    //ou seja,o q esta dentro do span lá no html

    messageEl.textContent = mensagem;

    if(status == 'sucesso'){
        notificacao.style.backgroundColor = '#dbead5';
    }else if( status == 'alerta'){
        notificacao.style.backgroundColor = '#ffffa0';
    }else if(status == 'erro'){
        notificacao.style.backgroundColor = '#fb6866';
        messageEl.style.color = '#470300';
    }

    notificacao.style.display ='block';

    //esconde a notificação depois de 3 segundos
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

let quantCamposPreenchidos = 0;

function verificaCampos() {
    quantCamposPreenchidos = 0;
    let camposPreenchidos = true;

    //valida se o campo nome esta vazio e exibe uma mensagem
    if(nome.value == ''){
        document.getElementById("erro-nome").style.display = 'block';
        camposPreenchidos = false;
    }else{
        document.getElementById("erro-nome").style.display = 'none';
        quantCamposPreenchidos += 1;
    }

    //valida se o campo categoria esta vazio e exibe uma mensagem
    if(categoria.value == ''){
        document.getElementById("erro-categoria").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-categoria").style.display = "none";
        quantCamposPreenchidos += 1;
    }

    //valida se o campo preco esta vazio e exibe uma mensagem
    if(preco.value == ''){
        document.getElementById("erro-preco").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-preco").style.display = "none";
        quantCamposPreenchidos += 1;
    }

    //valida se o campo quantidade esta vazio e exibe uma mensagem
    if(quantidade.value == '' || quantidade.value ==0){
        document.getElementById("erro-quantidade").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-quantidade").style.display = "none";
        quantCamposPreenchidos += 1;
    }

    return camposPreenchidos;
}

//manipulando o evento de submit do formulário
produtoForm.addEventListener("submit", (event) => {
    //impedir de recarregar a página quando o evento de submit(envio) for chamado 
    event.preventDefault();

    if (verificaCampos() == false && quantCamposPreenchidos == 0){
        exibirNotificacao(`
            Nenhum produto adicionado, preencha todos os campos!`, 
            'erro'
        );
        return;
    } else if (verificaCampos() == false && quantCamposPreenchidos < 4){
        exibirNotificacao(`
            Ainda faltam alguns campos a serem preenchidos!`, 
            'alerta'
        );
        return
    }

    exibirNotificacao("produto adicionado com sucesso!", "sucesso");

    //criando um objeto para armazenar os dados do formulário
    const produtoInserido = {
        nome: nome.value,
        categoria: categoria.value,
        preco: preco.value,
        quantidade: quantidade.value,
        imagem: imagem.value 
    }

    let produtosSalvos = JSON.parse(localStorage.getItem("nomeProduto")) || [];
     //aguardando esses dados novos na lista
     produtosSalvos.push(produtoInserido);

    //guardando a lista no localstorage, transformando os dados para 
    // json usando o JSON.stringify
    localStorage.setItem("nomeProduto", JSON.stringify(produtosSalvos));

    //limpando os campos do formulário
    produtoForm.reset();

    adicionarItemTabela();
});



function adicionarItemTabela(){
    const semProdutosDiv = document.getElementById("sem-produtos");
    let produtos =  JSON.parse(localStorage.getItem("nomeProduto")) || [];

    let valoresTabela='';

    if(produtos.length >0){
        semProdutosDiv.style.display = 'none';
    }

    produtos.forEach(produto => {
        console.log(produto);
        valoresTabela += `
        <tr>
            <td></td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.preco}</td>
            <td>${produto.quantidade}</td>                 
        </tr>
        `
    });

    thbody.innerHTML =  valoresTabela
}

adicionarItemTabela();
