// Planejamento: Tema (Academia), Entrada (Orçamento do usuário), Processamento (Classificação de planos por faixa de preço, switch de categorias e loops), Saída (Relatório no console e interações DOM).
const planosAcademia = [
    { nome: "Musculação Básica", preco: 90, categoria: "Musculação" },
    { nome: "Muay Thai Intensivo", preco: 120, categoria: "Luta" },
    { nome: "CrossFit Total", preco: 150, categoria: "Funcional" },
    { nome: "Jiu-Jitsu", preco: 130, categoria: "Luta" },
    { nome: "Plano Família", preco: 250, categoria: "Promocional" },
    { nome: "VIP Gold Anual", preco: 1000, categoria: "Completo" }
];

let entradaUsuario = prompt("Informe um valor limite de orçamento para filtrar os planos:");
let limiteOrcamento = Number(entradaUsuario);

if (entradaUsuario === null || entradaUsuario.trim() === "" || isNaN(limiteOrcamento)) {
    console.warn("Entrada inválida ou cancelada. Usando valor padrão de R$ 150.");
    limiteOrcamento = 150;
}

console.log("=== RELATÓRIO DE PLANOS DA IRON FITNESS ===");
console.log(`Orçamento limite informado: R$ ${limiteOrcamento}`);

console.log("\n--- Classificação dos Planos ---");
for (let plano of planosAcademia) {
    let faixaPreco = "";
    if (plano.preco <= 100) {
        faixaPreco = "Econômico";
    } else if (plano.preco <= 200) {
        faixaPreco = "Intermediário";
    } else {
        faixaPreco = "Premium";
    }
    console.log(`Plano: ${plano.nome} | Preço: R$ ${plano.preco} | Faixa: ${faixaPreco}`);
}

console.log("\n--- Mensagens por Categoria (Switch) ---");
for (let plano of planosAcademia) {
    let mensagem = "";
    switch (plano.categoria) {
        case "Musculação":
            mensagem = "Foco em hipertrofia e resistência.";
            break;
        case "Luta":
            mensagem = "Alta intensidade, técnica e defesa pessoal.";
            break;
        case "Funcional":
            mensagem = "Condicionamento físico global.";
            break;
        case "Promocional":
            mensagem = "Ótimo custo-benefício para grupos.";
            break;
        default:
            mensagem = "Acesso total a todas as dependências.";
            break;
    }
    console.log(`[${plano.categoria}] ${plano.nome}: ${mensagem}`);
}

let somaPrecos = 0;
let planosAcessiveis = 0;
for (let i = 0; i < planosAcademia.length; i++) {
    somaPrecos += planosAcademia[i].preco;
    if (planosAcademia[i].preco <= limiteOrcamento) {
        planosAcessiveis++;
    }
}
let mediaPrecos = somaPrecos / planosAcademia.length;

console.log("\n--- Resumo Estatístico ---");
console.log(`Média de preço dos planos: R$ ${mediaPrecos.toFixed(2)}`);
console.log(`Quantidade de planos dentro do seu orçamento (R$ ${limiteOrcamento}): ${planosAcessiveis}`);

console.table(planosAcademia);

// Controle interativo da caixa de saúde (Sim / Não)
const radiosSaude = document.querySelectorAll('input[name="possui-saude"]');
const campoProblemaSaude = document.getElementById("campo-problema-saude");

radiosSaude.forEach(radio => {
    radio.addEventListener("change", function() {
        if (this.value === "sim") {
            campoProblemaSaude.style.display = "block";
            document.getElementById("qual-problema").setAttribute("required", "required");
        } else {
            campoProblemaSaude.style.display = "none";
            document.getElementById("qual-problema").removeAttribute("required");
            document.getElementById("qual-problema").value = "";
        }
    });
});

// Validação e envio do formulário sem recarregar a página
const form = document.getElementById("form-matricula");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email").value;
    const whatsappInput = document.getElementById("whatsapp").value;

    // Validação de E-mail
    if (!emailInput.includes("@") || !emailInput.includes(".")) {
        alert("Atenção: O e-mail informado é inválido! Faltam caracteres essenciais como '@' ou '.'");
        return;
    }

    // Validação de Telefone (exatamente 11 dígitos)
    if (whatsappInput.length !== 11 || isNaN(Number(whatsappInput))) {
        alert("Atenção: O WhatsApp deve conter exatamente 11 dígitos numéricos (com DDD).");
        return;
    }

    mensagemSucesso.style.display = "block";
    form.reset();
    campoProblemaSaude.style.display = "none";

    setTimeout(function() {
        mensagemSucesso.style.display = "none";
    }, 5000);
});