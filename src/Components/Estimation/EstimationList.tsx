import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstimations } from "../../Actions/EstimationAction";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import { Link } from "react-router-dom";
import { Table } from 'antd';
import { Button as MUIButton } from "@mui/material";
import MainLayout from "../Layout/MainLayout";

const EstimationList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { estimationList, loading } = useSelector((state: any) => state.estimation);

    useEffect(() => {
        dispatch(fetchAllEstimations());
    }, [dispatch]);

    console.log('estimaion', estimationList)

    const projectColumns = [
        { dataIndex: 'group', key: 'group', title: "Estimation for", width: 200, },
        { dataIndex: 'projectName', key: 'projectName', title: "Project", width: 300, },
        { dataIndex: 'createdDate', key: 'createdDate', title: "Created Date", width: 200, },
        { dataIndex: 'updatedDate', key: 'updatedDate', title: "Last Modified", width: 200, },

        { dataIndex: 'action', key: 'email', title: "Action", width: 200, },

        // Add more columns as per your projectList structure
    ];


    return (<MainLayout>
        <div style={{ height: 400, }}>


            <Link to={'/Add-estimation'} >

                <MUIButton variant="contained" sx={{ float: "right" }}>Add Estimation</MUIButton>
            </Link>
            {estimationList?.length > 0 && (
                <Table
                    key={'id'}
                    dataSource={estimationList}
                    columns={projectColumns}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />

            )}
        </div>
    </MainLayout>
    );
};

export default EstimationList;
