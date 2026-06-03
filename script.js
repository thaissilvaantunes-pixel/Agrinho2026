let nivel = 20;

function alimentar(){

nivel += 25;

if(nivel > 100){
nivel = 100;
}

document.getElementById("nivelRacao").style.width =
nivel + "%";

document.getElementById("statusRacao").innerHTML =
"Comedouro acionado com sucesso.";
}

function ativarCompostagem(){

document.getElementById("statusComposto").innerHTML =
"Processo iniciado. Resíduos sendo transformados em adubo.";
}

function calcular(){

let animais =
parseInt(
document.getElementById("animais").value
);

if(isNaN(animais)){

document.getElementById("resultado").innerHTML =
"Digite uma quantidade válida.";

return;
}

let racao = animais * 2;

let adubo = animais * 3;

document.getElementById("resultado").innerHTML =

`Para ${animais} animais:

• ${racao} kg de ração por dia

• ${adubo} kg de adubo por mês

• Economia estimada de resíduos: ${animais*5}%`;
}
