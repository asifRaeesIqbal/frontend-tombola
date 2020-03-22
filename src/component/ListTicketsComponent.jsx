import React, { Component } from 'react'
import TicketDataService from '../service/TicketDataService';

class ListTicketsComponent extends Component {

    render() {
        return (
            <div className="container">
            	<label>
          			Name:
          			<input type="text" value={this.state.user} onChange={this.handleChange} />        
          		</label>
  				<p></p>
  				<div className="container" style={{ height : '200px'}}>
  					{this.state.message && <div class="alert alert-primary">{this.state.message}</div>} 
					{this.state.ticket_message && <div class="alert alert-secondary">{this.state.ticket_message}</div>}
                	{this.state.current_price && <div class="alert alert-success">{this.state.current_price}</div>}
  				</div>
  				    <button className="btn btn-warning" onClick={() => this.buyTicket()}>Buy Ticket</button>
                    <button className="btn btn-warning" onClick={() => this.pickTicket()}>Pick Ticket</button>
                    <button className="btn btn-warning" onClick={() => this.getTicketPrice()}>Get Ticket Price</button> 
                <h3>All My Tickets</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ticket Number</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                             {
                                this.state.tickets.map(
                                    ticket =>
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>
                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>              
                </div>
            </div>
        )
    }
    
    constructor(props) {
        super(props)
        this.state = {
        	user: null,
            tickets: [],
            message: null,
            ticket_message: null,
            current_price: null
        }
        this.refreshTickets = this.refreshTickets.bind(this);
		this.buyTicket = this.buyTicket.bind(this);
		this.pickTicket = this.pickTicket.bind(this);
		this.getTicketPrice = this.getTicketPrice.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        
    }
    
    handleChange(event) { 
    	console.log(this.state.value);   
    	this.setState({user: event.target.value}); 
    }
    
    refreshTickets() {
        TicketDataService.retrieveAllTickets(this.state.user)//HARDCODED
            .then(
                response => {
                console.log(response.data.existingTickets.length > 0 );
                	if(response.data.existingTickets.length > 0) {
		            	this.setState({ current_price: "Your chance winning is now: " + response.data.chancesOfWinning + "%" });            	
	                    console.log(response.data.existingTickets);
	                    this.setState({ tickets: response.data.existingTickets })
                    } 
                }
            )
    }
    
    buyTicket() {
	    TicketDataService.buyTicket(this.state.user)
	        .then(
	            response => {
	            	console.log(response);
	                if (this.state.user==="" || this.state.user===null) { 
                    	this.setState({ message: "PLEASE STATE YOUR NAME!"});
                    } else {
                    	this.setState({ message: "Bought Ticket - Number: " + response.data.id});
	                	this.refreshTickets(this.state.user);
	                }
	            }
	        ).catch(error => {
    			console.log(error.response)
    			  if(error.response.data.status === 422){ 
                    	this.setState({ message: "NO MORE TICKETS!!"});
                    } 
			});
	}
	
    pickTicket() {
	    TicketDataService.pickTicket()
	        .then(
	            response => {
	                console.log(response);
	                console.log(response.data.user===this.state.user);
                    this.setState({ ticket_message: "picked ticket with number = " + response.data.id });
                    if (response.data.user===this.state.user) { 
                    	this.setState({ message: "YOU HAVE WON! - CLAIM YOUR PRIZE!"});
                    	console.log(response);
                    }else {
                        this.refreshTickets(this.state.user);
                   		this.setState({ message: ""});
					}
                  
	            }
	        ).catch(error => {
    			console.log(error.response)
    			  if(error.response.data.status === 500){ 
                    	this.setState({ message: "NO MORE TICKETS!!"});
                    } 
			});
	}	
	
    getTicketPrice() {
	    TicketDataService.getTicketPrice()
	        .then(
	            response => {
	                console.log(response);
                    this.setState({ current_price: "Current ticket price " + response.data + " GBP" })
	            }
	        )
	}
}

export default ListTicketsComponent