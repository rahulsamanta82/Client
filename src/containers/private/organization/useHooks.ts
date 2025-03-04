import useUtils from "hooks/useUtils";
import { ORGANIZATION_APIS } from "libs/apis/organization.api";
import { SUPER_ADMIN_APIS } from "libs/apis/super-admin.api";
import { useNavigate } from "react-router-dom";
import {
  errorToaster,
  successToaster,
} from "utils/helpers/common/alert-service";
import { errorMessages } from "utils/helpers/enums/messages.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AddBoardDTO } from "utils/helpers/models/organization/add-board.dto";
import { AddCertificateLinkDTO } from "utils/helpers/models/organization/add-certificate-link.dto";
import { AddOrgStructureDTO } from "utils/helpers/models/organization/add-org-structure.dto";
import { AddProgramDTO } from "utils/helpers/models/organization/add-program.dto";
import { AddStructureTypeDTO } from "utils/helpers/models/organization/add-structure-type.dto";
import { AddSubjectDTO } from "utils/helpers/models/organization/add-subject.dto";
import { AddSuperAdminDTO } from "utils/helpers/models/organization/add-super-admin.dto";

const useOrganization = () => {
  const { downloadFileWithUrl, openExternalLink } = useUtils();
  const navigate = useNavigate();

  const createOrganization = async (body: FormData) => {
    const response = await ORGANIZATION_APIS.createOrganization(body);
    if (response?.status) {
      navigate(siteRoutes.organizationListing);
      successToaster(response?.message);
    }
  };

  const updateOrganization = async (body: FormData, id: number) => {
    const response = await ORGANIZATION_APIS.updateOrganization(body, id);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.organizationListing);
    }
  };

  const deleteOrganization = async (
    id: number,
    setData?: Function,
    pagination?: any,
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteOrganization(id);
    if (response) {
      successToaster(response?.message);
      if (setData && pagination && setPagination) {
        getOrganizations(setData, pagination, setPagination);
      } else {
        navigate(siteRoutes.organizationListing);
      }
    } else {
      errorToaster(response?.message);
    }
  };

  const getOrganizations = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getOrganizations(queryParams);
    const data = response?.data?.data;
    if (data) {
      const {
        total: totalRecords,
        current_page: page,
        per_page,
      } = response?.data;
      if (setPagination) {
        setPagination({ per_page, totalRecords, page });
      }
      setData(data);
    }
  };

  const getOrganizationById = async (
    id: number,
    getValues: Function,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getOrganizationById(id);
    const { data } = response;
    if (getValues && setValue && setFormData) {
      for (let key in getValues()) {
        if (key === "district" || key === "city") {
          setValue(key, data[key]?.id ?? data[key]);
        } else {
          setValue(key, response?.data[key]);
        }
      }
      setValue("password", Math.random());
      setFormData({ ...getValues() });
    }
  };

  const downloadOrganizationsExcelFile = async () => {
    const response = await ORGANIZATION_APIS.downloadOrganizationsExcelFile();
    if (response?.url) {
      downloadFileWithUrl(response?.url);
    } else {
      errorToaster(response?.message);
    }
  };

  const downloadOrganizationsPdfFile = async () => {
    const response = await ORGANIZATION_APIS.downloadOrganizationsPdfFile();
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };

  const getOrganizationByIdViewPage = async (id: number, setData: Function) => {
    const response = await ORGANIZATION_APIS.getOrganizationById(id);
    if (response?.status) {
      const { data } = response;
      setData(data);
    }
  };

  const createStructureTypeSuperAdmin = async (body: any) => {
    const response = await ORGANIZATION_APIS.createStructureTypeSuperAdmin(
      body
    );
    if (response?.status) {
      navigate(
        `${siteRoutes.structureTypeListing}?organizationId=${body?.organizations_id}`
      );
      successToaster(response?.message);
    }
  };

  const updateStructureTypeSuperAdmin = async (
    body: AddStructureTypeDTO,
    structureTypeId: number,
    organizationId: number
  ) => {
    const response: any = await ORGANIZATION_APIS.updateStructureTypeSuperAdmin(
      body,
      structureTypeId,
      organizationId
    );
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.structureTypeListing);
    }
  };

  const deleteStructureTypeSuperAdmin = async (
    structureTypeId: number,
    organizationId: number,
    setData: Function,
    pagination: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteStructureTypeSuperAdmin(
      structureTypeId,
      organizationId
    );
    if (response?.status) {
      successToaster(response?.message);
      getStructureTypesSuperAdmin(
        organizationId,
        setData,
        pagination,
        setPagination
      );
    }
  };

  const getStructureTypesSuperAdmin = async (
    organizations_id: number,
    setData: Function,
    pagination: any,
    setPagination: Function,
    search: string = ""
  ) => {
    const { per_page, page } = pagination;
    const queryParams = { per_page, page, search, organizations_id };
    if (!organizations_id) {
      delete (queryParams as any).organizations_id;
    }
    const response = await ORGANIZATION_APIS.getStructureTypesSuperAdmin(
      queryParams
    );
    const data = response?.response;
    if (data) {
      const { total, per_page } = data;
      setPagination({ ...pagination, per_page, totalRecords: total });
      setData(data?.data);
    }
  };

  const getStructureTypeByIdSuperAdmin = async (
    structureTypeId: number,
    organizationId: number,
    getValues: Function,
    setValue: Function
  ) => {
    const response = await ORGANIZATION_APIS.getStructureTypeByIdSuperAdmin(
      structureTypeId,
      organizationId
    );
    const data = response?.response;
    if (data) {
      for (let key in getValues()) {
        setValue(key, data![key]);
      }
    }
  };

  const createStructureTypeAdmin = async (body: AddStructureTypeDTO) => {
    const response = await ORGANIZATION_APIS.createStructureTypeAdmin(body);
    if (response?.status) {
      navigate(siteRoutes.structureTypeListing);
      successToaster(response?.message);
    }
  };

  const updateStructureTypeAdmin = async (
    body: AddStructureTypeDTO,
    structureTypeId: number,
    addMore: boolean,
    reset: Function
  ) => {
    const response: any = await ORGANIZATION_APIS.updateStructureTypeAdmin(
      body,
      structureTypeId
    );
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.structureTypeListing);
      }
    }
  };

  const deleteStructureTypeAdmin = async (
    structureTypeId: number,
    setData: Function,
    pagination: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteStructureTypeAdmin(
      structureTypeId
    );
    if (response?.status) {
      successToaster(response?.message);
      getStructureTypesAdmin(setData, pagination, setPagination);
    }
  };

  const getStructureTypesAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1, status: "1" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getStructureTypesAdmin(
      queryParams
    );
    const data = response?.response;
    if (data) {
      const { total: totalRecords, per_page, current_page: page } = data;
      if (queryParams && setPagination) {
        setPagination({ page, per_page, totalRecords });
        setData(data?.data);
      } else {
        setData(data);
      }
    }
  };

  const getStructureTypeByIdAdmin = async (
    structureTypeId: number,
    getValues: Function,
    setValue: Function
  ) => {
    const response = await ORGANIZATION_APIS.getStructureTypeByIdAdmin(
      structureTypeId
    );
    const data = response?.response;
    if (data) {
      for (let key in getValues()) {
        setValue(key, data![key]);
      }
    }
  };

  const createProgram = async (
    body: AddStructureTypeDTO,
    addMore: boolean = false,
    reset: Function
  ) => {
    const response = await ORGANIZATION_APIS.createProgram(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.programListing);
      }
    }
  };

  const updateProgram = async (id: number, body: AddProgramDTO) => {
    const response = await ORGANIZATION_APIS.updateProgram(body, id);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.programListing);
    }
  };

  const deleteProgram = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteProgram(id);
    if (response?.status) {
      successToaster(response?.message);
      getPrograms(setData, queryParams, setPagination);
    } else {
      errorToaster(
        response?.errors?.length
          ? response?.errors[0]
          : errorMessages.somethingWentWrong
      );
    }
  };

  const getPrograms = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getPrograms(queryParams);
    const data = response?.response;
    if (data) {
      const { total: totalRecords, current_page: page, per_page } = data;
      if (setPagination) {
        setData(data?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };
  const getProgramsForEntryTest = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getProgramsForEntryTest(
      queryParams
    );
    const data = response?.response;
    if (data) {
      const { total: totalRecords, current_page: page, per_page } = data;
      if (setPagination) {
        setData(data?.data);
        setPagination({ totalRecords, per_page, page });
      } else {
        setData(response?.response);
      }
    }
  };

  const getProgramById = async (
    id: number,
    getValues: Function,
    setValue: Function,
    setFormData: Function,
    setOrgStructures: Function
  ) => {
    const response = await ORGANIZATION_APIS.getProgramById(id);
    const data = response?.response;
    console.log(data.category_type_id);

    if (data) {
      getOrgStructures(setOrgStructures, {
        categories_types_id: data?.category_type_id,
        per_page: "All",
      });
      for (let key in data) {
        if (key === "category" || key === "level") {
          setValue(key, data[key].id);
        } else {
          setValue(key, data[key]);
        }
      }
    }

    setFormData(getValues());
  };

  const createOrgStructure = async (
    body: FormData,
    addMore: boolean,
    stepsArray: any[],
    setStepsArray: Function,
    setCurrentStep: Function,
    setFormData: Function,
    setValue: Function
  ) => {
    const response = await ORGANIZATION_APIS.createOrgStructure(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        stepsArray.map((step: any, index: number) => {
          step.completed = false;
          step.active = false;
          if (index === 0) step.active = true;
        });
        setStepsArray([...stepsArray]);
        setCurrentStep(1);
        for (let key in new AddOrgStructureDTO()) {
          setValue(key as keyof AddOrgStructureDTO, undefined);
        }
        setFormData({ ...new AddOrgStructureDTO() });
      } else {
        navigate(siteRoutes.orgStructureListing);
      }
    }
  };

  const updateOrgStructure = async (id: number, body: FormData) => {
    const response = await ORGANIZATION_APIS.updateOrgStructure(body, id);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.orgStructureListing);
    }
  };

  const deleteOrgStructure = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteOrgStructure(id);
    console.log(response, "response");
    if (response?.status) {
      successToaster(response?.message);
      getOrgStructures(setData, queryParams, setPagination);
    }
  };

  const getOrgStructures = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1, status: "1" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getOrgStructures(queryParams);
    const data = response?.data;
    console.log(response);

    if (data) {
      if (queryParams && setPagination) {
        const { total: totalRecords, per_page, current_page: page } = data;
        setPagination({ per_page, totalRecords, page });
        setData(data?.data);
      } else {
        setData(data);
      }
    }
  };

  const getOrgStructureById = async (
    id: number,
    getValues: Function,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getOrgStructureById(id);
    const data = response?.response;
    if (data) {
      for (let key in data) {
        setValue(key as keyof AddOrgStructureDTO, data[key]);
      }
      setFormData(getValues());
    }
  };

  const getCitiesSuperAdmin = async (
    setCities: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getCitiesSuperAdmin({ per_page });
    if (response?.response) {
      setCities(response?.response);
    }
  };

  const getDistrictsSuperAdmin = async (
    setDistricts: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getDistrictsSuperAdmin({
      per_page,
    });
    if (response?.response) {
      setDistricts(response?.response);
    }
  };

  const getStatesBySuperAdmin = async (
    setStates: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getStatesSuperAdmin({
      per_page,
      country_id: 167,
    });
    if (response?.data) {
      setStates(response?.data);
    }
  };

  const getCitiesAdmin = async (
    setCities: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getCitiesAdmin({ per_page });    
    if (response?.response) {
      setCities(response?.response);
    }
  };

  const getDistrictsAdmin = async (
    setDistricts: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getDistrictsAdmin({ per_page });
    if (response?.response) {
      setDistricts(response?.response);
    }
  };

  const getStatesAdmin = async (
    setStates: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getStatesAdmin({
      per_page,
      country_id: 167,
    });
    if (response?.data) {
      setStates(response?.data);
    }
  };

  const getCertificateLevelsAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getCertificateLevels(queryParams);
    const data = response?.response;
    if (data) {
      setData(data);
    }
  };

  const getDepartmentsByStructureTypeId = async (
    id: number,
    setData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getDepartmentsByStructureTypeId(
      id
    );
    const data = response?.response;
    if (data) {
      setData(data);
    }
  };

  const downloadProgramsExcelFile = async () => {
    const response = await ORGANIZATION_APIS.downloadProgramsExcelFile();
    if (response?.url) {
      downloadFileWithUrl(response?.url);
    }
  };

  const downloadProgramsPdfFile = async () => {
    const response = await ORGANIZATION_APIS.downloadProgramsPdfFile();
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };
  const downloadOrgStructuresExcelFile = async () => {
    const response = await ORGANIZATION_APIS.downloadOrgStructuresExcelFile();
    if (response?.url) {
      downloadFileWithUrl(response?.url);
    }
  };

  const downloadOrgStructuresPdfFile = async () => {
    const response = await ORGANIZATION_APIS.downloadOrgStructuresPdfFile();
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };

  const downloadStructureTypesExcelFileByAdmin = async () => {
    const response =
      await ORGANIZATION_APIS.downloadStructureTypesExcelFileByAdmin();
    if (response?.url) {
      downloadFileWithUrl(response?.url);
    }
  };

  const downloadStructureTypesPdfFileByAdmin = async () => {
    const response =
      await ORGANIZATION_APIS.downloadStructureTypesPdfFileByAdmin();
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };

  const downloadStructureTypesExcelFileBySuperAdmin = async () => {
    const response =
      await ORGANIZATION_APIS.downloadStructureTypesExcelFileBySuperAdmin();
    if (response?.url) {
      downloadFileWithUrl(response?.url);
    }
  };

  const downloadStructureTypesPdfFileBySuperAdmin = async () => {
    const response =
      await ORGANIZATION_APIS.downloadStructureTypesPdfFileBySuperAdmin();
    if (response?.url) {
      openExternalLink(response?.url);
    }
  };

  const createResultTypeAdmin = async (body: any) => {
    const response = await ORGANIZATION_APIS.createResultTypeAdmin(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.resultTypeListing);
    }
  };

  const updateResultTypeAdmin = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateResultTypeAdmin(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.resultTypeListing);
    }
  };

  const getResultTypesAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getResultTypesAdmin(queryParams);
    if (response?.status) {
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
  };

  const getResultTypeByIdAdmin = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getResultTypeByIdAdmin(id);
    if (response?.status) {
      const data = response?.response;
      const form_data: any = {};
      for (const key in formData) {
        setValue(key, data[key]);
        form_data[key] = data[key];
      }

      setFormData({ ...form_data });
    }
  };

  const deleteResultTypeAdmin = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteResultTypeAdmin(id);
    if (response?.status) {
      successToaster(response?.message);
      getResultTypesAdmin(setData, queryParams, setPagination);
    } else {
      errorToaster(response?.message);
    }
  };

  const createBoard = async (
    body: AddBoardDTO,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ORGANIZATION_APIS.createBoard(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.boardManagementListing);
      }
    }
  };

  const updateBoard = async (id: number, body: AddBoardDTO) => {
    const response = await ORGANIZATION_APIS.updateBoard(id, body);
    console.log(response, "response");
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.boardManagementListing);
    }
  };

  const getBoards = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.getBoards(queryParams);
    if (response?.status) {
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
      }
    }
  };

  const getBoardById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function,
    levels: any[]
  ) => {
    const response = await ORGANIZATION_APIS.getBoardById(id);
    if (response?.status) {
      const data = response?.response;
      for (let key in formData) {
        setValue(key, data[key]);
        if (key === "level") {
          levels.forEach((level: any) => {
            if (data[key].includes(level.value)) {
              formData.level.push(level);
            }
          });
        } else {
          formData[key] = data[key];
        }
      }

      setFormData({ ...formData });
    }
  };

  const deleteBoard = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteBoard(id);
    if (response?.status) {
      successToaster(response?.message);
      getBoards(setData, queryParams, setPagination);
    }
  };

  const createSubject = async (
    body: AddSubjectDTO,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ORGANIZATION_APIS.createSubject(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.subjectManagementListing);
      }
    }
  };

  const updateSubject = async (id: number, body: AddSubjectDTO) => {
    const response = await ORGANIZATION_APIS.updateSubject(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.subjectManagementListing);
    }
  };

  const getSubjects = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getSubjects(queryParams);
    if (response?.status) {
      const data = response?.response?.data;
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.response;
        setPagination({ per_page, totalRecords, page });
        setData(data);
      } else {
        setData(response?.response);
      }
    }
  };

  const getSubjectById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getSubjectById(id);
    if (response?.status) {
      const data = response?.response;
      for (const key in formData) {
        setValue(key, data[key]);
        formData[key] = data[key];
      }

      setFormData({ ...formData });
    }
  };

  const deleteSubject = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteSubject(id);
    if (response?.status) {
      successToaster(response?.message);
      getSubjects(setData, queryParams, setPagination);
    }
  };

  const createDegreeCertificate = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ORGANIZATION_APIS.createDegreeCertificate(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(siteRoutes.certificateManagementListing);
      }
    }
  };

  const updateDegreeCertificate = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateDegreeCertificate(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.certificateManagementListing);
    }
  };

  const getDegreeCertificates = async (
    setData: Function,
    queryParams: any = { per_page: "All", page: 1 },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getDegreeCertificates(queryParams);
    if (response?.status) {
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
  };

  const getDegreeCertificateById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function,
    levels: any[]
  ) => {
    const response = await ORGANIZATION_APIS.getDegreeCertificateById(id);
    if (response?.status) {
      const data = response?.response;
      for (const key in formData) {
        if (key === "level") {
          formData[key] = levels.filter((level: any) =>
            data[key].includes(level.value)
          );
          setValue(
            key,
            formData[key].map((i: any) => i.value)
          );
        } else {
          setValue(key, data[key]);
          formData[key] = data[key];
        }
      }
      setFormData({ ...formData });
    }
  };

  const deleteDegreeCertificate = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteDegreeCertificate(id);
    if (response?.status) {
      successToaster(response?.message);
      getDegreeCertificates(setData, queryParams, setPagination);
    }
  };

  const createLinkSpecialization = async (
    body: any,
    setOpenModal: Function
  ) => {
    const response = await ORGANIZATION_APIS.createLinkSpecialization(body);
    if (response?.status) {
      successToaster(response?.message);
      setOpenModal(false);
    }
  };

  const createEntryTestLink = async (
    body: any,
    addMore: boolean,
    reset: Function
  ) => {
    const response = await ORGANIZATION_APIS.createEntryTestLink(body);
    if (response?.status) {
      successToaster(response?.message);
      if (addMore) {
        reset();
      } else {
        navigate(-1);
      }
    }
  };

  const updateEntryTestLink = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateEntryTestLink(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(-1);
    }
  };

  const getEntryTestLinks = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.getEntryTestLinks(queryParams);
    if (response?.status) {
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
      }
    }
  };

  const getEntryTestLinkById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getEntryTestLinkById(id);
    if (response?.status) {
      const data = response?.response;
      for (const key in formData) {
        setValue(key, data[key]);
        formData[key] = data[key];
      }
      setFormData({ ...formData });
    }
  };

  const deleteEntryTestLink = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteEntryTestLink(id);
    if (response?.status) {
      successToaster(response?.message);
      getEntryTestLinks(setData, queryParams, setPagination);
    }
  };

  const getLinkSpecializations = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getLinkSpecializations(
      queryParams
    );
    if (response?.status) {
      const data = response?.response?.data;
      if (data) {
        if (setPagination) {
          const {
            total: totalRecords,
            current_page: page,
            per_page,
          } = response?.response;
          setPagination({ per_page, totalRecords, page });
          setData(data);
        }
      }
    }
  };

  const updateLinkSpecialization = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateLinkSpecialization(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.linkedSpecializationListing);
    }
  };

  const deleteLinkSpecialization = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteLinkSpecialization(id);
    if (response?.status) {
      successToaster(response?.message);
      getLinkSpecializations(setData, queryParams, setPagination);
    }
  };

  const createPermission = async (body: any) => {
    const response = await ORGANIZATION_APIS.createPermission(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.permissionManagementListing);
    }
  };

  const deletePermission = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deletePermission(id);
    if (response?.status) {
      successToaster(response?.message);
      getPermissions(setData, queryParams, setPagination);
    }
  };

  const getPermissions = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getPermissions(queryParams);
    if (response?.status) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.pagination;
        setPagination({ per_page, totalRecords, page });
        setData(response?.data);
      } else {
        let data: any = { ...response?.data };
        for (let key in response?.data) {
          data[key] = { data: data[key] };
        }

        setData(data);
      }
    }
  };

  const getPermissionsByAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getPermissionsByAdmin(queryParams);
    if (response?.status) {
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.pagination;
        setPagination({ per_page, totalRecords, page });
        setData(response?.data);
      } else {
        let data: any = { ...response?.data };
        for (let key in response?.data) {
          data[key] = { data: data[key], isExpanded: false };
        }

        setData(data);
      }
    }
  };

  const createCertificateLink = async (body: AddCertificateLinkDTO) => {
    const response = await ORGANIZATION_APIS.createCertificateLink(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.certificateLinkListing);
    }
  };

  const updateCertificateLink = async (
    id: number,
    body: AddCertificateLinkDTO
  ) => {
    const response = await ORGANIZATION_APIS.updateCertificateLink(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.certificateLinkListing);
    }
  };

  const getCertificateLinks = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getCertificateLinks(queryParams);
    if (response?.status) {
      const data = response?.response?.data;
      if (data) {
        if (setPagination) {
          const {
            total: totalRecords,
            current_page: page,
            per_page,
          } = response?.response;
          setPagination({ per_page, totalRecords, page });
          setData(data);
        }
      }
    }
  };

  const getCertificateLinkById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getCertificateLinkById(id);
    if (response?.status) {
      const data = response?.response;
      for (let key in formData) {
        if (key === "skipped_certificate_ids") {
          formData[key] = JSON.parse(data[key]);
          setValue(key, formData[key]);
        } else {
          setValue(key, data[key]);
          formData[key] = data[key];
        }
      }

      setFormData({ ...formData });
    }
  };

  const deleteCertificateLink = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteCertificateLink(id);
    if (response?.status) {
      successToaster(response?.message);
      getCertificateLinks(setData, queryParams, setPagination);
    }
  };

  const createRoleBySuperAdmin = async (body: any) => {
    const response = await ORGANIZATION_APIS.createRoleBySuperAdmin(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.superRoleManagementListing);
    }
  };

  const updateRoleBySuperAdmin = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateRoleBySuperAdmin(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.superRoleManagementListing);
    }
  };

  const getRolesBySuperAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getRolesBySuperAdmin(queryParams);
    if (response?.status) {
      const data = response?.data?.data;
      if (setPagination) {
        const {
          total: totalRecords,
          current_page: page,
          per_page,
        } = response?.data;
        setPagination({ per_page, totalRecords, page });
        setData(data);
      } else {
        setData(response?.data);
      }
    }
  };

  const getRoleByIdBySuperAdmin = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getRoleByIdBySuperAdmin(id);
    if (response?.status) {
      const { data } = response;
      for (let key in formData) {
        if (key !== "permission") {
          setValue(key, data?.role[key]);
          formData[key] = data?.role[key];
        }
      }

      formData.permission = response?.data?.role_permissions.map(
        (r: any) => r.id
      );

      setValue("permission", formData.permission);

      setFormData({ ...formData });
    }
  };

  const deleteRoleByAdmin = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteRoleByAdmin(id);
    if (response?.status) {
      successToaster(response?.message);
      getRolesByAdmin(setData, queryParams, setPagination);
    }
  };

  const createRoleByAdmin = async (body: any) => {
    const response = await ORGANIZATION_APIS.createRoleByAdmin(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.roleManagementListing);
    }
  };

  const updateRoleByAdmin = async (id: number, body: any) => {
    const response = await ORGANIZATION_APIS.updateRoleByAdmin(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.roleManagementListing);
    }
  };

  const getRolesByAdmin = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await ORGANIZATION_APIS.getRolesByAdmin(queryParams);
  
    
    if (response?.status) {
      const data = response?.response?.data;
      if (data) {
        if (setPagination) {
          const {
            total: totalRecords,
            current_page: page,
            per_page,
          } = response?.response;
          setPagination({ per_page, totalRecords, page });
          setData(data);
        }else{
          setData(response?.response)
        }
      }
    }
  };

  const getRoleByIdByAdmin = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getRoleByIdByAdmin(id);
    if (response?.status) {
      const { data } = response;
      for (let key in formData) {
        if (key !== "permission") {
          setValue(key, data?.role[key]);
          formData[key] = data?.role[key];
        }
      }

      formData.permission = response?.data?.role_permissions.map(
        (r: any) => r.id
      );

      setValue("permission", formData.permission);

      setFormData({ ...formData });
    }
  };

  const deleteRoleBySuperAdmin = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteRoleBySuperAdmin(id);
    if (response?.status) {
      successToaster(response?.message);
      getRolesBySuperAdmin(setData, queryParams, setPagination);
    }
  };

  const createSuperAdmin = async (body: AddSuperAdminDTO) => {
    const response = await ORGANIZATION_APIS.createSuperAdmin(body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.superAdminManagementListing);
    }
  };

  const updateSuperAdmin = async (id: number, body: AddSuperAdminDTO) => {
    const response = await ORGANIZATION_APIS.updateSuperAdmin(id, body);
    if (response?.status) {
      successToaster(response?.message);
      navigate(siteRoutes.superAdminManagementListing);
    }
  };

  const getSuperAdmins = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.getSuperAdmins(queryParams);
    if (response?.status) {
      const data = response?.response?.data;
      if (data) {
        if (setPagination) {
          const {
            total: totalRecords,
            current_page: page,
            per_page,
          } = response?.response;
          setPagination({ per_page, totalRecords, page });
          setData(data);
        }
      }
    }
  };

  const getSuperAdminById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await ORGANIZATION_APIS.getSuperAdminById(id);
    if (response?.status) {
      const data = response?.response;
      for (let key in formData) {
        setValue(key, data[key]);
        formData[key] = data[key];
      }

      setFormData({ ...formData });
    }
  };

  const deleteSuperAdmin = async (
    id: number,
    setData: Function,
    queryParams: any,
    setPagination: Function
  ) => {
    const response = await ORGANIZATION_APIS.deleteSuperAdmin(id);
    if (response?.status) {
      successToaster(response?.message);
      getSuperAdmins(setData, queryParams, setPagination);
    }
  };

  const createBuilding = async (body: any) => {
    const response = await ORGANIZATION_APIS.createBuilding(body);
  };
  const getCertificateLevelsSuper = async (setData: Function) => {
    const response = await SUPER_ADMIN_APIS.getCertificateLevelsSuperAdmin();
    const data = response?.response?.data;
    console.log(data);

    if (data) {
      setData(data);
    }
  };
  const createCertificateLevels = async (body: any) => {
    const response = await SUPER_ADMIN_APIS.createCertificateLevels(body);
  };

  const getCountriesAdmin = async (
    setCountries: Function,
    per_page: number | string = "All"
  ) => {
    const response = await ORGANIZATION_APIS.getCountriesAdmin({ per_page });
    if (response?.data) {
      setCountries(response?.data);
    }
  };

  return {
    createCertificateLevels,
    getCertificateLevelsSuper,
    getSuperAdmins,
    getSuperAdminById,
    deleteSuperAdmin,
    updateSuperAdmin,
    createSuperAdmin,
    createRoleBySuperAdmin,
    deleteRoleBySuperAdmin,
    updateRoleBySuperAdmin,
    getRoleByIdBySuperAdmin,
    getRolesBySuperAdmin,
    createRoleByAdmin,
    deleteRoleByAdmin,
    updateRoleByAdmin,
    getRoleByIdByAdmin,
    getRolesByAdmin,
    deleteCertificateLink,
    getCertificateLinkById,
    updateCertificateLink,
    getCertificateLinks,
    createCertificateLink,
    createPermission,
    deletePermission,
    getPermissions,
    getPermissionsByAdmin,
    deleteLinkSpecialization,
    updateLinkSpecialization,
    getLinkSpecializations,
    createEntryTestLink,
    updateEntryTestLink,
    getEntryTestLinks,
    getEntryTestLinkById,
    deleteEntryTestLink,
    createDegreeCertificate,
    updateDegreeCertificate,
    getDegreeCertificates,
    getDegreeCertificateById,
    deleteDegreeCertificate,
    createOrganization,
    createLinkSpecialization,
    updateOrganization,
    updateResultTypeAdmin,
    deleteOrganization,
    getOrganizations,
    getOrganizationById,
    createProgram,
    updateProgram,
    deleteProgram,
    getProgramById,
    getPrograms,
    createOrgStructure,
    deleteOrgStructure,
    getOrgStructureById,
    getOrgStructures,
    updateOrgStructure,
    getCitiesSuperAdmin,
    getDistrictsSuperAdmin,
    getStatesBySuperAdmin,
    createStructureTypeSuperAdmin,
    deleteStructureTypeSuperAdmin,
    getStructureTypeByIdSuperAdmin,
    updateStructureTypeSuperAdmin,
    getStructureTypesSuperAdmin,
    createStructureTypeAdmin,
    updateStructureTypeAdmin,
    deleteStructureTypeAdmin,
    getStructureTypesAdmin,
    getStructureTypeByIdAdmin,
    getCitiesAdmin,
    getDistrictsAdmin,
    getStatesAdmin,
    getCertificateLevelsAdmin,
    getDepartmentsByStructureTypeId,
    getOrganizationByIdViewPage,
    downloadOrganizationsExcelFile,
    downloadOrganizationsPdfFile,
    downloadProgramsExcelFile,
    downloadOrgStructuresExcelFile,
    downloadOrgStructuresPdfFile,
    downloadProgramsPdfFile,
    downloadStructureTypesExcelFileByAdmin,
    downloadStructureTypesPdfFileByAdmin,
    downloadStructureTypesExcelFileBySuperAdmin,
    downloadStructureTypesPdfFileBySuperAdmin,
    createResultTypeAdmin,
    deleteResultTypeAdmin,
    getResultTypeByIdAdmin,
    getResultTypesAdmin,
    createBoard,
    updateBoard,
    getBoards,
    getBoardById,
    deleteBoard,
    createSubject,
    updateSubject,
    getSubjectById,
    getSubjects,
    deleteSubject,
    getProgramsForEntryTest,
    getCountriesAdmin,
  };
};

export default useOrganization;
