import { FC, useEffect, useState } from "react";
import {
  CreateInstallmentSlotsForm,
  CreateInstallmentSlotsMain,
  CreateInstallmentSlotsTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { AccInstallmentSlotDTO } from "utils/helpers/models/finance/acc-installment-slot.dto";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateVoucherTemplateHeaderProps {}

const CreateInstallmentSlots: FC<CreateVoucherTemplateHeaderProps> = ({}) => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { installment_id } = params || {};
  const { handleSubmit, register, setValue, trigger, formState: {errors}} = useForm<AccInstallmentSlotDTO>();
  let [formData, setFormData] = useState<AccInstallmentSlotDTO>({...new AccInstallmentSlotDTO(), installment_id});
  const { createAccInstallmentSlot, updateAccInstallmentSlot, getAccInstallmentSlotById } = useFinance();

  const onSubmit = () => {
      if(params?.id){
          updateAccInstallmentSlot(params?.id, formData);
      }else{
          createAccInstallmentSlot(formData);
      }
  }

  const handleChange = (event: any) => {
      const { value, name } = event.target;
      setValue(name,value);
      trigger(name);
      setFormData({...formData, [name]: value});
  }

  const resetForm = () => {
      formData = new AccInstallmentSlotDTO();
      for(let key in formData){
          setValue(key as keyof AccInstallmentSlotDTO, formData[key as keyof AccInstallmentSlotDTO]);
      }

      setFormData({...formData});
  }

  useEffect(() => {
      if(params?.id) getAccInstallmentSlotById(params?.id, formData, setValue, setFormData);
  }, []);
  return (
    <CreateInstallmentSlotsMain>
      <CreateInstallmentSlotsTop>
        <div className="heading">
          <span className="page-heading">Add Installment Slots</span>
          <Breadcrumb />
        </div>
      </CreateInstallmentSlotsTop>
      <CreateInstallmentSlotsForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="application">Slot No.</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="1" {...register('slot_no', {required: true})} value={formData.slot_no} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.slot_no}/>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="application">Due Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" {...register('due_date', {required: true})} value={formData.due_date} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.due_date}/>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="application">Percentage</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" {...register('percentage', {required: true})} value={formData.percentage} onChange={handleChange}/>
              </div>
              <FormErrorMessage error={errors.percentage}/>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
              Cancel
            </button>
            <button className="lg-rounded-btn">Submit</button>
          </div>
        </div>
      </CreateInstallmentSlotsForm>
    </CreateInstallmentSlotsMain>
  );
};

export default CreateInstallmentSlots;
