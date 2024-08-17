import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocationAPI } from '../../api/LocationAPI';
import { useState, useEffect } from 'react';

export default function AutoCompleteLocationCode({
    selectedCode,
    selectedSetCode,
    getAllLocations
}) {
    const [locations, setLocations] = useState([]);

    //useEffect
    useEffect(() => {
        getAutoCompleteLoactions("");
    }, []);

    //to call autocomplete API
    const getAutoCompleteLoactions = (key) => {
        LocationAPI.getAutoCompleteLocations(key).then((data) => {
            console.log("data:", data)
            setLocations(data);
        });
    }

    const onChangeLocationCode = (e, value) => {
        console.log("value:", value);
        console.log("e.target.value:", e.target.value)
        selectedSetCode(e.target.value)

    }

    const onInputLocationCode = (e, value) => {
        console.log("on input value:", value)
        selectedSetCode(value);
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locations}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField {...params} label="Location Code" />}
            size="small"
            onChange={(e, value) => onChangeLocationCode(e, value)}
            value={selectedCode}
            onBlur={() => getAllLocations(selectedCode)}
            onInputChange={(e, value) => onInputLocationCode(e, value)}
        />
    )
}