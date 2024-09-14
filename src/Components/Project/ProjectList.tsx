import { useDispatch, useSelector } from "react-redux";
import { fetchAllProject } from "../../Actions/ProjectActions";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../store";
import { Link } from "react-router-dom";
import { Table, DatePicker, Select, Button, Space } from 'antd';
import { columnOptions, projectStatus } from "../../Constants";
import dayjs from "dayjs";
import { Button as MUIButton } from "@mui/material";
import { ProjectData } from "../../Types";
const { Option } = Select;

const ProjectList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projectList, loading } = useSelector((state: any) => state.project);

    const [filteredProjects, setFilteredProjects] = useState(projectList);
    const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [hiddenColumns, sethiddenColumns] = useState<string[]>([

    ]);

    useEffect(() => {
        dispatch(fetchAllProject());
    }, [dispatch]);

    useEffect(() => {
        let filteredData = projectList;

        if (dateFilter) {
            console.log('Date Filter:', dateFilter.format('YYYY-MM-DD'));
            filteredData = filteredData.filter(project => {
                const projectDate = dayjs(project.date);
                console.log('Project Date:', projectDate.format('YYYY-MM-DD'));
                return projectDate.isSameOrAfter(dateFilter, 'day');
            });
        }

        if (statusFilter) {
            filteredData = filteredData.filter((project: ProjectData) => project.status === statusFilter);
        }

        setFilteredProjects(filteredData);
    }, [dateFilter, statusFilter, projectList]);

    const projectColumns = [
        { dataIndex: 'customer', key: 'customer', title: 'Customer', width: 100, hidden: hiddenColumns.includes('customer') },
        { dataIndex: 'refNo', key: 'refNo', title: 'Refence No.', width: 100, hidden: hiddenColumns.includes('refNo') },
        { dataIndex: 'projectName', key: 'projectName', title: "Project Name", width: 300, hidden: hiddenColumns.includes('projectName') },
        { dataIndex: 'projectNumber', key: 'projectNumber', title: "Project Number", width: 200, hidden: hiddenColumns.includes('projectNumber') },
        { dataIndex: 'areaLocation', key: 'areaLocation', title: "Area Location", width: 200, hidden: hiddenColumns.includes('areaLocation') },
        { dataIndex: 'address', key: 'address', title: "Address", width: 200, hidden: hiddenColumns.includes('address') },
        { dataIndex: 'duedate', key: 'duedate', title: "Due Date", width: 200, hidden: hiddenColumns.includes('duedate') },

        { dataIndex: 'contact', key: 'contact', title: "Contact", width: 200, hidden: hiddenColumns.includes('contact') },
        { dataIndex: 'manager', key: 'manager', title: "Manager", width: 200, hidden: hiddenColumns.includes('manager') },
        { dataIndex: 'staff', key: 'staff', title: "Staff", width: 200, hidden: hiddenColumns.includes('staff') },
        { dataIndex: 'status', key: 'status', title: "Status", width: 200, hidden: hiddenColumns.includes('status') },
        { dataIndex: 'email', key: 'email', title: "Email", width: 200, hidden: hiddenColumns.includes('email') },

        // Add more columns as per your projectList structure
    ];


    return (
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

                <MUIButton variant="contained" sx={{ float: "right" }}> Add Project</MUIButton>
            </Link>
            {filteredProjects?.length > 0 && (
                <Table
                    dataSource={filteredProjects}
                    columns={projectColumns}
                    rowKey="customer"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />

            )}
        </div>
    );
};

export default ProjectList;
