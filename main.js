let resultados = {}; 

function beachvoley(file) {
    const filteredFile = file.filter(d => ["Alemania", "Estados Unidos de America", "Brasil", "Australia"].includes(d['Country']) && d['Sport'] === 'Voleibol de playa');
   
      
    filteredFile.forEach(d => {
        const c = d['Country']; 
        const medalType = d['Medals'];

        if (!resultados[c]) {
            resultados[c] = {
                GOLD: 0,
                SILVER: 0,
                BRONZE: 0,
                Total: 0
            };
        }

        if (medalType === 'Gold' || medalType === 'Silver' || medalType === 'Bronze') {
            resultados[c][medalType.toUpperCase()] += 1; 
            resultados[c].Total += 1;
        }
    });

    const labels = Object.keys(resultados);
    const datasets = ['Total', 'GOLD', 'SILVER', 'BRONZE'].map(tipo => ({
        label: tipo === 'Total'? 'Resultados generales' : tipo.toUpperCase(),
        data: labels.map(label => resultados[label][tipo] || 0),
        backgroundColor: tipo === 'Total'? '#008000' : 'silver',
        borderColor: tipo === 'Total'? '#008000' : 'silver'
    }));

    const ctx = document.getElementById('compareresult').getContext('2d');
    new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('base_datos.csv')
      .then(response => response.text()) 
      .then(data1 => {
        const parsedData = Papa.parse(data1, {header: true}).data;
        if(parsedData.length > 0) {
          console.log("Carga Exitosa");
          beachvoley(parsedData); 
        }
    });
});
document.querySelectorAll('.flecha').forEach(flecha => {
    flecha.addEventListener('click', function() {
      const textoAdicional = this.nextElementSibling;
    
      textoAdicional.style.display = textoAdicional.style.display === 'none' ? 'block' : 'none';
      
      this.textContent = this.textContent === '▼' ? '►' : '▼'; // Flecha hacia abajo y hacia arriba
    });
  });
  