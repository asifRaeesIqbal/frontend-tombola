import axios from 'axios'

const TOMBOLA_API_URL = 'http://localhost:8080/fleetcar/tombola'
	
class TicketDataService {
	
    retrieveAllTickets(user) {
        return axios.get(`${TOMBOLA_API_URL}/user/${user}/tickets`);
    }
    
    buyTicket(user) {
        //console.log('executed service')
        return axios.post(`${TOMBOLA_API_URL}/user/${user}/ticket/buy`);
    }
    
    pickTicket() {
    	return axios.get(`${TOMBOLA_API_URL}/winning/ticket`);
    }
    
    getTicketPrice() {
    	return axios.get(`${TOMBOLA_API_URL}/ticket/price`);
    }
    
    getTicketInfo(id) {
    	return axios.get(`${TOMBOLA_API_URL}/ticket/${id}`);
    }
}

export default new TicketDataService()