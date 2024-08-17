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

    //useEffect
    useEffect(() => {
        getAutoCompleteLoactions("");
    }, [code]);

    //to call autocomplete API
    const getAutoCompleteLoactions = (key) => {
        LocationAPI.getAutoCompleteLocations(key).then((data) => {
            setLocations(data);
        });
    }

    const onChangeLocationCode = (e, value) => {
        if (value) {
            setCode(value.code);
        } else {
            setCode("");
            setName("");
        }
    };

    const onInputLocationCode = (e, value) => {
        if (value.length > 0) {
            setCode(value)
            getLocationDetails(value)
        } else {
            setCode("");
        }
    }
    
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locations}
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