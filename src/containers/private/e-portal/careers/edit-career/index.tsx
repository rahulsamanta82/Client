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
import AddQualification from "./components/add-career-qualification";
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
import AddEmployment from "./components/add-employement";
import AddPublication from "./components/add-publications";
import AddRefrence from "./components/add-refrence";
import { EmployementInfoDTO } from "utils/helpers/models/e-portal/employement-info.dto";
import { PublicationInfoDTO } from "utils/helpers/models/e-portal/publication-info.dto";
import { ReferenceInfoDTO } from "utils/helpers/models/e-portal/reference-info.dto";

interface EditEPortalProfileProps { }

const EditEPortalCareer: FC<EditEPortalProfileProps> = ({ }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const academicTableRef = useRef<any>(null);
  const [formData, setFormData] = useState<EditStudentProfile>(
    new EditStudentProfile()
  );

  const [openReferenceModal, setOpenReferenceModal] = useState<boolean>(false);
  const [openEmploymentModal, setOpenEmploymentModal] =
    useState<boolean>(false);
  const [openPublicationModal, setOpenPublicationModal] =
    useState<boolean>(false);

  const [employements, setEmployements] = useState<EmployementInfoDTO[]>([]);
  const [qualifications, setQualifications] = useState<any[]>([]);
  const [qualificationToEdit, setQualificationToEdit] = useState<any>(null);
  const [publications, setPublications] = useState<PublicationInfoDTO[]>([]);
  const [references, setReferences] = useState<ReferenceInfoDTO[]>([]);
  const [employementToEdit, setEmployementToEdit] = useState<EmployementInfoDTO | null>(null);
  const [publicationToEdit, setPublicationToEdit] = useState<PublicationInfoDTO | null>(null);
  const [referenceToEdit, setReferenceToEdit] = useState<ReferenceInfoDTO | null>(null);
  const [oldFormData, setOldFormData] = useState<EditStudentProfile>(
    new EditStudentProfile()
  );
  const [openQualificationModal, setOpenQualificationModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    getProfile,
    getCitiesByUser,
    updateUserPersonalInfo,
    getEmployementInfos,
    deleteEmployementInfo,
    getPublicationInfos,
    deletePublicationInfo,
    getReferenceInfos,
    deleteReferenceInfo,
    getQualificationsByUser,
    deleteQualificationByUser
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
  const publication: string[] = [
    "Research Article",
    "Publisher Name",
    "Author Name",
    "HEC Category ",
    "Pages",
    "Year of Publication",
    "Month of Publication",
    "Action",
  ];
  const employement: string[] = [
    "Organization",
    "Designation/ Appointment",
    "Salary Drawn",
    "From ",
    "To",
    "Duration ",
    "Reason For Leaving",
    "Action",
  ];
  const refrence: string[] = [
    "Reference Name",
    "Designation",
    "Organization",
    "Relationship",
    "Contact",
    "Email",
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
      title: "Academic Information",
      icon: GuardiansSvg,
      active: false,
      completed: false,
    },
    {
      title: "Employment Information",
      icon: AdditionalInfoSvg,
      active: false,
      completed: false,
    },
    {
      title: "Reference",
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
    } else {
      goNext(currentStep);
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
    if (!openEmploymentModal) {
      getEmployementInfos(setEmployements);
    }
  }, [openEmploymentModal]);
  useEffect(() => {
    if (!openPublicationModal) {
      getPublicationInfos(setPublications);
    }
  }, [openPublicationModal]);
  useEffect(() => {
    if (!openReferenceModal) {
      getReferenceInfos(setReferences);
    }
  }, [openReferenceModal]);
  useEffect(() => {
    if (!openQualificationModal) {
      getQualificationsByUser(setQualifications);
    }
  }, [openQualificationModal]);

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

  const toggleEmploymentDropdown = (index: number) => {
    (employements as any)[index].isDropdownOpen = !(employements as any)[index]?.isDropdownOpen;
    setEmployements([...employements]);
  };

  const handleDeleteEmployement = async (empId: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteEmployementInfo(empId, setEmployements);
    }
  }

  const handleEditEmployement = (employement: EmployementInfoDTO) => {
    setOpenEmploymentModal(true);
    setEmployementToEdit(employement);
    setEmployements([])
  }
  const toggleQualificationDropdown = (index: number) => {
    (qualifications as any)[index].isDropdownOpen = !(qualifications as any)[index]?.isDropdownOpen;
    setQualifications([...qualifications]);
  };

  const handleDeleteQualification = async (empId: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteQualificationByUser(empId, setEmployements);
    }
  }

  const handleEditQualification = (qualification: any) => {
    setOpenQualificationModal(true);
    setQualificationToEdit(qualification);
    setQualifications([]);
  }
  const toggleReferenceDropdown = (index: number) => {
    (references as any)[index].isDropdownOpen = !(references as any)[index]?.isDropdownOpen;
    setReferences([...references]);
  };

  const handleDeleteReference = async (empId: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deleteReferenceInfo(empId, setReferences);
    }
  }

  const handleEditReference = (reference: ReferenceInfoDTO) => {
    setOpenReferenceModal(true);
    setReferenceToEdit(reference);
    setReferences([])
  }

  const handleOpenEmployementModal = () => {
    setOpenEmploymentModal(true);
    setEmployementToEdit(null);
  }

  const togglePublicationDropdown = (index: number) => {
    (publications as any)[index].isDropdownOpen = !(publications as any)[index].isDropdownOpen;
    setPublications([...publications]);
  }

  const handleDeletePublication = async (empId: number) => {
    const result = await confirmationPopup();
    if (result.isConfirmed) {
      deletePublicationInfo(empId, setEmployements);
    }
  }

  const handleEditPublication = (publication: PublicationInfoDTO) => {
    setOpenPublicationModal(true);
    setPublicationToEdit(publication);
    setPublications([])
  }
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
                <TableWrapper isTableOverflowing={false}>
                  <div className="header">
                    <div className="heading">
                      <span>Academic Qualification(s)</span>
                    </div>
                    <div
                      className="add-btn"
                    >
                      <button className="lg-rounded-btn" type="button" onClick={() => setOpenQualificationModal(true)}>
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
                                <td>Computer Science</td>
                                <td>00000000000000</td>
                                <td>Federal Board</td>
                                <td>2019</td>
                                <td>1100</td>
                                <td>959</td>
                                <td>Final Result</td>
                                <td>
                                  <div className="action-menu">
                                    <div className="menu-icon cp">
                                      <TabPrimaryActionMenu
                                        className="icon"
                                        onClick={() =>
                                          toggleQualificationDropdown(index)
                                        }
                                      />
                                    </div>
                                    {qualification.isDropdownOpen && (
                                      <div className="menu-dropdown">
                                        <div className="particular-menu cp" onClick={() => handleEditQualification(qualification)}>
                                          <div className="action-icon">
                                            <EditGreenTableSvg className="icon" />
                                          </div>
                                          <span className="title">Edit</span>
                                        </div>
                                        <div className="particular-menu cp" onClick={() => handleDeleteQualification(index)}>
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
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Fragment>
                    <DataNotFound show={!isLoading && !qualifications.length} />
                  </Fragment>
                </TableWrapper>

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
                <TableWrapper isTableOverflowing={false}>
                  <div className="header">
                    <div className="heading">
                      <span>Employment Information</span>
                    </div>
                    <div
                      className="add-btn"
                      onClick={handleOpenEmployementModal}
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
                          {employement.map((item: string, index: number) => {
                            return <th key={index}>{item}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {employements.map((emp, index) => (
                          <tr key={index}>
                            <td>{emp.employer_name}</td>
                            <td>{emp.designation.title}</td>
                            <td>{emp.salary_drawn}</td>
                            <td>{emp.periodfrom}</td>
                            <td>{emp.periodto}</td>
                            <td>{emp.duration}</td>
                            <td>{emp.leavingreason}</td>

                            <td>
                              <div className="action-menu">
                                <div className="menu-icon cp">
                                  <TabPrimaryActionMenu
                                    className="icon"
                                    onClick={() =>
                                      toggleEmploymentDropdown(index)
                                    }
                                  />
                                </div>
                                {(emp as any).isDropdownOpen && (
                                  <div className="menu-dropdown">
                                    <div className="particular-menu cp" onClick={() => handleEditEmployement(emp)}>
                                      <div className="action-icon">
                                        <EditGreenTableSvg className="icon" />
                                      </div>
                                      <span className="title">Edit</span>
                                    </div>
                                    <div className="particular-menu cp" onClick={() => handleDeleteEmployement(emp.id)}>
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Fragment>
                    <DataNotFound show={!isLoading && !employements.length} />
                  </Fragment>
                </TableWrapper>
                <TableWrapper isTableOverflowing={false}>
                  <div className="header">
                    <div className="heading">
                      <span>Publications</span>
                    </div>
                    <div
                      className="add-btn"
                      onClick={() => setOpenPublicationModal(true)}
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
                          {publication.map((item: string, index: number) => {
                            return <th key={index}>{item}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {publications.map((publication, index) => {
                          return (
                            <tr>
                              <td>{publication.title}</td>
                              <td>M.Iqbal</td>
                              <td>{publication.author_name}</td>
                              <td>{publication.impact_factor}</td>
                              <td>{publication.volume_no}</td>
                              <td>{publication.publication_year}</td>
                              <td>{publication.publication_month}</td>
                              <td>
                                <div className="action-menu">
                                  <div
                                    className="menu-icon cp"
                                    onClick={() =>
                                      togglePublicationDropdown(index)
                                    }
                                  >
                                    <TabPrimaryActionMenu className="icon" />
                                  </div>
                                  {(publication as any).isDropdownOpen && (
                                    <div className="menu-dropdown">
                                      <div className="particular-menu cp" onClick={() => handleEditPublication(publication)}>
                                        <div className="action-icon">
                                          <EditGreenTableSvg className="icon" />
                                        </div>
                                        <span className="title">Edit</span>
                                      </div>
                                      <div className="particular-menu cp" onClick={() => handleDeletePublication(publication.id)}>
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
                        }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Fragment>
                    <DataNotFound show={!isLoading && !publications.length} />
                  </Fragment>
                </TableWrapper>
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
              </Step3>
            ) : (
              <Step4>
                <TableWrapper
                  isTableOverflowing={
                    academicTableRef?.current?.scrollHeight >
                    academicTableRef?.current?.offsetHeight
                  }
                >
                  <div className="header">
                    <div className="heading">
                      <span>References</span>
                    </div>
                    <div
                      className="add-btn"
                      onClick={() => setOpenReferenceModal(true)}
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
                          {refrence.map((item: string, index: number) => {
                            return <th key={index}>{item}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {references.map((reference, index) => {
                          return (
                            <tr>
                              <td>{reference.name}</td>
                              <td>{reference.designation}</td>
                              <td>{reference.organization}</td>
                              <td>{reference.relationship}</td>
                              <td>{reference.contact}</td>
                              <td>{reference.email}</td>
                              <td>
                                <div className="action-menu">
                                  <div
                                    className="menu-icon"
                                    onClick={() =>
                                      toggleReferenceDropdown(index)
                                    }
                                  >
                                    <TabPrimaryActionMenu className="icon" />
                                  </div>
                                  {(reference as any).isDropdownOpen && (
                                    <div className="menu-dropdown">
                                      <div className="particular-menu cp" onClick={() => handleEditReference(reference)}>
                                        <div className="action-icon">
                                          <EditGreenTableSvg className="icon" />
                                        </div>
                                        <span className="title">Edit</span>
                                      </div>
                                      <div
                                        className="particular-menu cp"
                                        onClick={() =>
                                          handleDeleteReference(reference?.id)
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
                    <DataNotFound show={!isLoading && !references.length} />
                  </Fragment>
                </TableWrapper>

                <div className="submit-buttons">
                  <div className="back-button">
                    <button onClick={goBack} className="lg-rounded-btn gray">
                      Back
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="lg-rounded-btn"
                      type="button"
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
      {openReferenceModal && <AddRefrence setOpen={setOpenReferenceModal} reference={referenceToEdit} />}
      {openQualificationModal && <AddQualification setOpen={setOpenQualificationModal} qualification={qualificationToEdit} />}
      {openEmploymentModal && (
        <AddEmployment setOpen={setOpenEmploymentModal} employement={employementToEdit} />
      )}
      {openPublicationModal && (
        <AddPublication setOpen={setOpenPublicationModal} publication={publicationToEdit} />
      )}
    </EditEPortalProfileMain>
  );
};

export default EditEPortalCareer;
