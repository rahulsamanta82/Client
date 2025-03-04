import { FC, useEffect, useState } from "react";
import {
  EditAdmissionDocumentForm,
  EditAdmissionDocumentMain,
  EditAdmissionDocumentTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { useForm } from "react-hook-form";
import { AddAdmissionEntryTestDTO } from "utils/helpers/models/admissions/add-admission-entry-test.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useAdmissions from "../../../admissions/useHooks";

import useUtils from "hooks/useUtils";

interface EditAdmissionDocumentProps {}

const CreateTestTypes: FC<EditAdmissionDocumentProps> = () => {
  const [formData, setFormData] = useState<AddAdmissionEntryTestDTO>(
    new AddAdmissionEntryTestDTO()
  );
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAdmissionEntryTestDTO>();

  const {
    createAdmissionEntryTest,
    updateAdmissionEntryTest,
    getAdmissionEntryTestById,
  } = useAdmissions();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValue(name, value);
    trigger([name]);
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (data: AddAdmissionEntryTestDTO) => {
    if (params?.id) {
      updateAdmissionEntryTest(params?.id, formData);
    } else {
      createAdmissionEntryTest(formData);
    }
  };

  const resetForm = () => {
    for (const key in formData) {
      setValue(key as keyof AddAdmissionEntryTestDTO, "");
    }

    setFormData(new AddAdmissionEntryTestDTO());
  };

  useEffect(() => {
    if (params?.id)
      getAdmissionEntryTestById(params?.id, formData, setValue, setFormData);
  }, []);

  return (
    <EditAdmissionDocumentMain>
      <EditAdmissionDocumentTop>
        <div className="heading">
          <span className="page-heading">
            {params?.id ? "Update" : "Add"} Test Type
          </span>
          <Breadcrumb />
        </div>
      </EditAdmissionDocumentTop>

      <EditAdmissionDocumentForm
        className="content-radius-shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Test Type Name</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  // placeholder="IUB-Admission Test(for MS/Mphil)"
                  {...register("title", { required: true })}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.title} />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Account Code</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  // placeholder="A02"
                  {...register("short_code", { required: true })}
                  value={formData.short_code}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.short_code} />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Test Fee</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  // placeholder="2000"
                  {...register("fee", { required: true })}
                  value={formData.fee}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.fee} />
            </div>
          </div>
          <div className="input-field">
            <label>Test Total Marks</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  // placeholder="100"
                  {...register("total_marks", { required: true })}
                  value={formData.total_marks}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.total_marks} />
            </div>
          </div>
          <div className="input-field">
            <label>Test Passing Marks</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  // placeholder="50"
                  {...register("obt_marks", {
                    required: true,
                    validate: {
                      validate: (value) =>
                        parseInt(value as any) <=
                          parseInt(formData.total_marks as any) ||
                        "Passing marks must not be more than total marks",
                    },
                  })}
                  value={formData.obt_marks}
                  onChange={handleChange}
                />
              </div>
              <FormErrorMessage error={errors.obt_marks} />
            </div>
          </div>

          <div className="radio-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Active</label>
                <input
                  type="radio"
                  id="is-active-yes"
                  value={1}
                  {...register("is_active", { required: true })}
                  checked={formData.is_active == 1}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">Deactivate</label>
                <input
                  type="radio"
                  id="is-active-no"
                  value={0}
                  {...register("is_active", { required: true })}
                  checked={formData.is_active == 0}
                  onChange={handleChange}
                />
              </div>
            </div>
            <FormErrorMessage error={errors.is_active} />
          </div>
        </div>

        <div className="submit-buttons">
          <div className="buttons">
            <button
              className="lg-rounded-btn gray"
              type="button"
              onClick={resetForm}
            >
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              {params?.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </EditAdmissionDocumentForm>
    </EditAdmissionDocumentMain>
  );
};

export default CreateTestTypes;
