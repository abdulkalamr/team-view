import { createServer, Model, belongsTo, hasMany, Serializer } from "miragejs"

export function makeServer() {
    createServer({
        models: {
            employee: Model.extend({
                manager: belongsTo('employee', { inverse: 'reports' }),
                reports: hasMany('employee', { inverse: 'manager' }),
            }),
        },   
        
        serializers: {
            employeeWithoutRelationships: Serializer.extend({
                attrs: ['id', 'name', 'designation', 'team']
            }),
            // TODO: rewrite employee serializer to not include reports (always)
            employee: Serializer.extend({
                include: ['reports']
            })
        },

        routes() {
            this.namespace = "api"

            this.get("/employees", function (schema, request) {
                const { team, q, designation } = request.queryParams;
                
                if (designation) {
                    let employee = schema.employees.findBy({ designation: decodeURIComponent(designation) });
                    return employee;
                }

                let employees = schema.employees.all()

                if (team) {
                    employees = employees.filter(employee => employee.team === team)
                }

                if (q) {
                    employees = employees.filter(employee => {
                        return employee.name.includes(q) || employee.designation.includes(q) || employee.team?.includes(q)
                    })
                }

                employees = this.serialize(employees, 'employee-without-relationships')
                return employees
            });

            this.get("teams", { teams: ["Technology", "Business", "Accounting"] });
        },

        seeds(server) {
            server.create('employee', { id: 1, name: 'Mark Hill', designation: 'Chief Executive Officer' })
            server.create('employee', { id: 2, name: 'Joe Linux', designation: 'Chief Technology Officer', team: "Technology", managerId: 1 })
            server.create('employee', { id: 3, name: 'Linda May', designation: 'Chief Business Officer', team: "Business", managerId: 1 })
            server.create('employee', { id: 4, name: 'John Green', designation: 'Chief Accounting Officer', team: "Accounting", managerId: 1 })
            server.create('employee', { id: 5, name: 'Ron Blomquist', designation: 'Chief Information Security Officer', team: "Technology", managerId: 2 })
            server.create('employee', { id: 6, name: 'Michael Rubin', designation: 'Chief Innovation Officer', team: "Technology", managerId: 2 })
            server.create('employee', { id: 7, name: 'Alice Lopez', designation: 'Chief Communications Officer', team: "Business", managerId: 3 })
            server.create('employee', { id: 8, name: 'Mary Johnson', designation: 'Chief Brand Officer', team: "Business", managerId: 3 })
            server.create('employee', { id: 9, name: 'Kirk Douglas', designation: 'Chief Business Development Officer', team: "Business", managerId: 3 })
            server.create('employee', { id: 10, name: 'Erica Reel', designation: 'Chief Customer Officer', team: "Accounting", managerId: 4 })
        }
    })
}