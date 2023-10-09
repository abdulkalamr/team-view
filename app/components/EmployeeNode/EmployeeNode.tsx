import styles from "./EmployeeNode.module.css";

const EmployeeNode = ({ name, designation, employeeId, rerenderEmployeeTree, isNotDraggable }: { name: string, designation: string }) => {
  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", employeeId);
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const employeeId = event.dataTransfer.getData("text/plain");
    const newManagerId = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-id]')?.getAttribute('data-id')
    if (newManagerId) {
      fetch(`http://localhost:3000/api/employees/${employeeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          managerId: newManagerId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(() => {
          rerenderEmployeeTree()
        })
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div className={styles.employeeNode} draggable={isNotDraggable ? 'false' : 'true'} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver} data-id={employeeId}>
        <div className={styles.name}>{name}</div>
        <div className={styles.designation}>{designation}</div>
    </div>
  )
}

export default EmployeeNode