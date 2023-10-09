import { useState, useEffect } from 'react';
import styles from './EmployeeList.module.css';

const EmployeeList = ({ team, searchQuery }: { team: string, searchQuery: string }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/employees?team=${team}&q=${searchQuery}`)
            .then(response => response.json())
            .then(({ employees }) => setEmployees(employees))
    }, [team, searchQuery]);

    return (
        <ul>
            {employees.map(({ id, name, designation, team }) => (
                <li key={id} className={styles.listItem}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.designation}>{designation}{team ? `, ${team}` : ''}</div>
                </li>
            ))}
        </ul>
    )
}

export default EmployeeList