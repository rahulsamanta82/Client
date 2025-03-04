import { FC, useState, useEffect } from "react";
import {
  CreateTestScheduleSection,
  CreateTestScheduleListTop,
  CreateTestScheduleListMain,
} from "./style";

import Breadcrumb from "components/particles/breadcrumb";
import useComponentVisible from "hooks/click-outside";
import { TestScheduleDTO } from "utils/helpers/models/testing-service/test-schedule.dto";
import { useForm } from "react-hook-form";
import useTestingServices from "../../useHooks";
import useUtils from "hooks/useUtils";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import useAdmissions from "containers/private/admissions/useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";
import useFinance from "containers/private/finance/useHooks";
import { VoucherTemplateHeaderDTO } from "utils/helpers/models/finance/voucher-template-header.dto";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";

const CreateTestSchedule: FC = () => {
  const {
    isComponentVisible: showCentersDropdown,
    setIsComponentVisible: setShowCentersDropdown,
    ref: testCentersDropdownRef,
  } = useComponentVisible();

  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<TestScheduleDTO>();
  let [formData, setFormData] = useState<TestScheduleDTO>(new TestScheduleDTO());
  const [testCenters, setTestCenters] = useState<TestingCenterDTO[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [searchedTestCenters, setSearchedTestCenters] = useState<TestingCenterDTO[]>([]);
  const [voucherTemplates, setVoucherTemplates] = useState<VoucherTemplateHeaderDTO[]>([]);
  const [financeApplications, setFinanceApplications] = useState<FinanceApplicationDTO[]>([]);
  const { createTestSchedule, updateTestSchedule, getTestScheduleById, getTestingCenters } = useTestingServices();
  const { getAdmissionEntryTests, getAdmissionSessions } = useAdmissions();
  const { getVoucherTemplateHeaders, getFinanceApplications } = useFinance();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [search, setSearch] = useState<string>("");

  const onSubmit = (data: TestScheduleDTO, addMore: boolean = false) => {
    if (!formData.center_ids.length) {
      warningToaster('Please select atleast one center')
      return;
    }
    if (params?.id) {
      updateTestSchedule(params?.id, { ...formData, center_ids: JSON.stringify(formData.center_ids) });
    } else {
      createTestSchedule({ ...formData, center_ids: JSON.stringify(formData.center_ids) }, addMore, resetForm);
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new TestScheduleDTO();
    for (let key in formData) {
      setValue(key as keyof TestScheduleDTO, formData[key as keyof TestScheduleDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) {
      getTestScheduleById(params?.id, formData, setValue, setFormData);
    }
    getTestingCenters(setTestCenters);
    getAdmissionEntryTests(setTests);
    getAdmissionSessions(setSessions);
    getVoucherTemplateHeaders(setVoucherTemplates);
    getFinanceApplications(setFinanceApplications);
  }, []);

  const onSelectCenters = (center: any) => {
    const { selected, id } = center;
    const updatedCenterIds = selected
      ? [...formData.center_ids, id]
      : formData.center_ids.filter((centerId) => centerId !== id);

    setFormData({ ...formData, center_ids: updatedCenterIds });
  }


  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    const testCentersHelper = testCenters.filter((center) =>
      center.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedTestCenters([...testCentersHelper]);
  };

  return (
    <CreateTestScheduleListMain>
      <CreateTestScheduleListTop>
        <div className="left">
          <span className="page-heading">Add Schedule</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateTestScheduleListTop>

      <CreateTestScheduleSection className="p-custom-scrollbar-8">
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <div className="common-fields">
            <div className="input-field">
              <label>Test</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('test_id', { required: true })} value={formData.test_id} onChange={handleChange}>
                    <option value="">Select Test</option>
                    {tests.map((test: any, index: number) => {
                      return <option value={test.id} key={index}>{test.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.test_id} />
              </div>
            </div>

            <div className="input-field">
              <label>Session Name</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('session_id', { required: true })} value={formData.session_id} onChange={handleChange}>
                    <option value="">Select Session</option>
                    {sessions.map((session: any, index: number) => {
                      return <option value={session.id} key={index}>{session.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.session_id} />
              </div>
            </div>

            <div className="input-field">
              <label>Test Batch</label>
              <div className="field-wrap">
                <div className="field" >
                  <select {...register('batch', { required: true })} value={formData.batch} onChange={handleChange}>
                    <option value="">1</option>
                    {[1, 2, 3, 4, 5].map((value, index) => {
                      return <option value={value} key={value + index}>{value}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.batch} />
              </div>
            </div>
            <div className="input-field">
              <label>Application</label>
              <div className="field-wrap">
                <div className="field" >
                  <select {...register('acc_application_id', { required: true })} value={formData.acc_application_id} onChange={handleChange}>
                    <option value="">Select Application</option>
                    {financeApplications.map((application, index) => {
                      return <option value={application.id} key={index}>{application.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.acc_application_id} />
              </div>
            </div>
            <div className="input-field">
              <label>Voucher Template</label>
              <div className="field-wrap">
                <div className="field" >
                  <select {...register('voucher_template_id', { required: true })} value={formData.voucher_template_id} onChange={handleChange}>
                    <option value="">Select Template</option>
                    {voucherTemplates.map((template, index) => {
                      return <option value={template.id} key={index}>{template.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.voucher_template_id} />
              </div>
            </div>
            <div className="input-field">
              <label>Start Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('start_date', { required: true })} value={formData.start_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.start_date} />
              </div>
            </div>

            <div className="input-field">
              <label>End Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('end_date', { required: true })} value={formData.end_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.end_date} />
              </div>
            </div>

            <div className="input-field">
              <label>Test Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('test_date', { required: true })} value={formData.test_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.test_date} />
              </div>
            </div>
            <div className="input-field">
              <label>Result Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('result_date', { required: true })} value={formData.result_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.result_date} />
              </div>
            </div>

            <div className="input-field">
              <label>Result Valid Till</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('result_valid_till', { required: true })} value={formData.result_valid_till} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.result_valid_till} />
              </div>
            </div>
            <div className="input-field">
              <label>Valid Years</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('valid_years', { required: true })} value={formData.valid_years} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.valid_years} />
              </div>
            </div>

            <div className="input-field">
              <label>Challan Upload Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('challan_upload_date', { required: true })} value={formData.challan_upload_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.challan_upload_date} />
              </div>
            </div>

            <div className="input-field">
              <label>In House Close Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('in_house_close_date', { required: true })} value={formData.in_house_close_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.in_house_close_date} />
              </div>
            </div>
            <div className="input-field">
              <label>In House Users</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('in_house_users', { required: true })} value={formData.in_house_users} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.in_house_users} />
              </div>
            </div>
            <div className="input-field">
              <label>Tentative Date</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="date" {...register('expected_date', { required: true })} value={formData.expected_date} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.expected_date} />
              </div>
            </div>
            <div className="input-field">
              <label>Fees</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('fee', { required: true })} value={formData.fee} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.fee} />
              </div>
            </div>
            <div className="input-field">
              <label>Passing Marks</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('passing_marks', { required: true })} value={formData.passing_marks} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.passing_marks} />
              </div>
            </div>
            <div className="radio-field">
              <label htmlFor="status-no">Status</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="status-yes" {...register('is_active', { required: true })} value={1} onChange={handleChange} checked={formData.is_active == 1} />
                  <label htmlFor="status-yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="status-no" {...register('is_active', { required: true })} value={0} onChange={handleChange} checked={formData.is_active == 0} />
                  <label htmlFor="status-no">Deactivate</label>
                </div>
              </div>
              <FormErrorMessage error={errors.is_active} />
            </div>
            <div className="input-field">
              <label>Description</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" {...register('description', { required: true })} value={formData.description} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.description} />
              </div>
            </div>
            <div className="radio-field">
              <label htmlFor="no">For Phd</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" {...register('is_phd', { required: true })} value={1} onChange={handleChange} checked={formData.is_phd == 1} />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" {...register('is_phd', { required: true })} value={0} onChange={handleChange} checked={formData.is_phd == 0} />
                  <label htmlFor="no">No</label>
                </div>
              </div>
              <FormErrorMessage error={errors.is_phd} />
            </div>
            <div className="multiselect-field" ref={testCentersDropdownRef}>
              <div className="input-field" onClick={() => setShowCentersDropdown(true)}>
                <label>Center</label>
                <div className="field-wrap">
                  <div className="field">
                    <div className="selected-items">
                      <input
                        type="search"
                        placeholder="Select Centers"
                        value={search}
                        onChange={handleSearchChange}
                      />
                      {formData.center_ids.length ? (
                        <div className="item">
                          {formData.center_ids.filter(id => id > 0).length > 0 ? (
                            <div>{formData.center_ids.filter(id => id > 0).length} selected</div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showCentersDropdown && (
                <MultiselectDropdown
                  options={search === "" ? testCenters : searchedTestCenters}
                  onSelect={onSelectCenters}
                  value={formData.center_ids}
                  property="name"
                />
              )}
            </div>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                Reset
              </button>
              <button className="lg-rounded-btn black" onClick={handleSubmit(data => onSubmit(data, true))}>Save & Add more</button>
              <button className="lg-rounded-btn" onClick={handleSubmit(data => onSubmit(data))}>Save & Exit</button>
            </div>
          </div>
        </form>
      </CreateTestScheduleSection>
    </CreateTestScheduleListMain>
  );
};

export default CreateTestSchedule;
