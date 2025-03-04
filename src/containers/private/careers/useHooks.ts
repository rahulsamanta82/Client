import { CAREERS_API } from "libs/apis/careers.api";
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";

const useCareers = () => {
  const navigate = useNavigate();
  const createJobDesignation = async (body: any) => {
    const response = await CAREERS_API.createJobDesignation(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };
  const updateJobDesignation = async (id: number, body: any) => {
    const response = await CAREERS_API.updateJobDesignation(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };

  const getJobDesignations = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getJobDesignations(queryParams);
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
  };

  const getJobDesignationById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await CAREERS_API.getJobDesignationById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobDesignation = async (
    id: number,
    setData: Function,
    queryParams: any = { per_page: 10 },
    setPagination: Function
  ) => {
    const response = await CAREERS_API.deleteJobDesignationById(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobDesignations(setData, queryParams, setPagination);
    }
  };
  const createJobPost = async (body: any) => {
    const response = await CAREERS_API.createJobPost(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };
  const updateJobPost = async (id: number, body: any) => {
    const response = await CAREERS_API.updateJobPost(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };

  const getJobPosts = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getJobPosts(queryParams);
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
  };

  const getJobPostById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await CAREERS_API.getJobPostById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobPost = async (
    id: number,
    setData: Function,
    queryParams: any = { per_page: 10 },
    setPagination: Function
  ) => {
    const response = await CAREERS_API.deleteJobPost(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobPosts(setData, queryParams, setPagination);
    }
  };
  const createJobType = async (body: any) => {
    const response = await CAREERS_API.createJobType(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };
  const updateJobType = async (id: number, body: any) => {
    const response = await CAREERS_API.updateJobType(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };

  const getJobTypes = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getJobTypes(queryParams);
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
  };

  const getJobTypeById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await CAREERS_API.getJobTypeById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobType = async (
    id: number,
    setData: Function,
    queryParams: any = { per_page: 10 },
    setPagination: Function
  ) => {
    const response = await CAREERS_API.deleteJobType(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobTypes(setData, queryParams, setPagination);
    }
  };
  const createJobBatch = async (body: any) => {
    const response = await CAREERS_API.createJobBatch(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };
  const updateJobBatch = async (id: number, body: any) => {
    const response = await CAREERS_API.updateJobBatch(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };

  const getJobBatches = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getJobBatches(queryParams);
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
  };

  const getJobBatchById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await CAREERS_API.getJobBatchById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobBatch = async (
    id: number,
    setData: Function,
    queryParams: any = { per_page: 10 },
    setPagination: Function
  ) => {
    const response = await CAREERS_API.deleteJobBatch(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobBatches(setData, queryParams, setPagination);
    }
  };
  const createJobTemplate = async (body: any) => {
    const response = await CAREERS_API.createJobTemplate(body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };
  const updateJobTemplate = async (id: number, body: any) => {
    const response = await CAREERS_API.updateJobTemplate(id, body);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      navigate(-1);
    }
  };

  const getJobTemplates = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getJobTemplates(queryParams);
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
  };

  const getJobTemplateById = async (
    id: number,
    formData: any,
    setValue: Function,
    setFormData: Function
  ) => {
    const response = await CAREERS_API.getJobTemplateById(id);
    const { response: data } = response || {};
    for (let key in formData) {
      formData[key] = data[key];
      setValue(key, formData[key]);
    }

    setFormData({ ...formData });
  };

  const deleteJobTemplate = async (
    id: number,
    setData: Function,
    queryParams: any = { per_page: 10 },
    setPagination: Function
  ) => {
    const response = await CAREERS_API.deleteJobTemplate(id);
    const { status, message } = response || {};
    if (status) {
      successToaster(message);
      getJobTemplates(setData, queryParams, setPagination);
    }
  };

  const getCareerApplications = async (
    setData: Function,
    queryParams: any = { per_page: "All" },
    setPagination?: Function
  ) => {
    const response = await CAREERS_API.getCareerApplications(queryParams);
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
  };

  return {
    createJobDesignation,
    getCareerApplications,
    updateJobDesignation,
    getJobDesignations,
    getJobDesignationById,
    deleteJobDesignation,
    createJobBatch,
    updateJobBatch,
    getJobBatchById,
    getJobBatches,
    deleteJobBatch,
    createJobType,
    updateJobType,
    getJobTypeById,
    getJobTypes,
    deleteJobType,
    createJobTemplate,
    updateJobTemplate,
    getJobTemplateById,
    getJobTemplates,
    deleteJobTemplate,
    createJobPost,
    updateJobPost,
    getJobPostById,
    getJobPosts,
    deleteJobPost,
  };
};

export default useCareers;
