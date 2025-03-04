import { deleteRequest, getRequest, postRequest, putRequest } from "utils/helpers/common/http-methods";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import { SeatingPlanDTO } from "utils/helpers/models/testing-service/seating-plan.dto";
import { SeatingPlanRoomDTO } from "utils/helpers/models/testing-service/seating-plan-room.dto";
import { UploadResultDTO } from "utils/helpers/models/testing-service/upload-result.dto";





export const TESTING_SERVICES_APIs = {
    createTestingCenter: (body: TestingCenterDTO) => postRequest(`admin/test/centers`, body),
    updateTestingCenter: (id: number, body: any) => putRequest(`admin/test/centers/${id}`, body),
    getTestingCenters: (params: any) => getRequest(`admin/test/centers`, params),
    getTestingCenterById: (id: number) => getRequest(`admin/test/centers/${id}`),
    deleteTestingCenterById: (id: number) => deleteRequest(`admin/test/centers/${id}`),
    createTestingCenterRoom: (body: TestingCenterRoomDTO, test_center_id: string) => 
    postRequest(`admin/test/center/rooms`, { ...body, test_center_id }),
    updateTestingCenterRoom: (id: number, body: any) => putRequest(`admin/test/center/rooms/${id}`, body),
    getTestingCenterRooms: (params: any) => getRequest(`admin/test/center/rooms`, params),
    getTestingCenterRoomById: (id: number) => getRequest(`admin/test/center/rooms/${id}`),
    deleteTestingCenterRoom: (id: number) => deleteRequest(`admin/test/center/rooms/${id}`),
    createTestSchedule: (body: TestingCenterDTO) => postRequest(`admin/test/schedule`, body),
    updateTestSchedule: (id: number, body: any) => putRequest(`admin/test/schedule/${id}`, body),
    getTestSchedules: (params: any) => getRequest(`/admin/test/schedule`, params),
    getTestScheduleById: (id: number) => getRequest(`admin/test/schedule/${id}`),
    deleteTestSchedule: (id: number) => deleteRequest(`admin/test/schedule/${id}`),

   
    createSeatingPlan: (body: SeatingPlanDTO ,testScheduleId: number) => postRequest(`admin/seating/plan`, body),
    updateSeatingPlan: (id: number, body: any) => putRequest(`admin/seating/plan/${id}`, body),
    getSeatingPlans: (params: any) => getRequest(`/admin/seating/plan`, params),
    getSeatingPlanById: (id: number) => getRequest(`admin/seating/plan/${id}`),
    deleteSeatingPlan: (id: number) => deleteRequest(`admin/seating/plan/${id}`),
    generateSeatingPlan: (body: any) => postRequest(`admin/generate/seating/plan`, body),

    getCenterWiseSummary: (params: any) => getRequest(`/admin/center/wise/summary`, params),

    getApplicants: (params: any) => getRequest(`/admin/test/applications`, params),
    getBatch: (params: any) => getRequest(`/admin/batch/dropdown`, params),

    getPublishResult: (params: any) => getRequest(`/admin/publish/result`, params),
    uploadResult: (body: UploadResultDTO ) => postRequest(`admin/test/services/upload/result`, body),

    createSeatingPlanRoom: (body: SeatingPlanRoomDTO ,testScheduleId: number) => postRequest(`admin/seating_plan_rooms`, body),
    getSeatingPlanRooms: (params: any) => getRequest(`/admin/seating_plan_rooms`, params),
    getSeatingPlanRoomById: (id: number) => getRequest(`admin/seating_plan_rooms/${id}`),
    deleteSeatingPlanRoom: (id: number) => deleteRequest(`admin/seating_plan_rooms/${id}`),
    updateSeatingPlanRoom: (id: number, body: any) => putRequest(`admin/seating_plan_rooms/${id}`, body),
   
}