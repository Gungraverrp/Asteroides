package asteroides.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import asteroides.controllers.AsteroidesController;
import asteroides.dao.AsteroideDao;
import asteroides.data.ListaAsteroides;

public class AsteroideServices {

	
	/**
	 * LLAMA A LA FUNCIÓN DEL OBJETO ASTEROIDEDAO 
	 * QUE RECIBE EL OBJETO ListaAsteroides CON TODOS LOS ASTEROIDES 
	 * DEVUELTOS POR LA API DE LA NASA EN UN PERIODO CONCRETO
	 * Y DEVUELVE EL TOP 3 DE ASTEROIDES MÁS GRANDES CON RIESGO DE IMPACTO
	 * @param lista
	 * @return
	 */
	public static ListaAsteroides getTop3(ListaAsteroides lista) {
		ListaAsteroides resultado;
		resultado = AsteroideDao.getTop3(lista);
		return resultado;
	}
	
	
	public final static Logger log = LogManager.getLogger(AsteroideServices.class);
}
