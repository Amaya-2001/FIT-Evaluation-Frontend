import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocationAPI } from '../../api/LocationAPI';
import { useState, useEffect } from 'react';

export default function AutoCompleteLocationCode({
    code,
    setCode,
    getLocationDetails,
    setName
}) {

    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFileteredLocations] = useState([]);

    //useEffect
    useEffect(() => {
        getAutoCompleteLoactions("");
    }, []);

    //to call autocomplete API
    const getAutoCompleteLoactions = (key) => {
        LocationAPI.getAutoCompleteLocations(key).then((data) => {
            setLocations(data);
            setFileteredLocations(data);
        });
    }

    const onChangeLocationCode = (e, value) => {
        if (value) {
            setCode(value.code);
            setName(value.name);
        } else {
            setCode("");
            setName("");
        }
    };

    const onInputLocationCode = (e, value) => {
        const filtered = locations.filter(val =>
            val.code.toLowerCase().includes(value?.toLowerCase()) ||
            val.label.toLowerCase().includes(value?.toLowerCase()));

        if (value && filtered.length === 0) {
            setCode(value);
        }
        setFileteredLocations(filtered);
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={filteredLocations}
            sx={{ width: 350 }}
            label="Search by loaction code"
            renderInput={(params) => <TextField {...params} />}
            size="small"
            onChange={(e, val) => onChangeLocationCode(e, val)}
            value={code}
            onBlur={() => getLocationDetails(code)}
            onInputChange={(e, val) => onInputLocationCode(e, val)}
        />
    )
}