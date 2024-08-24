import { yupResolver } from '@hookform/resolvers/yup';

import { Clear as ClearIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { Accept } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DateTime } from 'ts-luxon';
import * as Yup from 'yup';
import { FormDropzone } from '../../../../components/inputs/FormDropzone';
import { FormInput } from '../../../../components/inputs/FormInput';
import { FormTextarea } from '../../../../components/inputs/FormTextarea';
import { useCompanyRequestApproveMutation } from '../../../../modules/company/company-request/api/company-request.api';
import { ApproveCompanyRequestDto } from '../../../../modules/company/company-request/dtos/requests/approve-company.request';
import { CompanyRequest } from '../../../../modules/company/company-request/entities/company-request.entity';
import { UploadFileBase64Dto } from '../../../../utils/upload-file-base64.dto';

interface Props {
  companyRequest: CompanyRequest;
  successCallback: (purpose: 'approve' | 'reject' | 'detail') => void;
}

export type ApproveCompanyRequest = Omit<ApproveCompanyRequestDto, ''>;

const ConfirmCompanyRequest: React.FC<Props> = (props: Props) => {
  const [approve, { isLoading }] = useCompanyRequestApproveMutation();
  console.log('props.companyRequest', props.companyRequest);
  /* Initial State for Formik form */
  const initialState: ApproveCompanyRequestDto = {
    company_request_id: '',
    approved_pic_name: props.companyRequest.approved_pic_name,
    approved_company_name: props.companyRequest.requested_company_name,
    approved_company_email: props.companyRequest.requested_company_email,
    approved_company_phone: props.companyRequest.requested_company_phone,
    approved_company_address: props.companyRequest.requested_company_address,
    approved_total_employee: props.companyRequest.requested_total_employee,
    deal_price: undefined,
    payment_file: '',
    expired_date: null
  };

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    approved_pic_name: Yup.string().required('Field is Required!'),
    approved_company_name: Yup.string().required('Field is Required!'),
    approved_company_email: Yup.string().required('Field is Required!').email(),
    approved_company_phone: Yup.string().required('Field is Required!'),
    deal_price: Yup.number().required('Field is Required!'),
    approved_total_employee: Yup.number().required('Field is Required!'),
    approved_company_address: Yup.string().required('Field is Required!'),
    expired_date: Yup.date().nullable().required('Field is Required!')
  });

  const RHF = useForm<ApproveCompanyRequestDto>({
    defaultValues: initialState,
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = RHF;

  // file to base64 converter
  const getBase64 = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const acceptedFiles: Accept = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg', '.jpg']
  };

  const [base64Image, setBase64Image] = React.useState<string | ArrayBuffer | null>(null);

  const onSubmit = async (formValue: ApproveCompanyRequest) => {
    const { payment_file } = formValue;

    if (payment_file instanceof File && !!base64Image && typeof base64Image === 'string') {
      try {
        const paymentFilePayload: UploadFileBase64Dto = {
          base64String: base64Image,
          fileExtension: payment_file.type,
          fullName: payment_file.name,
          size: payment_file.size
        };

        await approve({
          ...formValue,
          company_request_id: props.companyRequest._id,
          payment_file: paymentFilePayload
        });
        toast.success(`${formValue.approved_company_name} Approved Successfully!`, {
          theme: 'dark'
        });
        props.successCallback('detail');
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
    } else {
      toast.error('Please input the payment File!', {
        theme: 'dark'
      });
    }
  };
  const expiredDate = watch('expired_date');
  return (
    <div className="px-8">
      <h2 className="text-xl font-bold text-gray-800">
        Approve {props.companyRequest.requested_company_name} ?
      </h2>

      <FormProvider {...RHF}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2 space-y-5">
          <div className="text-gray-600">
            {/* image */}
            <div className="pb-2 pt-5">
              <label className="block text-sm font-medium mb-1" htmlFor="payment_file">
                Payment File <span className="text-red-500">*</span>
              </label>
              {base64Image && (
                <div className="flex justify-center pb-5">
                  <div
                    className="relative"
                    onClick={() => {
                      setBase64Image(null);
                      setValue('payment_file', null);
                    }}>
                    <img
                      width={300}
                      src={base64Image as string}
                      alt="product"
                      className="object-cover"
                    />
                    <div className="absolute z-10 -right-2 -top-2 flex justify-center items-center w-8 h-8 rounded-full bg-white text-red-500 border border-red-500">
                      x
                    </div>
                  </div>
                </div>
              )}

              {!base64Image && (
                <FormDropzone<ApproveCompanyRequest>
                  name="payment_file"
                  id="payment_file"
                  register={register}
                  control={control}
                  onDrop={async (files) => {
                    const file = files[0];
                    setValue('payment_file', file);
                    const getImage = await getBase64(file);
                    setBase64Image(getImage);
                    return file;
                  }}
                  label="Payment file"
                  placeholder="Payment File"
                  maxFiles={1}
                  maxSize={1024 * 1024 * 3}
                  accept={acceptedFiles}
                  errors={errors}
                />
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2">
                {/* Pic name */}
                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="approved_pic_name"
                    id={'approved_pic_name'}
                    label={'PIC Name'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                  />
                </div>

                {/* company name */}
                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="approved_company_name"
                    id={'approved_company_name'}
                    label={'Company Name'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                  />
                </div>

                {/* Company Email */}
                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="approved_company_email"
                    id={'approved_company_email'}
                    label={'Company Email'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                  />
                </div>

                {/* Company Phone */}
                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="approved_company_phone"
                    id={'approved_company_phone'}
                    label={'Company Phone'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                  />
                </div>

                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="deal_price"
                    id={'deal_price'}
                    label={'Deal Price'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                    type="number"
                  />
                </div>

                <div className="grid col-span-12 md:col-span-6">
                  <FormInput<ApproveCompanyRequest>
                    name="approved_total_employee"
                    id={'approved_total_employee'}
                    label={'Total Employee'}
                    register={register}
                    placeholder={'Please input product name'}
                    errors={errors}
                    type="number"
                  />
                </div>

                <div className="grid col-span-12 md:col-span-7 pt-3">
                  <MobileDatePicker
                    inputFormat="d MMMM yyyy"
                    label="Experied Date *"
                    onChange={(val: DateTime | null) => {
                      setValue('expired_date', val ? val.toJSDate() : null, {
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
                                className={`${!watch('expired_date') && 'hidden'}`}
                                position="end">
                                <IconButton
                                  aria-label="clear start date"
                                  edge="end"
                                  hidden={true}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setValue('expired_date', null, {
                                      shouldValidate: true,
                                      shouldDirty: true
                                    });
                                  }}>
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          error={!!errors?.expired_date}
                          fullWidth
                          helperText={errors?.expired_date?.message}
                        />
                      );
                    }}
                    value={expiredDate}
                    views={['year', 'month', 'day']} // makes the window open slow idk why
                  />
                </div>
              </div>

              {/* Company Address */}
              <div className="grid col-span-12 md:col-span-6">
                <FormTextarea<ApproveCompanyRequest>
                  name="approved_company_address"
                  id={'approved_company_address'}
                  label={'Company Address'}
                  register={register}
                  placeholder={'Please input product name'}
                  errors={errors}
                  rows={5}
                />
              </div>
            </div>
          </div>

          <div className="flex lg:justify-end pt-3">
            <div>
              <LoadingButton
                loading={isLoading}
                loadingIndicator={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ color: 'white' }} thickness={4} />
                    <Typography sx={{ color: 'white', fontSize: '1em', ml: 1 }}>
                      Approving...
                    </Typography>
                  </Box>
                }
                className={
                  'm-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm'
                }
                sx={{
                  backgroundColor: 'green !important',
                  '&:hover': {
                    backgroundColor: 'green !important'
                  }
                }}
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}>
                {errors ? 'Approve' : 'Please fill all required field'}
              </LoadingButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ConfirmCompanyRequest;
