import { v1 as uuid } from "uuid";

import patients from "../../data/patients";
import { NonSensitivePatient, newPatientEntry, Patient } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id: string = uuid();

const addPatient = (entry: newPatientEntry): Patient => {
	const newPatient = { id, ...entry };
	patients.push(newPatient);
	return newPatient;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default { getNonSensitivePatient, addPatient };
