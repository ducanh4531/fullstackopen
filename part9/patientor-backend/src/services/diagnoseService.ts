import diagnoseData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
	return diagnoseData;
};

export default { getEntries };
