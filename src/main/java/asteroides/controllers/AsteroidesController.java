package asteroides.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import asteroides.data.Asteroide;
import asteroides.data.ListaAsteroides;
import asteroides.services.AsteroideServices;

@Controller
public class AsteroidesController {

	
	
	/**
	 * DEVUELVE EL TOP 3 DE ASTEROIDES MÁS GRANDES CON RIESGO DE IMPACTO
	 * FILTRÁNDOLOS DE LA LISTA ENVIADA
	 * @param listado
	 * @return
	 */
	@RequestMapping(value = { "/asteroids" }, method = { RequestMethod.POST })
	@ResponseBody
	public String top3(@RequestBody final String listado){
		String resultado = null;
		ListaAsteroides lista = null;
		try {
			ListaAsteroides listadoAsteroides =  _gson.fromJson(listado, ListaAsteroides.class);	
			lista = AsteroideServices.getTop3(listadoAsteroides);
			return _gson.toJson(lista);
		} catch (Exception e) {
			log.info("Error calculando el TOP 3 de asteroides: " + e);
			resultado = "Error calculando el TOP 3 de asteroides";
			return _gson.toJson(resultado);
		}
		
		
	}
	
	
	
	
	/**
	 * Convierte un objeto a Json.
	 * 
	 * @param valor
	 * @return
	 */
	public String toJson(final Class<?> valor) {
		return _gson.toJson(valor);
	}

	/**
	 * Convierte un json a un objeto de una clase determinada.
	 * 
	 * @param valor
	 * @param tipoObjeto
	 * @return
	 */
	public Class<?> fromJson(String valor, final Class<?> tipoObjeto) {
		return (Class<?>) _gson.fromJson(valor, tipoObjeto);
	}

	// PROTECTED

	protected final static Gson _gson = new Gson();
	
	public final static Logger log = LogManager.getLogger(AsteroidesController.class);
}

