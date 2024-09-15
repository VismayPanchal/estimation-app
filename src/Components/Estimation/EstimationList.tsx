import { useDispatch, useSelector } from "react-redux";
import { fetchAllEstimations, fetchEstimationByid } from "../../Actions/EstimationAction";
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'antd';
import { Button as MUIButton } from "@mui/material";
import MainLayout from "../Layout/MainLayout";
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const EstimationList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation()
    const { estimationList, loading } = useSelector((state: any) => state.estimation);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllEstimations());
    }, [dispatch]);

    const handleEditClick = (id: string) => {
        dispatch(fetchEstimationByid(id)); // Dispatch action to get project details
        navigate(`/Add-estimation/${id}`); // Navigate to the create project page
    };

    const projectColumns = [
        { dataIndex: 'group', key: 'group', title: t("estimation_for"), width: 200, },
        { dataIndex: 'projectName', key: 'projectName', title: t("project"), width: 300, },
        { dataIndex: 'createdDate', key: 'createdDate', title: t("created_date"), width: 200, },
        { dataIndex: 'updatedDate', key: 'updatedDate', title: t("last_modified"), width: 200, },

        {
            title: 'Edit',
            key: 'edit',
            render: (text: any, record: any) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick(record.id)}
                >
                    Edit
                </Button>
            ),
        },

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
