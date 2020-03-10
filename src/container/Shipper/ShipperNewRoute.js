import React, { useState } from 'react';

// styling
import { Flex, Box, Text, Button } from 'rebass';


function ShipperNewRoute() {
  const [departureLocation, setDepartureLocation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [availableContainers, setAvailableContainers] = useState('');
  const [success, setSuccess] = useState(false)
  
  let flaskEndpoint = (sessionStorage.getItem('user_type')) + '_new_route';
  
  let shipperAccountID = sessionStorage.getItem('id')

  let data = {
    shipperAccountID: shipperAccountID,
    departureLocation: departureLocation,
    departureDate: departureDate,
    arrivalLocation: arrivalLocation,
    arrivalDate: arrivalDate,
    availableContainers: availableContainers,
  }

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
      if (json_res['SQL'] === "Success") {
        setSuccess(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const mapStyles = { 
    flexWrap: 'row',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  };


  const containerStyles = { 
    flexWrap: 'row',
    width: '100%',
    paddingTop: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const boxStyles = {
      width: '600px',
      padding: '1% 50px',
      textAlign: 'left',
      fontFamily: 'Work Sans',
      backgroundColor: '#eef5ff',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '4px',
      borderColor: '#bbbbbb',
      boxShadow: '2px 2px 3px -1px rgb(120, 120, 120)',
  };

  const textStyles = {
      padding: '0px 0px 5px 0px',
      color: 'rgb(33,60,71)',
      fontSize: '34px',
      fontWeight: 'bold'
  };

  const labelStyles = {
      width: '100px',
      color: '#000000',
      fontFamily: 'Work Sans',
      fontSize: '21px'
  };

  const inputStyles = {
      height: '35px',
      width: '200px',
      margin: '5px',
      paddingLeft: '10px',
      fontSize: '17px',
      borderStyle: 'solid',
      borderWidth: '2px',
      borderColor: '#aaaaaa'
  };

  const attributionStyles = { 
    flexWrap: 'row',
    width: '100%',
    padding: '3%',
    fontSize: '15px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div>

    {/* NEW ROUTE FORM */}
    <Flex style={containerStyles}>
      <Box style={boxStyles}>
          <Box textAlign='center'>
            <Text style={textStyles}>Create New Route</Text>
          </Box><br/>

          <label style={labelStyles} fontWeight='bold'>
            Enter route information below: 
          </label><br/><br/>

          <Flex width='100%'>
            <Box width={1/2}>
              <label style={labelStyles} fontWeight='bold'>
                Departure Location
              </label><br/><br/>
              <label style={labelStyles} fontWeight='bold'>
                Departure Date
              </label>
            </Box>
            <Box>
              <label>
                <select onChange={(e)=>setDepartureLocation(e.target.value)}>
                    <option value="New York/New Jersey">New York/New Jersey</option>
                    <option value="Savannah">Savannah</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Charleston">Charleston</option>
                </select>
              </label>
              <br/>
              <input style={inputStyles} placeholder='MM/DD/YY' 
                      onChange={(e)=>setDepartureDate(e.target.value)}/>
            </Box>
          </Flex>

          <Flex width='100%'>
            <Box width={1/2}>
              <label style={labelStyles} fontWeight='bold'>
                Arrival Location
              </label><br/><br/>
              <label style={labelStyles} fontWeight='bold'>
                Arrival Date
              </label>
            </Box>
            <Box>    
              <label>
                <select onChange={(e)=>setArrivalLocation(e.target.value)}>
                    <option value="Tangier-Med, Morocco">Tangier-Med, Morocco</option>
                    <option value="Abidjan, Ivory Coast">Abidjan, Ivory Coast</option>
                    <option value="Lagos, Nigeria">Lagos, Nigeria</option>
                    <option value="Richards Bay, South Africa">Richards Bay, South Africa</option>
                </select>
              </label>
              <br/>
              <input style={inputStyles} placeholder='MM/DD/YY' 
                      onChange={(e)=>setArrivalDate(e.target.value)}/>
            </Box>
          </Flex>

          <Flex width='100%'>
            <Box width={1/2}>
              <label style={labelStyles} fontWeight='bold'>
                Availability
              </label>
            </Box>
            <Box>
              <input style={inputStyles} placeholder='Available Containers' 
                  onChange={(e)=>setAvailableContainers(e.target.value)}/>
            </Box>
          </Flex>

          <Button sx={{color: '#eef5ff', backgroundColor: 'rgb(33, 60, 71)'}}
                  onClick={(e)=>flask(flaskEndpoint, data)}>
            Enter Route
          </Button>
          <br/><br/>
          { success ? 
                      <Box textAlign='center'>
                        <Text style={textStyles}>New Route Created!</Text>
                      </Box> : 
                      <div></div>  }
          <br/>
      </Box>
    </Flex>

  </div>
  )
};
export default ShipperNewRoute;