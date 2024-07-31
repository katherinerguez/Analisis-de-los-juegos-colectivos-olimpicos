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
          parseCSVData(parsedData)
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

function parseCSVData(csvData) {
    const continentCount = {};

    csvData.forEach(row => {
        const country = row['Country']; 
        const continent = row['Continent'];

        if (country && continent) {
            if (!continentCount[continent]) {
                continentCount[continent] = new Set();
            }
            continentCount[continent].add(country); // Usamos un Set para evitar duplicados
        }
    });

    // Convertir el Set a un array y contar
    const regionData = {};
    for (const [continent, countries] of Object.entries(continentCount)) {
        regionData[continent] = {
            labels: Array.from(countries),
            values: [countries.size] // Solo contamos el número de países
        };
    }

    const canvas = document.getElementById('worldMap');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = 'mapa.png'; 
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Superponer gráficos de pastel en las coordenadas correspondientes
            Object.keys(regionData).forEach((region, index) => {
                const data = regionData[region];
                const x = 100 + index * 150; 
                const y = 100; 
                const pieCanvas = document.createElement('canvas');
                pieCanvas.width = 100;
                pieCanvas.height = 100;
                document.body.appendChild(pieCanvas);
                createPieChart(pieCanvas.getContext('2d'), data);
                ctx.drawImage(pieCanvas, x, y);
                document.body.removeChild(pieCanvas);
            });
        };
}
    

       
        