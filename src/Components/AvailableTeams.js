import React, { useState, useEffect } from 'react'
import { Dialog, Portal, View, Text } from 'react-native'
import { Button, Tooltip, IconButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addTeam, addMember } from '../store/teams'

const AvailableTeams = (props) => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams.value)

    return (
        <View id="available-teams"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                boxShadow: '0px 0px 10px 10px #ccc',
                zIndex: 5,
            }}>
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5,
                borderBottom: '1px solid #ccc',
                fontWeight: 'bold',
                fontSize: 23,
            }}>
                <Text>
                    {props.memberTemp !== null ? 'Select Team' : 'Available Teams'}
                </Text>
                <Tooltip title="Selected Camera">
                    <IconButton icon="close" selected size={24}
                        onPress={() => {
                            props.setShowPopup(false)
                            props.setMemberTemp(null)
                        }}
                    />
                </Tooltip>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                {teams.map((team, index) => {
                    return (
                        <View key={index}>

                            <Button key={index} style={{
                                textAlign: 'center',
                            }}
                                onPress={() => {
                                    if (props.memberTemp === null) {
                                        return;
                                    }
                                    dispatch(addMember({
                                        teamName: team.name,
                                        member: props.memberTemp,
                                    }))
                                    props.setMemberTemp(null)
                                    props.setShowPopup(false)
                                }}
                            >
                                {team.name} ({team.members.length} members)
                            </Button>
                            {team.members.map((member, index) => {
                                return (
                                    <Text key={index} style={{
                                        marginLeft: 15,
                                    }}>
                                        {`\u2022`} {member.first_name} {member.last_name} ({member.domain})
                                    </Text>
                                )
                            })}
                        </View>
                    )
                })}
                <Button
                    mode='contained'
                    style={{
                        marginTop: 10,
                    }}
                    onPress={() => {
                        dispatch(addTeam({
                            name: 'Team ' + (teams.length + 1),
                            members: [],
                        }))
                    }}>Create Team</Button>
            </View>
        </View>
    )
}

export default AvailableTeams