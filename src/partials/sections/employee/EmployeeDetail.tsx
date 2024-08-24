import React from 'react';
import { Employee } from '../../../modules/employee/entities/employee.entity';
import BasicInformation from './BasicInformation';
import LocationInformation from './LocationInformation';

interface Props {
  employeeData: Employee;
}

const EmployeeDetail: React.FC<Props> = ({ employeeData }: Props) => {
  return (
    <div className="ml-6 mr-12 mt-2 space-y-2">
      <BasicInformation employeeData={employeeData} />
      <LocationInformation employeeData={employeeData} />
    </div>
  );
};

export default EmployeeDetail;
