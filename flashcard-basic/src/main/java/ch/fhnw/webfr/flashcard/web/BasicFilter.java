package ch.fhnw.webfr.flashcard.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class BasicFilter implements Filter {

	private static Logger log;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
		log = Logger.getLogger(BasicServlet.class);
		log.debug("BasicFilter initialized");
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		log.debug("uri="+req.getRequestURI());
		chain.doFilter(request, response);
		
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

}
