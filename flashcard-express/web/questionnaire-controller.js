"use strict";

const log4js = require('log4js');
const express = require('express');
const dispatcher = express.Router();
const Questionnaire = require('../domain/questionnaire');

// Create a logger
let log = log4js.getLogger('Controller');

/*
 * Just for testing
 * HTTP-GET to '/questionnaires?name=????'
 */
dispatcher.route('/questionnaires')
	.get((req, res) => {
		log.debug(`name called: ` + req.query.name);
		if (req.query.name) {
			log.debug(`name called: ` + req.query.name);
			res.status(200).json("Hello to " + req.query.name);
		} else {
			req.next();
		}
});

/*
 * Returns all questionnaires
 * HTTP-GET to '/questionnaires'
 */
dispatcher.route('/questionnaires')
	.get((req, res) => {
	    Questionnaire.find((err, questionnaires) => {
	      if (err) {
	        return res.status(400).send('database error');
	      } else {
					log.debug(`Found ${questionnaires.length} questionnaires`);
		      res.status(200).json(questionnaires);
				}
	    });
	});


/*
 * Returns a given questionnaire
 * HTTP-GET to '/questionnaires/{id}'
 */
dispatcher.route('/questionnaires/:id')
	.get((req, res) => {
		Questionnaire.findById(req.params.id, (err, questionnaire) => {
			if (err) {
				res.status(400).send('database error');
			} else {
				log.debug(`Found questionnaire with id "${questionnaire.id}"`);
				res.status(200).json(questionnaire);
			}
		});
	});

/*
 * Creates a new questionnaire
 * HTTP-POST to '/questionnaires'
 */
dispatcher.route('/questionnaires')
	.post((req, res) => {
		// Create a new instance of the Questionnaire model
		var questionnaire = new Questionnaire();
		questionnaire.title = req.body.title;
		questionnaire.description = req.body.description;

		// Save the questionnaire and check for errors
		questionnaire.save((err, questionnaireCreated) => {
			if (err) {
				log.error(`Could not create questionnaire with id "${req.params.id}"`);
				res.status(400).send('database error');
			} else {
				log.debug(`Successfully created questionnaire with id "${questionnaire.id}"`);
				res.status(200).json(questionnaireCreated);
			}
		});
	});

/*
 * Updates a given questionnaire
 * HTTP-PUT to to '/questionnaires/{id}'
 */
dispatcher.route('/questionnaires/:id')
	.put((req, res) => {
		Questionnaire.findById(req.params.id, (err, questionnaire) => {
			if (err) {
				log.error(`Could not update questionnaire with id "${req.params.id}"`);
				res.status(400).send('database error');
			}
			questionnaire.title = req.body.title;
			questionnaire.description = req.body.description;

			// Update the questionnaire and check for errors
			questionnaire.save(err => {
				if (err) {
					res.status(400).send('database error');
				} else {
					log.debug(`Successfully updated questionnaire with id "${questionnaire.id}"`);
					res.status(200).json(questionnaire);
				}
			});
		});
	});

/*
 * Deletes a given questionnaire
 * HTTP-DELETE to '/questionnaires/{id}'
 */
dispatcher.route('/questionnaires/:id')
	.delete((req, res) => {
		Questionnaire.remove({_id: req.params.id}, (err) => {
			if (err) {
				log.error(`Could not delete questionnaire with id "${req.params.id}"`);
				res.status(400).send('database error');
			} else {
				log.debug(`Successfully deleted questionnaire with id "${req.params.id}"`);
				res.send();
			}
		});
	});

module.exports = dispatcher;
