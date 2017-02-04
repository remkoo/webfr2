package ch.fhnw.webfr.flashcard.web;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;
import ch.fhnw.webfr.flashcard.util.QuestionnaireInitializer;

public class BasicListener implements ServletContextListener {
	
	private static Logger log;

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		log = Logger.getLogger(BasicServlet.class);
		log.debug("contextInitialized");
		QuestionnaireRepository repo;
		String mode = sce.getServletContext().getInitParameter("mode");
		if(mode.equals("test")) {
			repo = new QuestionnaireInitializer().initRepoWithTestData();
			log.debug("created test repo.");
		} else {
			repo = new QuestionnaireRepository();
			log.debug("created new repo.");
		}
		sce.getServletContext().setAttribute("repo", repo);
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		log.debug("contextDestroyed");
	}

}
