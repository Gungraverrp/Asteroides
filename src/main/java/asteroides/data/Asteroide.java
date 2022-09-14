package asteroides.data;

import java.util.Date;

public class Asteroide {

	public String nombre; //Nombre del asteroide
	public Double diametro; //Diámetro del asteroide en Km
	public Double velocidad; //Velocidad del asteroide en Km/h
	public Date fecha; //Fecha con la que se calculará el riesgo de impacto
	public String planeta; //Nombre del planeta con el que hay riesgo de impacto
	public Boolean peligroso; //true: Si hay riesgo de impacto, False: No
	
	
	
	public Asteroide(String nombre, Double diametro, Double velocidad, Date fecha, String planeta, Boolean peligroso) {
		this.nombre = nombre;
		this.diametro = diametro;
		this.velocidad = velocidad;
		this.fecha = fecha;
		this.planeta = planeta;
		this.peligroso = peligroso;
	}
	
	
}
