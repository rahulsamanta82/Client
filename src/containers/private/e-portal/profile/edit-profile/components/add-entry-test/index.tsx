import { FC, useEffect, useState } from "react";
import { AddEntryTestMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import useEportal from "containers/private/e-portal/useHooks";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

interface AddEntryTestProps {
  setOpen: Function;
  id?: number;
}

const AddEntryTest: FC<AddEntryTestProps> = ({ setOpen }) => {
  const [formData, setFormData] = useState<AddEntryTestDTO>(
    new AddEntryTestDTO()
  );
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AddEntryTestDTO>();
  const navigate = useNavigate();
  const [entryTestTypes, setEntryTestTypes] = useState<any[]>([]);

  const { createEntryTest, getEntryTestTypesByUser, updateEntryTest } =
    useEportal();
  const { state } = useLocation();

  const onSubmit = (data: AddEntryTestDTO, addMore?: boolean) => {
    if (!formData.result_document) {
      warningToaster(warningMessages.documentRequiredMsg);
      return;
    } else if (parseInt(formData.obtained_marks as any) > parseInt(formData.total_marks as any)) {
      warningToaster('Obtained marks must be less than or equal to total marks');
      return;
    }
    const form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key as keyof AddEntryTestDTO]);

    }

    if (state?.entryTest) {
      updateEntryTest(state?.entryTest?.id, form_data, handleCloseModal);
    } else {
      createEntryTest(form_data, handleCloseModal, addMore, resetForm);
    }
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setValue(name, value);
    setFormData({ ...formData, [name]: value });
    trigger(name);
  };

  const resetForm = () => {
    setFormData({ ...new AddEntryTestDTO() });
    for (let key in getValues()) {
      setValue(key as keyof AddEntryTestDTO, "");
    }
  };

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setValue(name, file);
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    trigger([name]);
  };

  useEffect(() => {
    getEntryTestTypesByUser(setEntryTestTypes);
    if (state?.entryTest) {
      if (state?.entryTest) {
        const { entryTest } = state;
        for (let key in formData) {
          setValue(key as keyof AddEntryTestDTO, entryTest[key]);
        }

        setFormData({ ...getValues() });
      }
    }
  }, []);

  const handleCloseModal = () => {
    if (state?.entryTest) navigate(siteRoutes.ePortalEditProfile, { state: {} });
    setOpen(false);
  };

  const onResultAwaitingChange = (event: any) => {
    const { checked } = event.target;
    const result_awaiting = checked ? 1 : 0;
    setValue('result_awaiting' as keyof AddEntryTestDTO, result_awaiting);
    setFormData({ ...formData, result_awaiting, total_marks: 0, obtained_marks: 0 });
  }

  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  return (
    <AddEntryTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Entry Test</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Test</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("test_id", { required: true })}
                      value={formData.test_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {entryTestTypes.map((item: any, index: number) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.test_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Roll Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      {...register("roll_number", { required: true })}
                      value={formData.roll_number}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.roll_number} />
                </div>
              </div>
              <div className="input-field">
                <label>Test Date</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="date"
                      {...register("test_date", { required: true })}
                      value={formData.test_date}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.test_date} />
                </div>
              </div>

              <div className="radio-field">
                <label>Is Verified</label>
                <div className="field-wrap">
                  <div className="field">
                    <label htmlFor="is-active-yes">Yes</label>
                    <input
                      type="radio"
                      id="is-active-yes"
                      value={1}
                      {...register("is_verified", { required: true })}
                      checked={formData.is_verified == 1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="is-active-no">No</label>
                    <input
                      type="radio"
                      id="is-active-no"
                      value={0}
                      {...register("is_verified", { required: true })}
                      checked={formData.is_verified == 0}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <FormErrorMessage error={errors.is_verified} />
              </div>
            </div>
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="result_awaiting"
                checked={formData?.result_awaiting == 1}
                // {...register("result_awaiting", { required: false })}
                onChange={onResultAwaitingChange}
              />
              <label htmlFor="result_awaiting">Awaiting Result</label>
            </div>


            {!formData.result_awaiting && <div className="common-fields">
              <div className="input-field">
                <label>Total Marks</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register("total_marks", { required: true })}
                      value={formData.total_marks}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.total_marks} />
                </div>
              </div>
              <div className="input-field">
                <label>Obtained Marks</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register("obtained_marks", {
                        required: true
                      })}
                      value={formData.obtained_marks}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.obtained_marks} />
                </div>
              </div>
            </div>}
            <div className="common-fields">
              <div className="upload-field">
                <label>Entry Test Certificate</label>
                <div className="field-wrapper">
                  <label className="file-name-section" htmlFor="certificate">
                    <div className="inner-content">
                      <div className="upload-text">
                        <div className="upload-icon">
                          <SmallUploadSvg className="icon" />
                        </div>
                        <span className="text">
                          Upload Entry Test Certificate/ Equivalent()
                        </span>
                      </div>
                      <div className="upload-restrictions">
                        Select a 300x300 jpg image with maximum size of 400 KB
                      </div>
                    </div>
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    {...register("result_document", { required: false })}
                    id="certificate"
                    onChange={handleFileUpload}
                  />
                  <div className="uploaded-image cnic">
                    <img src={formData.result_document ?? squareAvatar} />
                  </div>
                </div>
                <FormErrorMessage error={errors.result_document} />
              </div>
            </div>
            <div className="action-buttons">
              {isLoading ? (
                <div className="sm-primary-loader"></div>
              ) : (
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  {!state?.entryTest ? (
                    <button
                      className="lg-rounded-btn black"
                      type="submit"
                      onClick={handleSubmit((data: any) => onSubmit(data, true))}
                    >
                      Save & Add More
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    className="lg-rounded-btn"
                    type="submit"
                    onClick={handleSubmit((data: any) => onSubmit(data))}
                  >
                    {state?.entryTest ? 'Update' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AddEntryTestMain>
  );
};

export default AddEntryTest;
