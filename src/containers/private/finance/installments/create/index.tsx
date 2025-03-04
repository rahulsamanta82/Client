import { FC, useEffect, useState } from "react";
import {
  CreateInstallmentsForm,
  CreateInstallmentsMain,
  CreateInstallmentsTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import { AccInstallmentDTO } from "utils/helpers/models/finance/acc-installment.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateVoucherTemplateHeaderProps { }

const CreateInstallments: FC<CreateVoucherTemplateHeaderProps> = ({ }) => {
  const breadcrumbLinks = [
    { title: "Finance /", path: "" },

    {
      title: "Voucher Templates Header /",
      path: siteRoutes.voucherTemplateHeaderListing,
    },
    {
      title: "Installments /",
      path: siteRoutes.financeInstallmentListing,
    },
    {
      title: "Add Installment",
      path: siteRoutes.createFinanceInstallment,
    }
  ]
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const { template_header_id } = params || {};
  let [formData, setFormData] = useState<AccInstallmentDTO>({ ...new AccInstallmentDTO(), template_header_id });
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AccInstallmentDTO>({ defaultValues: formData });
  const { createAccInstallment, updateAccInstallment, getAccInstallmentById } = useFinance();

  const onSubmit = () => {
    if (params?.id) {
      updateAccInstallment(params?.id, formData);
    } else {
      createAccInstallment(formData);
    }
  }

  const handleChange = (event: any) => {
    let { value, name } = event.target;
    if (name === 'show_percentage') value = parseInt(value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new AccInstallmentDTO();
    for (let key in formData) {
      setValue(key as keyof AccInstallmentDTO, formData[key as keyof AccInstallmentDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) getAccInstallmentById(params?.id, formData, setValue, setFormData);
  }, []);

  return (
    <CreateInstallmentsMain>
      <CreateInstallmentsTop>
        <div className="heading">
          <span className="page-heading">Add Installment</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateInstallmentsTop>
      <CreateInstallmentsForm className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="application">Installment Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Show Percentage</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="no" {...register('show_percentage', { required: true })} value={0} checked={formData.show_percentage == 0} onChange={handleChange} />
                <label htmlFor="no">No</label>
              </div>
              <div className="field">
                <input type="radio" id="yes" {...register('show_percentage', { required: true })} value={1} checked={formData.show_percentage == 1} onChange={handleChange} />
                <label htmlFor="yes">Yes </label>
              </div>
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
      </CreateInstallmentsForm>
    </CreateInstallmentsMain>
  );
};

export default CreateInstallments;
