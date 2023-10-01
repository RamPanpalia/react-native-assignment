import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { X } from 'lucide-react'
import { addTeam, addMember } from '../store/teams'

const AvailableTeams = (props) => {
    const dispatch = useDispatch()
    const teams = useSelector(state => state.teams.value)
    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         if (e.target.id !== 'available-teams') {
    //             console.log(props.firstClick);
    //             if (props.firstClick) {
    //                 props.setFirstClick(false);
    //             } else {
    //                 props.setShowPopup(false);
    //                 console.log('clicked outside');
    //             }
    //         }
    //     }
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    return (
        <div id="available-teams"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px #ccc',
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                gap: '2rem',
                borderBottom: '1px solid #ccc',
                // fontWeight: 'bold',
                fontSize: '1.5rem',
            }}>
                {props.memberTemp!==null? 'Select Team':'Available Teams'}
                <X
                    size={30}
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => props.setShowPopup(false)}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                {teams.map((team, index) => {
                    return (
                        <div key={index} style={{
                            padding: '10px 0',
                            borderBottom: '1px solid #ccc',
                            width: '100%',
                            textAlign: 'center',
                        }}
                            onClick={() => {
                                if(props.memberTemp === null) return;
                                dispatch(addMember({
                                    teamName: team.name,
                                    member: props.memberTemp,
                                }))
                                props.setMemberTemp(null)
                                props.setShowPopup(false)
                            }}
                        >
                            <div>
                                {team.name} ({team.members.length} members)
                            </div>
                            <ul>
                                {team.members.map((member, index) => {
                                    return (
                                        <li key={index} style={{
                                            textAlign: 'left',
                                        }}>
                                            {member.first_name} {member.last_name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
                <Button
                    sx={{
                        margin: '10px auto',
                    }}
                    onClick={() => {
                        dispatch(addTeam({
                            name: 'Team ' + (teams.length + 1),
                            members: [],
                        }))
                    }}>Create Team</Button>
            </div>
        </div>
    )
}

export default AvailableTeams