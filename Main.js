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
        parsedData = Papa.parse(data1, {header: true}).data;
        if(parsedData.length > 0) {
          console.log("Carga Exitosa5");
          beachvoley(parsedData); 
          parseCSVData(parsedData, false)
          can_sport(parsedData)
          tabla(parsedData)
          continent(parsedData, countryByContinent)
        }
    });
});
document.querySelectorAll('.flecha').forEach(flecha => {
    flecha.addEventListener('click', function() {
      const textoAdicional = this.nextElementSibling;
    
      textoAdicional.style.display = textoAdicional.style.display === 'none' ? 'block' : 'none';
      
      this.textContent = this.textContent === '▼' ? '►' : '▼'; 
    });
  });
let countryByContinent = {
    America_del_Norte:[
        "Antigua y Barbuda",
        'Bahamas',
        'Barbados',
        'Canada',
        'Costa Rica',
        'Cuba',
        'Dominica',
        'Granda',
        'Jamaica',
        'Estados Unidos de America',
        'Mexico',
        'Panama',
        'Republica Dominicana',
        'Trinidad y Tobago'],
    America_del_Sur:[
        'Argentina',
        'Bolivia',
        'Brasil',
        'Chile',
        'Colombia',
        'Ecuador',
        'Guyana',
        'Peru',
        'Surinam',
        'Uruguay',
        'Venezuela'],
    Asia:[
        'Afganistan',
        'Arabia Saudita',
        'Armenia',
        'Azerbaijan',
        'Bahrein',
        'Bangladesh',
        'Brunei',
        'Butan',
        'Emiratos Arabes Unidos',
        'Filipinas',
        'Georgia',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Israel',
        'Japon',
        'Jordania',
        'Kampuchea',
        'Kazakstan',
        'Kirguizistan',
        'Kuwait',
        'Laos',
        'Libano',
        'Malasia',
        'Maldivas',
        'Mongolia',
        'Myanmar',
        'Nepal',
        'Oman',
        'Pakistan',
        'Palestina',
        'Republica de Corea',
        'Republica Popular Democratica de Corea',
        'Singapur',
        'Sri Lanka',
        'Siria',
        'Tadjikistan',
        'Tailandia',
        'Timor Oriental',
        'Turkmenistan',
        'Turkia',
        'Vietnam',
        'Yemen'],
        Africa:[
            'Sudafrica',
            'Angola',
            'Argelia',
            'Benin',
            'Botswana',
            'Burundi',
            'Cabo Verde',
            'Camerun',
            'Comores',
            'Congo',
            'Costa de Marfil',
            'Egipto',
            'Eritrea',
            'Etiopia',
            'Gabon',
            'Gambia',
            'Ghana',
            'Guinea',
            'Guinea Ecuatorial',
            'Jibuti',
            'Kenia',
            'Uzbekistan',
            'Lesotho',
            'Libia',         
            'Madagascar',
            'Mali',
            'Mauricio',
            'Mauritania',
            'Marruecos',
            'Mozambique',
            'Namibia',
            'Niger',
            'Nigeria',
            'Republica de Africa Central',
            'Republica del Congo',
            'Ruanda',
            'Sao Tome y Principe',
            'Senegal',
            'Seychelles',
            'Sierra Leona',
            'Sudan',
            'Tanzania',
            'Togo',
            'Tunez',
            'Uganda',
            'Zambia',
            'Zimbabwe'],
            Europa:[
                'Albania',
                'Alemania',
                'Andorra',
                'Austria',
                'Belgica',
                'Bielorusia',
                'Bosnia y Herzegovina',
               'Bulgaria',
                'Checo',
                'Chipre',
                'Croacia',
                'Dinamarca',
                'Eslovaqiau',
                'Eslovenia',
                'Espana',
                'Estonia',
                'Finlandia',
                'Francia',
                'Gran Bretana',
                'Grecia',
                'Holanda',
                'Hungria',
                'Italia',
                'Irlanda',
                'Islandia',
                'Letonia',
                'Liechtenstein',
                'Lituania',
                'Luxemburgo',
                'Macedonia',
                'Moldavia',
                'Malta',
                'Monaco',
                'Noruega',
                'Polonia',
                'Portugal',
                'Rumania',
                'Rusia',
                'San Marino',
                'Serbia y Montenegro',
                'Suecia',
                'Suiza',
                'Ucrania',
                'Uzbekistan'],
        Oceania:[
            'Australia',
            'Fiji',
            'Islas de Cook',
            'Kiribati',
            'Micronesie',
            'Nueva Zelanda',
            'Papua Nueva Guinea',
            'Samoa',
            'Tonga',
            'Vanuatu']
  }

function parseCSVData(csvData, filterMedals = false) {
    const continentCount = {};
    
        csvData.forEach(row => {
        const country = row['Country'];
        const sport = row['Sport'];
        const hasMedals = row['Medals'] !== '0';

        if (country && sport === 'Badminton') {
            let found = false;
            let continent = '';

            Object.keys(countryByContinent).forEach(continentKey => {
                if (countryByContinent[continentKey].includes(country)) {
                    found = true;
                    continent = continentKey;
                }
            });

            if (!found) return; 

            if (filterMedals && !hasMedals) return; 

            if (!continentCount[continent]) {
                continentCount[continent] = 0;
            };
            continentCount[continent]++;
        }
    });

    return continentCount;
}

let miGraficoPastel = null;

function crearOActualizarGrafico(datos) {
    const ctx = document.getElementById('miGraficoPastel').getContext('2d');
    
    if (!miGraficoPastel) {
        miGraficoPastel = new Chart(ctx, {
            type: 'pie',
            data: datos,
            options: {
                responsive: true,
                
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Distribución de países por continente' }
                }
            }
        });
    } else {
        miGraficoPastel.data = datos;
        miGraficoPastel.update();
    }
}

function generarColores(cantidad) {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        colores.push(color);
    }
    return colores;
}

    
document.getElementById('btnParticipaciones').addEventListener('click', () => {
    const datosFiltrados = parseCSVData(parsedData, false); 
    const datosParaGrafico = {
        labels: Object.keys(datosFiltrados),
        datasets: [{
            label: 'Participaciones',
            data: Object.values(datosFiltrados),
            backgroundColor: generarColores(Object.keys(datosFiltrados).length)
        }]
    };
    crearOActualizarGrafico(datosParaGrafico);
});

document.getElementById('btnMedallas').addEventListener('click', () => {
    const datosFiltrados = parseCSVData(parsedData, true); 
    const datosParaGrafico = {
        labels: Object.keys(datosFiltrados),
        datasets: [{
            label: 'Medallas',
            data: Object.values(datosFiltrados),
            backgroundColor: generarColores(Object.keys(datosFiltrados).length)
        }]
    };
    crearOActualizarGrafico(datosParaGrafico);
});

   function can_sport(csv){
    const counts={};
    csv.forEach(row => {
        const year = row['Year']; 
        const sport = row['Sport']; 

        if (!counts[year]) {
            counts[year] = new Set(); 
        }
        counts[year].add(sport);
    });

    const labels = Object.keys(counts);
    const values = labels.map(year => counts[year].size);
    const ctx = document.getElementById('Cantidad_deporte').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Deportes Colectivos',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de deportes colectivos en los Juegos Olímpicos'
                }
            }
        }
    });
    
}    
        
function tabla(data) {
    let medalCount = {};

    data.forEach(row => {
        let country = row['Country'];
        let medalType = row['Medals'];

        if (!medalCount[country]) {
            medalCount[country] = { gold: 0, silver: 0, bronze: 0, total: 0 };
        }

        if (medalType === 'Gold') {
            medalCount[country].gold += 1;
        } else if (medalType === 'Silver') {
            medalCount[country].silver += 1;
        } else if (medalType === 'Bronze') {
            medalCount[country].bronze += 1;
        }

        medalCount[country].total = medalCount[country].gold + medalCount[country].silver + medalCount[country].bronze;
    });
    
    let sortedCountries = Object.keys(medalCount).sort((a, b) => medalCount[b].total - medalCount[a].total).slice(0, 10);

    let tableBody = document.querySelector('#medalTable tbody');
tableBody.innerHTML = ''; 
sortedCountries.forEach(country => {
    let row = document.createElement('tr');
    let countryCell = document.createElement('td');
    let medalsCell = document.createElement('td');

    countryCell.textContent = country;
    medalsCell.textContent = medalCount[country].total;

    row.appendChild(countryCell);
    row.appendChild(medalsCell);
    tableBody.appendChild(row);
});

}

function continent(data, countryByContinent) {
    let Count = {};

    data.forEach(row => {
        let country = row['Country'];
        let medalType = row['Medals'];

        if (!Count[country]) {
            Count[country] = { gold: 0, silver: 0, bronze: 0, total: 0 };
        }

        if (medalType === 'Gold') {
            Count[country].gold += 1;
        } else if (medalType === 'Silver') {
            Count[country].silver += 1;
        } else if (medalType === 'Bronze') {
            Count[country].bronze += 1;
        }

        Count[country].total = Count[country].gold + Count[country].silver + Count[country].bronze;
    });
 let continentMedals = {}; 
 Object.keys(Count).forEach(country => { 
    for (const continent in countryByContinent) { 
        if (countryByContinent[continent].includes(country)) { 
            if (!continentMedals[continent]) { 
                continentMedals[continent] = { 
                    gold: 0, 
                    silver: 0, 
                    bronze: 0, 
                    total: 0 }; 
                } 
                continentMedals[continent].gold += Count[country].gold; 
                continentMedals[continent].silver += Count[country].silver; 
                continentMedals[continent].bronze += Count[country].bronze; 
                continentMedals[continent].total += Count[country].total; 
                break; 
            } 
        } 
    }); 
    const datos_continente = { labels: Object.keys(continentMedals), 
        datasets: [{ label: 'Participaciones', 
            data: Object.values(continentMedals).map(c => c.total), 
            backgroundColor: generarColores(Object.keys(continentMedals).length) 
        }] 
    }; 
    const tx = document.getElementById('medallacontinente').getContext('2d'); 
    miGraficoPastel = new Chart(tx, { 
        type: 'pie', 
        data: datos_continente, 
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { 
                legend: { 
                    position: 'top' }, 
                    title: { 
                        display: true, 
                        text: 'Distribución de medallas por continente' } 
    } 
} 
}); 
return continentMedals; 
}
 
