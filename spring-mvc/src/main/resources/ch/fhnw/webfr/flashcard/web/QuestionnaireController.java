package ch.fhnw.webfr.flashcard.web;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;

@Controller
@RequestMapping("/questionnaires")
public class QuestionnaireController {
	private static final Log logger = LogFactory.getLog(QuestionnaireController.class);

	@Autowired
	private QuestionnaireRepository questionnaireRepository;

	@RequestMapping(method = RequestMethod.GET)
	public String findAll(Model model) {
		List<Questionnaire> questionnaires = questionnaireRepository.findAll();
		logger.debug("Found " + questionnaires.size() + " questionnaire entities");
		model.addAttribute("questionnaires", questionnaires);
		return "questionnaires/list";
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public String findById(@PathVariable String id, Model model) {
		Questionnaire questionnaire = questionnaireRepository.findOne(id);
		model.addAttribute("questionnaire", questionnaire);
		return "questionnaires/show";
	}

	@RequestMapping(params = "form", method = RequestMethod.GET)
	public String createForm(Model model) {
		model.addAttribute("questionnaire", new Questionnaire());
		return "questionnaires/create";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String create(Questionnaire questionnaire) {
		questionnaireRepository.save(questionnaire);
		return "redirect:/questionnaires";
	}
	
}
