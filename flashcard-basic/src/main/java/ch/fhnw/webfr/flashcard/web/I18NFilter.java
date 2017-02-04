package ch.fhnw.webfr.flashcard.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Writer;
import java.util.Map.Entry;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

//@WebFilter(urlPatterns={"/*"})
public class I18NFilter implements Filter{
	
	private static String DEFAULT_FILENAME = "messages.properties";
	private Properties i18n;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
		//read filename from servlet context.
		String filename = filterConfig.getServletContext().getInitParameter("in18n");
		if(filename == null) filename = DEFAULT_FILENAME;
		//load i18n file
		i18n = new Properties();
		try {
			i18n.load(Thread.currentThread().getContextClassLoader().getResourceAsStream(filename));
		} catch (IOException e) {
			throw new ServletException(e.getMessage());
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
			// We are on the INBOUND path!
		
			// Initialize a ResponseWrapper to put into the chain, wrapping the original response
			ResponseWrapper rw = new ResponseWrapper((HttpServletResponse) response);
			
			// Put the ResponseWrapper into the chain
			chain.doFilter(request, rw);

			// We are on the OUTBOUND path!
			
			// Read the response which should be updated.
			BufferedReader rd = new BufferedReader(rw.getReader());
			String line = rd.readLine();
			StringBuffer sb = new StringBuffer();
			// Loop through each line of the response
			while (line != null) {
				// Check if a translation is necessary
				for (Entry<Object, Object> e : i18n.entrySet()) {
					line = line.replace((String) e.getKey(), (String) e.getValue());
				}
				sb.append(line);
				line = rd.readLine();
			}
			
			// Write updated response into original response instance
			Writer wr = response.getWriter();
			wr.append(sb.toString());
			wr.flush();		

		
	}

	@Override
	public void destroy() {
		//nothing to do.		
	}

}
