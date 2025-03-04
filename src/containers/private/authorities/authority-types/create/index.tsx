import { FC, useState, useEffect, ChangeEvent } from "react";
import {
  CreateNotificationsTop,
  CreateNotificationsFormSection,
  CreateNotificationsMain,
} from "./style";
import { AuthorityTypesDTO } from "utils/helpers/models/authorities/authorities-types.dto";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useAuthorities from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

const CreateTypes: FC = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AuthorityTypesDTO>();
  let [formData, setFormData] = useState<AuthorityTypesDTO>(new AuthorityTypesDTO());
  const { scrollToTop, getLocalFilePath, getQueryParams } = useUtils();
  const params = getQueryParams();
  const { createCommitteeType, updateCommitteeType, getCommitteeTypeById } = useAuthorities();


  const handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log(name, value);
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (params?.id) {
      getCommitteeTypeById(params?.id, formData, setFormData, setValue);
    }
  }, []);

  const resetForm = () => {
    formData = new AuthorityTypesDTO();
    for (let key in formData) {
      setValue(key as keyof AuthorityTypesDTO, formData[key as keyof AuthorityTypesDTO]);
    }
    setFormData({ ...formData });
  };

  const onSubmit = (data: any) => {
    if (params?.id) {
      const jsonData = {
        title: data.title,
        is_active: data.is_active,
        type: data.type || 'auth_com_type'
      };
      
      updateCommitteeType(params?.id, jsonData).then(response => {
        console.log('Update successful:', response);
      }).catch(error => {
        console.error('Update error:', error);
      });
    } else {
      const form_data = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          form_data.append(key, data[key]);
        }
      });
  
      createCommitteeType(form_data, false, resetForm).then(response => {
        console.log('Create successful:', response);
      }).catch(error => {
        console.error('Create error:', error);
      });
    }
  };
  return (
    <CreateNotificationsMain>
      <CreateNotificationsTop>
        <div className="heading">
          <span className="page-heading">Add Authority & Committee Types</span>
          <Breadcrumb />
        </div>
      </CreateNotificationsTop>

      <CreateNotificationsFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Comittee and  Authority Type Name" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                <input type="hidden" {...register('type')} value="auth_com_type" name="type"  />
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="radio-field">
            <label>Status</label>
            <div className="field-wrap">
            <div className="field">
                  <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="field">
                  <input type="radio" id="active" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                  <label htmlFor="no">No</label>
                </div>
                <FormErrorMessage error={errors.is_active} />
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </button>
          </div>
        </div>
      </CreateNotificationsFormSection>
    </CreateNotificationsMain>
  );
};

export default CreateTypes;
