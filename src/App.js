import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Portal, Dialog } from 'react-native';
import data from './heliverse_mock_data.json'
import { Button, Searchbar, Menu, DataTable, Chip } from 'react-native-paper';
import Card from './Components/Card';
import AvailableTeams from './Components/AvailableTeams';

export default function App() {
  const noOfItemsPerPageList = [1, 10, 20, 50];
  const [itemsPerPage, setItemsPerPage] = useState(10);
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

  const [filter1List, setFilter1List] = useState([
    // 'All',
   'Available', 'Not Available']);

  const [filter1, setFilter1] = useState([
    // 'All',
   'Available', 'Not Available']);
  const [filter2, setFilter2] = useState([
    // 'All',
   'Sales', 'Finance', 'Marketing', 'IT', 'Management', 'UI Designing', 'Business Development']);
  const [filter3, setFilter3] = useState([
    // 'All',
   'Male', 'Female', 'Others']);

  const [domainFields, setDomainFields] = useState([
    'Sales', 'Finance', 'Marketing', 'IT', 'Management', 'UI Designing', 'Business Development'
  ])
  const [genderFields, setGenderFields] = useState([
    // 'All', 
    'Male', 'Female', 'Others'
  ])

  useEffect(() => {
    const filteredData = data.filter((item) => {
      if (filter1.includes('All')) return true;
      return (
        filter1.includes(item.available? 'Available' : 'Not Available')
      )
    }).filter((item) => {
      return (
        filter2.includes(item.domain)
      )
    }).filter((item) => {
      if (filter3.includes('All')) return true;
      else if(filter3.includes(item.gender)){
        return true;
      }
      else if (item.gender!='Male' && item.gender!='Female'){
        if(filter3.includes('Others')){
          return true
        }
        else{
          return false
        }
      }
      return false;
    }).filter((item) => {
      return (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      )
    })
    setResultsFound(filteredData.length);
    setCount(Math.ceil(filteredData.length / itemsPerPage));
    setDataToShow(filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  }, [page, search, availability, domain, gender, itemsPerPage,filter1,filter2,filter3])

  return (
    <SafeAreaView style={styles.container}>
      {showPopup &&
        <AvailableTeams
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          memberTemp={memberTemp}
          setMemberTemp={setMemberTemp}
        />}
      <View style={styles.filterBox}>
        <Searchbar
          placeholder="Search"
          onChangeText={(e) => setSearch(e)}
          value={search}
          style={{
            width: '100%',
            margin: 5,
          }}
        />
        <View style={styles.flexRowCenter}>
          <Text>Availability: </Text>
          {filter1List.map((item, index) => {
            return (
              <Chip
                key={index}
                selected={filter1.includes(item)}
                showSelectedCheck
                onPress={() => {
                  var temp = filter1;
                  if (filter1.includes(item)) {
                    temp = filter1.filter((item2) => {
                      return item2 !== item
                    })
                  } else {
                    temp = [...filter1, item]
                  }
                  setFilter1(temp);
                }}
              >
                {item}
              </Chip>
            )
          })
          }
        </View>
        <View style={styles.flexRowCenter}>
          <Text>Domain: </Text>
          {domainFields.map((item, index) => {
            return (
              <Chip
                key={index}
                selected={filter2.includes(item)}
                showSelectedCheck
                onPress={() => {
                  var temp = filter2;
                  if (filter2.includes(item)) {
                    temp = filter2.filter((item2) => {
                      return item2 !== item
                    })
                  } else {
                    temp = [...filter2, item]
                  }
                  setFilter2(temp);
                }}
              >
                {item}
              </Chip>
            )
          })
          }
        </View>
        <View style={styles.flexRowCenter}>
          <Text>Gender: </Text>
          {genderFields.map((item, index) => {
            return (
              <Chip
                key={index}
                selected={filter3.includes(item)}
                showSelectedCheck
                onPress={() => {
                  var temp = filter3;
                  if (filter3.includes(item)) {
                    temp = filter3.filter((item2) => {
                      return item2 !== item
                    })
                  } else {
                    temp = [...filter3, item]
                  }
                  setFilter3(temp);
                }}
              >
                {item}
              </Chip>
            )
          })}
        </View>
        {/* <Menu
          visible={openFilter1}
          onDismiss={() => setOpenFilter1(false)}
          anchor={<Button
            // mode="contained"
            onPress={() => setOpenFilter1(true)}
          >
            Availability: {availability === 'All' ? 'All' : availability === 'true' ? 'Available' : 'Not Available'}
          </Button>}
        >
          <Menu.Item onPress={() => {
            setAvailability('All');
            setOpenFilter1(false);
          }}
            title="All"
          />
          <Menu.Item onPress={() => {
            setAvailability('true');
            setOpenFilter1(false);
          }}
            title="Available"
          />
          <Menu.Item onPress={() => {
            setAvailability('false');
            setOpenFilter1(false);
          }}
            title="Not Available"
          />
        </Menu> */}
        {/* <Menu
          visible={openFilter2}
          onDismiss={() => setOpenFilter2(false)}
          anchor={<Button
            // mode="contained"
            onPress={() => setOpenFilter2(true)}
          >
            Domain: {domain === 'All' ? 'All' : domain}
          </Button>}
        >
          <Menu.Item onPress={() => {
            setDomain('All');
            setOpenFilter2(false);
          }}
            title="All"
          />
          {domainFields.map((item, index) => {
            return (
              <Menu.Item key={index} onPress={() => {
                setDomain(item);
                setOpenFilter2(false);
              }}
                title={item}
              />
            )
          })}
        </Menu> */}
        {/* <Menu
          visible={openFilter3}
          onDismiss={() => setOpenFilter3(false)}
          anchor={<Button
            // mode="contained"
            onPress={() => setOpenFilter3(true)}
          >
            Gender: {gender}
          </Button>
          }>
          {genderFields.map((item, index) => {
            return (
              <Menu.Item key={index} onPress={() => {
                setGender(item);
                setOpenFilter3(false);
              }}
                title={item}
              />
            )
          })}
        </Menu> */}
      </View>

      <View style={styles.navSmallDetails}>
        <Text style={styles.textCenter}>Results Found: {resultsFound} &nbsp; &nbsp;</Text>
        <Button
          mode="contained"
          onPress={() => {
            setShowPopup(true)
            setFirstClick(true)
          }}
        >Available Teams</Button>
      </View>
      <ScrollView style={styles.cardContainer}>
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
      </ScrollView>

      <SafeAreaView>

        <DataTable.Pagination
          page={page}
          numberOfPages={count}
          onPageChange={(page) => {
            var temp = page;
            if (page > count) {
              temp = count;
            } else if (page < 1) {
              temp = 1;
            }
            setPage(temp)
          }}
          itemsPerPage={itemsPerPage}
          showFastPaginationControls
          numberOfItemsPerPage={itemsPerPage}
          numberOfItemsPerPageList={noOfItemsPerPageList}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setPage(1);
          }}
          selectPageDropdownLabel={'Rows per page'}
          numberOfItems={resultsFound}
          label={`${page} of ${count}`}
          style={{
            margin: 4,
          }}
        />
      </SafeAreaView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto Condensed, sans-serif',
    // width: '100%',
    // height: '100vh',
    padding: 4,
    marginTop: 3,
    position: 'relative',
  },
  textCenter: {
    textAlign: 'center',
    // margin: '10px',
  },
  filterBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    margin: 10,
  },
  navSmallDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottom: 2,
    gap: 1,
    margin: 3,
  },
  cardContainer: {
    height: '38%',
  },
  flexRowCenter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});
