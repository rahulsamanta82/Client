import { FC, useEffect, useState } from "react";
import { QualificationTestMain, ContentWrapper, Container } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import {
  AddQualificationDTO,
  SubjectResults,
} from "utils/helpers/models/e-portal/add-qualification.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useEportal from "containers/private/e-portal/useHooks";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

interface AddQualificationProps {
  setOpen: Function;
}

const AddQualification: FC<AddQualificationProps> = ({ setOpen }) => {
  const [formData, setFormData] = useState<AddQualificationDTO>(
    new AddQualificationDTO()
  );
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AddQualificationDTO>();
  const [boards, setBoards] = useState<any[]>([]);
  const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
  const [degreeCertificates, setDegreeCertificates] = useState<any[]>([]);
  const [resultTypes, setResultTypes] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const {
    createQualification,
    getBoardsByUser,
    getCertificateLevelsByUser,
    getDegreeCertificatesByUser,
    getResultTypesByUser,
    updateQualification,
    getSubjectsByUser,
  } = useEportal();

  const { state } = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data: AddQualificationDTO, addMore?: boolean) => {
    if (!formData?.result_document) {
      warningToaster(warningMessages.documentRequiredMsg);
      return;
    }
    const form_data = new FormData();
    for (let key in formData) {
      if (key === "subject_results") {
        form_data.append(
          key,
          JSON.stringify(data[key as keyof AddQualificationDTO])
        );
      } else {
        form_data.append(key, data[key as keyof AddQualificationDTO]);
      }
    }

    if (state?.qualification) {
      updateQualification(
        state?.qualification?.id,
        form_data,
        handleCloseModal
      );
    } else {
      createQualification(form_data, handleCloseModal, addMore, resetForm);
    }
  };

  const resetForm = () => {
    setFormData({ ...new AddQualificationDTO() });
    for (let key in getValues()) {
      setValue(key as keyof AddQualificationDTO, "");
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "certificate_level_id") {
      setDegreeCertificates([]);
      setBoards([]);
      setValue("certificate_type_id", "");
      setValue("board_id", "");
      setValue(name, value);
      setFormData({
        ...formData,
        board_id: "",
        certificate_type_id: "",
        [name]: value,
      });
    } else if (name === "certificate_type_id") {
      setBoards([]);
      setValue(name, value);
      setValue("board_id", "");
      setFormData({
        ...formData,
        board_id: "",
        [name]: value,
        subject_results: [],
      });
    } else {
      setValue(name, value);
      setFormData({ ...formData, [name]: value });
    }

    trigger([name]);
  };

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setValue(name, file);
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    trigger([name]);
  };

  useEffect(() => {
    // getBoardsByUser(setBoards);
    getCertificateLevelsByUser(setCertificateLevels);
    // getDegreeCertificatesByUser(setDegreeCertificates);
    getResultTypesByUser(setResultTypes);
    getSubjectsByUser(setSubjects);

    if (state?.qualification) {
      const { qualification } = state;
      const formData: any = new AddQualificationDTO();
      for (let key in formData) {
        formData[key as keyof AddQualificationDTO] = qualification[key];
        setValue(key as keyof AddQualificationDTO, formData[key]);
      }

      setFormData({ ...formData });
    }
  }, [state]);
  // console.log(certificateLevels);

  useEffect(() => {
    if (formData.certificate_level_id) {
      getDegreeCertificatesByUser(
        setDegreeCertificates,
        formData.certificate_level_id
      );
    }
  }, [formData.certificate_level_id]);

  useEffect(() => {
    if (formData.certificate_type_id) {
      getBoardsByUser(setBoards, formData.certificate_type_id);
      const certificateType = degreeCertificates.find(
        (c: any) => c.id == formData.certificate_type_id
      );
      if (certificateType) {
        for (let i = 0; i < certificateType.required_subjects; i++) {
          formData.subject_results.push(new SubjectResults());
        }
        setFormData({ ...formData });
      }
    }
  }, [formData.certificate_type_id]);

  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const handleCloseModal = () => {
    if (state?.qualification)
      navigate(siteRoutes.ePortalEditProfile, { state: {} });
    setOpen(false);
  };

  const handleChangeSubjectResults = (event: any, index: number) => {
    const { name, value } = event.target;
    const key = name.split(".");
    setValue(name, value);
    trigger([name]);
    formData.subject_results[index][
      key[key.length - 1] as keyof SubjectResults
    ] = value;
    setFormData({ ...formData });
  };
  // console.log(formData);

  return (
    <QualificationTestMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Qualification</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Certificate/Degree Category</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("certificate_level_id", { required: true })}
                      value={formData.certificate_level_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>

                      {certificateLevels?.map(
                        (certificateLevel: any, index: number) => {
                          return (
                            <option value={certificateLevel.id} key={index}>
                              {certificateLevel.title}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.certificate_level_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Certificate/Degree</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("certificate_type_id", { required: true })}
                      value={formData.certificate_type_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Certificate/Degree</option>

                      {degreeCertificates?.map(
                        (degreeCertificate: any, index: number) => {
                          return (
                            <option value={degreeCertificate.id} key={index}>
                              {degreeCertificate.title}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.certificate_type_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Board/University</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("board_id", { required: true })}
                      value={formData.board_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Board</option>
                      {boards?.map((board: any, index: number) => {
                        return (
                          <option value={board.id} key={index}>
                            {board.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.board_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Result Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select
                      {...register("result_type_id", { required: true })}
                      value={formData.result_type_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Result Type</option>

                      {resultTypes?.map((resultType: any, index: number) => {
                        return (
                          <option value={resultType.id} key={index}>
                            {resultType.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <FormErrorMessage error={errors.result_type_id} />
                </div>
              </div>
              <div className="input-field">
                <label>Roll Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      {...register("roll_num", { required: true })}
                      value={formData.roll_num}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.roll_num} />
                </div>
              </div>
              <div className="input-field">
                <label>Passing Year</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register("passing_year", { required: true })}
                      value={formData.passing_year}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.passing_year} />
                </div>
              </div>
              <div className="input-field">
                <label>Registration Number</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="text"
                      {...register("reg_num", { required: true })}
                      value={formData.reg_num}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.reg_num} />
                </div>
              </div>
              <div className="input-field">
                <label>Total Marks/GPA</label>
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
                <label>Obtained Marks/GPA</label>
                <div className="field-wrap">
                  <div className="field">
                    <input
                      type="number"
                      {...register("obt_marks", {
                        required: true,
                        validate: {
                          validate: (value) =>
                            parseInt(value as any) <=
                              parseInt(formData.total_marks as any) ||
                            "Obtained marks must not be more than total marks",
                        },
                      })}
                      value={formData.obt_marks}
                      onChange={handleChange}
                    />
                  </div>
                  <FormErrorMessage error={errors.obt_marks} />
                </div>
              </div>
            </div>
            <div className="common-fields">
              <div className="upload-field">
                <label>Certificate</label>
                <input
                  type="file"
                  className="d-none"
                  id="result_document"
                  {...register("result_document", { required: false })}
                  onChange={handleFileUpload}
                />
                <div className="field-wrapper">
                  <label
                    className="file-name-section"
                    htmlFor="result_document"
                  >
                    <div className="inner-content">
                      <div className="upload-text">
                        <div className="upload-icon">
                          <SmallUploadSvg className="icon" />
                        </div>
                        <span className="text">
                          Upload Certificate/ Equivalent()
                        </span>
                      </div>
                      <div className="upload-restrictions">
                        Select a 300x300 jpg image with maximum size of 400 KB
                      </div>
                    </div>
                  </label>
                  <div className="uploaded-image cnic">
                    <img
                      src={
                        typeof formData?.result_document === "string"
                          ? formData?.result_document
                          : squareAvatar
                      }
                      alt=""
                    />
                  </div>
                </div>
                <FormErrorMessage error={errors.result_document} />
              </div>
            </div>
            {formData.subject_results?.map((result, index: number) => {
              return (
                <div className="common-fields">
                  <div className="input-field">
                    <label>Subject {index + 1}</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register(`subject_results.${index}.subject_id`, {
                            required: true,
                          })}
                          value={result.subject_id}
                          onChange={(e) => handleChangeSubjectResults(e, index)}
                        >
                          <option
                            value="
                            "
                          >
                            Select subject {index + 1}
                          </option>
                          {subjects?.map((subject: any, index: number) => {
                            return (
                              <option key={index} value={subject.id}>
                                {subject.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <FormErrorMessage
                        error={
                          (errors as any)?.["subject_results"]?.[index]?.[
                            "subject_id"
                          ]
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Total Marks/GPA in subject {index + 1}</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="number"
                          {...register(`subject_results.${index}.total_marks`, {
                            required: true,
                          })}
                          value={result.total_marks}
                          onChange={(e) => handleChangeSubjectResults(e, index)}
                        />
                      </div>
                      <FormErrorMessage
                        error={
                          (errors as any)?.["subject_results"]?.[index]?.[
                            "total_marks"
                          ]
                        }
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Obtained Marks/GPA in subject {index + 1}</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="number"
                          {...register(`subject_results.${index}.obt_marks`, {
                            required: true,
                            validate: {
                              validate: (value) =>
                                parseInt(value as any) <=
                                  parseInt(result.total_marks as any) ||
                                "Obtained marks must not be more than total marks",
                            },
                          })}
                          value={result.obt_marks}
                          onChange={(e) => handleChangeSubjectResults(e, index)}
                        />
                      </div>
                      <FormErrorMessage
                        error={
                          (errors as any)?.["subject_results"]?.[index]?.[
                            "obt_marks"
                          ]
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
                  {!state?.qualification ? (
                    <button
                      className="lg-rounded-btn black"
                      type="submit"
                      onClick={handleSubmit((data: any) =>
                        onSubmit(data, true)
                      )}
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
                    {state?.qualification ? "Update" : "Save"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </QualificationTestMain>
  );
};

export default AddQualification;
