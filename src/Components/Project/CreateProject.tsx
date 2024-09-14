import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Autocomplete, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ProjectData } from "../../Types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { createProject } from "../../Actions/ProjectActions";
import { projectStatus } from "../../Constants";

const CreateProject = () => {

    const { handleSubmit, control, formState, reset } = useForm<ProjectData>()
    const errors = formState.errors
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = (data: ProjectData) => {

        dispatch(createProject(data)).then((result) => {
            if (createProject.fulfilled.match(result)) {
                navigate('/Projects');
            }
        });
    }

    return <Card sx={{
        width: "60%",
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    }>
        <CardContent>
            <CardHeader title="Add new Project" /><br />
            <Grid container spacing={4}>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='customer'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Customer"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.customer)}
                                helperText={Boolean(errors.customer) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='refNo'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Reference no"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.refNo)}
                                helperText={Boolean(errors.refNo) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='projectName'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Project Name"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.projectName)}
                                helperText={Boolean(errors.projectName) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='projectNumber'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Project Number"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.projectNumber)}
                                helperText={Boolean(errors.projectNumber) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='areaLocation'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Area Location"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.areaLocation)}
                                helperText={Boolean(errors.areaLocation) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='address'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Address"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.address)}
                                helperText={Boolean(errors.address) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='duedate'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                                <DatePicker
                                    value={dayjs(value)}

                                    label='Due Date'
                                    onChange={(date: any) => {
                                        onChange(dayjs(date).format('DD/MM/YYYY'))

                                    }}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='contact'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Contact"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.contact)}
                                helperText={Boolean(errors.contact) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='manager'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Manager"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.manager)}
                                helperText={Boolean(errors.manager) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='staff'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Staff"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.staff)}
                                helperText={Boolean(errors.staff) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='status'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <Autocomplete
                                id='catid'
                                size='small'
                                value={
                                    projectStatus.length > 0 ?
                                        projectStatus?.find(
                                            (option: any) =>
                                                option == value
                                        ) : null
                                }
                                options={projectStatus}
                                onChange={(event, newValue: any) => {
                                    console.log(event)
                                    onChange(newValue ? newValue : null)
                                }}
                                getOptionLabel={option => option || ''}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Status"

                                        size='small'
                                        fullWidth
                                        error={Boolean(errors.status)}
                                        helperText={Boolean(errors.status) ? 'This field is required' : ''}
                                    />
                                )}
                            />

                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Controller
                        control={control}
                        name='email'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Email"
                                value={value}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                size='small'
                                fullWidth
                                error={Boolean(errors.email)}
                                helperText={Boolean(errors.email) ? 'This field is required' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained">Add Project</Button>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Link to={'/Projects'} >
                        <Button onClick={() => reset()}>Cancel</Button>
                    </Link>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}


export default CreateProject