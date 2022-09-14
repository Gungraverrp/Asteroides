package asteroides.controllers;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class ViewController {

	/**
	 * PÁGINA DE INICIO
	 * @return
	 * @throws IOException
	 */
	@GetMapping({ "/index", "/" })
    public String indexPage() throws IOException {
        return "index";
    }
	
	/**
	 * PÁGINA CON EL LISTADO DE ASTEROIDES
	 * @return
	 * @throws IOException
	 */
	@GetMapping("/listadoasteroides")
    public String asteroidsPage(@RequestParam(name = "dias") String dias) throws IOException {
		try {
	    Integer d = Integer.valueOf(dias);	    
        return "asteroids";
		}catch (Exception e) {
			log.info("Error: " + e);
			return "index";
		}
    }
	
	
	
	public final static Logger log = LogManager.getLogger(ViewController.class);
}
