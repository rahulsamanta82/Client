import useUtils from "hooks/useUtils";
import { USER_APIS } from "libs/apis/user.api";
import { successToaster } from "utils/helpers/common/alert-service";
import { AddAdmissionApplicationDTO } from "utils/helpers/models/e-portal/add-admission-application.dto";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import { UpdateLinkedProgramDTO } from "utils/helpers/models/admissions/update-linked-program.dto";
import { EmployementInfoDTO } from "utils/helpers/models/e-portal/employement-info.dto";

const useEportal = () => {
  const { openExternalLink } = useUtils();
  const navigate = useNavigate();

  const getProfile = async (
    setFormData: Function,
    setOldFormData?: Function,
    setValue?: Function,
    formData?: any
  ) => {
    const response = await USER_APIS.getProfile();

    if (response?.status) {
      const { users_meta } = response?.response;
      const data: any = { ...response?.response, ...users_meta[0] };
      delete data?.users_meta;
      if (formData && setOldFormData && setValue) {
        for (let key in formData) {
          if (key === "users_meta") {
            for (let prop in data[key][0]) {
              formData[prop] = data[key][0][prop];
              setValue(prop, formData[prop]);
            }
          } else {
            formData[key] = data[key];
            setValue(key, formData[key]);
          }
        }
        setFormData({ ...formData });
        setOldFormData({ ...formData });
      } else {
        setFormData({ ...data });
      }
    }
  };

  const getCitiesByUser: any = async (setData: Function) => {
    const response = await USER_APIS.getCitiesByUser({ per_page: "All" });
    if (response?.status) {
      setData(response?.response);
    }
  };

  const updateUserPersonalInfo = async (
    formData: any,
    goNext: any,
    step: any
  ) => {
    const response = await USER_APIS.updateUserPersonalInfo(formData);
    if (response?.status) {
      successToaster(response?.message);
      goNext(step);
    }
  };

  const updateUserGuradianInfo = async (
    formData: any,
    goNext: any,
    step: any
  ) => {
    const response = await USER_APIS.updateUserGuradianInfo(formData);
    if (response?.status) {
      successToaster(response?.message);
      goNext(step);
    }
  };

  const updateUserAdditionalInfo = async (
    formData: any,
    goNext: any,
    step: any
  ) => {
    const response = await USER_APIS.updateUserAdditionalInfo(formData);
    if (response?.status) {
      successToaster(response?.message);
      goNext(step);
    }
  };

  const createEntryTest = async (
    formData: FormData,
    handleCloseModal: Function,
    addMore: boolean = false,
    resetForm: Function
  ) => {
    const response = await USER_APIS.createEntryTest(formData);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        resetForm();
      } else {
        handleCloseModal();
      }
    }
  };

  const updateEntryTest = async (
    id: number,
    formData: FormData,
    handleCloseModal: Function
  ) => {
    const response = await USER_APIS.updateEntryTest(id, formData);
    if (response?.status) {
      successToaster(response?.message);
      handleCloseModal();
    }
  };

  const getEntryTestsByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getEntryTestsByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const createQualification = async (
    formData: FormData,
    handleCloseModal: Function,
    addMore: boolean = false,
    resetForm: Function
  ) => {
    const response = await USER_APIS.createQualification(formData);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        resetForm();
      } else {
        handleCloseModal();
      }
    }
  };

  const updateQualification = async (
    id: number,
    formData: FormData,
    handleCloseModal: Function
  ) => {
    const response = await USER_APIS.updateQualification(id, formData);
    if (response?.status) {
      successToaster(response?.message);
      handleCloseModal();
    }
  };

  const getQualificationsByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1, status: "1" },
    setPagination?: Function
  ) => {
    const response = await USER_APIS.getQualificationsByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getStudentsApplications = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentsApplications(queryParams);
  };

  const getStudentProgramsToApply = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentProgramsToApply(queryParams);
  };

  const getStudentCertificateLevels = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentProgramsToApply(queryParams);
  };

  const getStudentDegreeCertificates = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentDegreeCertificates(queryParams);
  };

  const getSubjectsByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getSubjectsByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getStudentBoards = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentBoards(queryParams);
  };

  const getBoardsByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getBoardsByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getCertificateLevelsByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getCertificateLevelsByUser(queryParams);
    // console.log(response);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getDegreeCertificatesByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getDegreeCertificatesByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };
  const getJobTypesByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getJobTypesByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getResultTypesByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getResultTypesByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const deleteQualificationByUser = async (
    id: number,
    setQualifications: Function
  ) => {
    const response = await USER_APIS.deleteQualificationByUser(id);
    if (response?.status) {
      successToaster(response?.message);
      getQualificationsByUser(setQualifications);
    }
  };

  const downloadQualificationDocumentByUser = async (id: number) => {
    const response = await USER_APIS.downloadQualificationDocumentByUser(id);
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };

  const deleteEntryTestByUser = async (id: number, setEntryTests: Function) => {
    const response = await USER_APIS.deleteEntryTestByUser(id);
    if (response?.status) {
      successToaster(response?.message);
      getEntryTestsByUser(setEntryTests);
    }
  };

  const getEntryTestTypesByUser = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getEntryTestTypesByUser(queryParams);
    if (response?.status) {
      setData(response?.response);
    }
  };

  const getAdmissionPrograms = async (
    setPrograms: Function,
    queryParams: any = {}
  ) => {
    const response = await USER_APIS.getAdmissionPrograms(queryParams);
    if (response) {
      setPrograms(response.programs);
    }
  };

  const submitAdmissionApplication = async (
    body: AddAdmissionApplicationDTO
  ) => {
    const response = await USER_APIS.submitAdmissionApplication(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.eportalAdmissionsListing);
    }
  };

  const getStudentApplications = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getStudentApplications(queryParams);

    const data = response?.response;
    if (data) {
      setData(data?.programs);
    }
  };

  const createEmployementInfo = async (
    body: any,
    setOpen: Function,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await USER_APIS.createEmployementInfo(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      if (addMore) {
        reset();
      } else {
        setOpen(false);
      }
    }
  };

  const updateEmployementInfo = async (
    id: number,
    body: any,
    setOpen: Function
  ) => {
    const response = await USER_APIS.updateEmployementInfo(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      setOpen(false);
    }
  };

  const getEmployementInfos = async (setData: Function) => {
    const response = await USER_APIS.getEmployementInfos({ per_page: "All" });
    const { status, response: data = [] } = response || {};
    if (status) {
      setData(data);
    }
  };

  const getEmployementInfoById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await USER_APIS.getEmployementInfoById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteEmployementInfo = async (id: number, setData: Function) => {
    const response = await USER_APIS.deleteEmployementInfo(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getEmployementInfos(setData);
    }
  };
  const createPublicationInfo = async (
    body: any,
    setOpen: Function,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await USER_APIS.createPublicationInfo(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      if (addMore) {
        reset();
      } else {
        setOpen(false);
      }
    }
  };

  const updatePublicationInfo = async (
    id: number,
    body: any,
    setOpen: Function
  ) => {
    const response = await USER_APIS.updatePublicationInfo(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      setOpen(false);
    }
  };

  const getPublicationInfos = async (setData: Function) => {
    const response = await USER_APIS.getPublicationInfos({ per_page: "All" });
    const { status, response: data = [] } = response || {};
    if (status) {
      setData(data);
    }
  };

  const getPublicationInfoById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await USER_APIS.getPublicationInfoById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deletePublicationInfo = async (id: number, setData: Function) => {
    const response = await USER_APIS.deletePublicationInfo(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getPublicationInfos(setData);
    }
  };
  const createReferenceInfo = async (
    body: any,
    setOpen: Function,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await USER_APIS.createReferenceInfo(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      if (addMore) {
        reset();
      } else {
        setOpen(false);
      }
    }
  };

  const updateReferenceInfo = async (
    id: number,
    body: any,
    setOpen: Function
  ) => {
    const response = await USER_APIS.updateReferenceInfo(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      setOpen(false);
    }
  };

  const getReferenceInfos = async (setData: Function) => {
    const response = await USER_APIS.getReferenceInfos({ per_page: "All" });
    const { status, response: data = [] } = response || {};
    if (status) {
      setData(data);
    }
  };

  const getReferenceInfoById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await USER_APIS.getReferenceInfoById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteReferenceInfo = async (id: number, setData: Function) => {
    const response = await USER_APIS.deleteReferenceInfo(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getReferenceInfos(setData);
    }
  };
  const createJobApplication = async (body: any, setOpenModal: Function) => {
    const response = await USER_APIS.createJobApplication(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      setOpenModal(false);
    }
  };

  const updateJobApplication = async (
    id: number,
    body: any,
    setOpen: Function
  ) => {
    const response = await USER_APIS.updateJobApplication(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(siteRoutes.eportalAppliedJobListing);
    }
  };

  const getJobApplications = async (setData: Function) => {
    const response = await USER_APIS.getJobApplications({ per_page: "All" });
    const { status, response: data = [] } = response || {};
    if (status) {
      setData(data);
    }
  };

  const getJobApplicationById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await USER_APIS.getJobApplicationById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobApplication = async (id: number, setData: Function) => {
    const response = await USER_APIS.deleteJobApplication(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobApplications(setData);
    }
  };

  const getJobDesignations = async (
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await USER_APIS.getJobDesignations(queryParams);
    const { response: data = [], status } = response || {};
    if (status) setData(data);
  };

  const checkJobEligibility = async (job_id: number, setOpenJobModal: Function, setJobDepts: Function, setJobCampuses: Function, setJobTypes: Function) => {
    const response = await USER_APIS.checkJobEligibility({ job_id });
    const { status, response: data } = response || {};
    const { campuses = [], departments = [], job_types = [] } = data || {};
    if (status) {
      setOpenJobModal(true);
      setJobCampuses(campuses);
      setJobDepts(departments);
      setJobTypes(job_types);
    }
  }

  const getJobsToApply = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
    const response = await USER_APIS.getJobsToApply(queryParams);
    const { status } = response || {};
    if (status) {
      const data = response?.response?.data;
      if (data) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        if (setPagination) {
          setPagination({ per_page, totalRecords, page });
        }
        setData(data);
      } else {
        setData(response?.response);
      }
    }
  }

  return {
    getProfile,
    getJobsToApply,
    getJobTypesByUser,
    getJobDesignations,
    checkJobEligibility,
    getCitiesByUser,
    getStudentApplications,
    submitAdmissionApplication,
    updateUserPersonalInfo,
    updateUserGuradianInfo,
    updateUserAdditionalInfo,
    createQualification,
    updateQualification,
    createEntryTest,
    updateEntryTest,
    deleteEntryTestByUser,
    getBoardsByUser,
    getCertificateLevelsByUser,
    getDegreeCertificatesByUser,
    getEntryTestsByUser,
    getQualificationsByUser,
    getResultTypesByUser,
    deleteQualificationByUser,
    downloadQualificationDocumentByUser,
    getEntryTestTypesByUser,
    getSubjectsByUser,
    getAdmissionPrograms,
    createEmployementInfo,
    updateEmployementInfo,
    getEmployementInfoById,
    getEmployementInfos,
    deleteEmployementInfo,
    createPublicationInfo,
    updatePublicationInfo,
    getPublicationInfoById,
    getPublicationInfos,
    deletePublicationInfo,
    createReferenceInfo,
    updateReferenceInfo,
    getReferenceInfoById,
    getReferenceInfos,
    deleteReferenceInfo,
    createJobApplication,
    updateJobApplication,
    getJobApplicationById,
    getJobApplications,
    deleteJobApplication,
  };
};
export default useEportal;
