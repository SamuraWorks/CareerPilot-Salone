import { MOCK_UNIVERSITIES } from './constants/mock-data'
import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities'

export const getUniversities = async () => {
    return MOCK_UNIVERSITIES;
}

export const getJobs = async () => {
    // Artificial delay for realism
    await new Promise(resolve => setTimeout(resolve, 300));
    return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'job' || o.type === 'internship');
}

export const getScholarshipsMock = async () => {
    return SIERRA_LEONE_OPPORTUNITIES.filter(o => o.type === 'scholarship');
}
