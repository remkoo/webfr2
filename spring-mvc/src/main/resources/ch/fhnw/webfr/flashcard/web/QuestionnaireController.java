package ch.fhnw.webfr.flashcard.web;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
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
		if(questionnaire != null){
			model.addAttribute("questionnaire", questionnaire);
			return "questionnaires/show";
		} else {
			return "404";
		}
	}

	@RequestMapping(params = "form", method = RequestMethod.GET)
	public String createForm(Model model) {
		logger.debug("createForm requested");
		model.addAttribute("questionnaire", new Questionnaire());
		return "questionnaires/create";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String create(@Valid Questionnaire questionnaire, BindingResult result) {
		if(result.hasErrors()) {
			return "questionnaires/create";
		} else {
			questionnaireRepository.save(questionnaire);
			return "redirect:/questionnaires";
		}
		
	}
	
	@RequestMapping(value="/{id}", params = "form", method = RequestMethod.GET)
	public String updateForm(@PathVariable String id, Model model) {
		Questionnaire questionnaire = questionnaireRepository.findOne(id);
		if(questionnaire == null) {
			logger.info("No entity found with id=" + id);
			return "questionnaires/404";
		} else {
			model.addAttribute("questionnaire", questionnaire);
			logger.debug("Successfully delivered update form");
			return "questionnaires/update";
		}
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public String update(@PathVariable String id, @Valid Questionnaire questionnaire, BindingResult result, Model model) {
		if (result.hasErrors()) {
			logger.debug("Binding error: " + result.getAllErrors());
			return "questionnaires/update";
		} else {
			Questionnaire oldQuestionnaire = questionnaireRepository.findOne(id);
			if(oldQuestionnaire != null) {
				oldQuestionnaire.setDescription(questionnaire.getDescription());
				oldQuestionnaire.setTitle(questionnaire.getTitle());
				questionnaireRepository.save(oldQuestionnaire);
				logger.debug("Successfully updated questionnaire " + id);
			}
			return "redirect:/questionnaires";
		}
	}

	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public String delete(@PathVariable String id) {
		Questionnaire questionnaire = questionnaireRepository.findOne(id);
		if(questionnaire != null){
			questionnaireRepository.delete(id);
			return "redirect:/questionnaires";
		} else {
			return "404";
		}
		
	}
	
}
