import { TESTING_SERVICES_APIs } from "libs/apis/testing-services.api";
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";

const   useTestingServices = () => {
    const navigate = useNavigate();
    const createTestingCenter = async (body: any, addMore: boolean, reset: Function) => {
        const response = await TESTING_SERVICES_APIs.createTestingCenter(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (addMore) {
                reset();
            } else {
                navigate(-1);
            }
        }
    }
    const updateTestingCenter = async (id: number, body: any, shouldNavigate: boolean = true) => {
        const response = await TESTING_SERVICES_APIs.updateTestingCenter(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getTestingCenters = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestingCenters(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getTestingCenterById = async (id: number, formData: any, setFormData: Function, setValue?: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestingCenterById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            if (setValue) setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteTestingCenter = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await TESTING_SERVICES_APIs.deleteTestingCenterById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getTestingCenters(setData, queryParams, setPagination);
        }
    }
    const createTestingCenterRoom = async (body: any,test_center_id: string, addMore: boolean, reset: Function) => {
        const response = await TESTING_SERVICES_APIs.createTestingCenterRoom(body,test_center_id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (addMore) {
                reset();
            } else {
                navigate(-1);
            }
        }
    }
    const updateTestingCenterRoom = async (id: number, body: any) => {
        const response = await TESTING_SERVICES_APIs.updateTestingCenterRoom(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getTestingCenterRooms = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestingCenterRooms(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getTestingCenterRoomById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestingCenterRoomById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteTestingCenterRoom = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await TESTING_SERVICES_APIs.deleteTestingCenterRoom(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getTestingCenterRooms(setData, queryParams, setPagination);
        }
    }
    const createTestSchedule = async (body: any, addMore: boolean, reset: Function) => {
        const response = await TESTING_SERVICES_APIs.createTestSchedule(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (addMore) {
                reset();
            } else {
                navigate(-1);
            }
        }
    }
    const updateTestSchedule = async (id: number, body: any) => {
        const response = await TESTING_SERVICES_APIs.updateTestSchedule(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getTestSchedules = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestSchedules(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getTestScheduleById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await TESTING_SERVICES_APIs.getTestScheduleById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteTestSchedule = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await TESTING_SERVICES_APIs.deleteTestSchedule(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getTestingCenters(setData, queryParams, setPagination);
        }
    }

    const getSeatingPlans = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getSeatingPlans(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getSeatingPlanById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await TESTING_SERVICES_APIs.getSeatingPlanById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteSeatingPlan = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await TESTING_SERVICES_APIs.deleteSeatingPlan(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getSeatingPlans(setData, queryParams, setPagination);
        }
    }

    const createSeatingPlan = async (body: any,ScheduleId: number, addMore: boolean, reset: Function) => {
        console.log(body,ScheduleId,'dat in hook')
        const response = await TESTING_SERVICES_APIs.createSeatingPlan(body,ScheduleId);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            // if (addMore) {
            //     reset();
            // } else {
            //     navigate(-1);
            // }
        }
    }

    const updateSeatingPlan = async (body: any,shouldNavigate: boolean = true) => {
        const response = await TESTING_SERVICES_APIs.updateSeatingPlan(body.id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const getCenterWiseSummary = async (setData: Function, queryParams: any) => {
        const response = await TESTING_SERVICES_APIs.getCenterWiseSummary(queryParams); // Make sure this API function is being called
        const { status } = response || {};
        if (status) {
            const data = response?.response?.data;
            if (data) {
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    };

    const getApplicants = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getApplicants(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getBatch = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getBatch(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const getPublishResult = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getPublishResult(queryParams);
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
                setData([...data]);
            } else {
                setData(response?.response);
            }
        }
    }

    const uploadResult = async (body: any, reset: Function) => {
        const response = await TESTING_SERVICES_APIs.uploadResult(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            reset();
        }
    }

    // SEAATING PLAN ROOMS
    const getSeatingPlanRooms = async (setData: Function,setSeatingPlan :Function,setTestSchedule: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await TESTING_SERVICES_APIs.getSeatingPlanRooms(queryParams);
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
                setData([...data]);
                setSeatingPlan(data[0]?.seating_plan);
                setTestSchedule(data[0]?.seating_plan?.test_schedule);

            } else {
                setData(response?.response);
            }
        }
    }

    const getSeatingPlanRoomById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await TESTING_SERVICES_APIs.getSeatingPlanRoomById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteSeatingPlanRoom = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await TESTING_SERVICES_APIs.deleteSeatingPlanRoom(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
        }
    }

    const createSeatingPlanRoom = async (body: any,ScheduleId: number, reset: Function) => {
        const response = await TESTING_SERVICES_APIs.createSeatingPlanRoom(body,ScheduleId);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
        }
    }

    const updateSeatingPlanRoom = async (body: any,shouldNavigate: boolean = true) => {
        const response = await TESTING_SERVICES_APIs.updateSeatingPlanRoom(body.id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            if (shouldNavigate) navigate(-1);
        }
    }

    const generateSeatingPlan = async (body: any) => {
        const response = await TESTING_SERVICES_APIs.generateSeatingPlan(body); // Post request to send body data
        const { status, message } = response || {};
        if (status) {
          successToaster(message);
        }
      };
      
    

    return {
        createTestingCenter,
        updateTestingCenter,
        getTestingCenterById,
        getTestingCenters,
        deleteTestingCenter,
        createTestingCenterRoom,
        updateTestingCenterRoom,
        getTestingCenterRoomById,
        getTestingCenterRooms,
        deleteTestingCenterRoom,
        createTestSchedule,
        updateTestSchedule,
        getTestScheduleById,
        getTestSchedules,
        deleteTestSchedule,
        getSeatingPlanById,
        getSeatingPlans,
        deleteSeatingPlan,
        createSeatingPlan,
        updateSeatingPlan,
        getCenterWiseSummary,
        getApplicants,
        getBatch,
        getPublishResult,
        uploadResult,
        getSeatingPlanRooms,
        createSeatingPlanRoom,
        updateSeatingPlanRoom,
        deleteSeatingPlanRoom,
        generateSeatingPlan
    }
}

export default useTestingServices;