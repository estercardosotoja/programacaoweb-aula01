import { db } from "./firebaseConfig.js"
import { getDocs, collection, doc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


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
        <button class="btn-Excluir" data-id="${funcionario.id}"> Excluir </button>
        <button class="btn-Editar" data-id="${funcionario.id}"> Editar </button>
        `
        listaFuncionarioDiv.appendChild(funcionarioDiv)
    } 
    addEventListener();
}

async function excluirFuncionario(idFuncionario) {
    try{
        const documentoDeletar = doc(db, "funcionarios", idFuncionario);
        await deleteDoc(documentoDeletar)
        console.log("Funcionario com ID" + idFuncionario + "foi excluído.")
        return true;
    }catch (erro){
        console.log("Erro ao excluir o funcionario", erro)
        alert("Ocorreu um erro ao excluir o funcionario. Tente novamente!")
        return false;
    }
}

async function lidarClique(eventoDeClique) {
    const btnExcluir = eventoDeClique.target.closest('.btn-Excluir')
    if(btnExcluir){
        const certeza = confirm("Tem certeza que deseja fazer essa exclusão?")
        if(certeza){
            
            const idFuncionario = btnExcluir.dataset.id;
            const exclusaoBemSucedida = await excluirFuncionario(idFuncionario)

            if(exclusaoBemSucedida) {
                carregarListaDeFuncionarios();
                alert("Funcionario excluído com sucesso! \o/ ")
            } 
        } else {
                alert("Exclusão cancelada")
        }
    }

    const btnEditar = eventoDeClique.target.closest('.btn-Editar')
    if (btnEditar){
        const idFuncionario = btnEditar.dataset.id
        const funcionario = await buscarFuncionariosPorId(idFuncionario)

        const edicao = getValoresEditar()

        edicao.editarNome.value=funcionario.nome
        edicao.editarIdade.value=funcionario.idade
        edicao.editarCargo.value=funcionario.cargo
        editar.editarId.value=funcionario.id

        edicao.formularioEdicao.style.display = 'block'
    }
}

function getValoresEditar() {
    return {
        editarNome: document.getElementById("editar-nome"),
        editarIdade: document.getElementById("editar-idade"),
        editarCargo: document.getElementById("editar-cargo"),
        editarId: document.getElementById("editar-id")
    }
}

async function buscarFuncionariosPorId(id) {
    try{
        const funcionarioDoc = doc(db, "funcionarios", id)
        const dadoAtual = await getDocs(funcionarioDoc)

        if (dadoAtual.exists()){
            return {id: dadoAtual.id, ...dadoAtual.data()}
        }else {
            console.log("Funcionário não encontrando com o ID", id);
            return null;
        }
    } catch (erro){
        console.log("Erro ao buscar o funcionário por ID ", erro)
        alert("Erro ao buscar funcionario para editar")
        return null
    }
    
}

document.getElementById("btnSalvarEdicao").addEventListener("click", async () => {
    const id = edicao.editarId.value;
    const novoDados={
        nome: edicao.editarNome.value.trim(),
        idade: parseInt(edicao.editarIdade.value),
        cargo: edicao.editarId.value.trim()
    }

    try{
        const ref = doc(db, "funcionarios", id)
        await setDoc(ref, novoDados)
        alert("Funcionario atualizado com sucesso!")
        edicao.formularioEdicao.style.display = 'none'
        carregarListaDeFuncionarios();
    } catch (error){
        console.log("Erro ao salvar edicão", error);
        alert("Erro ao atualizar funcionário.")
    }
})

document.getElementById('btnCancelarEdicao').addEventListener('click', () => {
    document.getElementById("formulario-edicao").style.display = 'none'
})

function addEventListener(){
    listaFuncionarioDiv.addEventListener("click", lidarClique)
}

document.addEventListener("DOMContentLoaded", carregarListaDeFuncionarios)