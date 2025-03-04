import { FC, useState, useEffect } from "react";
import {
  CreateManageMeritSection,
  CreateManageMeritListMain,
  CreateManageMeritListTop,
  CreateManageMeritDropdownMain,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import useAdmissions from "../../useHooks";
import { AddMeritListAutomationDTO } from "utils/helpers/models/admissions/add-merit-list-automation.dto";
import { warningToaster } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";

const CreateManageMeritList: FC = () => {
  const [formData, setFormData] = useState<AddMeritListAutomationDTO>(
    new AddMeritListAutomationDTO()
  );
  const [quotas, setQuotas] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const {
    getAdmissionQuotas,
    createMeritListAutomation,
    updateMeritListAutomation,
    getMeritListAutomationById,
    getQuotaHeaders,
  } = useAdmissions();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<AddMeritListAutomationDTO>();

  const onSubmit = (data: any, addMore: boolean = false) => {
    if (!formData.quotas.length) {
      warningToaster("Please select atleast one quota");
    } else {
      if (!params?.id) {
        createMeritListAutomation(
          { ...formData, quotas: formData.quotas.join(",") },
          addMore,
          resetForm
        );
      } else {
        updateMeritListAutomation(params?.id, {
          ...formData,
          quotas: formData.quotas.join(","),
        });
      }
    }
  };

  const resetForm = () => {
    for (let key in formData) {
      setValue(key as keyof AddMeritListAutomationDTO, "");
    }

    setFormData({ ...formData });
  };
  const getAllQuotaHeaders = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };

    getQuotaHeaders(setQuotas, queryParams, setPagination);
  };
  useEffect(() => {
    // getAdmissionQuotas(setQuotas);
    getAllQuotaHeaders(pagination.page, search);
    if (params?.id)
      getMeritListAutomationById(params?.id, formData, setValue, setFormData);
  }, []);

  const handleSelectQuotas = (quota: any) => {
    const { id } = quota;

    if (formData.quotas.includes(id)) {
      const index = formData.quotas.indexOf(id);
      formData.quotas.splice(index, 1);
    } else {
      formData.quotas.push(id);
    }

    setFormData({ ...formData });
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger([name]);
  };

  return (
    <CreateManageMeritListMain>
      <CreateManageMeritListTop>
        <div className="left">
          <span className="page-heading">Add Merit List</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateManageMeritListTop>

      <CreateManageMeritSection className="p-custom-scrollbar-8">
        <form>
          <div className="common-fields">
            <div className="input-field ">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.title} />
              </div>
            </div>

            <div className="input-field ">
              <label>Offer Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="date"
                    {...register("offer_date", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.offer_date} />
              </div>
            </div>

            <div className="input-field ">
              <label>Expiry Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="date"
                    {...register("expiry_date", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.expiry_date} />
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="input-field">
              <label>Merit List No.</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("ml", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.ml} />
              </div>
            </div>

            <div className="input-field">
              <label>Minimum App. to lock</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("minimum_apps_to_lock", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.minimum_apps_to_lock} />
              </div>
            </div>

            <div className="input-field">
              <label>Program Title Filter</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    {...register("program_title_filter", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.program_title_filter} />
              </div>
            </div>
          </div>

          <div className="common-fields">
            <div className="input-field slot-input">
              <label>Link Slot ID</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    {...register("link_slots", { required: true })}
                    onChange={handleChange}
                  />
                </div>
                <FormErrorMessage error={errors.link_slots} />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label>Instructions</label>
            <div className="field-wrap">
              <div className="field">
                <textarea
                  {...register("instructions", { required: true })}
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Instructions"
                  className="textarea"
                />
              </div>
              <FormErrorMessage error={errors.instructions} />
            </div>
          </div>

          <div className="form-quotas">
            <label className="key-body-label">Quotas</label>
            <CreateManageMeritDropdownMain>
              <ul className="p-custom-scrollbar-8">
                {quotas.map((item: any, index: number) => (
                  <li key={index} onClick={() => handleSelectQuotas(item)}>
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={formData.quotas.includes(item?.id)}
                      />
                    </div>
                    <div className="item-text">
                      <span className="text">{item.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CreateManageMeritDropdownMain>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button
                className="lg-rounded-btn gray"
                type="button"
                onClick={resetForm}
              >
                Reset
              </button>
              <button
                className="lg-rounded-btn black"
                onClick={handleSubmit((data: AddMeritListAutomationDTO) =>
                  onSubmit(data, true)
                )}
              >
                Save & Add more
              </button>
              <button
                className="lg-rounded-btn"
                onClick={handleSubmit((data: AddMeritListAutomationDTO) =>
                  onSubmit(data)
                )}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </form>
      </CreateManageMeritSection>
    </CreateManageMeritListMain>
  );
};

export default CreateManageMeritList;
