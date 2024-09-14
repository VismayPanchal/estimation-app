import { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'


const CreateEstimation = () => {

    const [groups, setGroups] = useState([{
        group: "",
        items: [{
            "name": "",
            "description": "",
            "unit": "",
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
        "total": 0
    }

    const handleAddGroup = () => {
        setGroups([...groups, {
            group: "",
            items: []
        }])
    }
    const handleAddRow = (index: number) => {

        const copyTable = [...groups]
        copyTable[index].items.push(itemObj)
        setGroups(copyTable)
    };



    return (
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
                            </TableRow>)}
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CreateEstimation