import patientData from "../../data/patients.json";
import { NonSensitivePatient } from "../types";

const getNonSensitivePatient = (): NonSensitivePatient[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default { getNonSensitivePatient };
