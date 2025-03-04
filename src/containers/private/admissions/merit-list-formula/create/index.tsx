import { FC, useEffect, useState } from "react";
import {
  SuperAdminManagementCreateSection,
  SuperAdminManagementCreateMain,
  SuperAdminManagementCreateTop,
} from "./style";
import { useForm, Controller } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import useAdmissions from "../../useHooks";
import {
  AddMeritFormulaDTO,
  DynamicField,
} from "utils/helpers/models/admissions/add-merit-formula.dto";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";

const CreateMeritListFormula: FC = () => {
  const [formData, setFormData] = useState<AddMeritFormulaDTO>({
    ...new AddMeritFormulaDTO(),
    extra_fields: [new DynamicField()],
  });

  const { createMeritFormula } = useAdmissions();
  const { getResultTypesAdmin, getCertificateLevelsAdmin } = useOrganization();

  const [resultType, setResultType] = useState<any[]>([]);
  const [certificateLevel, setCertificateLevel] = useState<any[]>([]);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddMeritFormulaDTO>({
    defaultValues: formData,
  });

  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const handleAddDynamicFields = () => {
    const newFields = [...formData.extra_fields, new DynamicField()];
    setFormData({ ...formData, extra_fields: newFields });
    setValue("extra_fields", newFields);
  };

  const handleDeleteDynamicFields = (fieldIndex: number) => {
    const updatedFields = formData.extra_fields.filter(
      (_, index) => index !== fieldIndex
    );
    setFormData({ ...formData, extra_fields: updatedFields });
    setValue("extra_fields", updatedFields);
  };

  useEffect(() => {
    getResultTypesAdmin(setResultType);
    getCertificateLevelsAdmin(setCertificateLevel);
  }, []);

  const onSubmit = (data: AddMeritFormulaDTO, addMore: boolean = false) => {
    const isValidWeightage = data.extra_fields.every(
      (field) =>
        field.level_weightage >= 0.1 &&
        field.level_weightage <= 1 &&
        field.test_weightage >= 0.1 &&
        field.test_weightage <= 1
    );

    if (!isValidWeightage) {
      warningToaster(
        "Certificate Level Weightage and Test Weightage must be between 0.1 and 1"
      );

      return; // Stop submission if validation fails
    }
    console.log("Submitting Data:", data);

    createMeritFormula(data, addMore, () => reset(new AddMeritFormulaDTO()));
  };
  console.log(formData);

  return (
    <SuperAdminManagementCreateMain>
      <SuperAdminManagementCreateTop>
        <div className="left">
          <span className="page-heading">Add Merit Formula</span>
          <Breadcrumb />
        </div>
      </SuperAdminManagementCreateTop>

      <SuperAdminManagementCreateSection className="p-custom-scrollbar-8">
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          {/* General Fields */}
          <div className="common-fields">
            <div className="input-field">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    onChange={(e) => setValue("title", e.target.value)}
                  />
                </div>
                <FormErrorMessage error={errors.title} />
              </div>
            </div>
            <div className="radio-field">
              <label>Status</label>
              <div className="field-wrap">
                <div className="field">
                  <Controller
                    name="is_active"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <input
                          type="radio"
                          id="no"
                          {...field}
                          checked={field.value === 0}
                          onChange={() => field.onChange(0)}
                          value={0}
                        />
                        <label htmlFor="no">De-active</label>
                        <input
                          type="radio"
                          id="yes"
                          {...field}
                          checked={field.value === 1}
                          onChange={() => field.onChange(1)}
                          value={1}
                        />
                        <label htmlFor="yes">Active</label>
                      </>
                    )}
                  />
                </div>
              </div>
              <FormErrorMessage error={errors.is_active} />
            </div>
          </div>

          {/* Dynamic Fields */}
          {formData.extra_fields.map((field: DynamicField, index: number) => (
            <div className="form-data" key={index}>
              <div className="options-fields">
                <div>
                  <div className="data-fields">
                    <div className="input-field">
                      <label>Certificate Levels</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.level`}
                            control={control}
                            rules={{
                              required: "Certificate Level is required",
                            }}
                            render={({ field }) => (
                              <select
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              >
                                <option value="">
                                  Select Certificate Levels
                                </option>
                                {certificateLevel?.map((item: any) => (
                                  <option key={item?.id} value={item?.id}>
                                    {item?.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>
                      </div>
                      <FormErrorMessage
                        error={errors.extra_fields?.[index]?.level}
                      />
                    </div>

                    <div className="input-field">
                      <label>Result Types</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.type`}
                            control={control}
                            rules={{ required: "Result Type is required" }}
                            render={({ field }) => (
                              <select
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              >
                                <option value="">Select Result Types</option>
                                {resultType?.map((item: any) => (
                                  <option key={item?.id} value={item?.id}>
                                    {item?.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>
                      </div>
                      <FormErrorMessage
                        error={errors.extra_fields?.[index]?.type}
                      />
                    </div>

                    <div className="radio-field">
                      <label>Is Hafiz</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.is_hafiz`}
                            control={control}
                            rules={{ required: "Please select Hafiz status" }}
                            render={({ field }) => (
                              <>
                                <input
                                  type="radio"
                                  id={`is_hafiz_no_${index}`}
                                  {...field}
                                  checked={field.value === 0}
                                  onChange={() => field.onChange(0)}
                                  value={0}
                                />
                                <label htmlFor={`is_hafiz_no_${index}`}>
                                  No
                                </label>
                                <input
                                  type="radio"
                                  id={`is_hafiz_yes_${index}`}
                                  {...field}
                                  checked={field.value === 1}
                                  onChange={() => field.onChange(1)}
                                  value={1}
                                />
                                <label htmlFor={`is_hafiz_yes_${index}`}>
                                  Yes
                                </label>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <FormErrorMessage
                        error={errors.extra_fields?.[index]?.is_hafiz}
                      />
                    </div>

                    <div className="radio-field">
                      <label>Is Test</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.is_test`}
                            control={control}
                            rules={{ required: "Please select Hafiz status" }}
                            render={({ field }) => (
                              <>
                                <input
                                  type="radio"
                                  id={`is_test_no_${index}`}
                                  {...field}
                                  checked={field.value === 0}
                                  onChange={() => field.onChange(0)}
                                  value={0}
                                />
                                <label htmlFor={`is_test_no_${index}`}>
                                  No
                                </label>
                                <input
                                  type="radio"
                                  id={`is_test_yes_${index}`}
                                  {...field}
                                  checked={field.value === 1}
                                  onChange={() => field.onChange(1)}
                                  value={1}
                                />
                                <label htmlFor={`is_test_yes_${index}`}>
                                  Yes
                                </label>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <FormErrorMessage
                        error={errors.extra_fields?.[index]?.is_test}
                      />
                    </div>

                    <div className="input-field">
                      <label>Certificate Level Weightage</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.level_weightage`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-field">
                      <label>Test Weightage</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.test_weightage`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-field">
                      <label>Hafiz Marks</label>
                      <div className="field-wrap">
                        <div className="field">
                          <Controller
                            name={`extra_fields.${index}.marks`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <FormErrorMessage
                        error={errors.extra_fields?.[index]?.marks}
                      />
                    </div>
                  </div>
                  <div className="action-buttons">
                    <div className="buttons">
                      <button
                        className="lg-rounded-btn gray"
                        type="button"
                        onClick={() => handleDeleteDynamicFields(index)}
                      >
                        Remove
                      </button>
                      {index === formData.extra_fields.length - 1 && (
                        <button
                          className="lg-rounded-btn black"
                          type="button"
                          onClick={handleAddDynamicFields}
                        >
                          Add more
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* 
          {/* Action buttons */}
          <div className="action-buttons">
            <div className="buttons">
              <button
                className="lg-rounded-btn gray"
                type="button"
                onClick={() => reset(new AddMeritFormulaDTO())}
              >
                Reset
              </button>
              <button
                className="lg-rounded-btn black"
                type="button"
                onClick={() => handleSubmit((data) => onSubmit(data, true))()}
              >
                Save & Add more
              </button>
              <button
                className="lg-rounded-btn"
                type="button"
                onClick={() => handleSubmit((data) => onSubmit(data))()}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </form>
      </SuperAdminManagementCreateSection>
    </SuperAdminManagementCreateMain>
  );
};

export default CreateMeritListFormula;
