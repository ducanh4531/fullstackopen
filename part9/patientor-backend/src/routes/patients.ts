import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	res.send(patientService.getNonSensitivePatient());
});

export default router;
