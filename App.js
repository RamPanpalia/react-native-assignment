import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import data from './heliverse_mock_data.json'
import { TextField, Pagination, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import Card from './Components/Card';
import AvailableTeams from './Components/AvailableTeams';
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [domain, setDomain] = useState('All');
  const [dataToShow, setDataToShow] = useState([]);
  const [resultsFound, setResultsFound] = useState(0);
  const [firstClick, setFirstClick] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [memberTemp, setMemberTemp] = useState(null);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      )
    }).filter((item) => {
      if (availability === 'All') return true;
      return (
        item.available.toString().includes(availability)
      )
    }).filter((item) => {
      if (domain === 'All') return true;
      return (
        item.domain.includes(domain)
      )
    }).filter((item) => {
      if (gender === 'All') return true;
      else if (gender === 'Other') return (!item.gender.includes('Male') && !item.gender.includes('Female'))
      return (
        item.gender.includes(gender)
      )
    })
    setResultsFound(filteredData.length);
    setCount(Math.ceil(filteredData.length / 10));
    setDataToShow(filteredData.slice((page - 1) * 10, page * 10));
  }, [page, search, availability, domain, gender])

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {showPopup &&
          <AvailableTeams
            firstClick={firstClick}
            setFirstClick={setFirstClick}
            setShowPopup={setShowPopup}
            memberTemp={memberTemp}
            setMemberTemp={setMemberTemp}
          />}
        <div style={styles.filterBox}>
          <TextField
            sx={{ m: 1, minWidth: 120 }}
            id="outlined-basic"
            label="Search"
            variant="standard"
            value={search}
            size='small'
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Availability</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              label="Availability"
            >
              <MenuItem value='All'>
                All
              </MenuItem>
              <MenuItem value='true'>Available</MenuItem>
              <MenuItem value='false'>Not Available</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Domain</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              label="Domain"
            >
              <MenuItem value='All'>
                All
              </MenuItem>
              <MenuItem value='Sales'>Sales</MenuItem>
              <MenuItem value='Finance'>Finance</MenuItem>
              <MenuItem value='Marketing'>Marketing</MenuItem>
              <MenuItem value='IT'>IT</MenuItem>
              <MenuItem value='Management'>Management</MenuItem>
              <MenuItem value='UI Designing'>UI Designing</MenuItem>
              <MenuItem value='Business Development'>Business Development</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value='All'>
                All
              </MenuItem>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          margin: '10px',
        }}>
          <Text style={styles.textCenter}>Results Found: {resultsFound} &nbsp; &nbsp; Page: {page}</Text>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '50px',
            }}
            onClick={() => {
              setShowPopup(true)
              setFirstClick(true)
              console.log('clicked');
            }}
          >Available Teams</Button>
        </div>
        <div style={styles.cardContainer}>
          {dataToShow.length > 0 ? dataToShow.map((item, index) => {
            return (
              <Card
                key={index}
                avatar={item.avatar}
                first_name={item.first_name}
                last_name={item.last_name}
                gender={item.gender}
                domain={item.domain}
                email={item.email}
                available={item.available}
                memberTemp={memberTemp}
                setMemberTemp={setMemberTemp}
                data={item}
                setShowPopup={setShowPopup}
              />
            )
          })
            : <Text style={styles.textCenter}>No Data found</Text>}
        </div>
        <Pagination
          count={count}
          shape="rounded"
          onChange={(e, value) => setPage(value)}
          sx={{
            margin: '4px auto',
          }}
        />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto Condensed, sans-serif',
    width: '100%',
    height: '100vh',
    padding: 4,
    position: 'relative',
  },
  textCenter: {
    textAlign: 'center',
    margin: '10px',
  },
  filterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    margin: '10px',
  },
  cardContainer: {
    maxHeight: '100%',
    overflowY: 'scroll',
    backgroundColor: '#f5f5f5',
    // padding: '10px',
  },
});
