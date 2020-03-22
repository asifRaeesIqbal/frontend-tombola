import axios from 'axios'

const CONFIGURATION_API_URL = 'http://localhost:8080/fleetcar/tombola/configuration'
	
class ConfigurationDataService {
	
    getAllConfigurations() {
    	return axios.get(`${CONFIGURATION_API_URL}`);
    }
    
    getConfiguration() {
    	return axios.get(`${CONFIGURATION_API_URL}/${id}`);
    }

}

export default new ConfigurationDataService()