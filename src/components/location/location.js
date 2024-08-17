import {
    Button,
    Grid,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TextField,
    Typography,
    TableBody,
    TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { LocationAPI } from '../../api/LocationAPI';
import { toast } from 'react-toastify';
import AutoCompleteLocationCode from '../../common/location/autoCompleteLocationCode';

export default function Location() {
    const [code, setCode] = useState("");
    const [name, setName] = useState(""); //defines string
    const [allLocations, setAllLocations] = useState([]); //define array

    // //To call the getAllLocations function Used the useEffect here
    useEffect(() => {
        getAllLocations()
    }, []);

    //arrow function
    const onSave = () => {
        // console.log("code:", code);
        // console.log("name:", name);
        LocationAPI.saveLocation(code, name).then(() => {
            toast.success("Save Successfully!");
        });
    }

    //To load the grid data use this function
    const getAllLocations = () => {
        LocationAPI.getAllLocations().then((data) => {
            console.log("location data:", data);
            setAllLocations(data);
        }).catch((error) => toast.error(error.message));
    }

    return (
        <Grid container>
            <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
            <Grid item={'true'} xs={6} sm={6} md={6} lg={6} xl={6}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}> <Typography variant="h6" gutterBottom>
                        Location
                    </Typography></Grid>
                    <Grid item xs={6} md={4}></Grid>
                    <Grid item xs={6} md={4} sm={4} lg={2} xl={2} >
                        <Typography variant="subtitle1" gutterBottom>
                            Location Code
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={8} sm={8} lg={4} xl={4}>
                        {/* <TextField
                            id="outlined-size-small"
                            size="small"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        /> */}
                        <AutoCompleteLocationCode
                            selectedCode={code}
                            selectedSetCode={setCode}
                            getAllLocations={getAllLocations} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}></Grid>
                    <Grid item xs={6} md={4}></Grid>
                    <Grid item xs={6} md={4} sm={4} xl={2} lg={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            Location Name
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={8} sm={8} xl={4} lg={4}>
                        <TextField
                            sx={{ width: '350px' }}
                            id="outlined-size-small"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ display: 'flex-end' }} justifyContent={'flex-end'}>
                    <Grid item xs={6} md={8}></Grid>
                    <Grid item xs={6} md={4}></Grid>
                    <Grid item xs={6} md={4} sm={4} xl={1.2} lg={1.2}>
                        <Button variant="contained" onClick={onSave}>Save</Button>
                    </Grid>
                    <Grid item xs={6} md={8} sm={8} xl={4} lg={4}>
                        <Button variant="contained" color='error'>Clear</Button>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "blue" }}>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allLocations && allLocations.map((item) => (
                                    <TableRow
                                        key={item.code}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
            </Grid>
            <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
        </Grid>
    );
}