import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import { forwardRef, useEffect } from 'react';
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { useState } from 'react';
import React from 'react';
import SideBar from "./SideBar";
import { MTableToolbar } from 'material-table';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment, { locales } from 'moment';
import 'moment/locale/th';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { Alert } from '@mui/material';
import { Snackbar, Button } from '@mui/material';




function Main() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }
    let [cookies, setCookie] = useCookies(['token']);
    let [activity, setActivity] = useState([{}]);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [mycolumns, setMyColumns] = useState([
        { title: 'Activities', field: 'activityName', initialEditValue: 'Activity Name' },
        { title: 'Date/Time', field: 'activitiesTime', type: 'datetime', initialEditValue: selectedDate, render: rowData => moment(rowData.activitiesTime).format('D MMM YY เวลา HH:mm น.') },
    ]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('');
    const handleOpenSnackbar = (message, type) => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setOpenSnackbar(true);
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        axios.get(
            'http://localhost:5131/Activity',
            { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000, }
        ).then((response) => {
            response.data.forEach(element => {
                // element.activitiesTime = moment(element.activitiesTime).format('D MMM YY เวลา HH:mm น.');
                element.activitiesTime = element.activitiesTime;
            });
            setActivity(response.data);
        }).catch((error) => {
            if (error.code === 'ECONNABORTED') {
                console.log('timeout')
            } else { // Checking if error.response exists to avoid potential issues
                console.log(error.response.status);
            }
        })
    }, [])
    const theme = createTheme();

    return (
        <div>
            <SideBar />
            <div>
                <ThemeProvider theme={theme}>
                    <MaterialTable
                        icons={tableIcons}
                        options={{
                            headerStyle: {
                                // backgroundColor: '#01579b',
                                // color: '#FFF',
                                fontFamily: 'Kanit'
                            },
                            rowStyle: {
                                fontFamily: 'Kanit'
                            },
                            searchFieldStyle: {
                                fontFamily: 'Kanit'
                            },
                            actionsCellStyle: {
                                fontFamily: 'Kanit'
                            },
                            actionsColumnIndex: -1,
                        }}
                        components={{
                            Toolbar: props => (
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ flex: 1 }}></div>
                                    <div style={{ textAlign: "center", flex: 2 }}>
                                        <h1>ToDoList</h1>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <MTableToolbar {...props} />
                                    </div>
                                </div>
                            )
                        }}
                        title=""
                        columns={mycolumns}
                        data={activity}
                        editable={{
                            // isEditable: rowData => rowData.name === 'Mehmet', // only name(a) rows would be editable
                            // isEditHidden: rowData => rowData.name === 'x',
                            // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                            // isDeleteHidden: rowData => rowData.name === 'y',
                            onBulkUpdate: changes =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        /* setData([...data, newData]); */
                                        resolve();
                                    }, 1000);
                                }),
                            onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                            onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        axios.post(
                                            'http://localhost:5131/Activity',
                                            { "activityName": newData.activityName, "activitiesTime": newData.activitiesTime },
                                            { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000, }
                                        ).then((response) => {
                                            newData.activityId = response.data.activityId;
                                            setActivity([...activity, newData]);
                                        }).catch((error) => {
                                            handleOpenSnackbar("added new activity fail!", 'error');
                                            if (error.code === 'ECONNABORTED') {
                                                console.log('timeout')
                                            } else { // Checking if error.response exists to avoid potential issues
                                                console.log(error.response.status);
                                            }
                                        })
                                        handleOpenSnackbar("added new activity successfully!", 'success');
                                        resolve();
                                    }, 1000);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        axios.put(
                                            'http://localhost:5131/Activity/' + newData.activityId,
                                            { "activityName": newData.activityName, "activitiesTime": moment(newData.activitiesTime, 'D MMM YY เวลา HH:mm น.') },
                                            { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000, }
                                        ).then((response) => {
                                            const dataUpdate = [...activity];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            setActivity([...dataUpdate]);
                                        }).catch((error) => {
                                            handleOpenSnackbar("update activity fail!", 'error');
                                            if (error.code === 'ECONNABORTED') {
                                                console.log('timeout')
                                            } else { // Checking if error.response exists to avoid potential issues
                                                console.log(error.response.status);
                                            }
                                        })
                                        //const dataUpdate = [...data];
                                        //const index = oldData.tableData.id;
                                        //dataUpdate[index] = newData;
                                        //setData([...dataUpdate]);
                                        handleOpenSnackbar("update activity successfully!", 'success');
                                        resolve();
                                    }, 1000);
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        axios.delete(
                                            'http://localhost:5131/Activity/' + oldData.activityId,
                                            { headers: { Authorization: `Bearer ${cookies.token}` }, timeout: 10 * 1000, }
                                        ).then((response) => {
                                            const dataDelete = [...activity];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setActivity([...dataDelete]);
                                        }).catch((error) => {
                                            handleOpenSnackbar("deleted activity fail!", 'error');
                                            if (error.code === 'ECONNABORTED') {
                                                console.log('timeout')
                                            } else { // Checking if error.response exists to avoid potential issues
                                                console.log(error.response.status);
                                            }
                                        })
                                        //const dataDelete = [...data];
                                        //const index = oldData.tableData.id;
                                        //dataDelete.splice(index, 1);
                                        //setData([...dataDelete]);

                                        handleOpenSnackbar("deleted activity successfully!", 'success');
                                        resolve();
                                    }, 1000);
                                })
                        }}
                    />
                </ThemeProvider>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert variant='filled' onClose={handleCloseSnackbar} severity={snackbarType}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>


    );
}

export default Main;