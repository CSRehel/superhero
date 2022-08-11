$(document).ready(function(){
    $('form').submit(function(event){

        event.preventDefault()

        //recoge valor ingresado por el usuario
        let heroInput = $('#heroInput').val()
       
        //se valida que el dato ingresado sea numérico, mayor a cero y menor al ultimo dato de la lista de superheros
        if($.isNumeric(heroInput) && (heroInput > 0 && heroInput <= 731)){
            $.ajax({
                url: 'https://superheroapi.com/api/4246241762147817/' + heroInput,
                success: function(data){
                
                let imagen = data.image.url
                let nombre = data.name
                let conexiones = data.connections['group-affiliation']
                let publicador = data.biography.publisher
                let ocupacion = data.work.occupation
                let aparicion1 = data.biography['first-appearance']
                let altura = data.appearance.height
                let peso = data.appearance.weight
                let alianzas = data.biography.aliases

                //se imprimen datos del superhero buscado en el html
                $('#heroInfo').html(`

                    <h3> SuperHero Encontrado </h3>

                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${imagen}" alt="imagen ${nombre}" style="width: 15rem;">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre: ${nombre}</h5>
                                    <p>Conexiones: ${conexiones}</p>
                                    <p class="card-text">Publicado por: ${publicador}</p>
                                    <hr>
                                    <p>Ocupación: ${ocupacion}</p>
                                    <hr>
                                    <p>Primera aparición: ${aparicion1}</p>
                                    <hr>
                                    <p>Altura: ${altura}</p>
                                    <hr>
                                    <p>Peso: ${peso}</p>
                                    <hr>
                                    <p>Alianzas: ${alianzas}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                //se crea un arreglo vacío para las estadísticas
                let estadisticas = []
                let acc = 0

                //se recorre el objeto powerstats
                for (const d in data.powerstats) {
                    let valores = Object.values(data.powerstats) //se almacena el valor de todos los stats
                    // console.log(`${d} : ${valores[acc]}`);
                    // se llena el arreglo estadísticas con los parámetros que requiere el gráfico
                    estadisticas.push({
                        label: d,
                        y: valores[acc]
                    })
                    acc++
                }

                //se configura el gráfico de torta
                let config = {
                    animationEnabled : true,
                    title: {
                        text: `Estadísticas de poder para ${nombre}`
                    },
                    data : [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})",
                        dataPoints: estadisticas
                    }]
                }

                //renderizado del gráfico
                let chart = new CanvasJS.Chart('heroStats', config)
                chart.render()
                }
            })
        }else if(heroInput <= 0){
            alert('No se puede ingresar números menores o iguales a 0')
        }else if(heroInput > 731){
            alert('404: No existe un SuperHero con este Id!')
        }else{
            alert('Error: solo se permite datos númericos')
        }
    })
})