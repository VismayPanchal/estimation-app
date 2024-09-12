import styles from './LoginPage.module.css'
import { Card, TextField, Grid, Button, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

interface logindata {
    email: string
    password: string
}
const LoginPage = () => {

    const { handleSubmit, control, formState } = useForm<logindata>()
    const errors = formState.errors

    const onSubmit = (data: logindata) => {
        console.log('data', data)
    }

    return <Card className={styles.card}>

        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography><strong>Login to Account</strong></Typography>
                <Typography>Please enter your email and password to continue.</Typography>
            </Grid>
            <Grid item xs={8}>
                <Controller
                    control={control}
                    name='email'
                    rules={{ required: 'This field is required.' }}
                    render={({ field: { onChange, value = '' } }) => (

                        <TextField
                            label="Email"
                            value={value}
                            className={styles.input}
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
            <Grid item xs={8}>
                <Controller
                    control={control}
                    name='password'
                    rules={{ required: 'This field is required.' }}
                    render={({ field: { onChange, value = '' } }) => (

                        <TextField
                            label="Password"
                            value={value}
                            onChange={(e) => {
                                onChange(e)
                            }}
                            className={styles.input}
                            fullWidth
                            size='small'
                            error={Boolean(errors.password)}
                            helperText={Boolean(errors.password) ? 'This field is required' : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <Button className={styles.button} onClick={handleSubmit(onSubmit)} size='large' type='button' sx={{ mr: 2 }}>
                    Login
                </Button>
            </Grid>
        </Grid>
    </Card>
}

export default LoginPage