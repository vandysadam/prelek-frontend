import { Grid } from '@mui/material';
import React from 'react';
import { Employee } from '../../../modules/employee/entities/employee.entity';
import moment from 'moment';

interface Props {
  employeeData: Employee;
}

const LocationInformation: React.FC<Props> = ({ employeeData }: Props) => {
  return (
    <div className="my-5">
      <h4 className="font-bold uppercase">Location Information</h4>

      <div className="flex justify-between">
        <span>Address</span>
        <span>{employeeData.address || '-'}</span>
      </div>

      <div className="flex justify-between">
        <span>State</span>
        <span>{employeeData.state || '-'}</span>
      </div>

      <div className="flex justify-between">
        <span>city</span>
        <span>{employeeData.city || '-'}</span>
      </div>

      <div className="flex justify-between">
        <span>Country</span>
        <span>{employeeData.country || '-'}</span>
      </div>

      <div className="flex justify-between">
        <span>Postal Code</span>
        <span>{employeeData.postal_code || '-'}</span>
      </div>
    </div>
  );
};

export default LocationInformation;
