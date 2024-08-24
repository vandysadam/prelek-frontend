import React from 'react';
import { Grid } from '@mui/material';
import { Employee } from '../../../modules/employee/entities/employee.entity';
import moment from 'moment';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import { domainNameRemover } from '../../../utils/domainNameRemover';

interface Props {
  employeeData: Employee;
}

const BasicInformation: React.FC<Props> = ({ employeeData }: Props) => {
  //  console.log('employee', domainNameRemover(employee.avatar_url));
  const bucketUrl = import.meta.env.VITE_APP_CONTAG_ORIGIN_URL;
  const newAvaUrl = `${bucketUrl}${domainNameRemover(employeeData.avatar_url)}`;
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard :' + text);
  }

  const [qrCode, setQrCode] = React.useState<string>('');

  const generateQR = async (username: string) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_CONTAG_URL;
      const url = await QRCode.toDataURL(
        baseUrl + `/${employeeData.company_detail.slug}/${username}`
      );
      // console.log({ url });
      setQrCode(url);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    generateQR(employeeData.username);
  }, []);

  function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <h4 className="font-bold uppercase">Basic Information</h4>
      <Grid container display={'flex'} flexDirection={'row'} spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <div
            aria-label="profile-picture"
            className="w-2/5 pb-[calc(40%)] relative min-w-[6rem] min-h-[6rem] mx-auto">
            <img
              alt="Profile Image"
              className="p-1 rounded-full bg-white absolute w-full h-full object-cover"
              src={newAvaUrl || 'https://via.placeholder.com/300?text=image'}
            />
          </div>
        </Grid>
      </Grid>

      <div className="flex justify-between">
        <span>Company Name</span>
        <span>{employeeData.company_detail.companyName || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Name</span>
        <span>{employeeData.name}</span>
      </div>
      <div className="flex justify-between">
        <span>E-mail</span>
        <span>{employeeData.email}</span>
      </div>
      <div className="flex justify-between">
        <span>Role</span>
        <span>{employeeData.role || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Phone</span>
        <span>{employeeData.phone || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>ID Type</span>
        <span>{employeeData.id_type || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>ID Number</span>
        <span>{employeeData.id_number || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Citizen</span>
        <span>{employeeData.citizen || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Birth Date</span>
        <span>{moment(employeeData.birth_date).format('lll') || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Joined Date</span>
        <span>{moment(employeeData.joined_date).format('lll') || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Resigned Date</span>
        <span>{moment(employeeData.resigned_date).format('lll') || '-'}</span>
      </div>
      <div className="flex justify-between ">
        <span>Profile URL</span>
        <span>
          <a
            className="btn-link mr-2"
            href={`${import.meta.env.VITE_APP_CONTAG_URL}/${
              employeeData.company_detail.slug || ''
            }/${employeeData.username}`}>
            {`${import.meta.env.VITE_APP_CONTAG_URL}/${employeeData.company_detail.slug || ''}/${
              employeeData.username
            }`}
          </a>
          <button
            onClick={() =>
              copyToClipboard(
                `${import.meta.env.VITE_APP_CONTAG_URL}/${employeeData.company_detail.slug || ''}/${
                  employeeData.username
                }`
              )
            }>
            <FiCopy />
          </button>
        </span>
      </div>

      <div>
        <h2>QR Code Section</h2>
        {qrCode ? (
          <div className="flex justify-center">
            <img src={qrCode} alt="qrCode" className="h-56" />
            <button onClick={() => downloadURI(qrCode, `qrcode-${employeeData.username}.png`)}>
              Download QR
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <p>QR Code not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
