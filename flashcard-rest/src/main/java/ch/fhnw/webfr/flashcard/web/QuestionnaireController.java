package ch.fhnw.webfr.flashcard.web;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.webfr.flashcard.domain.Questionnaire;
import ch.fhnw.webfr.flashcard.persistence.QuestionnaireRepository;

@RestController
@RequestMapping("/questionnaires")
public class QuestionnaireController {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private QuestionnaireRepository questionnaireRepository;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Questionnaire>> findAll() {
		Sort sort = new Sort(Direction.ASC, "id");
		List<Questionnaire> questionnaires = questionnaireRepository.findAll(sort);
		log.debug("Found " + questionnaires.size() + " questionnaires");
		return new ResponseEntity<List<Questionnaire>>(questionnaires, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Questionnaire> findById(@PathVariable String id) {
		Questionnaire questionnaire = questionnaireRepository.findOne(id);
		if (questionnaire == null) {
			return new ResponseEntity<Questionnaire>(HttpStatus.NOT_FOUND);
		}
		log.debug("Found questionnaire with id=" + questionnaire.getId());
		return new ResponseEntity<Questionnaire>(questionnaire, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Questionnaire> create(@Valid @RequestBody Questionnaire questionnaire, 
			BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<Questionnaire>(HttpStatus.BAD_REQUEST);
		}
		questionnaire = questionnaireRepository.save(questionnaire);
		log.debug("Created questionnaire with id=" + questionnaire.getId());
		return new ResponseEntity<Questionnaire>(questionnaire, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Questionnaire> update(@Valid @RequestBody Questionnaire questionnaire,
			BindingResult result, @PathVariable String id) {
		if (result.hasErrors()) {
			return new ResponseEntity<Questionnaire>(HttpStatus.BAD_REQUEST);
		}
		Questionnaire toBeUpdated = questionnaireRepository.findOne(id);
		if (toBeUpdated == null) {
	    	return new ResponseEntity<Questionnaire>(HttpStatus.NOT_FOUND);
		}
		toBeUpdated.setDescription(questionnaire.getDescription());
		toBeUpdated.setTitle(questionnaire.getTitle());
        questionnaire = questionnaireRepository.save(toBeUpdated);
		log.debug("Updated questionnaire with id=" + questionnaire.getId());
    	return new ResponseEntity<Questionnaire>(questionnaire, HttpStatus.OK);
	}	
	
	@CrossOrigin
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> delete(@PathVariable String id) {
		questionnaireRepository.delete(id);
		log.debug("Deleted questionnaire with id=" + id);
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
	}
	
}
