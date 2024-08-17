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
    TablePagination,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { LocationAPI } from '../../api/LocationAPI';
import { toast } from 'react-toastify';
import AutoCompleteLocationCode from '../../common/location/autoCompleteLocationCode';

export default function Location() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [allLocations, setAllLocations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getAllLocations()
    }, []);

    //To save location details
    const onSave = () => {
        if (!code) { toast.warn("Enter the code"); return false; }
        if (!name || name.trim().length === 0) { toast.warn("Enter the name"); return false; }

        LocationAPI.saveLocation(code, name).then(() => {
            onClearForm();
            getAllLocations();
            toast.success("Saved Successfully!");
        });
    }

    //To load the grid data use this function
    const getAllLocations = () => {
        LocationAPI.getAllLocations().then((data) => {
            setAllLocations(data);
        }).catch((error) => toast.error(error.message));
    }

    //To clear the form data
    const onClearForm = () => {
        setCode("");
        setName("");
    }

    //get a one location details
    const getLocationDetails = (code) => {
        if (code) {
            try {
                LocationAPI.getLocation(code).then((data) => {
                    if (data) {
                        setCode(data.code);
                        setName(data.name);
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Grid container>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
                        <AutoCompleteLocationCode
                            code={code}
                            setCode={setCode}
                            getLocationDetails={getLocationDetails}
                            setName={setName}
                             />
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
                        <Button variant="contained" color='error' onClick={onClearForm}>Clear</Button>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440, minWidth: 650, overflowX: 'auto', }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Code</TableCell>
                                        <TableCell>Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allLocations && allLocations
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item) => (
                                            <TableRow
                                                key={item.code}>
                                                <TableCell>{item.code}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={allLocations.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
                <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
            </Grid>
            <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
        </Grid>
    );
}