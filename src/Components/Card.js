import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';

const Card = (props) => {
    const styles = StyleSheet.create({
        card: {
            // border: props.available ? '3px solid green' : '3px solid red',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 15,
            margin: 5,
            borderRadius: 10,
            backgroundColor: '#fafafa',
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 13,
            // marginBottom: 'auto',
            backgroundColor: 'yellow'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            // width: '100%',
        },
        dot: {
            width: 5,
            aspectRatio: 1 / 1,
            borderRadius: 5,
            // backgroundColor: 'green',
            // padding: 5,
        },
        detailsEle: {
            marginTop: 2
        },
    });
    return (
        <View style={{
            ...styles.card,
            // margin: '15px 5px',
        }}>
            <Image
                src={props.avatar}
                alt={props.name}
                style={styles.avatar}
            />
            <View style={styles.details}>
                <View style={styles.detailsEle}>
                    <Text>
                        {props.first_name} {props.last_name}
                        &nbsp;
                        <Text style={{
                            color: 'gray',
                            fontSize: 12,
                        }}>
                            ({props.gender})
                        </Text>
                    </Text>
                </View>
                <Text style={styles.detailsEle}>{props.domain}</Text>
                <Text style={styles.detailsEle}>{props.email}</Text>
                <View style={{
                    ...styles.detailsEle,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 2
                }}>
                    <View style={{
                        ...styles.dot,
                        backgroundColor: props.available ? 'green' : 'red',
                    }}></View>
                    <Text>
                        {props.available ? 'Available' : 'Not Available'}
                    </Text>
                </View>
                <Button
                    // color="primary"
                    // sx={{
                    //     padding: '5px 10px',
                    //     margin: '0 0 0 auto',
                    //     textTransform: 'capitalize',
                    // }}
                    onPress={(e) => {
                        props.setMemberTemp(props.data);
                        props.setShowPopup(true);
                    }}
                >Add to Team</Button>
            </View>
        </View>
    )
}


export default Card