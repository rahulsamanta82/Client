import { FC, useEffect, useState } from "react";
import {
  CreateCertificateLevelsSection,
  CreateCertificateLevelsMain,
  CreateCertificateLevelsTop,
} from "./style";

import Breadcrumb from "components/particles/breadcrumb";
import { AddCertificateLevelDTO } from "utils/helpers/models/organization/add-certificate-levels.dto";
import { useForm } from "react-hook-form";
import useUtils from "hooks/useUtils";
import useOrganization from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { useNavigate } from "react-router-dom";

const CreateCertificateLevels: FC = () => {
  const [formData, setFormData] = useState<AddCertificateLevelDTO>(
    new AddCertificateLevelDTO()
  );

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<AddCertificateLevelDTO>();

  const { createCertificateLevels, getCertificateLevelsSuper } =
    useOrganization();

  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const navigate = useNavigate();

  const onSubmit = (formData: AddCertificateLevelDTO) => {
    if (!params?.id) {
      createCertificateLevels(formData);
      navigate(-1);
    }
    // else {
    //   createCertificateLevels(params?.id, formData);
    // }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger([name]);
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    for (const key in formData) {
      setValue(key as keyof AddCertificateLevelDTO, "");
    }

    setFormData({ ...new AddCertificateLevelDTO() });
  };
  const [certificateLevel, setCertificateLevel] = useState<any[]>([]);
  console.log(formData);

  useEffect(() => {
    getCertificateLevelsSuper(setCertificateLevel);
  }, []);

  return (
    <CreateCertificateLevelsMain>
      <CreateCertificateLevelsTop>
        <div className="left">
          <span className="page-heading">Add Certificate Levels</span>
          <Breadcrumb />
        </div>
      </CreateCertificateLevelsTop>

      <CreateCertificateLevelsSection className="p-custom-scrollbar-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="common-fields">
            <div className="input-field">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
            <div className="input-field">
              <label>Parent </label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    id=""
                    {...register("parent_id")}
                    value={formData.parent_id}
                    onChange={handleChange}
                  >
                    <option value="">Select Parent</option>
                    {certificateLevel.map((item: any) => {
                      return <option value={item.id}>{item.title}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Display Order</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("display_order", { required: true })}
                    value={formData.display_order}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.display_order} />
            </div>
          </div>
          <div className="common-fields">
            <div className="input-field">
              <label>Level</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("level")}
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="">Select Level</option>
                    <option value="inter">Inter</option>
                    <option value="cambridge">Cambridge</option>
                    <option value="graduate">Graduate</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
              </div>
              <FormErrorMessage error={errors.level} />
            </div>
            <div className="input-field">
              <label>Slug</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("slug")}
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Short Code</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("short_code")}
                    value={formData.short_code}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="radio-field">
              <label>Program Offer</label>
              <div className="field-wrap">
                <div className="field">
                  <label htmlFor="yes">Yes</label>
                  <input
                    type="radio"
                    id="yes"
                    {...register("offer_program", { required: true })}
                    onChange={handleChange}
                    value={1}
                    checked={formData.offer_program == 1}
                  />
                </div>
                <div className="field">
                  <label htmlFor="no">No</label>
                  <input
                    type="radio"
                    id="no"
                    value={0}
                    {...register("offer_program", { required: true })}
                    onChange={handleChange}
                    checked={formData.offer_program == 0}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.offer_program} />
            </div>
            <div className="radio-field">
              <label>Qualification List</label>
              <div className="field-wrap">
                <div className="field">
                  <label htmlFor="is-active-yes">Yes</label>
                  <input
                    type="radio"
                    id="is-active-yes"
                    value={1}
                    {...register("qualification_list", { required: true })}
                    onChange={handleChange}
                    checked={formData.qualification_list == 1}
                  />
                </div>
                <div className="field">
                  <label htmlFor="is-active-no">No</label>
                  <input
                    type="radio"
                    id="is-active-no"
                    value={0}
                    {...register("qualification_list", { required: true })}
                    onChange={handleChange}
                    checked={formData.qualification_list == 0}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.qualification_list} />
            </div>
            <div className="input-field">
              <label>Terminal ID</label>
              <div className="field-wrap">
                <div className="field">
                  <select
                    {...register("terminal_cat_id", { required: true })}
                    value={formData.terminal_cat_id}
                    onChange={handleChange}
                  >
                    <option>Select Terminal ID</option>
                    {certificateLevel.map((item: any) => {
                      return <option value={item?.id}>{item.title}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="common-fields">
            <div className="radio-field">
              <label>Status</label>
              <div className="field-wrap">
                <div className="field">
                  <label htmlFor="is-active-yes">Active</label>
                  <input
                    type="radio"
                    id="is-active-yes"
                    {...register("is_active", { required: true })}
                    onChange={handleChange}
                    value={1}
                    checked={formData.is_active == 1}
                  />
                </div>
                <div className="field">
                  <label htmlFor="is-active-no">Inactive</label>
                  <input
                    type="radio"
                    id="is-active-no"
                    {...register("is_active", { required: true })}
                    onChange={handleChange}
                    value={0}
                    checked={formData.is_active == 0}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.is_active} />
            </div>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button">
                Reset
              </button>

              <button className="lg-rounded-btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </CreateCertificateLevelsSection>
    </CreateCertificateLevelsMain>
  );
};

export default CreateCertificateLevels;
