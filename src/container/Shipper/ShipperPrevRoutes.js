import React, { useState } from 'react';
import { Flex, Box, Text, Button } from 'rebass';
import moment from 'moment';


function ShipperPrevRoutes() {
  const [previousRoutes, setPreviousRoutes] = useState(null)

  let flaskEndpoint = 'shipper_previous_routes'
  let shipperAccountID = sessionStorage.getItem('id')
  let data = {shipperAccountID: shipperAccountID}

  async function flask(flaskEndpoint, data) {
      try {
        const endpoint = `http://localhost:5000/api/${flaskEndpoint}`
        const configs = {
          method: 'POST',
          body: JSON.stringify(data),
          mode: 'cors',
          headers: {'Content-type' : 'application/json'}
        }
        const res = await fetch(endpoint, configs);
        const json_res = await res.json();
        setPreviousRoutes(json_res['Routes'])
      } catch (err) {
        console.log(err)
      }
  }

  const containerStyles = { 
      flexWrap: 'row',
      width: '100%',
      paddingTop: '5%',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  };

  const boxStyles = {
      minWidth: '600px',
      marginTop: '0px',
      textAlign: 'left',
      fontFamily: 'Work Sans',
      backgroundColor: '#eef5ff',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '4px',
      borderColor: '#bbbbbb',
      boxShadow: '2px 2px 3px -1px rgb(120, 120, 120)',
      justifyContent: 'center'
  };

  const textStyles = {
      padding: '35px 0px 0px 0px',
      color: 'rgb(33,60,71)',
      fontSize: '34px',
      fontWeight: 'bold'
  };

  const gridStyles = {
    width: '80%',
    margin: '20px auto',
    paddingTop: '10px',
    backgroundColor: 'rgb(53, 117, 159)',
    fontSize: '15px',
    borderStyle: 'solid',
    borderWidth: '0px',
    borderRadius: '4px',
    boxShadow: '1px 1px 7px -2px rgb(0, 51, 128)',
  };

  const labelStyles = {
      paddingLeft: '10px',
      color: '#ffffff',
      fontSize: '21px'
  };

  const columnStyles = {
      width: '49.7%',
      margin: '0px',
      padding: '0px',
      borderStyle: 'solid',
      borderColor: 'rgb(0, 51, 128)',
      borderWidth: '0px 1px 0px 1px',
  };

  const cellStyles = {
      width: '100%',
      height: '30px',
      paddingLeft: '3px',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontSize: '16px',
      borderStyle: 'solid',
      borderColor: 'rgb(0, 51, 128)',
      borderWidth: '0px 0px 1px 0px',
  };

  let openRoutes = <div></div>;
  if (previousRoutes) {
    console.log("Previous Routes")
    console.log(previousRoutes)
    openRoutes = previousRoutes.map((data) => (
      <Box style={gridStyles}>
        
        <div style={labelStyles}><p>{data[1]}</p></div>
        <br/>

        <Flex>
          <Box style={columnStyles}>
            <div style={cellStyles}><p>Departure Location</p></div>
            <div style={cellStyles}><p>Departure Date</p></div>
            <div style={cellStyles}><p>Arrival Location</p></div>
            <div style={cellStyles}><p>Arrival Date</p></div>
            <div style={cellStyles}><p>Total Containers</p></div>
            <div style={cellStyles}><p>Charity Containers</p></div>
            <div style={cellStyles}><p>Empty Containers</p></div>
          </Box>

          <Box style={columnStyles}>
            <div style={cellStyles}><p>{ data[3] }</p></div>
            <div style={cellStyles}><p>{ moment.unix(data[4]).format("MM/DD/YYYY") }</p></div>
            <div style={cellStyles}><p>{ data[5] }</p></div>
            <div style={cellStyles}><p>{ moment.unix(data[6]).format("MM/DD/YYYY") }</p></div>
            <div style={cellStyles}><p>{ data[7] }</p></div>
            <div style={cellStyles}><p>{ data[7] - data[8] }</p></div>
            <div style={cellStyles}><p>{ data[8] }</p></div>

          </Box>
        </Flex>

        <br/>
      </Box>
    ))
  } else {
    flask(flaskEndpoint, data)
  };


  return (
    <Flex style={containerStyles}>
      <div style={boxStyles}>
        <Box textAlign='center'>
          <Text style={textStyles}>Previous Routes</Text>
        </Box><br/>

        <div>{ openRoutes }</div>

      </div>
    </Flex>    
  )
};
export default ShipperPrevRoutes;