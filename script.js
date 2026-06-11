// --- CONFIGURAÇÃO ---
// Coloque aqui o número de WhatsApp da sua esposa (com código do país e DDD). 
// Exemplo: 5546999999999 (55 = Brasil, 46 = DDD da região de Clevelândia)
const numeroWhatsApp = "5546999999999"; 

// Função para formatar o valor em Reais (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função que calcula o total em tempo real
function calcularTotal() {
    let total = 0;

    // Pega o valor do bolo
    const selectBolo = document.getElementById('bolo');
    total += parseFloat(selectBolo.value);

    // Pega o valor da embalagem
    const selectEmbalagem = document.getElementById('embalagem');
    total += parseFloat(selectEmbalagem.value);

    // Pega as quantidades de docinhos e multiplica pelo preço de cada um
    const doces = document.querySelectorAll('.qtd-doce');
    doces.forEach(input => {
        const qtd = parseInt(input.value) || 0;
        const preco = parseFloat(input.getAttribute('data-preco'));
        total += (qtd * preco);
    });

    // Atualiza o texto na tela
    document.getElementById('valorTotal').innerText = formatarMoeda(total);
}

// Adiciona "ouvintes" para recalcular sempre que o cliente mexer em algum campo
document.getElementById('bolo').addEventListener('change', calcularTotal);
document.getElementById('embalagem').addEventListener('change', calcularTotal);
const inputsDoces = document.querySelectorAll('.qtd-doce');
inputsDoces.forEach(input => {
    input.addEventListener('input', calcularTotal);
});

// Ação do botão de Enviar por WhatsApp
document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    let totalCalculado = 0;
    let mensagem = "Olá! Gostaria de fazer uma encomenda. Aqui estão os detalhes do meu pedido:\n\n";

    // Dados do Bolo
    const selectBolo = document.getElementById('bolo');
    if (selectBolo.value > 0) {
        const nomeBolo = selectBolo.options[selectBolo.selectedIndex].getAttribute('data-nome');
        mensagem += `🎂 *Bolo:* ${nomeBolo}\n`;
        totalCalculado += parseFloat(selectBolo.value);
    }

    // Dados dos Docinhos
    let temDoce = false;
    const doces = document.querySelectorAll('.qtd-doce');
    doces.forEach(input => {
        const qtd = parseInt(input.value) || 0;
        if (qtd > 0) {
            if (!temDoce) {
                mensagem += `\n🍬 *Docinhos:*\n`;
                temDoce = true;
            }
            const nomeDoce = input.getAttribute('data-nome');
            const preco = parseFloat(input.getAttribute('data-preco'));
            const subtotalDoce = qtd * preco;
            mensagem += `- ${qtd}x ${nomeDoce} (${formatarMoeda(subtotalDoce)})\n`;
            totalCalculado += subtotalDoce;
        }
    });

    // Dados da Embalagem
    const selectEmbalagem = document.getElementById('embalagem');
    const nomeEmbalagem = selectEmbalagem.options[selectEmbalagem.selectedIndex].getAttribute('data-nome');
    mensagem += `\n🎁 *Embalagem:* ${nomeEmbalagem}\n`;
    totalCalculado += parseFloat(selectEmbalagem.value);

    // Total Final
    mensagem += `\n💰 *VALOR TOTAL: ${formatarMoeda(totalCalculado)}*\n\n`;
    mensagem += `Aguardo a confirmação do pedido e as informações para pagamento. Obrigado(a)!`;

    // Verifica se a pessoa selecionou pelo menos alguma coisa
    if (totalCalculado === 0) {
        alert("Por favor, adicione algum item ao seu pedido antes de enviar.");
        return;
    }

    // Codifica a mensagem para o formato de link da internet e abre o WhatsApp
    const textoCodificado = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;
    
    window.open(linkWhatsApp, '_blank');
});
