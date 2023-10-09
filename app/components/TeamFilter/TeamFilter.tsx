import AsyncSelect from "react-select/async";

// TODO: Implement search for teams in select
const loadOptions = () => {
    return fetch('http://localhost:3000/api/teams')
        .then(response => response.json())
        .then(data => {
            const options = [{ value: '', label: '--' }]
            data.teams.forEach((team: string) => {
                options.push({ value: team, label: team })
            });
            return options;
        })
}

export default ({ handleValueChange }) => {
    function handleChange({ value }: { value: string }) {
        handleValueChange(value)
    }

    return (
        <AsyncSelect 
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleChange}
        />
    )
}