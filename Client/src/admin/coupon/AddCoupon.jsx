import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import formProductSchema from '../../utils/validations/formProduct';
import { ErrorMessage, InputDate, InputText } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import couponServices from '../../services/couponService';
import { useState } from 'react';
import generateCode from '../../utils/helpers/generateCode';

const couponBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Add Coupon'
  }
];

const FormAddCoupon = () => {
  const [couponCode, setCouponCode] = useState('');
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.coupon) });

  const handleCreate = async (data) => {
    if (!data) {
      return;
    }

    await couponServices.createCoupon(data);
    reset();
    setCouponCode('');
  };

  const handleGenerateCodeCoupon = () => {
    const code = generateCode(10, { numeric: true, alphabetic: true, uppercase: true });
    setCouponCode(code);
    setValue('code', code);
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col flex-1 text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon code
              </label>
              <div className='flex items-center gap-4'>
                <InputText
                  defaultValue={couponCode}
                  addClassNames='flex-1'
                  size='m'
                  rounded='s'
                  placeholder='Coupon code here'
                  refinput={register('code')}
                />
              
                <Button
                  type='button'
                  size='m'
                  rounded='s'
                  addClassNames=' bg-gray-800  text-white hover:bg-gray-700'
                  onClick={() => handleGenerateCodeCoupon()}
                >
                  Generate code
                </Button>
              </div>
              {errors.code && <ErrorMessage messsage={errors.code.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon start date
              </label>
<InputDate size='m' rounded='s' refinput={register('start_date', {
                setValueAs: (value) => (value ? new Date(value) : null),
              })} />
              {errors.start_date && <ErrorMessage messsage={errors.start_date.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon end date
              </label>
              <InputDate size='m' rounded='s' refinput={register('end_date', {
                setValueAs: (value) => (value ? new Date(value) : null),
              })} />
              {errors.end_date && <ErrorMessage messsage={errors.end_date.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon discount value
              </label>
              <input
                type="number" 
                placeholder="Enter coupon discount value here"
                {...register('discount_value', {
                  setValueAs: (value) => (value ? parseFloat(value) : null), 
                })}
                className="font-normal w-full text-sm text-gray-800 border border-slate-300 border-solid focus:outline-1 focus:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-slate-300 px-[12px] py-[6px] rounded"
              />
              {errors.discount_value && <ErrorMessage messsage={errors.discount_value.message}></ErrorMessage>}
            </div>
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Create
      </Button>
    </form>
  );
};

const AddCoupon = () => {
  return (
    <div>
      <SectionWrapper title='Add Coupon' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={couponBreadCrumbs} />
        <FormAddCoupon />
      </SectionWrapper>
    </div>
  );
};

export default AddCoupon;
