package asteroides.dao;

import java.util.ArrayList;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import asteroides.data.Asteroide;
import asteroides.data.ListaAsteroides;
import asteroides.services.AsteroideServices;

public class AsteroideDao {

	
	/**
	 * RECIBE EL OBJETO ListaAsteroides CON TODOS LOS ASTEROIDES 
	 * DEVUELTOS POR LA API DE LA NASA EN UN PERIODO CONCRETO
	 * Y DEVUELVE EL TOP 3 DE ASTEROIDES MÁS GRANDES CON RIESGO DE IMPACTO
	 * @param lista
	 * @return
	 */
	public static ListaAsteroides getTop3(ListaAsteroides listado) {
		ListaAsteroides resultado = new ListaAsteroides(new ArrayList<>());
	
		//Creamos tres objetos Asteroide para compararlos con el listado
		//y así poder calcular el TOP 3 por tamaño
		Asteroide primero = null;
		Asteroide segundo = null;
		Asteroide tercero = null;
		
		Double diametro1 = 0.0;
		Double diametro2 = 0.0;
		Double diametro3 = 0.0;
		
		//Recorremos 3 veces el bucle (NO ES LA SOLUCIÓN MÁS ÓPTIMA)
		for (int i = 0; i < 3; i++) {
	        int maxIndex = 0;

	        for (int j = 0; j < listado.lista.size(); j++) {
	            if (listado.lista.get(j).diametro > listado.lista.get(maxIndex).diametro) {
	                maxIndex = j;
	            }
	        }
	        
	        if (i == 0) {
	        	primero = listado.lista.get(maxIndex);
	        	listado.lista.remove(maxIndex);
	        } else if (i == 1) {
	        	segundo = listado.lista.get(maxIndex);
	        	listado.lista.remove(maxIndex);
	        } else {
	        	tercero = listado.lista.get(maxIndex);
	        	listado.lista.remove(maxIndex);
	        }
	    }
				
		resultado.lista.add(primero);
		resultado.lista.add(segundo);
		resultado.lista.add(tercero);
		
		return resultado;
	}
	
	public final static Logger log = LogManager.getLogger(AsteroideDao.class);
}
