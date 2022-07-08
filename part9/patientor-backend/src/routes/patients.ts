/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";

const router = express.Router();

import patientService from "../services/patientService";
import toNewPatient from "../utils";

router.get("/", (_req, res) => {
	res.send(patientService.getNonSensitivePatient());
});

router.post("/", (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		res.status(400).send(error);
	}
});
export default router;
