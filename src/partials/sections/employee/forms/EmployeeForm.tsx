import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'ts-luxon';

import { Clear as ClearIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  NativeSelect,
  TextField,
  Typography
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useFilePicker } from 'use-file-picker';
import * as Yup from 'yup';
import { useGetCompanyNameAndIdQuery } from '../../../../modules/company/company/api/company.api';
import { CompanyNameAndIdResponse } from '../../../../modules/company/company/dtos/resposne/get-company-name-and-id.response';
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation
} from '../../../../modules/employee/api/employee.api';
import { CreateEmployeeDto } from '../../../../modules/employee/dtos/requests/create-employee.request';
import { UpdateEmployeeDto } from '../../../../modules/employee/dtos/requests/update-employee.request';
import { Employee } from '../../../../modules/employee/entities/employee.entity';
import { IdTypeEnum } from '../../../../modules/employee/enums/id-type.enum';
import {
  CompanyRoleEnum,
  companyRoleToReadable,
  UserRoleEnum
} from '../../../../modules/users/enums/user-role.enum';
import { useTypedSelector } from '../../../../store';
import { useCompress } from '../../../../utils/browser-image-compression';
import { phoneNumberRegex } from '../../../../utils/form-validation';
import { removeEmptyKey } from '../../../../utils/remove-empty-key';
import { toBase64 } from '../../../../utils/toBase64';
import { UploadFileBase64Dto } from '../../../../utils/upload-file-base64.dto';
import { arrayMaxSize } from 'class-validator';
import { domainNameRemover } from '../../../../utils/domainNameRemover';

interface Props {
  employee: Employee | null;
  successCallback: (purpose: 'add' | 'edit' | 'detail' | 'lists') => void;
}

interface SelectableRole {
  label: string;
  value: string;
}

const TenantEmployeeForm: React.FC<Props> = ({ employee, successCallback }: Props) => {
  // console.log('employee', employee);
  const currentUser = useTypedSelector((state) => state.authSlice.user);

  const bucketUrl = import.meta.env.VITE_APP_CONTAG_ORIGIN_URL;
  const newAvaUrl =
    employee && employee.avatar_url ? `${bucketUrl}${domainNameRemover(employee.avatar_url)}` : '';
  // console.log({ newAvaUrl });
  // console.log('employee.avatar_url', employee && employee.avatar_url);

  const [BaseSelectableRole, setBaseSelectableRole] = React.useState<SelectableRole[]>([]);
  // console.log({BaseSelectableRole});

  const [create, { isLoading: creating }] = useCreateEmployeeMutation();
  const [update, { isLoading: updating }] = useUpdateEmployeeMutation();
  // const [get, { isLoading: getting }] = useGetCompanyNameAndIdQuery();
  const { data, refetch, isLoading } = useGetCompanyNameAndIdQuery(
    {},
    {
      skip: false,
      refetchOnMountOrArgChange: true
    }
  );

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [roleValue, setRoleValue] = React.useState<string>('');
  // console.log('roleValue',roleValue)
  const [companyName, setCompanyName] = React.useState<string>('');
  const [companyNameId, setCompanyNameId] = React.useState<CompanyNameAndIdResponse[]>();
  const [disableCompanyNameId, setDisableCompanyNameId] = React.useState<boolean>(false);
  const { progress, isCompressing, compress } = useCompress();
  const [companyId] = React.useState<string>(
    (currentUser as Employee).company_id && (currentUser as Employee).company_id !== ''
      ? (currentUser as Employee).company_id
      : ''
  );

  /* Initial State for Formik form */
  const initialState: CreateEmployeeDto = {
    /* basic information */
    company_id: '',
    avatar_url: '',
    name: '',
    email: '',
    phone: '',
    citizen: '',
    birth_date: null,
    id_type: IdTypeEnum.KTP,
    id_number: '',
    joined_date: null, // Date of resignation from the company
    resigned_date: null,
    password: undefined,
    role: '',

    /* address */
    address: '',
    state: '',
    city: '',
    country: '',
    postal_code: '',
    bio: ''
  };

  /* Validation Schema for Formik */
  const validationSchema: Yup.SchemaOf<Omit<CreateEmployeeDto, 'avatar_url'>> =
    React.useMemo(() => {
      return Yup.object({
        address: Yup.string().nullable(),
        bio: Yup.string().nullable(),
        birth_date: Yup.date().typeError('Must be a valid Date Instance').nullable(),
        // .required('Field is Required!'),
        // citizen: Yup.string().required('Field is Required!'),
        citizen: Yup.string().nullable(),
        city: Yup.string().nullable(),
        country: Yup.string().nullable(),
        email: Yup.string().email().required('Field is Required!'),
        id_number: Yup.string().nullable(),
        // id_type: Yup.mixed<IdTypeEnum>().oneOf(Object.values(IdTypeEnum)).required(),
        id_type: Yup.mixed<IdTypeEnum>().oneOf(Object.values(IdTypeEnum)).nullable(),
        role: Yup.string().oneOf(Object.values(CompanyRoleEnum)).required(),
        // role: Yup.string().oneOf(Object.values(CompanyRoleEnum)).nullable(),
        joined_date: Yup.date()
          .typeError('Must be a valid Date Instance')
          // .required('Field is Required!'),
          .nullable(),
        name: Yup.string().required('Field is Required!'),
        phone: Yup.string().required('Filed is Required!').trim().matches(phoneNumberRegex, {
          message: 'Invalid Phone number, it must be 8xxxxxxxx'
        }),
        postal_code: Yup.string().nullable(),
        resigned_date: Yup.date().notRequired().nullable().default(null),
        state: Yup.string().nullable(),
        company_id:
          currentUser.role === UserRoleEnum.COMPANY_ADMIN
            ? Yup.string().notRequired().nullable().default(null)
            : Yup.string().required('Field is Required!'),
        password: employee
          ? Yup.string().notRequired().nullable().default(null)
          : Yup.string().min(8, 'Use at least 8 characters').required('Field is Required!')
        /* date */
      });
    }, [employee, currentUser.role]);

  const RHF = useForm<CreateEmployeeDto>({
    // defaultValues:
    //   (employee && {
    //     ...employee,
    //     role: companyRoleToReadable(employee.role),
    //     birth_date: employee.birth_date || null,
    //     resigned_date: employee.resigned_date || null,
    //     joined_date: employee.joined_date || null,
    //   }) ||
    //   initialState,
    defaultValues: initialState,
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
    reset
  } = RHF;

  const [pickAvatarImage, avatarImagePicker] = useFilePicker({
    multiple: false,
    readAs: 'DataURL',
    accept: ['.png', '.jpg', 'jpeg'],
    limitFilesConfig: { min: 1, max: 1 }
  });

  const birthDate = watch('birth_date');
  const joinedDate = watch('joined_date');
  const resignedDate = watch('resigned_date');

  const avatarImage = watch('avatar_url');

  const [avatarImageFile, setAvatarImageFile] = React.useState<UploadFileBase64Dto | null>(null);

  const fetchCompanyNameId = React.useCallback(async () => {
    try {
      setCompanyNameId(data?.data);
    } catch (err) {
      console.log('error', err);
    }
  }, [data]);

  const handleDrop = async (acceptedFiles: File) => {
    const compressFile = compress(acceptedFiles, {
      maxSizeMB: 1,
      maxWidthOrHeight: 900,
      useWebWorker: false
    });

    compressFile
      .then(async (compresedFile) => {
        const buffer: any = await toBase64(compresedFile);

        setValue('avatar_url', buffer);
        setAvatarImageFile({
          base64String: buffer,
          fullName: compresedFile.name,
          fileExtension: compresedFile.type,
          size: buffer.length
        });
      })
      .catch((err) => {
        console.error('Unable to compress file', err);
      });
  };

  React.useEffect(() => {
    if (employee) {
      // console.log({ newAvaUrl });
      reset({
        ...employee,
        avatar_url: newAvaUrl
      });
      if (BaseSelectableRole.length > 0) {
        const roleName = BaseSelectableRole.find((item) => item.value === employee.role);
        // console.log({ roleName });
        setRoleValue(roleName.label);
        if (companyNameId) {
          const companyIndex = companyNameId?.findIndex((item) => item._id === employee.company_id);
          setCompanyName(companyNameId[companyIndex].companyName);
          setValue('company_id', companyNameId[companyIndex]._id);
          if (
            [UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].indexOf(
              currentUser.role as UserRoleEnum
            ) > -1
          ) {
            setDisableCompanyNameId(true);
          } else {
            setDisableCompanyNameId(false);
          }
        } else if (
          [UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].indexOf(
            currentUser.role as UserRoleEnum
          ) > -1
        ) {
          setDisableCompanyNameId(true);
          setCompanyName((currentUser as Employee).company_detail.companyName ?? '');
          setValue('company_id', (currentUser as Employee).company_detail._id ?? '');
        }
      }
    } else if (
      [UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].indexOf(
        currentUser.role as UserRoleEnum
      ) > -1
    ) {
      // console.log('masuk sini', BaseSelectableRole);
      const defaultRole = BaseSelectableRole.find((item) => item.value === 'employee');
      if (defaultRole) {
        // console.log({ defaultRole });
        setRoleValue(defaultRole.label);
        setValue('role', defaultRole.value);
      }
      setDisableCompanyNameId(true);
      setCompanyName((currentUser as Employee).company_detail.companyName ?? '');
      setValue('company_id', (currentUser as Employee).company_detail._id ?? '');
    }
  }, [employee, reset, companyNameId, BaseSelectableRole, currentUser]);
  // console.log({ companyName });
  React.useEffect(() => {
    const { errors, filesContent, loading, plainFiles } = avatarImagePicker;

    if (loading) {
      return;
    }

    if (errors.length !== 0) {
      console.error(errors);
      return;
    }

    if (filesContent.length === 0) {
      return;
    }

    handleDrop(plainFiles[0]);
  }, [avatarImagePicker.loading]);

  React.useEffect(() => {
    if (isLoading === false) {
      fetchCompanyNameId();
    }
    if (!!currentUser.role) {
      if (
        [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_USER, UserRoleEnum.MARKETING].indexOf(
          currentUser.role as UserRoleEnum
        ) > -1
      ) {
        setBaseSelectableRole([
          { label: 'Admin', value: 'company_admin' },
          { label: 'PIC', value: 'company_pic' },
          { label: 'Employee', value: 'employee' }
        ]);
      } else if (
        [UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].indexOf(
          currentUser.role as UserRoleEnum
        ) > -1
      ) {
        if (employee && employee.role === 'company_admin') {
          setBaseSelectableRole([
            { label: 'Admin', value: 'company_admin' },
            { label: 'PIC', value: 'company_pic' },
            { label: 'Employee', value: 'employee' }
          ]);
        } else {
          setBaseSelectableRole([
            { label: 'PIC', value: 'company_pic' },
            { label: 'Employee', value: 'employee' }
          ]);
        }
      }

      if (employee) setRoleValue(companyRoleToReadable(employee.role));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmit = async (formValue: CreateEmployeeDto) => {
    let tmpValues: any = { ...formValue };
    const company_id: string =
      formValue.company_id && formValue.company_id !== '' ? formValue.company_id : companyId;
    if (!employee && !!company_id) {
      try {
        let createEmployeePayload: CreateEmployeeDto = {
          ...tmpValues,
          company_id,
          role: formValue.role
        };
        if (!!avatarImageFile) {
          createEmployeePayload.avatar_url = {
            ...avatarImageFile
          };
        }

        createEmployeePayload = removeEmptyKey(createEmployeePayload);
        createEmployeePayload = {
          ...createEmployeePayload,
          resigned_date: getValues('resigned_date') ?? null,
          joined_date: getValues('joined_date') ?? null,
          birth_date: getValues('birth_date') ?? null
        };
        // console.log('createEmployeePayload : ', createEmployeePayload);

        await create(createEmployeePayload).unwrap();
        // console.log('test create', createEmployeePayload);

        toast.success(`${formValue.name} Created Successfully!`, {
          theme: 'dark'
        });
        successCallback('lists');
      } catch (error) {
        if (error.data.statusCode < 500) {
          toast.error(error.data.message, {
            theme: 'dark'
          });
        }
        if (error.data.statusCode >= 500) {
          toast.error('Something went wrong', {
            theme: 'dark'
          });
        }
      }
    } else if (employee && employee._id && company_id) {
      try {
        let updateEmployeePayload: UpdateEmployeeDto = {
          employee_id: employee._id,
          company_id,
          address: formValue.address,
          state: formValue.state,
          name: formValue.name,
          email: formValue.email,
          phone: formValue.phone,
          city: formValue.city,
          country: formValue.country,
          birth_date: formValue.birth_date,
          joined_date: formValue.joined_date,
          resigned_date: formValue.resigned_date,
          id_type: formValue.id_type,
          id_number: formValue.id_number,
          postal_code: formValue.postal_code,
          citizen: formValue.citizen,
          role: formValue.role,
          password: formValue.password,
          bio: formValue.bio
        };

        if (!!avatarImageFile) {
          updateEmployeePayload.avatar_url = {
            ...avatarImageFile
          };
        }
        updateEmployeePayload = removeEmptyKey(updateEmployeePayload);
        updateEmployeePayload = {
          ...updateEmployeePayload,
          resigned_date: getValues('resigned_date') ?? '',
          joined_date: getValues('joined_date') ?? '',
          birth_date: getValues('birth_date') ?? ''
        };
        // console.log('updateEmployeePayload : ', updateEmployeePayload);

        if (formValue.avatar_url === '') {
          updateEmployeePayload.avatar_url = '';
        }

        await update(updateEmployeePayload).unwrap();
        // console.log('test update',updateEmployeePayload)

        toast.success(`${formValue.name} Updated Successfully!`, {
          theme: 'dark'
        });
        successCallback('lists');
      } catch (error) {
        // console.log(error);
        if (error.data.statusCode < 500) {
          toast.error(error.data.message, {
            theme: 'dark'
          });
        }
        if (error.data.statusCode >= 500) {
          toast.error('Something went wrong', {
            theme: 'dark'
          });
        }
      }
    }
    // if employee exist (edit).
  };

  // console.log({ companyId, currentUser });
  return (
    <div className="px-16 mb-5">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <h3>Basic Information</h3>
        <Grid container display={'flex'} flexDirection={'row'} spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: 150, md: 250 },
                height: { xs: 150, md: 250 }
              }}>
              {avatarImage && (
                <button
                  className="absolute bg:white text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-8 h-8 rounded-full px-1.5 right-[10%] top-[10%] z-[10]"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue('avatar_url', '');
                    setAvatarImageFile({
                      base64String: '',
                      fullName: '',
                      fileExtension: '',
                      size: undefined
                    });
                  }}>
                  <MdOutlineClose />
                </button>
              )}
              <img
                alt="Profile Image"
                className="p-1 rounded-full bg-white absolute w-full h-full object-cover"
                src={(avatarImage as string) || 'https://via.placeholder.com/300?text=image'}
              />
              {/* <div
                aria-label="profile-picture"
                className="w-1/5 pb-[calc(40%)] relative min-w-[6rem] min-h-[6rem] mx-auto border border-red-700">
               
              </div> */}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={isCompressing}
              fullWidth
              onClick={() => pickAvatarImage()}
              startIcon={<FileUploadIcon />}
              variant="outlined">
              {isCompressing ? <>Compressing... {progress}</> : <> Upload Avatar</>}
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Name</Typography>
            <TextField
              error={!!errors.name}
              fullWidth
              placeholder="John Doe"
              size="small"
              {...register('name')}
              autoComplete="none"
              helperText={errors?.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>E-mail</Typography>
            <TextField
              error={!!errors.email}
              fullWidth
              placeholder="John Doe"
              type="email"
              size="small"
              {...register('email')}
              autoComplete="none"
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Password</Typography>
            <TextField
              error={!!errors.password}
              fullWidth
              placeholder={employee ? 'Type password to change the password' : 'Password ...'}
              type={showPassword ? 'text' : 'password'}
              size="small"
              {...register('password')}
              autoComplete="none"
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Phone</Typography>
            <Controller
              name={'phone'}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.phone}
                  fullWidth
                  placeholder="Phone"
                  type="text"
                  size="small"
                  {...register('phone')}
                  autoComplete="none"
                  helperText={errors?.phone?.message}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          mr: 1.5,
                          pr: 1.5,
                          height: 'auto',
                          borderRight: `1px solid #919EAB`,
                          color: '#919EAB',
                          '& > .MuiTypography-root': {
                            color: '#919EAB'
                          }
                        }}>
                        +62
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Role</Typography>
            <Controller
              control={control}
              name="role"
              render={({ field, fieldState }) => (
                <Autocomplete
                  freeSolo
                  inputValue={roleValue}
                  id="autocomplete_role"
                  options={!!BaseSelectableRole ? BaseSelectableRole : []}
                  onChange={(event, newValue: any) => {
                    if (newValue && newValue.value) {
                      // console.log('newValue.value', newValue.value);
                      field.onChange(newValue.value);
                    } else {
                      field.onChange('');
                    }
                  }}
                  onInputChange={(event, newInputValue) => {
                    if (newInputValue) {
                      setRoleValue(newInputValue);
                    } else {
                      setRoleValue('');
                    }
                  }}
                  getOptionLabel={(option: SelectableRole) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Role"
                      error={Boolean(fieldState.invalid && fieldState.error)}
                      helperText={fieldState?.error?.message}
                    />
                  )}
                  fullWidth
                  ListboxProps={{
                    style: { maxHeight: 150, overflow: 'auto' }
                  }}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              ID Type
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'id_type',
                id: 'uncontrolled-native'
              }}
              size="small"
              sx={{ width: '100%' }}>
              <option value={IdTypeEnum.KTP}>{IdTypeEnum.KTP}</option>
            </NativeSelect>
          </Grid> */}

          <Grid item xs={12} md={6}>
            <Typography>ID Number</Typography>
            <TextField
              error={!!errors.id_number}
              fullWidth
              placeholder="ID Number"
              size="small"
              {...register('id_number')}
              autoComplete="none"
              helperText={errors?.id_number?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Citizen</Typography>
            <TextField
              error={!!errors.citizen}
              fullWidth
              placeholder="Citizen"
              size="small"
              {...register('citizen')}
              autoComplete="none"
              helperText={errors?.citizen?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Birth Date</Typography>
            <MobileDatePicker
              inputFormat="d MMMM yyyy"
              onChange={(val: DateTime | null) => {
                setValue('birth_date', val ? val.toJSDate() : null, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}
              reduceAnimations
              renderInput={(params: any) => {
                const { onClick, ...textFieldProps } = params;
                return (
                  <TextField
                    {...textFieldProps}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          className={`${!watch('birth_date') && 'hidden'}`}
                          position="end">
                          <IconButton
                            aria-label="clear start date"
                            edge="end"
                            hidden={true}
                            onClick={(e) => {
                              e.preventDefault();
                              setValue('birth_date', null, {
                                shouldValidate: true,
                                shouldDirty: true
                              });
                            }}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={!!errors?.birth_date}
                    fullWidth
                    size="small"
                    placeholder="Birth Date"
                    helperText={errors?.birth_date?.message}
                  />
                );
              }}
              value={birthDate}
              views={['year', 'month', 'day']} // makes the window open slow idk why
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Joined Date</Typography>
            <MobileDatePicker
              inputFormat="d MMMM yyyy"
              onChange={(val: DateTime | null) => {
                setValue('joined_date', val ? val.toJSDate() : null, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}
              reduceAnimations
              renderInput={(params: any) => {
                const { onClick, ...textFieldProps } = params;
                return (
                  <TextField
                    {...textFieldProps}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          className={`${!watch('joined_date') && 'hidden'}`}
                          position="end">
                          <IconButton
                            aria-label="clear start date"
                            edge="end"
                            hidden={true}
                            onClick={(e) => {
                              e.preventDefault();
                              setValue('joined_date', null, {
                                shouldValidate: true,
                                shouldDirty: true
                              });
                            }}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={!!errors?.joined_date}
                    fullWidth
                    size="small"
                    placeholder="Joined Date"
                    helperText={errors?.joined_date?.message}
                  />
                );
              }}
              value={joinedDate}
              views={['year', 'month', 'day']} // makes the window open slow idk why
            />
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Typography>Resigned Date</Typography>
            <MobileDatePicker
              inputFormat="d MMMM yyyy"
              onChange={(val: DateTime | null) => {
                setValue('resigned_date', val ? val.toJSDate() : null, {
                  shouldValidate: true,
                  shouldDirty: true
                });
              }}
              reduceAnimations
              renderInput={(params: any) => {
                const { onClick, ...textFieldProps } = params;
                return (
                  <TextField
                    {...textFieldProps}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          className={`${!watch('resigned_date') && 'hidden'}`}
                          position="end">
                          <IconButton
                            aria-label="clear start date"
                            edge="end"
                            hidden={true}
                            onClick={(e) => {
                              e.preventDefault();
                              setValue('resigned_date', null, {
                                shouldValidate: true,
                                shouldDirty: true
                              });
                            }}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={!!errors?.resigned_date}
                    fullWidth
                    size="small"
                    placeholder="Resign Date"
                    helperText={errors?.resigned_date?.message}
                  />
                );
              }}
              value={resignedDate}
              views={['year', 'month', 'day']} // makes the window open slow idk why
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Typography>Company Name</Typography>
            <Controller
              control={control}
              name="company_id"
              render={({ field, fieldState }) => (
                <Autocomplete
                  freeSolo
                  inputValue={companyName}
                  disabled={disableCompanyNameId}
                  id="autocomplete_company_id"
                  options={!!companyNameId ? companyNameId : []}
                  onChange={(event, newValue: any) => {
                    field.onChange(newValue._id);
                  }}
                  onInputChange={(event, newInputValue) => {
                    // field.onChange(newInputValue);
                    setCompanyName(newInputValue);
                  }}
                  getOptionLabel={(option: CompanyNameAndIdResponse) => option.companyName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Company Name"
                      error={Boolean(fieldState.invalid && fieldState.error)}
                      helperText={fieldState?.error?.message}
                    />
                  )}
                  fullWidth
                  ListboxProps={{
                    style: { maxHeight: 150, overflow: 'auto' }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Bio</Typography>
            <TextField
              error={!!errors.bio}
              fullWidth
              placeholder="Bio"
              size="small"
              {...register('bio')}
              autoComplete="none"
              helperText={errors?.bio?.message}
            />
          </Grid>
        </Grid>

        <h3 className="py-5">Location info</h3>
        <Grid container display={'flex'} flexDirection={'row'} spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6}>
            <Typography>Country</Typography>
            <TextField
              fullWidth
              placeholder="country"
              type="text"
              size="small"
              {...register('country')}
              autoComplete="none"
              error={!!errors.country}
              helperText={errors?.country?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Province</Typography>
            <TextField
              fullWidth
              placeholder="State"
              size="small"
              {...register('state')}
              autoComplete="none"
              error={!!errors.state}
              helperText={errors?.state?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>City</Typography>
            <TextField
              fullWidth
              placeholder="City"
              type="city"
              size="small"
              {...register('city')}
              autoComplete="none"
              error={!!errors.city}
              helperText={errors?.city?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>Postal Code</Typography>
            <TextField
              fullWidth
              placeholder="postal_code"
              type="number"
              size="small"
              {...register('postal_code')}
              autoComplete="none"
              error={!!errors.postal_code}
              helperText={errors?.postal_code?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>Address</Typography>
            <TextField
              autoComplete="none"
              fullWidth
              placeholder="address"
              size="small"
              type="text"
              multiline
              rows="5"
              {...register('address')}
              error={!!errors.address}
              helperText={errors?.address?.message}
            />
          </Grid>
        </Grid>

        <div className="flex lg:justify-end pt-5 pr-5">
          <LoadingButton
            loading={employee ? updating : creating}
            loadingIndicator={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={20} sx={{ color: 'white' }} thickness={4} />
                <Typography sx={{ color: 'white', fontSize: '1em', ml: 1 }}>
                  {'Saving Data...'}
                </Typography>
              </Box>
            }
            type="submit"
            variant="contained"
            // onClick={(e) => {
            //   e.preventDefault();
            //   onSubmit(getValues());
            // }}
            className={
              'm-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm'
            }
            sx={{ backgroundColor: 'green !important' }}
            disabled={employee ? updating : creating}>
            Save
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default TenantEmployeeForm;
