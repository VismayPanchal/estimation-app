import { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, TextField, Grid, Box, Card } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createEstimation } from '../../Actions/EstimationAction';
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import dayjs from 'dayjs';
import MainLayout from '../Layout/MainLayout';


const CreateEstimation = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
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
        groups.map((eachgroup: any) => {

            dispatch(createEstimation({
                ...eachgroup,
                createdDate: dayjs(new Date()).format('DD/MM/YYYY'),
                updatedDate: dayjs(new Date()).format('DD/MM/YYYY'),
            })).then((result) => {
                if (createEstimation.fulfilled.match(result)) {
                    navigate('/Estimations');
                }
            });
        })
    }
    const deleteEstimation = (tableIndex: any, planIndex: any) => {
        const updated = [...groups];
        if (updated[tableIndex].items && updated[tableIndex].items[planIndex]) {

            updated[tableIndex].items.splice(planIndex, 1);

            setGroups(updated);
        }
    }




    return (<MainLayout>
        <Box>
            <Grid container>
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
                                                            price: Number(event.target.value)
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

                    <Card sx={{ float: "right", width: "400px", height: "100px", marginRight: "100px", marginTop: "50px" }}>
                        <TableRow>
                            <TableCell>SubTotal</TableCell>
                        </TableRow><TableRow>
                            <TableCell>Toal margin</TableCell>
                        </TableRow>
                    </Card>
                </Grid>
                <Grid item sx={{ float: "right" }}>

                    <Button sx={{ float: "right" }} onClick={() => onSubmit()} variant="contained">Submit</Button>

                    <Link to={'/Estimations'} >
                        <Button sx={{ float: "right" }} variant='outlined'>Cancel</Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </MainLayout>
    );
}

export default CreateEstimation