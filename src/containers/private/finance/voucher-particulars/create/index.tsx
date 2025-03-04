import { FC, useEffect, useState } from "react";
import {
  CreateVoucherParticularForm,
  CreateVoucherParticularMain,
  CreateVoucherParticularTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { VoucherParticularDTO } from "utils/helpers/models/finance/voucher-particular.dto";
import { useForm } from "react-hook-form";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateVoucherParticularProps {}

const CreateVoucherParticular: FC<CreateVoucherParticularProps> = ({}) => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<VoucherParticularDTO>();
  let [formData, setFormData] = useState<VoucherParticularDTO>(
    new VoucherParticularDTO()
  );
  const {
    createVoucherParticular,
    updateVoucherParticular,
    getVoucherParticularById,
  } = useFinance();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
    if (params?.id) {
      updateVoucherParticular(params?.id, formData);
    } else {
      createVoucherParticular(formData);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    formData = new VoucherParticularDTO();
    for (let key in formData) {
      setValue(
        key as keyof VoucherParticularDTO,
        formData[key as keyof VoucherParticularDTO]
      );
    }

    setFormData({ ...formData });
  };

  useEffect(() => {
    if (params?.id)
      getVoucherParticularById(params?.id, formData, setValue, setFormData);
  }, []);
  return (
    <CreateVoucherParticularMain>
      <CreateVoucherParticularTop>
        <div className="heading">
          <span className="page-heading">Add Voucher Particular</span>
          <Breadcrumb />
        </div>
      </CreateVoucherParticularTop>
      <CreateVoucherParticularForm
        className="content-radius-shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="application">Voucher Particular Title</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="Enter title"
                  {...register("title", { required: true })}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="fine-slot-title">Amount</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  placeholder="Enter amount"
                  {...register("amount", { required: true })}
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.amount} />
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="buttons">
            <button
              className="lg-rounded-btn gray"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
            <button className="lg-rounded-btn">Submit</button>
          </div>
        </div>
      </CreateVoucherParticularForm>
    </CreateVoucherParticularMain>
  );
};

export default CreateVoucherParticular;
