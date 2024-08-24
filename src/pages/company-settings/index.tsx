import { Button, Grid, Skeleton, Stack } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { FormProvider, RHFUploadMultiFile, RHFUploadSingle } from '../../components/hook-form';
import RHFTextArea from '../../components/hook-form/RHFTextArea';
import RHFTextField from '../../components/hook-form/RHFTextField';
import RHFUploadLogo from '../../components/hook-form/RHFUploadLogo';
import {
  useLazyGetCompanyDetailQuery,
  useUpdateCompanySettingsMutation
} from '../../modules/company/company/api/company.api';
import { Company } from '../../modules/company/company/entities/company.entity';
import { UserRoleEnum } from '../../modules/users/enums/user-role.enum';
import Header from '../../partials/Header';
import Sidebar from '../../partials/sidebar/Sidebar';
import { useTypedSelector } from '../../store';
import { cleanObj } from '../../utils/deleteVoidObject';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFUploadLogoBanner from '../../components/hook-form/RHFUploadLogoBanner';
import { domainNameRemover } from '../../utils/domainNameRemover';
// import { ColorPicker } from '../../components/inputs/ColorPicker';
// import { ColorPicker } from 'material-ui-color';

interface TmpAdditionalFiles {
  new_files?: any;
  old_files?: any;
}

interface Props {
  props: Company;
  refetch: () => void;
  loading: (load: boolean) => void;
}

const Form: React.FC<Props> = ({ props, refetch, loading }) => {
  // console.log('props', props);
  const bucketUrl = import.meta.env.VITE_APP_CONTAG_ORIGIN_URL;
  const [isChangeLogo, setIsChangeLogo] = useState(false);
  const [isChangeAdditionalFile, setIsChangeAdditionalFile] = useState(false);

  const changedAdditionalFile = Yup.mixed()
    .test('fileSize', 'File size must less than 10 MB', (value) => {
      if (value) {
        // const trueSize = value.size * 28;
        if (value.size > 1024 * 1024 * 10) {
          return false;
        }
      }
      return true;
    })
    .test('fileExtension', 'Invalid extension, (Jpg, Jpeg, Png, Pdf)', (value) => {
      if (value) {
        console.log({ value });
        if (
          value.fileExtension !== 'application/pdf' &&
          value.fileExtension !== 'image/png' &&
          value.fileExtension !== 'image/jpeg' &&
          value.fileExtension !== 'image/jpg'
        ) {
          return false;
        }
      }
      return true;
    });
  const unchangedAdditionalFile = Yup.string().required('Field is Required!');

  const changedLogo = Yup.mixed()
    .test('fileSize', 'File size must less than 10 MB', (value) => {
      if (value) {
        // const trueSize = value.size * 28;
        if (value.size > 1024 * 1024 * 10) {
          return false;
        }
      }
      return true;
    })
    .test('fileExtension', 'Invalid extension, (Jpg, Jpeg, Png)', (value) => {
      if (value) {
        if (
          value.fileExtension !== 'image/png' &&
          value.fileExtension !== 'image/jpeg' &&
          value.fileExtension !== 'image/jpg'
        ) {
          return false;
        }
      }
      return true;
    });
  const unchangedLogo = Yup.string().required('Field is Required!');
  const CompanySettingSchema = React.useMemo(() => {
    return Yup.object().shape({
      color: Yup.string().required('Field is Required!'),
      logo: !isChangeLogo ? unchangedLogo : changedLogo,
      companyName: Yup.string().required('Field is Required!'),
      companyPhoneNumber: Yup.string().required('Field is Required!'),
      picName: Yup.string().required('Field is Required!'),
      companyEmail: Yup.string().required('Field is Required!'),
      companyProfileFile: !isChangeAdditionalFile ? unchangedAdditionalFile : changedAdditionalFile,
      companyAddress: Yup.string().required('Field is Required!'),
      totalEmployee: Yup.number().required('Field is Required!'),
      additional_files: Yup.array().min(1, 'Upload at least 1 file')
      // vat: Yup.boolean().required(),
    });
  }, [props, unchangedAdditionalFile, changedAdditionalFile]);

  const newAddFiles =
    props &&
    props.additional_files &&
    props.additional_files.map((item) => {
      return {
        ...item,
        url: `${bucketUrl}${domainNameRemover(item.url)}`
      };
    });
  // console.log({ newAddFiles });
  const RHF = useForm({
    defaultValues: {
      color: '#'.concat(props.color ?? '000000'),
      // logo: props.logo ?? '',
      logo: (props && props.logo && `${bucketUrl}${domainNameRemover(props.logo as string)}`) ?? '',
      companyName: props.companyName,
      additional_files: newAddFiles ?? [],
      companyPhoneNumber: props.companyPhone,
      companyCountryCode: props.companyCountryCode ?? '+62',
      picName: props.picName,
      companyEmail: props.companyEmail,
      companyProfileFile:
        (props &&
          props.companyProfileFile &&
          `${bucketUrl}${domainNameRemover(props.companyProfileFile as string)}`) ??
        '',
      companyAddress: props.companyAddress,
      totalEmployee: props.totalEmployee
    },
    resolver: yupResolver(CompanySettingSchema),
    mode: 'onChange'
  });
  const oldAdditionalFiles = props.additional_files ?? [];
  const newOldAdditionalFiles =
    oldAdditionalFiles.length > 0
      ? oldAdditionalFiles.map((item) => {
          if (item.url) {
            return {
              ...item,
              url: `${bucketUrl}${domainNameRemover(item.url)}`
            };
          } else {
            return item;
          }
        })
      : [];
  // console.log({ newOldAdditionalFiles });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = RHF;
  const isLogo = watch('logo');
  const isCompanyProfile = watch('companyProfileFile');
  const additionalFiles = watch('additional_files');
  console.log({ additionalFiles });
  const newAdditionalFiles =
    additionalFiles && additionalFiles.length > 0
      ? additionalFiles.map((item) => {
          if (item.url) {
            return {
              ...item,
              url: `${bucketUrl}${domainNameRemover(item.url)}`
            };
          } else {
            return item;
          }
        })
      : [];
  // console.log({ isCompanyProfile });
  const [phoneNumber, setPhoneNumber] = React.useState('+62' + props.companyPhone ?? '');
  const [updateCompany] = useUpdateCompanySettingsMutation();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (newValue) => {
    setPhoneNumber(newValue);
    const countryCode = newValue.split(' ')[0];
    const phoneNumber = newValue.split(' ')[1];
    reset({
      ...RHF.getValues(),
      companyPhoneNumber: phoneNumber,
      companyCountryCode: countryCode
    });
  };

  React.useEffect(() => {
    if (typeof isLogo !== 'string') {
      setIsChangeLogo(true);
    }
    if (typeof isCompanyProfile !== 'string') {
      setIsChangeAdditionalFile(true);
    }
  }, [isLogo, isCompanyProfile]);

  const onSubmited = async (data: Company) => {
    // console.log({ data });
    const tmpPayload = data;
    let payload: any = {
      companyId: props._id,
      color: tmpPayload.color,
      companyName: tmpPayload.companyName,
      companyEmail: tmpPayload.companyEmail,
      companyPhone: tmpPayload.companyPhone,
      companyAddress: tmpPayload.companyAddress
    };
    if (
      tmpPayload.companyProfileFile &&
      typeof tmpPayload.companyProfileFile !== 'string' &&
      !!tmpPayload.companyProfileFile.base64String
    ) {
      payload = {
        ...payload,
        companyProfileFile: tmpPayload.companyProfileFile
      };
    } else if (tmpPayload.companyProfileFile && typeof tmpPayload.companyProfileFile === 'string') {
      delete tmpPayload.companyProfileFile;
    } else {
      payload = {
        ...payload,
        companyProfileFile: ''
      };
    }
    if (tmpPayload.logo && typeof tmpPayload.logo !== 'string' && !!tmpPayload.logo.base64String) {
      payload = {
        ...payload,
        logo: tmpPayload.logo
      };
    } else if (tmpPayload.logo && typeof tmpPayload.logo === 'string') {
      delete tmpPayload.logo;
    } else {
      payload = {
        ...payload,
        logo: ''
      };
    }
    // console.log('typeof:', oldAdditionalFiles);
    const checkArray =
      newAdditionalFiles && newOldAdditionalFiles.length === newAdditionalFiles.length
        ? newOldAdditionalFiles.every(
            (value, index) => value.url === tmpPayload.additional_files[index].url
          )
        : !newAdditionalFiles
        ? true
        : false;
    const lenghtArray =
      newAdditionalFiles && newOldAdditionalFiles.length > newAdditionalFiles.length
        ? newOldAdditionalFiles.length
        : !newAdditionalFiles
        ? newOldAdditionalFiles.length
        : newAdditionalFiles.length;
    // console.log({ checkArray, lenghtArray });
    let tmp_additional_files: TmpAdditionalFiles[] = [];
    payload = cleanObj(payload);
    if (checkArray) {
      delete tmpPayload.additional_files;
    } else {
      let activeIndex = 0;
      for (let i = 0; i < lenghtArray; i++) {
        if (
          tmpPayload &&
          tmpPayload.additional_files[i] &&
          tmpPayload.additional_files[i]._id &&
          tmpPayload.additional_files[i]._id.length === 4
        ) {
          tmp_additional_files[activeIndex] = {
            ...tmp_additional_files[activeIndex],
            new_files: tmpPayload.additional_files[i]
          };
          activeIndex++;
        } else {
          for (let j = 0; j < lenghtArray; j++) {
            if (newOldAdditionalFiles[j] && newOldAdditionalFiles[j]._id) {
              const isDeleted = tmpPayload.additional_files.findIndex(
                (value) => value._id === newOldAdditionalFiles[j]._id
              );
              if (isDeleted < 0) {
                tmp_additional_files[activeIndex] = {
                  ...tmp_additional_files[activeIndex],
                  old_files: newOldAdditionalFiles[j]
                };
                activeIndex++;
              }
            }
          }
        }
      }
      payload = {
        ...payload,
        additionalFiles: tmp_additional_files as TmpAdditionalFiles[]
      };
    }

    console.log({ payload });
    loading(true);
    try {
      await updateCompany({
        ...payload
      }).unwrap();
      setTimeout(() => {
        toast.success(`${props.companyName} Updated!`, {
          theme: 'dark'
        });
        refetch();
        // navigate('/company-settings');
        // window.location.reload();
      }, 0.1);
    } catch (error) {
      setTimeout(() => {
        toast.error('Something went wrong!', {
          theme: 'dark'
        });
      }, 0.1);
    } finally {
      loading(false);
    }
  };

  return (
    // <form autoComplete="off" className="px-5 pb-5" onSubmit={handleSubmit(onSubmit)}>
    <FormProvider methods={RHF} onSubmit={handleSubmit(onSubmited)}>
      <Grid
        container
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'row'}
        spacing={3}
        sx={{ px: 3, py: 3 }}>
        {/* Logo Uploader */}
        {isLoading && (
          <Grid item xs={12} md={12}>
            <Stack gap={2}>
              <Stack alignItems={'center'}>
                <Skeleton variant="circular" width={200} height={200} />
              </Stack>
              <Skeleton variant="rounded" height={150} />
              <Skeleton variant="rounded" height={150} />
            </Stack>
          </Grid>
        )}
        {!isLoading && (
          <>
            <Grid item xs={12} md={12}>
              <RHFUploadLogoBanner
                name={'logo'}
                label={'Button Upload Logo'}
                placeholder={'logo'}
                backgroundBanner={props && props.color ? props.color : '000'}
              />
            </Grid>

            {/* Color Picker By Default */}
            <Grid item xs={12} md={6}>
              <RHFTextField type={'color'} name={'color'} label={'Theme Color'} />
            </Grid>

            {/* Comapny Name */}
            <Grid item xs={12} md={6}>
              <RHFTextField name={'companyName'} label={'Company Name'} />
            </Grid>

            {/* Phone Number using MuiTelInput */}
            <Grid item xs={12} md={6}>
              <MuiTelInput
                fullWidth
                label={'Company Phone Number'}
                value={phoneNumber}
                onChange={(event) => handlePhoneNumberChange(event)}
                // required
                error={!phoneNumber}
                helperText={!phoneNumber && 'Field is required'}
              />
            </Grid>

            {/* PIC Name */}
            <Grid item xs={12} md={6}>
              <RHFTextField name={'picName'} label={'PIC Name'} />
            </Grid>

            {/* Company Name */}
            <Grid item xs={12} md={6}>
              <RHFTextField name={'companyEmail'} label={'Company Email'} />
            </Grid>

            {/* Total Employee */}
            <Grid item xs={12} md={6}>
              <RHFTextField
                name={'totalEmployee'}
                label={'Total Employee'}
                type={'number'}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RHFTextArea name={'companyAddress'} label={'Company Address'} />
            </Grid>

            {/* Company Profile File */}
            <Grid item xs={12} md={12}>
              {/* <RHFUploadMultiFile name={'companyProfileFile'} label={'Company Profile'} /> */}
              <RHFUploadSingle
                name={'companyProfileFile'}
                label={'Company Profile File'}
                disabled={isLoading}
              />
            </Grid>

            {/* Additional Files */}
            <Grid item xs={12} md={12}>
              <RHFUploadMultiFile
                name={'additional_files'}
                label={'Additional Files'}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={isLoading}>
                Save
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </FormProvider>

    // </form>
  );
};

const CompanySettings: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [getCompanyDetail, { data, isSuccess }] = useLazyGetCompanyDetailQuery();
  // const [updateCompany] = useUpdateCompanySettingsMutation();

  const currentUser: Employee = useTypedSelector((state) => state.authSlice.user) as Employee;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.company_id &&
      currentUser.role === UserRoleEnum['COMPANY_ADMIN']
    ) {
      getCompanyDetail({ id: currentUser.company_id });
    }
  }, [currentUser]);

  const companyData = data?.data ?? null;
  // console.log('companyData', companyData);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {isLoading && (
          <div
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full z-50 "
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)'
            }}>
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        )}

        {/* </div> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
                {/* Header */}
                <header className="px-5 py-4 flex justify-between">
                  <h2 className="font-semibold text-gray-800 mt-1">
                    Company Settings
                    <span className="text-gray-400 font-medium text-sm ml-1 pt-1"></span>
                  </h2>
                </header>

                {/* Form */}
                {isSuccess && currentUser && (
                  <Form
                    props={companyData}
                    refetch={() => getCompanyDetail({ id: currentUser.company_id })}
                    loading={(load) => setIsLoading(load)}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CompanySettings;
