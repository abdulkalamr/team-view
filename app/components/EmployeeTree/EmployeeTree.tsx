import { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import EmployeeNode from "../EmployeeNode/EmployeeNode";

function constructChildNodes(childIds, employees) {
    return childIds.map(childId => {
        const employee = employees.find(employee => employee.id === childId);
        if (!employee.reportIds || !employee.reportIds.length) {
            return <TreeNode key={childId} label={<EmployeeNode name={employee.name} designation={employee.designation} />}></TreeNode>
        } else {
            return <TreeNode key={childId} label={<EmployeeNode name={employee.name} designation={employee.designation}></EmployeeNode>}>{constructChildNodes(employee.reportIds, employees)}</TreeNode>
        }
    });
}

const EmployeeTree = ({ team }: { team: string }) => {
    const [data, setData] = useState();

    useEffect(() => {
        const designation = `Chief ${team || 'Executive'} Officer`;
        fetch(`http://localhost:3000/api/employees?designation=${designation}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [team]);
    
    if (!data) {
        return 'Loading...';
    }

    return (
        <div className="h-full flex items-center justify-center">
            <Tree label={<EmployeeNode  name={data.employee.name} designation={data.employee.designation}/>}>
                {constructChildNodes(data.employee.reportIds, data.employees)}
            </Tree>
        </div>
    );
}

export default EmployeeTree