import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';
import { Link } from "react-router-dom";
import TimesheetService from "../services/timesheet.service";
import moment from 'moment';

const initialTimesheetListState = [
    {
        "idTimesheet": 0,
        "name": "",
        "startDate": "",
        "endDate": ""
    }
];

const Timesheet = (props) => {
    const [TimesheetList, setTimesheetList] = useState(initialTimesheetListState);
    const [error, setError] = useState(false);



    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllPrioritiesMethod();
        // eslint-disable-next-line 
    },[]);

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        TimesheetService.getAll()
            .then(response => {
                setTimesheetList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    /*const columns = [
        {
            title: 'Timesheet',
            render: (timesheet) =>
            <Link
                to={"/timesheets/add/" + timesheet.idTimesheet}
            >
                {timesheet.name}
            </Link>,
            render: (timesheet) => timesheet.startDate,
            render: (timesheet) => timesheet.endDate
        }
    ];*/
    const columns = [
        {
          title: 'Name',
          render: (Timesheet) =>
            <Link
                to={"/timesheets/add/" + Timesheet.idTimesheet}
            >
                {Timesheet.name}
            </Link>,
        },
        {
            title: 'Fecha de inicio',
            render: (Timesheet) =>
            moment(Timesheet.startDate).format("YYYY-MM-DD")
            
                
          },
          {
            title: 'Fecha final',
            render: (Timesheet) =>
                moment(Timesheet.endDate).format("YYYY-MM-DD")
          },
      ];

    return (
        <div>
            <Table rowKey={Timesheet => TimesheetList.idTimesheet} columns={columns} dataSource={TimesheetList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Timesheet;