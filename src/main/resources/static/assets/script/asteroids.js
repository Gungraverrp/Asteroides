
 /**
 SCRIPTS QUE SE DEBEN DE EJECUTAR A LA CARGA DE LA PÁGINA
  */
 $(document).ready(function () {
	//ocultamos el DIV tabla para que solo quede la imagen de loading en pantalla
	//$('#tabla').hide();
	
	//capturamos el parámetro días
	const parametros = window.location.search;
	const urlParams = new URLSearchParams(parametros);
	var dias = urlParams.get('dias');
		
	construirDatatableTop3();	
	construirDatatable();//Aplicamos el formato DataTable a la tabla de asteroides
	
	//controlamos que el valos de la variable dias esté entre 1 y 7
	let valid = dias.replace(/[1-7]/g, ""); 
	
	if (valid == ""){
		cargarDatatable(dias);//Cargamos los datos en la tabla
		
		//Aplicamos un retardo en función de los días enviados
		//para que se muestre una animación de carga mientras se cargan los datos
		//una vez pasado ese tiempo ocultaremos la animación de carga
		//y mostraremos la tabla con los datos cargados.
		setTimeout(function(){
			$('#tabla').show();
			$('#loading').hide();
		},dias * 2500);
	} else {
		//en caso de no que la variable dias no esté entre el 1 y el 7
		//mostraremos un error por pantalla. 
		window.alert("Error, el número de días especificado debe estar comprendido entre 1 y 7.");
	}
 });
 
 
 /**
 APLICAMOS LAS PROPIEDADES DE LA DATATABLE A LA TABLA "tablaAsteroides"
  */
 function construirDatatable(){
	
	var tabla = $('#tablaAsteroides').DataTable({
        "dom": 'Bfrtip', //PARA MOSTRAR LOS BOTONES DE EXPORTACION
        "initComplete": function () {
        // Apply the search
        this.api().columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change clear', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
          });
        },     
        "paging": true,
        "ordering": true,
        "responsive": true,
        "searching": true,
        "lengthChange": true,
        "autoWidth": true,
        "columns": [
          { "data": "nombre" },
          { "data": "diametro", className: "text-right" },
          { "data": "velocidad", className: "text-right" },
          { "data": "fecha", className: "text-center" },
          { "data": "planeta", className: "text-center" },
          { "data": "potencialmentePeligroso"}
        ],
                  
        "language": {
          "lengthMenu": "Mostrar _MENU_ Asteroides por página",
          "zeroRecords": "No existen registros",
          "info": "Mostrando página _PAGE_ de _PAGES_",
          "infoEmpty": "No existen datos",
          "infoFiltered": "(filtered from _MAX_ total records)",
          "search": "Buscar&nbsp;:",
          "paginate": {
            first:      "Primero",
            previous:   "Previo",
            next:       "Siguiente",
            last:       "Último" 
          }
        },
        "buttons": {
          buttons: [ //PARA MOSTRAR LOS BOTONES DE EXPORTACION
           { 
           extend: 'pdf',
           text: 'PDF',
           titleAttr: 'Exportar listado a PDF',
           orientation: 'landscape',                 
           exportOptions: {
             columns: [0, 1, 2, 3, 4, 5 ],
             }
           },
           { 
           extend: 'excel',
           text: 'XLS',
           titleAttr: 'Exportar listado a Excel',
           exportOptions: {
             columns: [0,1, 2, 3, 4, 5],
             }
           }
         ]
        },
                 
        pageLength: 0,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        order: [[ 1, "desc" ]]
      });
}


 /**
 APLICAMOS LAS PROPIEDADES DE LA DATATABLE A LA TABLA "tablaTop3"
  */
 function construirDatatableTop3(){	
	var tabla = $('#tablaTop3').DataTable({
        "paging": false,
        "ordering": false,
        "responsive": true,
        "searching": false,
        "columns": [
		  { "data": "puesto" },
          { "data": "nombre" },
          { "data": "diametro", className: "text-right" },
          { "data": "velocidad", className: "text-right" },
          { "data": "fecha", className: "text-center" },
          { "data": "planeta", className: "text-center" }
        ],
      });
}


//Incluir en cada columna del datatable la opción de buscar
$('#tablaAsteroides tfoot td').each(function() {
	$(this).html('<input type="text" placeholder="Buscar" />');
});



/**
Cargamos los datos en el datatable
 */
function cargarDatatable(numDias){
  
  	var datos  = [];
			
	const key = "zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb";
	//const key = "DEMO_KEY";
	let asteroidesDatatable = $('#tablaAsteroides').DataTable();
	asteroidesDatatable.clear().draw();
	let hoy = new Date();
	let ffin = new Date();
    ffin.setDate(ffin.getDate() + parseInt(numDias));
	  
	let url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + formatearFecha(hoy) + "&end_date=" + formatearFecha(ffin) + "&api_key=" + key;
	
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.addEventListener('load',function(){
		if(request.status >= 200 && request.status < 400){
		
		 	var response = JSON.parse(request.responseText);
			var neoObj = response.near_earth_objects;
			
			
			//PRIMER BUCLE CON LOS DÍAS DEVUELTOS
		  	for(var count = 0; count <= numDias; count++){
                var NEOarray = neoObj[Object.keys(neoObj)[count]];
                var NEOclose = NEOarray[Object.keys(NEOarray)[0]];
                var NEOCAD = NEOclose.close_approach_data;
                var NEOCADdate = NEOCAD[Object.keys(NEOCAD)[0]];
                var fechaAprox = NEOCADdate.close_approach_date;
				var nombre;
				var diametroMedio, diametroMin, diametroMax;
				var velocidad;
				var distancia;
				var planeta;
				var potencialmentePeligroso;
				
				//BUCLE CON LOS ASTEROIDES DE CADA DÍA
                for (var index = 0; index < NEOarray.length; index++) {
	
					  //CAPTURAMOS LOS DATOS QUE NECESITAMOS
	                  nombre = NEOarray[index].name;
	                  distancia = NEOarray[index].close_approach_data[0].miss_distance.miles;
	                  velocidad = NEOarray[index].close_approach_data[0].relative_velocity.kilometers_per_hour;
	                  diametroMin = NEOarray[index].estimated_diameter.kilometers.estimated_diameter_min;
	                  diametroMax = NEOarray[index].estimated_diameter.kilometers.estimated_diameter_max;
	                  diametroMedio = (diametroMin + diametroMax) / 2;
	                  planeta = NEOarray[index].close_approach_data[0].orbiting_body;
					  
	                  potencialmentePeligroso = NEOarray[index].is_potentially_hazardous_asteroid;
	                  
	                  //SI EL ASTEROIDE ES POTENCIALMENTE PELIGROSO
	                  //LO AÑADIMOS A LA TABLA DATOS
	                  if (potencialmentePeligroso) {
		                   datos.push({ 
						      "nombre": nombre,
				              "diametro": diametroMedio,
				              "velocidad": velocidad,
				              "fecha": fechaAprox,
				              "planeta": planeta,
				              "potencialmentePeligroso": potencialmentePeligroso
						    });
			    	  }
			    	  
			    	  
			    	  //AGREGAMOS EL ASTEROIDE AL DATATABLE
	                  asteroidesDatatable.row.add({						
			              "nombre": nombre,
			              "diametro": diametroMedio + " Km",
			              "velocidad": velocidad + " Km/h",
			              "fecha": fechaAprox,
			              "planeta": planeta,
			              "potencialmentePeligroso": potencialmentePeligroso
			          }).draw();	                  
                }     
            }
              
		} else {
			//ERROR
		}
			
	});
	
	
	
	//LLAMAMOS A LA FUNCIÓN PARA CALCULAR EL TOP 3 DE ASTEROIDES
	//debido a la demora en la carga de datos y la asincronia de javascript 
	//es necesario aplicar un retardo para calcular el Top 3
	setTimeout(function(){
		calcularTop3(datos);
	},numDias*4000);
	
	request.send(null);
};
	
	
	
/**
FUNCIÓN QUE CALCULA Y MUESTRA EL TOP 3 DE ASTEROIDES POR TAMAÑO DE DIAMETRO
PASÁNDOLE EL LISTADO COMPLETO DE ASTEROIDES EN RIESGO DE COLISIÓN
 */	
function calcularTop3(listado){	   
		
	   var xhr = new XMLHttpRequest();

	   //LLAMAMOS A LA FUNCION asteroids DE AsteroidesController
       xhr.open("POST", "/asteroids", true);
       xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xhr.onreadystatechange = function () {
		    if (xhr.readyState === 4 && xhr.status === 200) {
		     	 //CONTROLAR EL ERROR DEVUELTO
		       	 if (xhr.responseText.indexOf("Error") != -1) {
		         	//var jsonResponse = JSON.parse(xhr.responseText);
		         	window.alert("ERROR AL CALCULAR EL TOP 3");
		         
		       	 } else { //SI EL PROCESO HA FINALIZADO CORRECTAMENTE TRATAMOS LOS DATOS DEVUELTOS
		    	   	//MOSTRAR EL TOP 3
					var top3Asteroides = JSON.parse(xhr.responseText);                  
		    		
		    		for (let x=1; x<4; x++){
						$("#nombre"+x).html(top3Asteroides.lista[x-1].nombre);
						$("#diametro"+x).html(top3Asteroides.lista[x-1].diametro);
						$("#velocidad"+x).html(top3Asteroides.lista[x-1].velocidad);
						$("#fecha"+x).html(top3Asteroides.lista[x-1].fecha);
						$("#planeta"+x).html(top3Asteroides.lista[x-1].planeta);
					}
		       	 }
		   	}
       };
   	   
       xhr.send(JSON.stringify({"lista": listado }));
           
}	
	
	
	
/**
 * FORMATEA LA FECHA RECIBIDA AL FORMATO COMPATIBLE CON EL API DE LA NASA
 * @param fecha
 * @param formato
 * @returns
 */
function formatearFecha(fecha){
	  let fFormateada;
	  	  
	  if (fecha == "" || fecha == undefined || fecha == null) {
	      return "";
	  } else {
        
       	  let f = new Date(fecha);
	  	  
	      let dia = f.getDate();
	      let mes = f.getMonth()+1;
	      let anyo = f.getFullYear();
	      
	      fFormateada = anyo + "-" + mes + "-" + dia;
	      
	      return fFormateada;
	  }   
};