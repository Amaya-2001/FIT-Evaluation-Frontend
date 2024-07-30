import { Grid, TextField, Typography } from '@mui/material';

export default function Location() {
    return (
        <Grid container>
            <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
            <Grid item={'true'} xs={6} sm={6} md={6} lg={6} xl={6}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}></Grid>
                    <Grid item xs={6} md={4}></Grid>
                    <Grid item xs={6} md={4} sm={4} lg={2} xl={2} >
                        <Typography variant="subtitle1" gutterBottom>
                            Location Code
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={8} sm={8} lg={4} xl={4}>
                        <TextField
                            id="outlined-size-small"
                            defaultValue="Small"
                            size="small"
                        />
                    </Grid>
                </Grid>
                {/* <Grid container spacing={2}>
                    <Grid item xs={6} md={8}></Grid>
                    <Grid item xs={6} md={4}></Grid>
                    <Grid item xs={6} md={4} sm={4} xl={2} lg={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            Location Code
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={8} sm={8} xl={4} lg={4}>
                        <TextField
                            id="outlined-size-small"
                            defaultValue="Small"
                            size="small"
                        />
                    </Grid>
                </Grid> */}
            </Grid>
            <Grid item={'true'} xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
        </Grid>
    );
}