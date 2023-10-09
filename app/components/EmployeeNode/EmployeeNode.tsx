import styles from "./EmployeeNode.module.css";

const EmployeeNode = ({ name, designation }: { name: string, designation: string }) => {
  return (
    <div className={styles.employeeNode}>
        <div className={styles.name}>{name}</div>
        <div className={styles.designation}>{designation}</div>
    </div>
  )
}

export default EmployeeNode