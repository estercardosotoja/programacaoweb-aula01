import { db } from "./firebaseConfig.js"
import { getDocs, collection, doc, } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


async function buscarFuncionarios() {
    const dadosBanco = await getDocs(collection(db, "funcionarios"))
    const funcionarios = [ ]
    for (const doc of dadosBanco.docs){
        funcionarios.push({id: doc.id, ...doc.data()})
    }
    return funcionarios;
}

const listaFuncionarioDiv = document.getElementById("listar-funcionarios");

async function carregarListaDeFuncionarios() {
    listaFuncionarioDiv.innerHTML = '<p> Carregando Lista de Funcionarios ... </p>'
    try{
        const funcionarios = await buscarFuncionarios()
        console.log(funcionarios)
        renderizarListaDeFuncionarios(funcionarios)
    }catch (error) {
        console.log("Erro ao carregar a lista de Funcionarios: ", error);
        listaFuncionarioDiv.innerHTML = '<p> Erro ao Carregar a lista de Funcionarios </p>'
    }
}

function renderizarListaDeFuncionarios(funcionarios){
    listaFuncionarioDiv.innerHTML = " "

    if(funcionarios.length === 0){
        listaFuncionarioDiv.innerHTML = '<p> Nenhum funcionario cadastrado ainda ;( </p>'
        return
    }

    for (let funcionario of funcionarios){
        const funcionarioDiv = document.createElement("div");
        funcionarioDiv.classList.add('funcionario-item');
        funcionarioDiv.innerHTML = ` 
        <strong>  Nome: </strong> ${funcionario.nome} <br>
        <strong> Idade: </strong> ${funcionario.idade} <br>
        <strong> Cargo: </strong> ${funcionario.cargo} <br>
        `
        listaFuncionarioDiv.appendChild(funcionarioDiv)
    } 
}

document.addEventListener("DOMContentLoaded", carregarListaDeFuncionarios)