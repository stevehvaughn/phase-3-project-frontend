import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaEnvelope } from 'react-icons/fa'

const StudentCard = ({ first_name, last_name, email, picture_url, grade_level, school_name, student_id, lockers, handleDelete, assignLocker, handleUnassignLocker, instruments, assignInstrument }) => {
    const [hasLocker, setHasLocker] = useState(false)
    const [hasInstrument, setHasInstrument] = useState(false)
    const [lockerNumber, setLockerNumber] = useState()
    const [lockerCombo, setLockerCombo] = useState()
    const [lockerId, setLockerId] = useState()

    const student_locker = lockers.find(locker => locker.student_id === student_id)
    const student_instruments = instruments.filter(instrument => instrument.student_id === student_id)

    console.log(student_locker)

    useEffect(() => {
        if (student_locker) {
            setHasLocker(true)
            setLockerId(student_locker.id)
            setLockerNumber(student_locker.locker_number)
            setLockerCombo(student_locker.locker_combination)
        } else {
            setHasLocker(false)  
        }
    }, [student_locker])

    useEffect(() => {
        if (student_instruments.length > 0) {
            setHasInstrument(true)
        } else {
            setHasInstrument(false)  
        }
    }, [student_instruments])

    return (
            <Col className='student-col'>
                <Card bg='dark'>
                    <Card.Header className='text-center'><h4>{first_name} {last_name}</h4></Card.Header>
                    <Card.Img variant="top" src={picture_url} />
                    <Card.Body>
                        <Card.Title><h5>{grade_level}th Grade Student<br/>{school_name}</h5></Card.Title>
                        <Card.Text>
                            <p><FaEnvelope />: {email}</p>
                            {hasInstrument ?
                            <p>Instruments checked out: </p>
                            : null }
                            {hasLocker ? 
                            <h5 id='student-locker-title'>Locker Assignment<br/>
                            Number: <span>{lockerNumber}<br/></span>
                            Combination: <span>{lockerCombo}</span></h5>
                            : null }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='d-grid gap-2'>
                        <div className='d-grid gap-2'>
                            {hasLocker ? <Button size='sm' variant="warning" id={lockerId} onClick={handleUnassignLocker}>Unassign Locker</Button>  
                            :   <DropdownButton size='sm' title="Assign Locker" id='dropdown-basic-button' variant="primary" align="end"> 
                                    <Dropdown.Header>Unassigned Lockers</Dropdown.Header>
                                    {lockers.filter(locker => locker.student_id === null).map(locker => { return (
                                        <Dropdown.Item as='button' key={locker.id} id={locker.id} onClick={assignLocker}>#{locker.locker_number}</Dropdown.Item>
                                    )})}   
                                </DropdownButton>
                            }
                            {hasInstrument ? <Button size='sm' variant='light' onClick={assignInstrument}>Turn-in Instrument</Button> : null }
                            <Button size='sm' variant='danger' id={student_id} onClick={handleDelete}>Remove Student</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
    )
}

export default StudentCard
