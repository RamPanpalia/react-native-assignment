import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@mui/material';

const Card = (props) => {
    const styles = StyleSheet.create({
        card: {
            // border: props.available ? '3px solid green' : '3px solid red',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 13,
            marginBottom: 'auto',
            backgroundColor: 'yellow'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: 'green',
            margin: 5,
        },
        detailsEle: {

        },
    });
    return (
        <div style={{
            ...styles.card,
            margin: '15px 5px',
        }}>
            <img
                src={props.avatar}
                alt={props.name}
                style={styles.avatar}
            />
            <div style={styles.details}>
                <div style={styles.detailsEle}>
                    {props.first_name} {props.last_name}
                </div>
                <div style={styles.detailsEle}>{props.domain}</div>
                <div style={styles.detailsEle}>{props.email}</div>
                <div style={styles.detailsEle}>
                    <span style={styles.dot}></span>
                    {props.available ? 'Available' : 'Not Available'}
                </div>
                <Button
                    // variant="contained"
                    color="primary"
                    sx={{
                        padding: '5px 10px',
                        margin: '0 0 0 auto',
                        textTransform: 'capitalize',
                    }}
                >Add to Team</Button>
            </div>
        </div>
    )
}


export default Card