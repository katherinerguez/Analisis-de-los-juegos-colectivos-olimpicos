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
          console.log("Carga Exitosa");
          beachvoley(parsedData); 
          parseCSVData(parsedData, false)
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



 
  function parseCSVData(csvData, filterMedals = false) {
    const continentCount = {};
    const countryByContinent = {
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
                    title: { display: true, text: 'Participaciones por Continente' }
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

       
        