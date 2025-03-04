import { FC, useEffect, useState } from "react";
import {
  CreateDesignationTop,
  CreateDesignationFormSection,
  CreateDesignationMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";
import useCareers from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

interface CreateAdmissionCampaignProps { }

const CreateDesignation: FC<CreateAdmissionCampaignProps> = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<JobDesignationDTO>();
  let [formData, setFormData] = useState<JobDesignationDTO>(new JobDesignationDTO());
  const { createJobDesignation, updateJobDesignation, getJobDesignationById } = useCareers();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = () => {
    if (params?.id) {
      updateJobDesignation(params?.id, formData);
    } else {
      createJobDesignation(formData);
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new JobDesignationDTO();
    for (let key in formData) {
      setValue(key as keyof JobDesignationDTO, formData[key as keyof JobDesignationDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) getJobDesignationById(params?.id, formData, setValue, setFormData);
  }, []);
  return (
    <CreateDesignationMain>
      <CreateDesignationTop>
        <div className="heading">
          <span className="page-heading">{params?.id ? 'Update' : 'Add'} Designation </span>
          <Breadcrumb />
        </div>
      </CreateDesignationTop>

      <CreateDesignationFormSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="input-field">
            <label>BPS</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="BPS" {...register('bps', { required: true })} value={formData.bps} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.bps} />
            </div>
          </div>

          <div className="input-field">
            <label>Description</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Description" {...register('description', { required: true })} value={formData.description} onChange={handleChange} />
              </div>
              <FormErrorMessage error={errors.description} />
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
              Reset
            </button>
            <button className="lg-rounded-btn">
              Submit
            </button>
          </div>
        </div>
      </CreateDesignationFormSection>
    </CreateDesignationMain>
  );
};

export default CreateDesignation;
