import React, { Component } from 'react';
import ListTicketsComponent from './ListTicketsComponent';

class TombolaApp extends Component {
    render() {
        return ( <>
              <h1>Tombola Application</h1>
              <ListTicketsComponent/>
              </>
        )
    }    

}

export default TombolaApp