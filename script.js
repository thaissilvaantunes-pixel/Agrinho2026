document.getElementById('cisternaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura a área inserida pelo utilizador
    const area = parseFloat(document.getElementById('areaTelhado').value) || 0;

    // Constantes para o cálculo:
    // Precipitação média mensal na região (Clevelândia): ~160 mm
    const precipitacaoMensal = 160; 
    
    // Coeficiente de escoamento (perda de água por evaporação ou salpicos no telhado): 0.8 (80% de aproveitamento)
    const coeficienteEscoamento = 0.8;

    // Fórmula: Volume = Área (m²) x Precipitação (mm) x Coeficiente
    const litrosMensais = area * precipitacaoMensal * coeficienteEscoamento;

    // --- Conversão Pedagógica para o Agrinho ---
    // Uma horta consome em média cerca de 5 litros de água por m² ao dia (aprox. 150 litros por mês)
    const consumoHortaMensalPorM2 = 150;
    const tamanhoHortaM2 = litrosMensais / consumoHortaMensalPorM2;

    // Atualiza a interface (ecrã) com os resultados
    const areaResultado = document.getElementById('resultado');
    const valorLitros = document.getElementById('valor-litros');
    const mensagemImpacto = document.getElementById('mensagem-impacto');

    // Formata o número para ter separador de milhares
    valorLitros.innerText = Math.round(litrosMensais).toLocaleString('pt-PT') + " Litros / Mês";

    mensagemImpacto.innerHTML = `Com <strong>${Math.round(litrosMensais).toLocaleString('pt-PT')} litros</strong> armazenados, é possível garantir a rega completa de uma horta de <strong>${Math.round(tamanhoHortaM2)} metros quadrados</strong> durante um mês inteiro, sem utilizar uma única gota da rede pública de água ou de nascentes!`;

    // Mostra o resultado com a animação
    areaResultado.className = 'resultado-visivel';
});
