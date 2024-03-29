import { useState, useReducer, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import EmployeeNode from "../EmployeeNode/EmployeeNode";

function constructChildNodes(childIds, employees, rerenderEmployeeTree) {
    return childIds.map(childId => {
        const employee = employees.find(employee => employee.id === childId);
        if (!employee.reportIds || !employee.reportIds.length) {
            return <TreeNode key={childId} label={<EmployeeNode name={employee.name} designation={employee.designation} employeeId={employee.id} rerenderEmployeeTree={rerenderEmployeeTree} />}></TreeNode>
        } else {
            return <TreeNode key={childId} label={<EmployeeNode name={employee.name} designation={employee.designation} employeeId={employee.id} rerenderEmployeeTree={rerenderEmployeeTree}></EmployeeNode>}>{constructChildNodes(employee.reportIds, employees, rerenderEmployeeTree)}</TreeNode>
        }
    });
}

const EmployeeTree = ({ team }: { team: string }) => {
    const [data, setData] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const designation = `Chief ${team || 'Executive'} Officer`;
        fetch(`http://localhost:3000/api/employees?designation=${designation}`)
            .then(response => response.json())
            .then(data => setData(data));
    });
    
    if (!data) {
        return 'Loading...';
    }

    return (
        <div className="h-full flex items-center justify-center">
            <Tree label={<EmployeeNode  name={data.employee.name} designation={data.employee.designation} employeeId={data.employee.id} rerenderEmployeeTree={forceUpdate} isNotDraggable />}>
                {constructChildNodes(data.employee.reportIds, data.employees, forceUpdate)}
            </Tree>
        </div>
    );
}

export default EmployeeTree