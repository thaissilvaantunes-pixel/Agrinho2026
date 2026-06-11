// Pegando os elementos do HTML
const tempRange = document.getElementById('tempRange');
const moistureRange = document.getElementById('moistureRange');
const tempValue = document.getElementById('tempValue');
const moistureValue = document.getElementById('moistureValue');

const resultBox = document.getElementById('resultBox');
const statusTitle = document.getElementById('statusTitle');
const statusMessage = document.getElementById('statusMessage');

// Função principal que calcula a lógica de irrigação
function calcularIrrigacao() {
    const temp = parseInt(tempRange.value);
    const umidade = parseInt(moistureRange.value);

    // Atualiza os números na tela
    tempValue.textContent = temp;
    moistureValue.textContent = umidade;

    // Remove todas as cores (classes) antigas da caixa de resultado
    resultBox.classList.remove('status-ideal', 'status-alerta', 'status-critico', 'status-encharcado');

    // 🧠 Lógica do Aplicativo (if/else)
    if (umidade < 30) {
        // Solo muito seco
        resultBox.classList.add('status-critico');
        statusTitle.textContent = "🚨 Irrigação Urgente!";
        statusMessage.textContent = "O solo está criticamente seco. Ligue a bomba d'água imediatamente para não perder a lavoura.";
        
    } else if (umidade >= 30 && umidade <= 70) {
        // Solo com umidade média, mas depende da temperatura
        if (temp > 35) {
            resultBox.classList.add('status-alerta');
            statusTitle.textContent = "⚠️ Atenção: Alto Calor";
            statusMessage.textContent = "O solo tem água, mas o sol está muito forte. A evaporação será rápida, prepare-se para irrigar em breve.";
        } else {
            resultBox.classList.add('status-ideal');
            statusTitle.textContent = "✅ Condição Ideal";
            statusMessage.textContent = "O solo tem a umidade perfeita e o clima está agradável. Parabéns pela economia de água!";
        }
        
    } else {
        // Umidade acima de 70%
        resultBox.classList.add('status-encharcado');
        statusTitle.textContent = "💧 Solo Encharcado";
        statusMessage.textContent = "A terra já absorveu água suficiente. Desligue a irrigação agora para evitar o desperdício de água e o apodrecimento da raiz.";
    }
}

// Escuta quando o usuário mexe nas barrinhas e chama a função
tempRange.addEventListener('input', calcularIrrigacao);
moistureRange.addEventListener('input', calcularIrrigacao);

// Roda a função uma vez quando a página abre para configurar a tela inicial
calcularIrrigacao();
