import { FC, useState, useEffect } from "react";
import {
  CreateQuotaListSection,
  CreateQuotaListMain,
  QuotaListTop,
  QuotaListDropdownMain,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { AddQuotaHeaderDTO } from "utils/helpers/models/admissions/add-quota-header.dto";
import useAdmissions from "../../useHooks";
import useUtils from "hooks/useUtils";

const CreateQuotaList: FC = () => {
  const [formData, setFormData] = useState<AddQuotaHeaderDTO>(
    new AddQuotaHeaderDTO()
  );
  const [templateHeaders, setTemplateHeaders] = useState<any[]>([]);
  const [quotas, setQuotas] = useState<any[]>([]);
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<AddQuotaHeaderDTO>();
  const {
    getTemplateHeaders,
    createQuotaHeader,
    updateQuotaHeader,
    getQuotaHeaderById,
    getAdmissionQuotas,
    getQuotaHeaders,
  } = useAdmissions();

  const onSubmit = (data: AddQuotaHeaderDTO, addMore: boolean = false) => {
    const body = {
      ...data,
      not_reconsider_from_quotas: formData.not_reconsider_from_quotas.join(","),
      reconsider_from_quotas: formData.reconsider_from_quotas.join(","),
    };
    if (params?.id) {
      updateQuotaHeader(params?.id, body);
    } else {
      createQuotaHeader(body, addMore, resetForm);
    }
  };

  const handleMultiselectFields = (item: any, fieldName?: string) => {
    const { id } = item;
    if (fieldName === "not_reconsider_from_quotas") {
      const selected = formData.not_reconsider_from_quotas.includes(id);
      if (selected) {
        const index = formData.not_reconsider_from_quotas.findIndex(
          (i) => i === id
        );
        formData.not_reconsider_from_quotas.splice(index, 1);
      } else {
        formData.not_reconsider_from_quotas.push(id);
      }
    } else {
      const selected = formData.reconsider_from_quotas.includes(id);
      if (selected) {
        const index = formData.reconsider_from_quotas.findIndex(
          (i) => i === id
        );
        formData.reconsider_from_quotas.splice(index, 1);
      } else {
        formData.reconsider_from_quotas.push(id);
      }
    }
    setFormData({ ...formData });
  };
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  useEffect(() => {
    getTemplateHeaders(setTemplateHeaders);
    getAdmissionQuotas(setQuotas);
    if (params?.id) {
      getQuotaHeaderById(params?.id, formData, setValue, setFormData);
    }
  }, []);

  const resetForm = () => {
    for (let key in formData) {
      setValue(key as keyof AddQuotaHeaderDTO, "");
    }

    setFormData({ ...new AddQuotaHeaderDTO() });
  };
  const getAllQuotaHeaders = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      quota_id: params?.id,
    };

    getQuotaHeaders(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllQuotaHeaders(pagination.page, search);
  }, []);
  console.log(data);

  return (
    <CreateQuotaListMain>
      <QuotaListTop>
        <div className="left">
          <span className="page-heading">Add Program Quota</span>
          <Breadcrumb />
        </div>
      </QuotaListTop>

      <CreateQuotaListSection className="p-custom-scrollbar-8">
        <form>
          <div className="common-fields">
            <div className="input-field">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("title", { required: true })}
                  />
                </div>
                <FormErrorMessage error={errors.title} />
              </div>
            </div>
            <div className="input-field">
              <label>Eligibility Template</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register("template_id", { required: true })}>
                    <option value="">Select Eligibility Template</option>
                    {templateHeaders.map((item: any, index: number) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.template_id} />
              </div>
            </div>
            <div className="input-field">
              <label>Fee Status</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register("fee_status", { required: true })}>
                    <option value="">Select Fee Status</option>
                    <option value={1}>Paid</option>
                    <option value={0}>Unpaid</option>
                  </select>
                </div>
                <FormErrorMessage error={errors.fee_status} />
              </div>
            </div>
            <div className="input-field">
              <label>No of Seats</label>
              <div className="field-wrap">
                <div className="field">
                  <input
                    type="number"
                    placeholder="Seats"
                    {...register("seats", { required: true })}
                  />
                </div>
                <FormErrorMessage error={errors.seats} />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Seq No.</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  placeholder="Seq No."
                  {...register("seq_no", { required: true })}
                />
              </div>
              <FormErrorMessage error={errors.seq_no} />
            </div>
          </div>

          <div className="form-quotas-main">
            <div className="form-quotas">
              <label className="key-body-label">Reconsider From Quotas</label>
              <QuotaListDropdownMain>
                <ul className="p-custom-scrollbar-8">
                  {data.map((item: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => handleMultiselectFields(item)}
                    >
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          checked={formData.reconsider_from_quotas.includes(
                            item.id
                          )}
                        />
                      </div>
                      <div className="item-text">
                        <span className="text">{item.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </QuotaListDropdownMain>
            </div>

            <div className="from-quotas-2">
              <label className="key-body-label">
                Not Reconsider From Quotas
              </label>
              <QuotaListDropdownMain>
                <ul className="p-custom-scrollbar-8">
                  {data.map((item: any, index: number) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleMultiselectFields(
                          item,
                          "not_reconsider_from_quotas"
                        )
                      }
                    >
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          checked={formData.not_reconsider_from_quotas.includes(
                            item.id
                          )}
                        />
                      </div>
                      <div className="item-text">
                        <span className="text">{item.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </QuotaListDropdownMain>
            </div>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button">
                Reset
              </button>
              {!params?.id && (
                <button
                  className="lg-rounded-btn black"
                  onClick={handleSubmit((data: AddQuotaHeaderDTO) =>
                    onSubmit(data, true)
                  )}
                >
                  Save & Add more
                </button>
              )}
              <button
                className="lg-rounded-btn"
                onClick={handleSubmit((data: AddQuotaHeaderDTO) =>
                  onSubmit(data)
                )}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </form>
      </CreateQuotaListSection>
    </CreateQuotaListMain>
  );
};

export default CreateQuotaList;
