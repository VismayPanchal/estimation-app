import { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, TextField, Grid, Box, Card, Autocomplete } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { createEstimation, updateEstimation } from '../../Actions/EstimationAction';
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import dayjs from 'dayjs';
import MainLayout from '../Layout/MainLayout';
import axios from 'axios'
import { base_url } from '../../Constants';


const CreateEstimation = () => {

    const { id } = useParams<{ id: string }>();
    const { estimation, loading } = useSelector((state: RootState) => state.estimation);

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [projectList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState<string>('')
    const [subTotal, setSubtotal] = useState<number>(0)
    const [margin, setMArgin] = useState<number>(0)
    const [groups, setGroups] = useState([{
        group: "",
        id: uuidv4(),
        items: [{
            "name": "",
            "description": "",
            "unit": "",
            id: uuidv4(),
            "quantity": 0,
            "price": 0,
            "margin": 0,
            "total": 0
        }]
    }])
    const itemObj = {
        "name": "",
        "description": "",
        "unit": "",
        "quantity": 0,
        "price": 0,
        "margin": 0,
        "total": 0,
        id: uuidv4(),
    }

    const handleAddGroup = () => {
        setGroups([...groups, {
            group: "",
            id: uuidv4(),
            items: []
        }])
    }
    const handleAddRow = (index: number) => {

        const copyTable = [...groups]
        copyTable[index].items.push(itemObj)
        setGroups(copyTable)
    };

    const onSubmit = () => {
        if (id) {

            groups.map((eachgroup: any) => {

                dispatch(updateEstimation({
                    ...eachgroup,
                    projectName: selectedProject,
                    createdDate: dayjs(new Date()).format('DD/MM/YYYY'),
                    updatedDate: dayjs(new Date()).format('DD/MM/YYYY'),
                })).then((result) => {
                    if (updateEstimation.fulfilled.match(result)) {
                        navigate('/Estimations');
                    }
                });
            })

        } else {
            groups.map((eachgroup: any) => {

                dispatch(createEstimation({
                    ...eachgroup,
                    projectName: selectedProject,
                    createdDate: dayjs(new Date()).format('DD/MM/YYYY'),
                    updatedDate: dayjs(new Date()).format('DD/MM/YYYY'),
                })).then((result) => {
                    if (createEstimation.fulfilled.match(result)) {
                        navigate('/Estimations');
                    }
                });
            })
        }
    }
    const deleteEstimation = (tableIndex: any, planIndex: any) => {
        const updated = [...groups];
        if (updated[tableIndex].items && updated[tableIndex].items[planIndex]) {

            updated[tableIndex].items.splice(planIndex, 1);

            setGroups(updated);
        }
    }

    useEffect(() => {
        axios.get(`${base_url}/projects`).then((res: any) => {
            setProjectList(res.data)
        })
    }, [])

    useEffect(() => {
        if (Array.isArray(groups)) {
            const total = groups[0].items.reduce(
                (a: any, b: any) => Number(a) + Number(b.total || 0),
                0
            )
            setSubtotal(total)
        }
    }, [groups])

    useEffect(() => {

        if (id) {
            console.log('estimation', estimation)
            const data = JSON.parse(JSON.stringify(estimation))
            setGroups([data])
            setSelectedProject(estimation?.projectName)
        }
    }, [id])



    return (<MainLayout>
        <Box>
            {!loading &&
                <Grid container>
                    <Grid item xs={4} sm={4}>


                        <Autocomplete
                            id='status'
                            size='small'
                            value={
                                projectList.length > 0 ?
                                    projectList?.find(
                                        (option: any) =>
                                            option.projectName == selectedProject
                                    ) : null
                            }
                            options={projectList}
                            onChange={(event, newValue: any) => {
                                console.log(event)
                                setSelectedProject(newValue ? newValue.projectName : null)
                            }}
                            getOptionLabel={option => option.projectName || ''}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="For Project"

                                    size='small'
                                    fullWidth
                                />
                            )}
                        />


                    </Grid>
                    <Grid item>
                        <TableContainer>
                            <Button style={{ float: 'left' }} title='Add Document' type='button' onClick={handleAddGroup}>
                                <AddBoxIcon fontSize='large' />
                            </Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Unit</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price ($)</TableCell>
                                        <TableCell>Margin (+)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groups.map((item, index) => (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        value={item.group}
                                                        label='Group'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index] = {
                                                                ...copyTable[index],
                                                                group: event.target.value
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" color="primary" onClick={() => handleAddRow(index)}>
                                                        +
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            {item.items && item.items.map((subitem: any, subindex) => <TableRow key={subindex}>
                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        value={subitem.name}
                                                        label='Name'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                name: event.target.value
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        value={subitem.description}
                                                        label='Description'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                description: event.target.value
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        value={subitem.unit}
                                                        label='Unit'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                unit: event.target.value
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        type='number'
                                                        value={subitem.quantity}
                                                        label='Quantity'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                quantity: Number(event.target.value)
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        value={subitem.price}
                                                        type='number'
                                                        label='Price'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                price: Number(event.target.value),
                                                                total: Number(event.target.value) * copyTable[index].items[subindex].quantity
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>

                                                    <TextField
                                                        fullWidth
                                                        value={subitem.margin}
                                                        type='number'
                                                        label='Margin'
                                                        onChange={(event) => {
                                                            const copyTable = [...groups]
                                                            copyTable[index].items[subindex] = {
                                                                ...copyTable[index].items[subindex],
                                                                margin: Number(event.target.value)
                                                            }
                                                            setGroups(copyTable)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={() => deleteEstimation(index, subindex)} variant='text'>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>)}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={12} sx={{ float: "right" }}>

                        <Card sx={{ float: "right", width: "200px", height: "100px", marginRight: "100px", marginTop: "50px" }}>
                            <TableRow>
                                <TableCell>SubTotal</TableCell>
                                <TableCell> $ {subTotal}</TableCell>
                            </TableRow><TableRow>
                                <TableCell>Toal margin</TableCell>
                                <TableCell> $ {margin}</TableCell>
                            </TableRow>
                        </Card>
                    </Grid>
                    <Grid item sx={{ float: "right" }}>

                        <Button sx={{ float: "right" }} onClick={() => onSubmit()} variant="contained">Submit</Button>

                        <Link to={'/Estimations'} >
                            <Button sx={{ float: "right" }} variant='outlined'>Cancel</Button>
                        </Link>
                    </Grid>
                </Grid>}
        </Box>
    </MainLayout>
    );
}

export default CreateEstimation