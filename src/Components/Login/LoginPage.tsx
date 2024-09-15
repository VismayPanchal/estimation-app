import styles from './LoginPage.module.css'
import { Card, TextField, Grid, Button, Typography, Box } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { logindata } from '../../Types'
import { useState } from 'react'
import { loginUser, registerUser } from '../../Actions/AuthActions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { toast, } from 'react-hot-toast'

const LoginPage = () => {

    const { handleSubmit, control, formState, getValues } = useForm<logindata>()
    const [isregister, setIsRegister] = useState<boolean>(false)
    const errors = formState.errors
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = (data: logindata) => {

        if (isregister) {
            dispatch(registerUser(data)).then((result) => {
                if (registerUser.fulfilled.match(result)) {
                    navigate('/dashboard');
                }
            });
        } else {
            dispatch(loginUser(data)).then((result) => {
                if (loginUser.rejected.match(result)) {
                    console.log('rejected')
                    alert(result.payload as string)
                    toast.error("jkj")
                }
                if (loginUser.fulfilled.match(result)) {
                    navigate('/dashboard')
                }
            }).catch((error) => {
                console.log('login page err', error)
            })
        }
    }

    return <Box style={{
        width: '100vw',
        height: '100vh',
        background: '#4880FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Card sx={{
            width: "40%",
            margin: '0 auto',         // Centers horizontally
            display: 'flex',
            justifyContent: 'center', // Centers content horizontally
            alignItems: 'center',     // Centers content vertically
            height: "80%"
        }}>

            <Grid container spacing={isregister ? 0 : 1}>
                <Grid item xs={12}>
                    <Typography className={styles.text}><strong>{isregister ? 'Create Account' : 'Login to Account'}</strong></Typography>
                    <Typography className={styles.text}>Please enter your email and password to continue.</Typography>
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
                {isregister &&
                    <Grid item xs={8}>
                        <Controller
                            control={control}
                            name='user'
                            rules={{
                                required: 'This field is required.',
                            }}
                            render={({ field: { onChange, value = '' } }) => (

                                <TextField
                                    label="Username"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e)
                                    }}
                                    className={styles.input}
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.user)}
                                    helperText={Boolean(errors.user) ? errors.user?.message : ''}
                                />
                            )}
                        />
                    </Grid>}
                <Grid item xs={8}>
                    <Controller
                        control={control}
                        name='password'
                        rules={{ required: 'This field is required.' }}
                        render={({ field: { onChange, value = '' } }) => (

                            <TextField
                                label="Password"
                                value={value}
                                type='password'
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
                {isregister &&
                    <Grid item xs={8}>
                        <Controller
                            control={control}
                            name='cpassword'

                            rules={{
                                required: 'This field is required.',
                                validate: (value) => {
                                    if (value === getValues('password')) return true
                                    else return "Password doesn't match."
                                }
                            }}
                            render={({ field: { onChange, value = '' } }) => (

                                <TextField
                                    type='password'

                                    label="Comfirm Password"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e)
                                    }}
                                    className={styles.input}
                                    fullWidth
                                    size='small'
                                    error={Boolean(errors.cpassword)}
                                    helperText={Boolean(errors.cpassword) ? errors.cpassword?.message : ''}
                                />
                            )}
                        />
                    </Grid>}
                <Grid item xs={6}>
                    <Button variant='contained' className={styles.button} onClick={handleSubmit(onSubmit)} size='large' type='button' sx={{ mr: 2 }}>
                        {isregister ? 'Register' : 'Login'}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    {!isregister ?
                        <Typography>Don't have account? <Button onClick={() => setIsRegister(!isregister)}>Register</Button></Typography>
                        :
                        <Typography>Already have account? <Button onClick={() => setIsRegister(!isregister)}>Login</Button></Typography>
                    }
                </Grid>
            </Grid>
        </Card>
    </Box>
}

export default LoginPage