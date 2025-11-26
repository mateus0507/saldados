// URL base da API
const API_URL = "http://localhost:3000/agendamentos";

// ------- CADASTRAR AGENDAMENTO (POST) -------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-agendamento");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dados = {
                nome: document.getElementById("nome").value,
                telefone: document.getElementById("telefone").value,
                endereco: document.getElementById("endereco").value,
                pagamento: document.getElementById("pagamento").value,
            };

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dados)
                });

                const result = await response.text();
                alert(result);
                form.reset();
                carregarAgendamentos();
            } catch (erro) {
                console.error("Erro ao cadastrar:", erro);
            }
        });
    }

    carregarAgendamentos();
});


// ------- LISTAR AGENDAMENTOS (GET) -------
async function carregarAgendamentos() {
    const lista = document.getElementById("recent-orders");
    if (!lista) return;

    try {
        const resposta = await fetch(API_URL);
        let dados = await resposta.json();

        // Ordenar do mais recente para o mais antigo
        dados.sort((a, b) => b.id - a.id);

        // Mostrar apenas os 5 últimos pedidos
        dados = dados.slice(0, 5);

        lista.innerHTML = ""; 

        dados.forEach((item) => {
            lista.innerHTML += `
                <div class="p-4 bg-gray-100 rounded-lg shadow-sm border flex justify-between items-center">
                    <div>
                        <p><strong>Nome:</strong> ${item.nome}</p>
                        <p><strong>Telefone:</strong> ${item.telefone}</p>
                        <p><strong>Endereço:</strong> ${item.endereco}</p>
                        <p><strong>Pagamento:</strong> ${item.pagamento}</p>
                    </div>

                    <button 
                        onclick="deletarPedido(${item.id})"
                        class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">
                        Excluir
                    </button>
                </div>
            `;
        });

    } catch (erro) {
        console.log("Erro ao carregar pedidos:", erro);
    }
}

// ------- EDITAR AGENDAMENTO (PATCH) -------
async function editarAgendamento(id) {
    const nome = prompt("Novo nome:");
    const telefone = prompt("Novo telefone:");
    const endereco = prompt("Novo endereço:");
    const pagamento = prompt("Novo pagamento:");

    const dados = { nome, telefone, endereco, pagamento };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const result = await response.text();
        alert(result);
        carregarAgendamentos();
    } catch (erro) {
        console.log("Erro ao atualizar:", erro);
    }
}



// ------- DELETAR AGENDAMENTO (DELETE) -------
async function deletarPedido(id) {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.text();
        alert(result);

        carregarAgendamentos(); // Atualiza a lista após deletar
    } catch (erro) {
        console.log("Erro ao deletar pedido:", erro);
        alert("Erro ao deletar pedido!");
    }
}

