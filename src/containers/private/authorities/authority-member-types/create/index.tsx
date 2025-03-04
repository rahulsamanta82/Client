import { FC, useState, useEffect, ChangeEvent } from "react";

import {
  CreateNotificationsTop,
  CreateNotificationsFormSection,
  CreateNotificationsMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import useAuthorities from "../../useHooks";
import { AuthorityTypesDTO } from "utils/helpers/models/authorities/authorities-types.dto";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";

const CreateMembersTypes: FC = () => {
  let [formData, setFormData] = useState<AuthorityTypesDTO>(new AuthorityTypesDTO());
  const { scrollToTop, getLocalFilePath, getQueryParams } = useUtils();
  const { createCommitteeType, updateCommitteeType, getCommitteeTypeById } = useAuthorities();
  const params = getQueryParams();
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<AuthorityTypesDTO>();

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
        type: data.type || 'member_type'
      };
      
      updateCommitteeType(params?.id, jsonData).then(response => {
        console.log('Update successful:', response);
      }).catch(error => {
        console.error('Update error:', error);
      });
    } else {
      const form_data = new FormData();
      
      // Append all keys to FormData for POST
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
          <span className="page-heading">
            Add Authority & Committee Member Types
          </span>
          <Breadcrumb />
        </div>
      </CreateNotificationsTop>

      <CreateNotificationsFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Member Type" {...register('title', { required: true })} value={formData.title} onChange={handleChange} />
                <input type="hidden" {...register('type')} value="member_type" name="type"  />
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
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

export default CreateMembersTypes;
