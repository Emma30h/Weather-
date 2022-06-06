window.addEventListener("load", ()=>{
    console.log("Entre");
    document.getElementById("loader").classList.toggle("loader2");
});

window.addEventListener("DOMContentLoaded", async()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async posicion =>{
            console.log(posicion);
            let latitud = posicion.coords.latitude;
            let longitud = posicion.coords.longitude;
            const APIKey = `91e6255cef1a020133f4d64b353e07b1`;
            const urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${APIKey}&units=metric`;
            
            
            const data = await loadWeather(urlAPI);
            console.log(data);

            class objectWeather{
                constructor(dia, temperatura, temperaturaMaxima, temperaturaMinima, humedad, presionAtmosferica, velocidadViento){
                    this.dia = dia;
                    this.temperatura = temperatura;
                    this.temperaturaMaxima = temperaturaMaxima;
                    this.temperaturaMinima = temperaturaMinima;
                    this.humedad = humedad;
                    this.presionAtmosferica = presionAtmosferica;
                    this.velocidadViento = velocidadViento;
                }
                descripcionClima(){
                    let description = document.createElement("p");
                    description.innerHTML = 
                    `
                        Dia: ${this.dia}. <br>
                        Temperatura: ${this.temperatura}°C. <br>
                        Maxima: ${this.temperaturaMaxima}°C. <br>
                        Minima: ${this.temperaturaMinima}°C. <br>
                        Humedad: ${this.humedad}%. <br>
                        Presion Atmosferica: ${this.presionAtmosferica}. <br>
                        Velocidad del viento: ${this.velocidadViento} Km/h.

                    `;

                    document.getElementById("container").appendChild(description);

                }
            };
        
            const weather = new objectWeather(data.weather[0].description, data.main.temp, data.main.temp_max, data.main.temp_min, data.main.humidity, data.main.pressure, data.wind.speed);
            // weather.descripcionClima();

            
            mostrarTemperatura(weather.temperatura);
            mostrarLocation(data.name);
            backgroundImagen(weather.temperatura, weather.dia);
            mostrarTemperaturaMinima(weather.temperaturaMinima);
            mostrarTemperaturaMaxima(weather.temperaturaMaxima);
            multiplesParametros(weather.dia, weather.humedad, weather.presionAtmosferica, weather.velocidadViento);
            iconoClima(weather.dia);
            
            
            setInterval(mostrarHora, 1000);



        });
    }
});

async function loadWeather(url){
    const response = await fetch(url);
    return response.json();
};

function mostrarTemperatura(informacion){
    let temperatura = document.createElement("p");
    temperatura.classList.add("temperatura");
    temperatura.innerHTML = `${informacion}°C`;
    document.getElementById("grados").appendChild(temperatura);    
}

function mostrarLocation(informacion){
    let location = document.getElementById("location");
    location.innerHTML = `${informacion}`;
}

function backgroundImagen(informacion, state){
    let container = document.getElementById("container");
    let tiempoActual = new Date();
    // let hora = tiempoActual.getHours();
    let hora = 8;
    

    if(informacion < 10){
        if(state === "clear skay" && hora > 7 && hora < 12){
            container.style.backgroundImage = "url('/img/ashleigh-joy-photography-xQzwjilbnXM-unsplash.jpg')";
        }
        else if(state === "clear skay" && hora >= 12 && hora < 18){
            container.style.backgroundImage = "url('/img/y-peyankov-zxQWixouB2Q-unsplash.jpg')";
        }
    }
    else if(informacion > 10 && informacion < 20){
        if(state === "clear sky" && hora > 7 && hora < 12){
            container.style.backgroundImage = "url('/img/dapo-oni-64tVc0A2_xQ-unsplash.jpg')";
        }
        else if(state ==="clear sky" && hora >= 12 && hora < 18){
            container.style.backgroundImage = "url('/img/martins-cardoso-NsxzcbdF8fU-unsplash.jpg')";
        }      
        else if(state ==="clear sky" && hora >= 18 && hora <= 19){
            container.style.backgroundImage = "url('/img/jordan-wozniak-xP_AGmeEa6s-unsplash.jpg')";
        }
        else if(state ==="clear sky" && hora > 19){
            container.style.backgroundImage = "url('/img/adrian-pelletier-Lf81k9ms78U-unsplash.jpg')";
        }
        else{
            container.style.backgroundImage = "url('/img/alex-fxrwJGMCz_g-unsplash.jpg')";
        }           
    }
    else if(informacion > 20){
        if (state === "clea sky"){
            container.style.backgroundImage = "url('/img/jason-briscoe-_kh-b5dJ_Yk-unsplash.jpg')";
        }
        else{
            container.style.backgroundImage = "url('/img/sebastien-gabriel--IMlv9Jlb24-unsplash.jpg')";
        }
    }   
}

function mostrarTemperaturaMinima(informacion){
    let temperaturaMinima = document.getElementById("temperaturaMinima");
    temperaturaMinima.innerHTML = `Temperatura Minima: ${informacion}°C`;
}

function mostrarTemperaturaMaxima(informacion){
    let temperaturaMaxima = document.getElementById("temperaturaMaxima");
    temperaturaMaxima.innerHTML = `Temperatura Maxima: ${informacion}°C`;
}

function multiplesParametros(diaInfo, humedadInfo, presionInfo, vientoInfo){
    let dia = document.getElementById("dia");  
    if (diaInfo === "clear sky"){
        dia.innerHTML = `Despejado`;
    }
    else if(diaInfo === "scattered clouds"){
        dia.innerHTML = `Nubes dispersas`;
    }
    else{
        dia.innerHTML = `Lluvia`;
    };

    let humedad = document.getElementById("humedad");
    humedad.innerHTML = `Humedad: ${humedadInfo}%`;

    let presionAtmosferica = document.getElementById("presionAtmosferica");
    presionAtmosferica.innerHTML = `Presion Atmosferica: ${presionInfo}`;

    let velocidadViento = document.getElementById("velocidadViento");
    velocidadViento.innerHTML = `Velocidad-viento: ${vientoInfo} k/hrs`
}

function iconoClima(informacion){
    let icono = document.getElementById("icono");
    if(informacion === "clear sky"){
        icono.src = "/img/weather_images/animated/day.svg";
    }
    else if(informacion === "scattered clouds"){
        icono.src = "/img/weather_images/animated/cloudy.svg";
    }
    else{
        icono.src = "/img/weather_images/animated/rainy-5.svg";
    }
}

function mostrarHora(){
    let reloj = document.getElementById("reloj");
    let tiempoActual = new Date();
    let hora = tiempoActual.getHours();
    if (hora < 10){
         hora = `0${tiempoActual.getHours()}`;
    }
    let minutos = tiempoActual.getMinutes();
    if (minutos < 10){
        minutos = `0${tiempoActual.getMinutes()}`;
    }
    let segundos = tiempoActual.getSeconds();
    if (segundos < 10){
        segundos = `0${tiempoActual.getSeconds()}`;
    }

    reloj.innerHTML = `${hora}:${minutos}:${segundos}`;
}