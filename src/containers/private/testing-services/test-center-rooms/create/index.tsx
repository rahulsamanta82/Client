import { FC, useState, useEffect } from "react";
import {
  CreateTestCenterSection,
  CreateTestCenterListMain,
  CreateTestCenterListTop,
} from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import useTestingServices from "../../useHooks";
import useUtils from "hooks/useUtils";

const CreateCenterRoom: FC = () => {
  const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<TestingCenterRoomDTO>();
  let [formData, setFormData] = useState<TestingCenterRoomDTO>(new TestingCenterRoomDTO());
  const { createTestingCenterRoom, updateTestingCenterRoom, getTestingCenterRoomById } = useTestingServices();
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const onSubmit = (data: TestingCenterRoomDTO, addMore: boolean = false) => {
    if (params?.id) {
      updateTestingCenterRoom(params?.id, formData);
    } else {
      createTestingCenterRoom(formData,params?.test_center_id, addMore, resetForm);
    }
  }

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    trigger(name);
    setFormData({ ...formData, [name]: value });
  }

  const resetForm = () => {
    formData = new TestingCenterRoomDTO();
    for (let key in formData) {
      setValue(key as keyof TestingCenterRoomDTO, formData[key as keyof TestingCenterRoomDTO]);
    }

    setFormData({ ...formData });
  }

  useEffect(() => {
    if (params?.id) getTestingCenterRoomById(params?.id, formData, setValue, setFormData);
  }, []);

  return (
    <CreateTestCenterListMain>
      <CreateTestCenterListTop>
        <div className="left">
          <span className="page-heading">Add Room</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateTestCenterListTop>

      <CreateTestCenterSection className="p-custom-scrollbar-8">
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <div className="common-fields">
            <div className="input-field ">
              <label>Room Name</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" placeholder="Room Name" {...register('name', { required: true })} value={formData.name} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.name} />
              </div>
            </div>
            <div className="input-field ">
              <label>Total Seats</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="number" placeholder="Total seats" {...register('total_seats', { required: true })} value={formData.total_seats} onChange={handleChange} />
                </div>
                <FormErrorMessage error={errors.total_seats} />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label htmlFor="no">Status</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="active" {...register('is_active', { required: true })} value={1} checked={formData.is_active == 1} onChange={handleChange} />
                <label htmlFor="active">Active</label>
              </div>
              <div className="field">
                <input type="radio" id="inactive" {...register('is_active', { required: true })} value={0} checked={formData.is_active == 0} onChange={handleChange} />
                <label htmlFor="inactive">Deactivate</label>
              </div>
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
      </CreateTestCenterSection>
    </CreateTestCenterListMain>
  );
};

export default CreateCenterRoom;
