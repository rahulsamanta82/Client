import useUtils from "hooks/useUtils";
import { ADMISSION_APIS } from "libs/apis/admission.api";
import { useNavigate } from "react-router-dom";
import {
  errorToaster,
  successToaster,
} from "utils/helpers/common/alert-service";
import { successMessages } from "utils/helpers/enums/messages.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AddAdmissionCampaignDTO } from "utils/helpers/models/admissions/add-admission-campaign.dto";
import { AddAdmissionSessionDTO } from "utils/helpers/models/admissions/add-admission-session.dto";
import { AddMeritFormulaDTO } from "utils/helpers/models/admissions/add-merit-formula.dto";
import { AddMeritKeyDTO } from "utils/helpers/models/admissions/add-merit-key.dto";
import { AddQuotaProgramLinkDTO } from "utils/helpers/models/admissions/add-quota-program-link.dto";
import { AddSubjectLinkToCertificateDTO } from "utils/helpers/models/admissions/add-subject-link-to-certificate.dto";
import { CreateAdmissionQuotaDTO } from "utils/helpers/models/admissions/create-quota.dto";
import { UpdateLinkedProgramDTO } from "utils/helpers/models/admissions/update-linked-program.dto";

const useAdmissions = () => {
  const navigate = useNavigate();
  const { getDateFromDateTime } = useUtils();

  const createTemplateHeader = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createTemplateHeader(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.admissioneligibilityTemplateHeadersListing);
      }
    }
  };

  const getTemplateHeaders = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getTemplateHeaders(queryParams);
    if (response?.status) {
      const {
        total: totalRecords,
        current_page: page,
        per_page,
      } = response?.response;
      if (setPagination) {
        setPagination({ per_page, totalRecords, page });
        setData(response?.response?.data);
      } else {
        setData(response?.response);
      }
    }
  };

  const getTemplateHeaderById = async (
    id: number,
    formData: any,
    setFormData: Function,
    setValue: Function
  ) => {
    const response = await ADMISSION_APIS.getTemplateHeaderById(id);
    if (response?.status) {
      const data = response?.response;
      const form_data: any = {};
      for (let key in formData) {
        setValue(key, data[key]);
        form_data[key] = data[key];
      }

      setFormData(form_data);
    }
  };
  const updateTemplateHeader = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateTemplateHeader(id, body);
    if (response?.status) {
      successToaster(successMessages.templateHeaderUpdated);
      navigate(siteRoutes.admissioneligibilityTemplateHeadersListing);
    }
  };

  const deleteTemplateHeader = async (
    id: number,
    setData: Function,
    pagination: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteTemplateHeader(id);
    if (response?.status) {
      successToaster(response?.message);
      getTemplateHeaders(setData, pagination, setPagination);
    }
  };

  const createTemplateBody = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createTemplateBody(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(-1);
      }
    }
  };

  const getTemplateBodies = async (
    headerId: number,
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 }
  ) => {
    const response = await ADMISSION_APIS.getTemplateBodies(
      headerId,
      queryParams
    );
    if (response?.status) {
      setData(response?.response?.templates_body);
    }
  };

  const getTemplateBodyById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getTemplateBodyById(id);
    if (response?.status) {
      const data = response?.response;
      for (let key in formData) {
        setValue(key, data[key]);
        formData[key] = data[key];
      }

      setFormData({ ...formData });
    }
  };
  const updateTemplateBody = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateTemplateHeader(id, body);
    if (response?.status) {
      successToaster(successMessages.templateHeaderUpdated);
      navigate(siteRoutes.admissioneligibilityTemplateHeadersListing);
    }
  };

  const deleteTemplateBody = async (
    id: number,
    headerId: number,
    setData: Function,
    queryParams: any
  ) => {
    const response = await ADMISSION_APIS.deleteTemplateBody(id);
    if (response?.status) {
      successToaster(response?.message);
      getTemplateBodies(headerId, setData, queryParams);
    }
  };

  const createAdmissionQuota = async (
    body: CreateAdmissionQuotaDTO,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createAdmissionQuota(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.admissionQuotasListing);
      }
    }
  };
  const updateAdmissionQuota = async (
    id: number,
    body: CreateAdmissionQuotaDTO
  ) => {
    const response = await ADMISSION_APIS.updateAdmissionQuota(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.admissionQuotasListing);
    }
  };

  const getAdmissionQuotas = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionQuotas(queryParams);
    if (response?.status) {
      const {
        total: totalRecords,
        current_page: page,
        per_page,
      } = response?.response;
      if (setPagination) {
        setPagination({ per_page, totalRecords, page });
        setData(response?.response?.data);
      } else {
        setData(response?.response);
      }
    }
  };

  const getAdmissionQuotaById = async (
    id: number,
    setValue: Function,
    formData: CreateAdmissionQuotaDTO,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionQuotaById(id);
    if (response?.status) {
      const quota = response?.response;
      if (quota?.extra_fields && typeof quota?.extra_fields === "string") {
        quota.extra_fields = JSON.parse(quota.extra_fields);
      }
      for (const key in formData) {
        formData[key as keyof CreateAdmissionQuotaDTO] = quota[key];
        setValue(
          key as keyof CreateAdmissionQuotaDTO,
          quota[key as keyof CreateAdmissionQuotaDTO]
        );
      }
      setFormData({ ...formData });
    }
  };

  const deleteAdmissionQuota = async (
    id: number,
    setData: Function,
    pagination: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteAdmissionQuota(id);
    if (response?.status) {
      successToaster(response?.message);
      getAdmissionQuotas(setData, pagination, setPagination);
    }
  };

  const createAdmissionSession = async (body: AddAdmissionSessionDTO) => {
    const response = await ADMISSION_APIS.createAdmissionSession(body);
    if (response?.status) {
      successToaster(response.message);
      navigate(siteRoutes.admissionSessionListing);
    }
  };

  const updateAdmissionSession = async (
    id: number,
    body: AddAdmissionSessionDTO
  ) => {
    const response = await ADMISSION_APIS.updateAdmissionSession(id, body);
    if (response?.status) {
      successToaster(response.message);
      navigate(siteRoutes.admissionSessionListing);
    }
  };

  const getAdmissionSessions = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionSessions(queryParams);
    if (!response?.data?.length && response?.data) {
      const {
        total: totalRecords,
        current_page: page,
        per_page,
      } = response?.data;
      if (setPagination) {
        setPagination({ per_page, totalRecords, page });
      }
      setData(response?.data?.data ?? response?.data);
    } else {
      setData(response?.data);
    }
  };

  const getAdmissionSessionById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionSessionById(id);
    if (response?.status) {
      for (const key in response?.response) {
        if (key === "start_date" || key == "end_date") {
          formData[key] = getDateFromDateTime(response?.response[key]);
          setValue(key, formData[key]);
        } else {
          formData[key] = response?.response[key];
          setValue(key, response?.response[key]);
        }
      }

      setFormData({ ...formData });
    }
  };

  const deleteAdmissionSession = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteAdmissionSession(id);
    if (response?.status) {
      successToaster(response?.message);
      getAdmissionSessions(setData, queryParams, setPagination);
    }
  };

  const createAdmissionCampaign = async (body: AddAdmissionCampaignDTO) => {
    const response = await ADMISSION_APIS.createAdmissionCampaign(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.admissionCampaignListing);
    }
  };

  const updateAdmissionCampaign = async (
    id: number,
    body: AddAdmissionCampaignDTO
  ) => {
    const response = await ADMISSION_APIS.updateAdmissionCampaign(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.createAdmissionCampaign);
    }
  };

  const deleteAdmissionCampaign = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteAdmissionCampaign(id);
    if (response?.status) {
      successToaster(response?.message);
      getAdmissionCampaigns(setData, queryParams, setPagination);
    }
  };

  const getAdmissionCampaigns = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionCampaigns(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getAdmissionCampaignById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionCampaignById(id);
    if (response?.status) {
      for (const key in response?.response) {
        if (key === "class_start_date" || key == "fee_due_date") {
          formData[key] = getDateFromDateTime(response?.response[key]);
          setValue(key, formData[key]);
        } else {
          formData[key] = response?.response[key];
          setValue(key, response?.response[key]);
        }
      }

      setFormData({ ...formData });
    }
  };

  const getProgramsBySessionId = async (
    sessionId: number,
    setData: Function,
    queryParams: any = { per_page: "All" }
  ) => {
    const response = await ADMISSION_APIS.getProgramsBySessionId(
      sessionId,
      queryParams
    );
    if (response?.status) {
      setData(response?.response);
    }
  };

  const updateLinkedProgramsBySessionId = async (
    sessionId: number,
    body: any,
    setOpenModal: Function,
    setData: Function
  ) => {
    const response = await ADMISSION_APIS.updateLinkedProgramsBySessionId(body);
    if (response?.status) {
      successToaster(response?.message);
      getProgramsBySessionId(sessionId, setData);
      setOpenModal(false);
    }
  };

  const createMeritKey = async (
    body: AddMeritKeyDTO,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createMeritKey(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.meritKeysListing);
      }
    }
  };

  const updateMeritKey = async (id: number, body: AddMeritKeyDTO) => {
    const response = await ADMISSION_APIS.updateMeritKey(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.meritKeysListing);
    }
  };

  const getMeritKeys = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritKeys(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getMeritKeyById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritKeyById(id);
    if (response?.status) {
      for (let key in formData) {
        formData[key] = response?.response[key];
        setValue(key, formData[key]);
      }

      setFormData({ ...formData });
    }
  };

  const deleteMeritKey = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteMeritKey(id);
    if (response?.status) {
      successToaster(response?.message);
      getMeritKeys(setData, queryParams, setPagination);
    }
  };

  const createMeritFormula = async (
    body: AddMeritFormulaDTO,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createMeritFormula(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.meritListFormulaListing);
      }
    }
  };
  const updateMeritFormula = async (id: number, body: AddMeritFormulaDTO) => {
    const response = await ADMISSION_APIS.updateMeritFormula(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.meritListFormulaListing);
    }
  };

  const getMeritFormulas = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritFormulas(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getMeritFormulaById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritFormulaById(id);
    if (response?.status) {
      const data = response?.response;
      for (let key in formData) {
        formData[key] = data[key];
        setValue(key, formData[key]);
        if (key === "merit") {
          const meritStr: string = data[key];
          meritStr.split("{").map((str: string, index: number) => {
            const meritKey = str.replace("}", "");
          });
        }
      }

      setFormData({ ...formData });
    }
  };

  const deleteMeritFormula = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteMeritFormula(id);
    if (response?.status) {
      successToaster(response?.message);
      getMeritFormulas(setData, queryParams, setPagination);
    }
  };

  const createAdmissionEntryTest = async (body: any) => {
    const response = await ADMISSION_APIS.createAdmissionEntryTests(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.admissionTestTypesListing);
    }
  };

  const updateAdmissionEntryTest = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateAdmissionEntryTest(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.admissionTestTypesListing);
    }
  };

  const getAdmissionEntryTests = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionEntryTests(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getAdmissionEntryTestById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getAdmissionEntryTestById(id);
    const data = response?.response;
    if (data) {
      for (let key in data) {
        formData[key] = data[key];
        setValue(key, formData[key]);
      }
    }

    setFormData({ ...formData });
  };

  const deleteAdmissionEntryTest = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteAdmissionEntryTest(id);
    if (response?.status) {
      getAdmissionEntryTests(setData, queryParams, setPagination);
    }
  };

  const getEligibilityFieldData = async (
    headerId: number,
    setData: Function
  ) => {
    const response = await ADMISSION_APIS.getEligibilityFieldData(headerId);
    const data = response?.response;
    if (data) {
      setData(data);
    }
  };

  const createTemplateLinkToProgram = async (body: any, queryParams: any) => {
    const response = await ADMISSION_APIS.createTemplateLinkToProgram(body);
    if (response?.status) {
      const { id, title } = queryParams;
      successToaster(response?.message);
      navigate(
        `${siteRoutes.eligibilityTemplatesListing}?id=${id}&title=${title}`
      );
    }
  };

  const createQuotaHeader = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createQuotaHeader(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.quotasAdmissionListing);
      }
    }
  };

  const updateQuotaHeader = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateQuotaHeader(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.quotasAdmissionListing);
    }
  };

  const getQuotaHeaders = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getQuotaHeaders(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getQuotaHeaderById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getQuotaHeaderById(id);
    const data = response?.response;
    if (data) {
      for (let key in formData) {
        formData[key] = data[key];
        setValue(key, formData[key]);
      }

      setFormData({ ...formData });
    }
  };

  const deleteQuotaHeader = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteQuotaHeader(id);
    if (response?.status) {
      successToaster(response?.message);
      getQuotaHeaders(setData, queryParams, setPagination);
    }
  };

  const createQuotaProgramLink = async (body: any, setOpenModal: Function) => {
    const response = await ADMISSION_APIS.createQuotaProgramLink(body);
    if (response?.status) {
      successToaster(response?.message);
      setOpenModal(false);
    }
  };

  const updateQuotaProgramLink = async (
    id: number,
    body: AddQuotaProgramLinkDTO,
    setOpenModal: Function
  ) => {
    const response = await ADMISSION_APIS.updateQuotaProgramLink(id, body);
    if (response?.status) {
      successToaster(response?.message);
      setOpenModal(false);
    }
  };

  const getQuotaProgramLinks = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getQuotaProgramLinks(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getQuotaProgramLinkById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getQuotaProgramLinkById(id);
    const data = response?.response;
    if (data) {
      for (let key in formData) {
        formData[key] = data[key];
        setValue(key, formData[key]);
      }

      setFormData({ ...formData });
    }
  };

  const deleteQuotaProgramLink = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteQuotaProgramLink(id);
    if (response?.status) {
      successToaster(response?.message);
      getQuotaProgramLinks(setData, queryParams, setPagination);
    }
  };

  const createLinkSubjectToCertificate = async (
    body: any,
    setOpenModal: Function
  ) => {
    const response = await ADMISSION_APIS.createLinkSubjectToCertificate(body);
    if (response?.status) {
      successToaster(response?.message);
      setOpenModal(false);
    }
  };

  const updateLinkSubjectToCertificate = async (
    id: string,
    body: any,
    setOpenModal: Function
  ) => {
    const response = await ADMISSION_APIS.updateLinkSubjectToCertificate(
      id,
      body
    );
    if (response?.status) {
      successToaster(response?.message);
      setOpenModal(false);
    }
  };

  const getLinkSubjectToCertificates = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getLinkSubjectToCertificates(
      queryParams
    );
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getLinkSubjectToCertificateById = async (
    certificateId: number,
    formData: any,
    setValue: Function,
    setFormData: Function,
    setLinkId: Function
  ) => {
    const response = await ADMISSION_APIS.getLinkSubjectToCertificateById(
      certificateId
    );
    const data = response?.response;
    if (data) {
      for (let key in formData) {
        if (key === "subject_id") {
          formData.subject_id = data.subject_ids;
          setValue("subject_id", formData[key]);
        } else {
          formData[key] = data[key];
          setValue(key, formData[key]);
        }
      }
    }
    setLinkId(data?.id);
    setFormData({ ...formData });
  };

  const deleteLinkSubjectToCertificate = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteLinkSubjectToCertificate(id);
    if (response?.status) {
      successToaster(response?.message);
      getQuotaProgramLinks(setData, queryParams, setPagination);
    }
  };

  const mergeTemplateBodies = async (
    body: any,
    headerId: number,
    setData: Function,
    queryParams: any
  ) => {
    const response = await ADMISSION_APIS.mergeTemplateBodies(body);
    if (response?.status) {
      successToaster(response?.message);
      getTemplateBodies(headerId, setData, queryParams);
    }
  };

  const removeTemplateBodiesGroup = async (
    body: any,
    headerId: number,
    setData: Function,
    queryParams: any
  ) => {
    const response = await ADMISSION_APIS.removeTemplateBodiesGroup(body);
    if (response?.status) {
      successToaster(response?.message);
      getTemplateBodies(headerId, setData, queryParams);
    }
  };

  const createMeritListAutomation = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createMeritListAutomation(body);
    if (response.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.manageMeritListListing);
      }
    }
  };

  const updateMeritListAutomation = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateMeritListAutomation(id, body);
    if (response.status) {
      successToaster(response?.message);
      navigate(siteRoutes.manageMeritListListing);
    }
  };

  const getMeritListAutomations = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritListAutomations(queryParams);
    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getMeritListAutomationById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritListAutomationById(id);
    const data = response?.response;
    if (data) {
      for (let key in formData) {
        formData[key] = data[key];
        setValue(key, formData[key]);
      }

      setFormData({ ...formData });
    }
  };

  const deleteMeritAutomation = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteMeritListAutomation(id);
    if (response?.status) {
      successToaster(response?.message);
      getMeritListAutomations(setData, queryParams, setPagination);
    }
  };

  const getProgramLinkTemplate = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getProgramLinkTemplate(queryParams);

    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };
  const deleteProgramLinkTemplate = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteProgramLinkTemplate(id);
    if (response?.status) {
      successToaster(response?.message);
      getProgramLinkTemplate(setData, queryParams, setPagination);
    }
  };

  const createProgramLinkMerit = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ADMISSION_APIS.createProgramLinkMerit(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(-1);
      }
    }
  };

  const updateProgramLinkMerit = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.updateProgramLinkMerit(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.programLinkMeritList);
    }
  };
  const getProgramLinkMerits = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ADMISSION_APIS.getProgramLinkMerits(queryParams);

    if (response?.response || response?.data) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setData(response?.response?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getProgramLinkMeritById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ADMISSION_APIS.getProgramLinkMeritById(id);
    const data = response?.response;
    if (data) {
      for (let key in data) {
        formData[key] = data[key];
        setValue(key, formData[key]);
      }

      setFormData({ ...formData });
    }
  };
  const deleteProgramLinkMerit = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ADMISSION_APIS.deleteProgramLinkMerit(id);
    if (response?.status) {
      successToaster(response?.message);
      getProgramLinkMerits(setData, queryParams, setPagination);
    }
  };

  const updateLinkedProgram = async (
    body: UpdateLinkedProgramDTO,
    setOpen: Function,
    programs: any[],
    setPrograms: Function
  ) => {
    const response = await ADMISSION_APIS.updateLinkedProgram(body);
    if (response?.status) {
      successToaster(response?.message);
      setOpen(false);
      const index = programs.findIndex(
        (p) => p?.admission_session?.id === body.admission_session_id
      );
      programs[index].admission_session = {
        ...programs[index]?.admission_session,
        ...body,
      };
      setPrograms([...programs]);
    }
  };
  const getCampusList = async (setData: Function) => {
    const response = await ADMISSION_APIS.getCampusList();
    // console.log(response);
    if (response?.status) {
      setData(response?.response);
    }
  };
  const getStudentApplicants = async (setData: Function, queryParams: any) => {
    const response = await ADMISSION_APIS.getStudentApplicants(queryParams);
    // console.log(response);
    if (response?.status) {
      setData(response?.response);
    }
  };
  const getStudenApplicantsFilterData = async (
    setAcademicSessions: Function,
    setCategories: Function
  ) => {
    const response = await ADMISSION_APIS.getStudenApplicantsFilterData();
    if (response?.status) {
      const { academic_sessions, certificate_levels } = response?.response;
      setAcademicSessions(academic_sessions);
      setCategories(certificate_levels);
    }
  };
  const getStudentFilterData = async (setData: Function) => {
    const response = await ADMISSION_APIS.getStudenApplicantsFilterData();
    if (response?.status) {
      setData(response?.response);
    }
  };
  const getStudentApplicantFilterProgram = async (
    queryParams: any,
    setPrograms: Function,
    setQuotas: Function,
    setMeritLists: Function
  ) => {
    const response = await ADMISSION_APIS.getStudentApplicantFilterProgram(
      queryParams
    );
    if (response?.response) {
      const { programs, program_quotas, mlArray } = response?.response;
      setPrograms(programs ?? []);
      setQuotas(program_quotas ?? []);
      setMeritLists(mlArray ?? []);
    }
  };
  const getQuotaPrograms = async (setData: Function, queryParams: any) => {
    const response = await ADMISSION_APIS.getQuotaPrograms(queryParams);
    console.log(response, "programs");
    if (response?.status) {
      setData(response?.response);
    }
  };
  const getStudentProgram = async (setPrograms: Function, queryParams: any) => {
    const response = await ADMISSION_APIS.getStudentApplicantFilterProgram(
      queryParams
    );
    console.log(response);

    if (response?.status) {
      setPrograms(response?.response);
    }
  };

  const bulkLock = async (
    automationId: number,
    setData: Function,
    params: any = {}
  ) => {
    const response = await ADMISSION_APIS.bulkLock(automationId, params);
    console.log(response, "response");
    const { programs } = response?.response || {};
    if (programs) {
      setData(programs);
    }
  };

  const bulkUnlock = async (
    automationId: number,
    setData: Function,
    params: any = {}
  ) => {
    const response = await ADMISSION_APIS.bulkUnlock(automationId, params);
    const { programs } = response?.response || {};
    if (programs) {
      setData(programs);
    }
  };

  const createBulkLock = async (
    automationId: number,
    params: { programs: number[] },
    handleCloseModal: Function
  ) => {
    const response = await ADMISSION_APIS.bulkLock(automationId, params);
    if (response?.status) {
      successToaster(response?.message);
      handleCloseModal();
    }
  };
  const createBulkUnLock = async (
    automationId: number,
    params: { programs: number[] },
    handleCloseModal: Function
  ) => {
    const response = await ADMISSION_APIS.bulkUnlock(automationId, params);
    if (response?.status) {
      successToaster(response?.message);
      handleCloseModal();
    }
  };
  const downloadBulkList = async (id: number) => {
    const response = await ADMISSION_APIS.downlodBulkList(id);
    console.log(response);
  };
  const getMeritList = async (
    setData: Function,
    queryParams: any,
    setSummary: Function,
    setUrlData: Function
  ) => {
    const response = await ADMISSION_APIS.getMeritList(queryParams);
    // console.log(response?.response);

    if (response?.status) {
      const { records, summary } = response?.response || {};
      if (records) {
        setSummary(summary ?? null);
        setData(records);
      } else {
        setUrlData(response?.response);
      }
    }
    // console.log(response.status);
  };
  const editProgramLinkQuota = async (id: number, body: any) => {
    const response = await ADMISSION_APIS.editProgramLinkQuota(id, body);
    if (response?.status) {
      successToaster(response?.message);
    }
  };

  return {
    editProgramLinkQuota,
    getStudentProgram,
    getStudentFilterData,
    getMeritList,
    bulkUnlock,
    createBulkLock,
    createBulkUnLock,
    bulkLock,
    getCampusList,
    deleteLinkSubjectToCertificate,
    updateLinkedProgram,
    getProgramLinkMerits,
    deleteProgramLinkMerit,
    updateProgramLinkMerit,
    getProgramLinkMeritById,
    createProgramLinkMerit,
    getMeritListAutomationById,
    deleteMeritAutomation,
    getMeritListAutomations,
    updateMeritListAutomation,
    createMeritListAutomation,
    removeTemplateBodiesGroup,
    getLinkSubjectToCertificateById,
    mergeTemplateBodies,
    getLinkSubjectToCertificates,
    updateLinkSubjectToCertificate,
    createLinkSubjectToCertificate,
    createQuotaHeader,
    getQuotaProgramLinks,
    deleteQuotaProgramLink,
    getQuotaProgramLinkById,
    updateQuotaProgramLink,
    createQuotaProgramLink,
    getQuotaHeaderById,
    deleteQuotaHeader,
    getQuotaHeaders,
    updateQuotaHeader,
    updateMeritFormula,
    deleteAdmissionEntryTest,
    getAdmissionEntryTestById,
    updateAdmissionEntryTest,
    deleteMeritFormula,
    createAdmissionEntryTest,
    getMeritFormulaById,
    createMeritFormula,
    getMeritFormulas,
    createMeritKey,
    updateMeritKey,
    getMeritKeyById,
    deleteMeritKey,
    getMeritKeys,
    getAdmissionCampaigns,
    updateLinkedProgramsBySessionId,
    getProgramsBySessionId,
    getAdmissionCampaignById,
    deleteAdmissionCampaign,
    updateAdmissionCampaign,
    createAdmissionCampaign,
    deleteAdmissionSession,
    getAdmissionSessionById,
    updateAdmissionSession,
    getAdmissionSessions,
    getAdmissionEntryTests,
    createAdmissionSession,
    createTemplateHeader,
    getTemplateHeaders,
    getTemplateHeaderById,
    updateTemplateHeader,
    deleteTemplateHeader,
    createAdmissionQuota,
    updateAdmissionQuota,
    getAdmissionQuotas,
    getAdmissionQuotaById,
    createTemplateBody,
    getTemplateBodies,
    getTemplateBodyById,
    updateTemplateBody,
    deleteAdmissionQuota,
    deleteTemplateBody,
    getEligibilityFieldData,
    createTemplateLinkToProgram,
    getProgramLinkTemplate,
    deleteProgramLinkTemplate,
    getStudentApplicants,
    getStudenApplicantsFilterData,
    getStudentApplicantFilterProgram,
    getQuotaPrograms,
    downloadBulkList,
  };
};

export default useAdmissions;
