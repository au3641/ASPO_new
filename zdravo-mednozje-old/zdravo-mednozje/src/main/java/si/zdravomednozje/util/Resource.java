package si.zdravomednozje.util;

import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.EntityManagerFactory;
//import javax.ws.rs.Produces;

public class Resource {
	private static EntityManagerFactory factory;
	
	@Produces
	public static EntityManager getEntityManager(){
		factory = Persistence.createEntityManagerFactory("persistenceUnit1");
		EntityManager entityManager = factory.createEntityManager();
		return entityManager;
	}
	
//	@Produces
//	public static EntityManagerFactory buildEntityManagerFactory()
//	{
//		return Persistence.createEntityManagerFactory("persistenceUnit1");
//	}
	
}
