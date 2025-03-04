import { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  EditEPortalProfileMain,
  EditEPortalProfileTopSection,
  EditProfileContentSection,
  FormSection,
  FormStepper,
  Step1,
  Step2,
  Step3,
  Step4,
  TableWrapper,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  AdditionalInfoSvg,
  ExamEntrySvg,
  GuardiansSvg,
  PersonalInfoSvg,
} from "assets/images/e-portal/svgs";
import dummyAvatar from "assets/images/common/others/dummy-avatar.png";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import Stepper from "components/particles/forms/stepper";
import {
  DeleteTableSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  SmallUploadSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import AddEntryTest from "./components/add-entry-test";
import AddQualification from "./components/add-qualification";
import useEportal from "../../useHooks";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import {
  confirmationPopup,
  warningToaster,
} from "utils/helpers/common/alert-service";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { EditStudentProfile } from "utils/helpers/models/e-portal/edit-student-profile.dto";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

interface EditEPortalProfileProps { }

const EditEPortalProfile: FC<EditEPortalProfileProps> = ({ }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const academicTableRef = useRef<any>(null);
  const [formData, setFormData] = useState<EditStudentProfile>(
    new EditStudentProfile()
  );

  const [openAcademicModal, setOpenAcademicModal] = useState<boolean>(false);
  const [openEntryTestModal, setOpenEntryTestModal] = useState<boolean>(false);
  const [entryTests, setEntryTests] = useState<any[]>([]);
  const [qualifications, setQualifications] = useState<any[]>([]);
  const [invalidStep, setInvalidStep] = useState<number | undefined>();
  const [oldFormData, setOldFormData] = useState<EditStudentProfile>(
    new EditStudentProfile()
  );
  const navigate = useNavigate();
  const {
    getProfile,
    getCitiesByUser,
    updateUserPersonalInfo,
    updateUserGuradianInfo,
    updateUserAdditionalInfo,
    getEntryTestsByUser,
    getQualificationsByUser,
    deleteQualificationByUser,
    downloadQualificationDocumentByUser,
    deleteEntryTestByUser,
  } = useEportal();
  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<EditStudentProfile>();
  const [cities, setCities] = useState<any[]>([]);
  const academicColumns: string[] = [
    "Certificate/Degree",
    "Roll No./Reg No.",
    "Board University",
    "Passing Year",
    "Total Marks/GPA",
    "Obtained Marks",
    "Result",
    "Action",
  ];
  const entryTestsColumns: string[] = [
    "Test",
    "Date",
    "Roll No.",
    "Total Marks",
    "Obtained Marks",
    "Result Status",
    "Action",
  ];
  const editProfileSteps = [
    {
      title: "Personal Information",
      icon: PersonalInfoSvg,
      active: true,
      completed: false,
    },
    {
      title: "Guardian’s Information",
      icon: GuardiansSvg,
      active: false,
      completed: false,
    },
    {
      title: "Additional information",
      icon: AdditionalInfoSvg,
      active: false,
      completed: false,
    },
    {
      title: "Exam and Entry",
      icon: ExamEntrySvg,
      active: false,
      completed: false,
    },
  ];

  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const goNext = async (step: number, e?: any) => {
    setCurrentStep(step + 1);
  };

  const goBack = (e: any) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const goToEditQualification = (qualification: any) => {
    const index = qualifications.findIndex((q) => q.id === qualification.id);
    navigate(`${siteRoutes.ePortalEditProfile}`, { state: { qualification } });
    setOpenAcademicModal(true);
    toggleAcademicDropdown(index);
  };

  const goToEditEntryTest = (entryTest: any) => {
    const index = entryTests.findIndex((t) => t.id === entryTest.id);
    navigate(`${siteRoutes.ePortalEditProfile}`, { state: { entryTest } });
    setOpenEntryTestModal(true);
    toggleEntryTestsDropdown(index);
  };

  const handleDeleteQualification = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      deleteQualificationByUser(id, setQualifications);
    }
  };

  const handleDeleteEntryTest = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      deleteEntryTestByUser(id, setEntryTests);
    }
  };

  const toggleAcademicDropdown = (index: number) => {
    setQualifications([
      ...qualifications.map((item: any, ind: number) => {
        if (index === ind) {
          return {
            ...item,
            isDropdownOpen: !item.isDropdownOpen,
          };
        } else {
          return {
            ...item,
            isDropdownOpen: false,
          };
        }
      }),
    ]);
  };

  const toggleEntryTestsDropdown = (index: number) => {
    setEntryTests([
      ...entryTests.map((item: any, ind: number) => {
        if (index === ind) {
          return {
            ...item,
            isDropdownOpen: !item.isDropdownOpen,
          };
        } else {
          return {
            ...item,
            isDropdownOpen: false,
          };
        }
      }),
    ]);
  };

  const handleChange = async (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValue(name, value);
    // }
    await trigger([name]);
  };

  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
    setFormData({ ...formData, [name]: URL.createObjectURL(file) });
    setValue(name, file);
  };

  const onSubmit = (data: any, step: number) => {
    if (step === 1) {
      const fields: any = [
        "gender",
        "date_of_birth",
        "email",
        "phone_no",
        "domicile",
        "p_city",
        "m_city",
        "m_address",
        "p_address",
        "is_self_dependent",
        "profile_image",
        "cnic_image",
        "cnic_back_image",
        "domicile_certificate",
      ];

      if (!formData.profile_image) {
        warningToaster("Profile image is required");
      } else if (!formData.cnic_back_image) {
        warningToaster("Cnic back image is required");
      } else if (!formData.cnic_image) {
        warningToaster("Cnic front image is required");
      } else if (!formData.domicile_certificate) {
        warningToaster("Domicile certificate image is required");
      } else {
        const doesChange = didFormDataChange(fields);
        if (doesChange) {
          const form_data = new FormData();
          for (let key in data) {
            if (fields.includes(key)) {
              if (key === "is_self_dependent") {
                form_data.append(key, formData.is_self_dependent);
              } else {
                form_data.append(key, data[key]);
              }
            }
          }
          updateUserPersonalInfo(form_data, goNext, step);
          setOldFormData({ ...formData });
        } else {
          goNext(step);
        }
      }
    } else if (step === 2) {
      const fields = [
        "guardian_name",
        "guardian_email",
        "guardian_status",
        "guardian_phone",
        "guardian_dependent",
        "guardian_relation",
        "guardian_monthly_income",
        "guardian_cnic",
        "guardian_occupation",
      ];

      const doesChange = didFormDataChange(fields);

      if (doesChange) {
        const form_data = new FormData();
        for (let key in data) {
          if (fields.includes(key)) {
            form_data.append(key, data[key]);
          }
        }
        updateUserGuradianInfo(form_data, goNext, step);
        setOldFormData({ ...formData });
      } else {
        goNext(step);
      }
    } else {
      const fields = [
        "blood_group",
        "how_did_know",
        "disability",
        "religion",
        "is_hafiz",
        "it_deficiency",
        "hostel_check",
        "kin_name",
        "relation_with_kin",
        "kin_cnic",
        "kin_phone",
        "kin_email",
      ];

      const doesChange = didFormDataChange(fields);

      if (doesChange) {
        const form_data = new FormData();
        for (let key in data) {
          if (fields.includes(key)) {
            form_data.append(key, data[key]);
          }
        }

        updateUserAdditionalInfo(form_data, goNext, step);
        setOldFormData({ ...formData });
      } else {
        goNext(step);
      }
    }
  };

  const handleSaveAsAboveCheckbox = async (event: any) => {
    const { checked } = event.target;
    if (checked) {
      const m_city = getValues("m_city");
      const m_address = getValues("m_address");
      setValue("p_city", m_city);
      setValue("p_address", m_address);
      setFormData({ ...formData, p_address: m_address, p_city: m_city });
    } else {
      setValue("p_city", "");
      setValue("p_address", "");
      setFormData({ ...formData, p_address: "", p_city: "" });
    }
    await trigger(["p_city", "p_address"]);
  };

  const handleIsDependentCheckbox = (event: any) => {
    const { checked } = event.target;
    const value = checked ? 1 : 0;
    setValue("is_self_dependent", value);
    setFormData({ ...formData, is_self_dependent: value });
  };

  useEffect(() => {
    getCitiesByUser(setCities);
    getProfile(setFormData, setOldFormData, setValue, formData);
  }, []);

  useEffect(() => {
    getQualificationsByUser(setQualifications);
  }, [openAcademicModal]);

  useEffect(() => {
    getEntryTestsByUser(setEntryTests);
  }, [openEntryTestModal]);

  const didFormDataChange = (fields: string[]) => {
    let doesChange: boolean = false;
    const oldData: any = { ...oldFormData };
    const newData: any = { ...formData };

    for (let key in newData) {
      if (fields.includes(key)) {
        if (oldData[key] !== newData[key]) {
          doesChange = true;
          break;
        }
      }
    }

    return doesChange;
  };
  const goToEportalHome = () => {
    navigate(siteRoutes.ePortalDashboard);
  };
  return (
    <EditEPortalProfileMain>
      <EditEPortalProfileTopSection>
        <span className="page-heading">Edit Profile</span>
        <Breadcrumb />
      </EditEPortalProfileTopSection>
      <EditProfileContentSection>
        <FormStepper>
          <Stepper
            steps={editProfileSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            invalidStep={invalidStep}
          />
        </FormStepper>
        <FormSection>
          <form>
            {currentStep === 1 ? (
              <Step1>
                <div className="common-fields">
                  <div className="input-field">
                    <label>Gender</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("gender", { required: true })}
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.gender} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Email</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.email} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Mobile Number</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          {...register("phone_no", { required: true })}
                          value={formData.phone_no}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.phone_no} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Date Of Birth</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="date"
                          {...register("date_of_birth", { required: true })}
                          value={formData.date_of_birth}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.date_of_birth} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Domicile City</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("domicile", { required: true })}
                          value={formData.domicile}
                          onChange={handleChange}
                        >
                          <option value="">Select City</option>
                          {cities?.map((city: any, index: number) => {
                            return (
                              <option value={city.id} key={index}>
                                {city.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <FormErrorMessage error={errors.domicile} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Current Mailing Address( Address 1, 2)</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="text"
                          placeholder="Enter Mailing Address"
                          {...register("m_address", { required: true })}
                          value={formData.m_address}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.m_address} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Current Address (City/Tehsil)</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("m_city", { required: true })}
                          value={formData.m_city}
                          onChange={handleChange}
                        >
                          <option value="">Select City/Tehsil</option>
                          {cities?.map((city: any, index: number) => {
                            return (
                              <option value={city.id} key={index}>
                                {city.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <FormErrorMessage error={errors.m_city} />
                    </div>
                  </div>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="same-as-above"
                    onChange={handleSaveAsAboveCheckbox}
                    checked={
                      formData.p_city === formData.m_city &&
                      formData.m_address === formData.p_address
                    }
                  />
                  <label htmlFor="same-as-above">Same As Above</label>
                </div>
                <div className="common-fields">
                  <div className="input-field">
                    <label>Permanent Mailing Address( Address 1, 2)</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="text"
                          placeholder="Enter Mailing Address"
                          {...register("p_address", { required: true })}
                          value={formData.p_address}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.p_address} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Permanent Address (City/Tehsil)</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("p_city", { required: true })}
                          value={formData.p_city}
                          onChange={handleChange}
                        >
                          <option value={""}>Select City/Tehsil</option>
                          {cities?.map((city: any, index: number) => {
                            return (
                              <option value={city.id} key={index}>
                                {city.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <FormErrorMessage error={errors.p_city} />
                    </div>
                  </div>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="is_self_dependent"
                    {...register("is_self_dependent", { required: false })}
                    checked={formData.is_self_dependent == 1}
                    onChange={handleIsDependentCheckbox}
                  />
                  <label htmlFor="is_self_dependent">I am self dependent</label>
                </div>

                <div className="upload-field">
                  <label>Profile Picture</label>
                  <label className="field-wrapper">
                    <div className="file-name-section">
                      <div className="inner-content">
                        <div className="upload-text">
                          <div className="upload-icon">
                            <SmallUploadSvg className="icon" />
                          </div>
                          <span className="text">Upload Profile Picture</span>
                        </div>
                        <div className="upload-restrictions">
                          Select a 300x300 jpg image with maximum size of 400 KB
                        </div>
                      </div>
                    </div>
                    <div className="uploaded-image">
                      <img
                        src={formData?.profile_image ?? dummyAvatar}
                        alt=""
                      />
                    </div>
                    <input
                      type="file"
                      {...register("profile_image", { required: false })}
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <FormErrorMessage error={errors.profile_image} />
                </div>

                <div className="upload-cnic-card">
                  <div className="upload-field">
                    <label htmlFor="cnic_image">CNIC Front Side</label>
                    <label htmlFor="cnic_image" className="field-wrapper">
                      <div className="file-name-section">
                        <div className="inner-content">
                          <div className="upload-text">
                            <div className="upload-icon">
                              <SmallUploadSvg className="icon" />
                            </div>
                            <span className="text">
                              Upload National Identity Card Front Side / B Form
                              ()
                            </span>
                          </div>
                          <div className="upload-restrictions">
                            Select a 300x300 jpg image with maximum size of 400
                            KB
                          </div>
                        </div>
                      </div>
                      <div className="uploaded-image cnic">
                        <img src={formData.cnic_image ?? squareAvatar} alt="" />
                      </div>
                      <input
                        type="file"
                        id="cnic_image"
                        {...register("cnic_image", { required: false })}
                        onChange={handleFileUpload}
                        className="d-none"
                      />
                    </label>
                    <FormErrorMessage error={errors.cnic_image} />
                  </div>
                  <div className="upload-field">
                    <label htmlFor="cnic_front_image">CNIC Back Side</label>
                    <label className="field-wrapper" htmlFor="cnic_front_image">
                      <div className="file-name-section">
                        <div className="inner-content">
                          <div className="upload-text">
                            <div className="upload-icon">
                              <SmallUploadSvg className="icon" />
                            </div>
                            <span className="text">
                              Upload National Identity Card Back Side / B Form
                              ()
                            </span>
                          </div>
                          <div className="upload-restrictions">
                            Select a 300x300 jpg image with maximum size of 400
                            KB
                          </div>
                        </div>
                      </div>
                      <div className="uploaded-image cnic">
                        <img
                          src={formData?.cnic_back_image ?? squareAvatar}
                          alt=""
                        />
                      </div>
                      <input
                        type="file"
                        id="cnic_front_image"
                        {...register("cnic_back_image", { required: false })}
                        className="d-none"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <FormErrorMessage error={errors.cnic_back_image} />
                  </div>
                </div>
                <div className="upload-field">
                  <label htmlFor="domicile_certificate">
                    Domicile Certificate
                  </label>
                  <label
                    className="field-wrapper"
                    htmlFor="domicile_certificate"
                  >
                    <div className="file-name-section">
                      <div className="inner-content">
                        <div className="upload-text">
                          <div className="upload-icon">
                            <SmallUploadSvg className="icon" />
                          </div>
                          <span className="text">
                            Upload Domicile Certificate
                          </span>
                        </div>
                        <div className="upload-restrictions">
                          Select a 300x300 jpg image with maximum size of 400 KB
                        </div>
                      </div>
                    </div>
                    <div className="uploaded-image domicile">
                      <img
                        src={formData?.domicile_certificate ?? squareAvatar}
                        alt=""
                      />
                    </div>
                    <input
                      type="file"
                      id="domicile_certificate"
                      {...register("domicile_certificate", { required: false })}
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <FormErrorMessage error={errors.domicile_certificate} />
                </div>
                <div className="submit-buttons">
                  <div className="buttons">
                    <button
                      type="button"
                      className="lg-rounded-btn"
                      onClick={handleSubmit((data: any) => onSubmit(data, 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Step1>
            ) : currentStep === 2 ? (
              <Step2>
                <div className="common-fields">
                  <div className="input-field">
                    <label>Name of Guardian</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="text"
                          {...register("guardian_name", { required: true })}
                          value={formData.guardian_name}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.guardian_name} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Status</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("guardian_status", { required: true })}
                          value={formData.guardian_status}
                          onChange={handleChange}
                        >
                          <option value="">Select status</option>
                          <option value="alive">Alive</option>
                          <option value="not_alive">Not Alive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Relationship with Guardian</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("guardian_relation", { required: true })}
                          value={formData.guardian_relation}
                          onChange={handleChange}
                        >
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="uncle">Uncle</option>
                          <option value="grandfather">Grandfather</option>
                          <option value="husband">Husband</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.guardian_relation} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Guardian’s Monthly Income</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="number"
                          {...register("guardian_monthly_income", {
                            required: true,
                          })}
                          value={formData.guardian_monthly_income}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage
                        error={errors.guardian_monthly_income}
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Guardian’s Occupation</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="text"
                          {...register("guardian_occupation", {
                            required: true,
                          })}
                          value={formData.guardian_occupation}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.guardian_occupation} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Guardian’s CNIC</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="text"
                          {...register("guardian_cnic", { required: true })}
                          value={formData.guardian_cnic}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.guardian_cnic} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Guardian’s Mobile Number</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="tel"
                          {...register("guardian_phone", { required: true })}
                          value={formData.guardian_phone}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.guardian_phone} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Guardian’s Email Address(Optional)</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="email"
                          {...register("guardian_email", { required: false })}
                          value={formData.guardian_email}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.email} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Dependent Family Members on Guardian’s Income</label>
                    <div className="field-wrap">
                      <div className="field">
                        <input
                          type="number"
                          {...register("guardian_dependent", {
                            required: true,
                          })}
                          value={formData.guardian_dependent}
                          onChange={handleChange}
                        />
                      </div>
                      <FormErrorMessage error={errors.guardian_dependent} />
                    </div>
                  </div>
                </div>
                <div className="submit-buttons">
                  <div className="buttons">
                    <button className="lg-rounded-btn gray" onClick={goBack}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="lg-rounded-btn"
                      onClick={handleSubmit((data: any) => onSubmit(data, 2))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Step2>
            ) : currentStep === 3 ? (
              <Step3>
                <div className="common-fields">
                  <div className="input-field">
                    <label>Blood Group</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("blood_group", { required: true })}
                          value={formData.blood_group}
                          onChange={handleChange}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="AB+">AB+</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.blood_group} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>How did you now first about university?</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("how_did_know", { required: true })}
                          value={formData.how_did_know}
                          onChange={handleChange}
                        >
                          <option value="From Friends">From Friends</option>
                          <option value="From Neighbours">Neighbours</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.how_did_know} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Disability</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("disability", { required: true })}
                          value={formData.disability}
                          onChange={handleChange}
                        >
                          <option value="Legs">Legs</option>
                          <option value="Eyes">Eyes</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.disability} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Religion</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("religion", { required: true })}
                          value={formData.religion}
                          onChange={handleChange}
                        >
                          <option value="Islam">Islam</option>
                          <option value="Hinduism">Hinduism</option>
                          <option value="Judism">Judism</option>
                          <option value="Christian">Christian</option>
                        </select>
                      </div>
                      <FormErrorMessage error={errors.religion} />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>Hafiz-e-Quran</label>
                    <div className="field-wrap">
                      <div className="field">
                        <select
                          {...register("is_hafiz", { required: true })}
                          value={formData.is_hafiz}
                          onChange={handleChange}
                        >
                          <option value={1}>Yes</option>
                          <option value={0}>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skills-questions">
                  <div className="radio-field">
                    <label>
                      Do you feel deficiency in IT and interpersonal skills ?
                    </label>
                    <div className="field-wrap">
                      <div className="field">
                        <label htmlFor="yes">Yes</label>
                        <input
                          type="radio"
                          id="yes"
                          value={1}
                          {...register("it_deficiency", { required: true })}
                          onChange={handleChange}
                          checked={formData.it_deficiency == 1}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="no">No</label>
                        <input
                          type="radio"
                          id="no"
                          value={0}
                          {...register("it_deficiency", { required: true })}
                          onChange={handleChange}
                          checked={formData.it_deficiency == 0}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="radio-field">
                    <label>Do you want hostel facility?</label>
                    <div className="field-wrap">
                      <div className="field">
                        <label htmlFor="yes-hostel">Yes</label>
                        <input
                          type="radio"
                          id="yes-hostel"
                          value={1}
                          {...register("hostel_check", { required: true })}
                          onChange={handleChange}
                          checked={formData.hostel_check == 1}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="no-hostel">No</label>
                        <input
                          type="radio"
                          value={0}
                          checked={formData?.hostel_check == 0}
                          id="no-hostel"
                          {...register("hostel_check", { required: true })}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="next-of-kins-section">
                  <div className="heading">
                    <span>Next of Kin Information</span>
                  </div>

                  <div className="common-fields">
                    <div className="input-field">
                      <label>Next of Kin</label>
                      <div className="field-wrap">
                        <div className="field">
                          <input
                            type="text"
                            {...register("kin_name", { required: true })}
                            value={formData.kin_name}
                            onChange={handleChange}
                          />
                        </div>
                        <FormErrorMessage error={errors.kin_name} />
                      </div>
                    </div>
                    <div className="input-field">
                      <label>Relationship with next of kin</label>
                      <div className="field-wrap">
                        <div className="field">
                          <input
                            type="text"
                            {...register("relation_with_kin", {
                              required: true,
                            })}
                            value={formData.relation_with_kin}
                            onChange={handleChange}
                          />
                        </div>
                        <FormErrorMessage error={errors.relation_with_kin} />
                      </div>
                    </div>
                    <div className="input-field">
                      <label>Next of kin CNIC</label>
                      <div className="field-wrap">
                        <div className="field">
                          <input
                            type="text"
                            {...register("kin_cnic", { required: true })}
                            value={formData.kin_cnic}
                            onChange={handleChange}
                          />
                        </div>
                        <FormErrorMessage error={errors.kin_cnic} />
                      </div>
                    </div>
                    <div className="input-field">
                      <label>Next of Kin Mobile Number</label>
                      <div className="field-wrap">
                        <div className="field">
                          <input
                            type="tel"
                            {...register("kin_phone", { required: true })}
                            value={formData.kin_phone}
                            onChange={handleChange}
                          />
                        </div>
                        <FormErrorMessage error={errors.kin_phone} />
                      </div>
                    </div>
                    <div className="input-field">
                      <label>Next of Kin Email Address(Optional)</label>
                      <div className="field-wrap">
                        <div className="field">
                          <input
                            type="email"
                            {...register("kin_email", { required: false })}
                            value={formData.kin_email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="submit-buttons">
                    <div className="buttons">
                      <button className="lg-rounded-btn gray" onClick={goBack}>
                        Back
                      </button>
                      <button
                        type="button"
                        className="lg-rounded-btn"
                        onClick={handleSubmit((data: any) => onSubmit(data, 3))}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </Step3>
            ) : (
              <Step4>
                <TableWrapper isTableOverflowing={false}>
                  <div className="header">
                    <div className="heading">
                      <span>Academic Qualification(s)</span>
                    </div>
                    <div
                      className="add-btn"
                      onClick={() => setOpenAcademicModal(true)}
                    >
                      <button className="lg-rounded-btn" type="button">
                        Add New
                      </button>
                    </div>
                  </div>
                  <div className="data-table" style={{ overflowX: "unset" }}>
                    <table
                      className="bottom-bordered-cells"
                      ref={academicTableRef}
                    >
                      <thead>
                        <tr>
                          {academicColumns.map(
                            (item: string, index: number) => {
                              return <th key={index}>{item}</th>;
                            }
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {qualifications.map(
                          (qualification: any, index: number) => {
                            return (
                              <tr>
                                <td>
                                  {qualification?.certificate_type?.title}
                                </td>
                                <td>{qualification?.roll_num}</td>
                                <td>{qualification?.board?.title}</td>
                                <td>{qualification?.passing_year}</td>
                                <td>{qualification?.total_marks}</td>
                                <td>{qualification?.obt_marks}</td>
                                <td>{qualification?.result_type?.title}</td>
                                <td>
                                  <div className="action-menu">
                                    <div
                                      className="menu-icon cp"
                                      onClick={() =>
                                        toggleAcademicDropdown(index)
                                      }
                                    >
                                      <TabPrimaryActionMenu className="icon" />
                                    </div>
                                    {qualification.isDropdownOpen && (
                                      <div className="table-menu-dropdown">
                                        <div
                                          className="particular-menu cp"
                                          onClick={() =>
                                            goToEditQualification(qualification)
                                          }
                                        >
                                          <div className="action-icon">
                                            <EditGreenTableSvg className="icon" />
                                          </div>
                                          <span className="title">Edit</span>
                                        </div>
                                        <div
                                          className="particular-menu cp"
                                          onClick={() =>
                                            handleDeleteQualification(
                                              qualification?.id
                                            )
                                          }
                                        >
                                          <div className="action-icon">
                                            <DeleteTableSvg className="icon" />
                                          </div>
                                          <span className="title">Delete</span>
                                        </div>
                                        <div
                                          className="particular-menu cp"
                                          onClick={() =>
                                            downloadQualificationDocumentByUser(
                                              qualification?.id
                                            )
                                          }
                                        >
                                          <div className="action-icon">
                                            <DownloadPrimaryTableSvg className="icon" />
                                          </div>
                                          <span className="title">
                                            Download Document
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Fragment>
                    <DataNotFound show={!isLoading && !qualifications.length} />
                  </Fragment>
                </TableWrapper>
                <TableWrapper
                  isTableOverflowing={
                    academicTableRef?.current?.scrollHeight >
                    academicTableRef?.current?.offsetHeight
                  }
                >
                  <div className="header">
                    <div className="heading">
                      <span>Entry test(s)</span>
                    </div>
                    <div
                      className="add-btn"
                      onClick={() => setOpenEntryTestModal(true)}
                    >
                      <button className="lg-rounded-btn" type="button">
                        Add New
                      </button>
                    </div>
                  </div>
                  <div className="data-table" style={{ overflowX: "unset" }}>
                    <table className="bottom-bordered-cells">
                      <thead>
                        <tr>
                          {entryTestsColumns.map(
                            (item: string, index: number) => {
                              return <th key={index}>{item}</th>;
                            }
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {entryTests.map((item: any, index: number) => {
                          return (
                            <tr>
                              <td>{item?.test?.title}</td>
                              <td>{item?.test_date}</td>
                              <td>{item?.roll_number}</td>
                              <td>{item?.total_marks}</td>
                              <td>{item?.obtained_marks}</td>
                              <td>
                                {item?.result_awaiting
                                  ? "Pending"
                                  : "Announced"}
                              </td>
                              <td>
                                <div className="action-menu">
                                  <div
                                    className="menu-icon"
                                    onClick={() =>
                                      toggleEntryTestsDropdown(index)
                                    }
                                  >
                                    <TabPrimaryActionMenu className="icon" />
                                  </div>
                                  {item.isDropdownOpen && (
                                    <div className="menu-dropdown">
                                      <div
                                        className="particular-menu cp"
                                        onClick={() => goToEditEntryTest(item)}
                                      >
                                        <div className="action-icon">
                                          <EditGreenTableSvg className="icon" />
                                        </div>
                                        <span className="title">Edit</span>
                                      </div>
                                      <div
                                        className="particular-menu cp"
                                        onClick={() =>
                                          handleDeleteEntryTest(item?.id)
                                        }
                                      >
                                        <div className="action-icon">
                                          <DeleteTableSvg className="icon" />
                                        </div>
                                        <span className="title">Delete</span>
                                      </div>
                                      <div className="particular-menu cp">
                                        <div className="action-icon">
                                          <DownloadPrimaryTableSvg className="icon" />
                                        </div>
                                        <span className="title">
                                          Download Document
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <Fragment>
                    <DataNotFound show={!isLoading && !entryTests.length} />
                  </Fragment>
                </TableWrapper>

                <div className="submit-buttons">
                  <div className="back-button">
                    <button onClick={goBack} className="lg-rounded-btn gray">
                      Back
                    </button>
                    <button
                      onClick={goToEportalHome}
                      className="lg-rounded-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Step4>
            )}
          </form>
        </FormSection>
      </EditProfileContentSection>
      {openEntryTestModal && <AddEntryTest setOpen={setOpenEntryTestModal} />}
      {openAcademicModal && <AddQualification setOpen={setOpenAcademicModal} />}
    </EditEPortalProfileMain>
  );
};

export default EditEPortalProfile;
