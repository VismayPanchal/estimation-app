import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Autocomplete, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ProjectData } from "../../Types";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { createProject, updateProject } from "../../Actions/ProjectActions";
import { projectStatus } from "../../Constants";
import MainLayout from "../Layout/MainLayout";
import { useEffect } from "react";

const CreateProject = () => {

    const { handleSubmit, control, formState, reset, setValue, register } = useForm<ProjectData>()
    const errors = formState.errors
    const { projectId } = useParams<{ projectId: string }>(); // Get projectId from URL
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { project, loading } = useSelector((state: RootState) => state.project);


    useEffect(() => {
        if (projectId) {
            setValue("customer", project?.customer as string)
            setValue("refNo", project?.refNo as string)
            setValue("projectName", project?.projectName as string)
            setValue("projectNumber", Number(project?.projectNumber) as number)
            setValue("areaLocation", project?.areaLocation as string)
            setValue("address", project?.address as string)
            setValue("duedate", project?.duedate ? dayjs(project.duedate).toDate() : new Date());
            setValue("contact", Number(project?.contact) as number)
            setValue("manager", project?.manager as string)
            setValue("staff", project?.staff as string)
            setValue("status", project?.status as string)
            setValue("email", project?.email as string)
        }

    }, [project, loading, projectId])

    const onSubmit = (data: ProjectData) => {

        if (projectId) {
            dispatch(updateProject({ ...data, id: projectId })).then((result) => {
                if (updateProject.fulfilled.match(result)) {
                    navigate('/Projects');
                }
            });
        } else {
            dispatch(createProject(data)).then((result) => {
                if (createProject.fulfilled.match(result)) {
                    navigate('/Projects');
                }
            });
        }
    }

    return <MainLayout>
        <Card sx={{
            width: "60%",
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        }>
            {!loading &&
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
                                        {...register('customer')}
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
                                        id='status'
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
                            <Button onClick={handleSubmit(onSubmit)} variant="contained">{projectId ? 'Update Project' : ' Add Project'}</Button>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Link to={'/Projects'} >
                                <Button onClick={() => reset()}>Cancel</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            }
        </Card>
    </MainLayout>
}


export default CreateProject