import { useDispatch, useSelector } from "react-redux";
import { fetchAllProject, fetchProjectById } from "../../Actions/ProjectActions";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { Table, DatePicker, Select, Space, Button } from 'antd';
import { columnOptions, projectStatus } from "../../Constants";
import dayjs from "dayjs";
import { Button as MUIButton } from "@mui/material";
import { ProjectData } from "../../Types";
import MainLayout from "../Layout/MainLayout";
import { EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const ProjectList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { t } = useTranslation()

    const { projectList, loading } = useSelector((state: any) => state.project);

    const [filteredProjects, setFilteredProjects] = useState(projectList);
    const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [hiddenColumns, sethiddenColumns] = useState<string[]>([

    ]);

    const handleEditClick = (projectId: string) => {
        dispatch(fetchProjectById(projectId)); // Dispatch action to get project details
        navigate(`/Add-project/${projectId}`); // Navigate to the create project page
    };

    useEffect(() => {
        dispatch(fetchAllProject());
    }, [dispatch]);

    useEffect(() => {
        let filteredData = projectList;

        if (dateFilter) {

            const formattedDateFilter = dateFilter.format('DD/MM/YYYY');
            filteredData = filteredData.filter((project: ProjectData) => {
                const projectDate = dayjs(project.duedate, 'DD/MM/YYYY'); // Parse with the format
                return projectDate.isSame(dateFilter, 'day') || projectDate.isAfter(dateFilter, 'day');
            });
            console.log('filter', formattedDateFilter)
        }

        if (statusFilter) {
            filteredData = filteredData.filter((project: ProjectData) => project.status === statusFilter);
        }

        setFilteredProjects(filteredData);
    }, [dateFilter, statusFilter, projectList]);

    const projectColumns = [
        { dataIndex: 'customer', key: 'customer', title: t('customer'), width: 100, hidden: hiddenColumns.includes('customer') },
        { dataIndex: 'refNo', key: 'refNo', title: t('reference'), width: 100, hidden: hiddenColumns.includes('refNo') },
        { dataIndex: 'projectName', key: 'projectName', title: t("project_name"), width: 300, hidden: hiddenColumns.includes('projectName') },
        { dataIndex: 'projectNumber', key: 'projectNumber', title: t("project_number"), width: 200, hidden: hiddenColumns.includes('projectNumber') },
        { dataIndex: 'areaLocation', key: 'areaLocation', title: t("area"), width: 200, hidden: hiddenColumns.includes('areaLocation') },
        { dataIndex: 'address', key: 'address', title: t("address"), width: 200, hidden: hiddenColumns.includes('address') },
        { dataIndex: 'duedate', key: 'duedate', title: t("due_date"), width: 200, hidden: hiddenColumns.includes('duedate') },

        { dataIndex: 'contact', key: 'contact', title: t("contact"), width: 200, hidden: hiddenColumns.includes('contact') },
        { dataIndex: 'manager', key: 'manager', title: t("manager"), width: 200, hidden: hiddenColumns.includes('manager') },
        { dataIndex: 'staff', key: 'staff', title: t("staff"), width: 200, hidden: hiddenColumns.includes('staff') },
        { dataIndex: 'status', key: 'status', title: t("status"), width: 200, hidden: hiddenColumns.includes('status') },
        { dataIndex: 'email', key: 'email', title: t("email"), width: 200, hidden: hiddenColumns.includes('email') },
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

            <Space>
                <Select
                    placeholder="Select status"
                    onChange={(value) => setStatusFilter(value)}
                    style={{ width: 200, marginRight: 8 }}
                >
                    {projectStatus.map((option: string) =>
                        <Option value={option}>{option}</Option>
                    )}
                </Select>
                <DatePicker
                    onChange={(date) => setDateFilter(date ? dayjs(date) : null)}
                    style={{ marginRight: 8 }}
                />
            </Space>
            <Select
                mode="multiple"
                allowClear
                placeholder="Select columns to Hide"

                style={{ width: 400 }}
                onChange={(values) => sethiddenColumns(values)}
                value={hiddenColumns}
            >
                {columnOptions.map((option: any) => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
            </Select>
            <Link to={'/Add-project'} >

                <MUIButton variant="contained" style={{ marginLeft: "50px" }} >{t('add_project')}</MUIButton>
            </Link>
            {filteredProjects?.length > 0 && (
                <Table
                    key={'id'}
                    dataSource={filteredProjects}
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

export default ProjectList;
