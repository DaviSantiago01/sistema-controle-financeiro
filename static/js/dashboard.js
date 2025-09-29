// Configuração dos gráficos do dashboard

// Função para formatar valores monetários
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para criar gráfico de pizza das categorias
function criarGraficoCategorias(canvasId, dados, titulo) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dados.map(item => item.categoria__nome),
            datasets: [{
                data: dados.map(item => item.total),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#C9CBCF'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: titulo,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const valor = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const porcentagem = ((valor / total) * 100).toFixed(1);
                            return `${context.label}: ${formatarMoeda(valor)} (${porcentagem}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Função para criar gráfico de linha da evolução mensal
function criarGraficoEvolucao(canvasId, dados) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dados.map(item => item.mes),
            datasets: [
                {
                    label: 'Receitas',
                    data: dados.map(item => item.receitas),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Despesas',
                    data: dados.map(item => item.despesas),
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Saldo',
                    data: dados.map(item => item.saldo),
                    borderColor: '#17a2b8',
                    backgroundColor: 'rgba(23, 162, 184, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução Financeira (Últimos 6 Meses)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${formatarMoeda(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    },
                    ticks: {
                        callback: function(value) {
                            return formatarMoeda(value);
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Função para animar contadores
function animarContador(elemento, valorFinal, duracao = 1000) {
    const valorInicial = 0;
    const incremento = valorFinal / (duracao / 16);
    let valorAtual = valorInicial;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = formatarMoeda(valorAtual);
    }, 16);
}

// Inicializar animações quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Animar contadores dos cards de resumo
    const receitasElement = document.getElementById('receitas-mes');
    const despesasElement = document.getElementById('despesas-mes');
    const saldoElement = document.getElementById('saldo-mes');
    
    if (receitasElement) {
        const valorReceitas = parseFloat(receitasElement.dataset.valor || 0);
        animarContador(receitasElement, valorReceitas);
    }
    
    if (despesasElement) {
        const valorDespesas = parseFloat(despesasElement.dataset.valor || 0);
        animarContador(despesasElement, valorDespesas);
    }
    
    if (saldoElement) {
        const valorSaldo = parseFloat(saldoElement.dataset.valor || 0);
        animarContador(saldoElement, valorSaldo);
    }
    
    // Adicionar classe de animação aos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// Função para atualizar dados via AJAX (para futuras implementações)
function atualizarDashboard() {
    // Implementar chamada AJAX para atualizar dados em tempo real
    console.log('Atualizando dashboard...');
}

// Configurar atualização automática (opcional)
// setInterval(atualizarDashboard, 300000); // Atualizar a cada 5 minutos