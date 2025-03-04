import { FC, useState, useEffect } from "react";
import {
  CreateTestCenterSection,
  CreateTestCenterListMain,
  CreateTestCenterListTop,
} from "./style";
import { useForm } from "react-hook-form";
import Breadcrumb from "components/particles/breadcrumb";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import useUtils from "hooks/useUtils";
import useTestingServices from "../../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "containers/private/organization/useHooks";

const CreateTestCenter: FC = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<TestingCenterDTO>();
  let [formData, setFormData] = useState<TestingCenterDTO>(new TestingCenterDTO());
  const [cities, setCities] = useState<any[]>([]);
  const { createTestingCenter, updateTestingCenter, getTestingCenterById } = useTestingServices();
  const { getCitiesAdmin } = useOrganization();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const onSubmit = (data: TestingCenterDTO, addMore: boolean = false) => {
    if (params?.id) {
      updateTestingCenter(params?.id, formData);
    } else {
      createTestingCenter(formData, addMore, resetForm);
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new TestingCenterDTO();
    for (let key in formData) {
      setValue(key as keyof TestingCenterDTO, formData[key as keyof TestingCenterDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) {
      getTestingCenterById(params?.id, formData, setFormData, setValue);
    }
    getCitiesAdmin(setCities);
  }, []);

  return (
    <CreateTestCenterListMain>
      <CreateTestCenterListTop>
        <div className="left">
          <span className="page-heading">Add Test Center</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateTestCenterListTop>

      <CreateTestCenterSection className="p-custom-scrollbar-8">
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <div className="common-fields">
            <div className="input-field ">
              <label>Center Name</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" {...register('name', { required: true })} value={formData.name} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.name} />
              </div>
            </div>
            <div className="input-field">
              <label>Phone</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('phone_no', { required: true })} value={formData.phone_no} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.phone_no} />
              </div>
            </div>
            <div className="input-field ">
              <label>Email</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="email" {...register('email', { required: true })} value={formData.email} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.email} />
              </div>
            </div>
            <div className="input-field">
              <label>Address</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" {...register('address', { required: true })} value={formData.address} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.address} />
              </div>
            </div>
            <div className="input-field">
              <label>City</label>
              <div className="field-wrap">
                <div className="field">
                  <select {...register('city', { required: true })} value={formData.city} onChange={handleChange}>
                    <option value="">Select a city</option>
                    {cities.map((city: any) => {
                      return <option value={city.id} key={city.id}>{city.title}</option>
                    })}
                  </select>
                </div>
                <FormErrorMessage error={errors.city} />
              </div>
            </div>
            <div className="input-field">
              <label>Latitude</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('lat', { required: true })} value={formData.lat} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.lat} />
              </div>
            </div>
            <div className="input-field ">
              <label>Longitude</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('long', { required: true })} value={formData.long} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.long} />
              </div>
            </div>
            <div className="input-field">
              <label>Capacity</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" {...register('capacity', { required: true })} value={formData.capacity} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.capacity} />
              </div>
            </div>
            <div className="input-field ">
              <label>Description</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" {...register('description', { required: true })} value={formData.description} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.description} />
              </div>
            </div>
            <div className="radio-field">
              <label htmlFor="no">Status</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" {...register('is_active', { required: true })} checked={formData.is_active == 1} value={1} onChange={handleChange} />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" {...register('is_active', { required: true })} checked={formData.is_active == 0} value={0} onChange={handleChange} />
                  <label htmlFor="no">Inactive</label>
                </div>
              </div>
              <FormErrorMessage error={errors.is_active} />
            </div>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                Reset
              </button>
              <button className="lg-rounded-btn black" type="button" onClick={handleSubmit(data => onSubmit(data, true))}>Save & Add more</button>
              <button className="lg-rounded-btn" type="button" onClick={handleSubmit(data => onSubmit(data))}>Save & Exit</button>
            </div>
          </div>
        </form>
      </CreateTestCenterSection>
    </CreateTestCenterListMain>
  );
};

export default CreateTestCenter;
