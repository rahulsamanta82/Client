import useUtils from "hooks/useUtils";
import { ACADEMICS_APIS } from "libs/apis/academics.api";
import { useNavigate } from "react-router-dom";
import { successToaster } from "utils/helpers/common/alert-service";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AcademicSectionDTO } from "utils/helpers/models/academics/academic-section.dto";
import { AcademicSessionDTO } from "utils/helpers/models/academics/academic-session.dto";
import { AcademicStatusDTO } from "utils/helpers/models/academics/academic-status.dto";
import { CourseTypeDTO } from "utils/helpers/models/academics/course-type.dto";
import { GradeTemplateDTO } from "utils/helpers/models/academics/grade-template.dto";
import { LetterGradeDTO } from "utils/helpers/models/academics/letter-grade.dto";
import { PlanOfStudyDTO } from "utils/helpers/models/academics/plan-of-study.dto";
import { StudentSpecializationDTO } from "utils/helpers/models/academics/student-specialization.dto";
import { StudentStatusDTO } from "utils/helpers/models/academics/student-status.dto";
import { TemplateCourseDTO } from "utils/helpers/models/academics/template-course.dto";

const useAcademics = () => {
    const navigate = useNavigate();
    const { getQueryParams } = useUtils();

    const createLetterGrade = async (body: LetterGradeDTO) => {
        const response = await ACADEMICS_APIS.createLetterGrade(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateLetterGrade = async (id: number, body: any) => {
        const response = await ACADEMICS_APIS.updateLetterGrade(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getLetterGrades = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getLetterGrades(queryParams);
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

    const getLetterGradeById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getLetterGradeById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteLetterGrade = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteLetterGradeById(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getLetterGrades(setData, queryParams, setPagination);
        }
    }
    const createGradeTemplate = async (body: GradeTemplateDTO) => {
        const response = await ACADEMICS_APIS.createGradeTemplate(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateGradeTemplate = async (id: number, body: GradeTemplateDTO) => {
        const response = await ACADEMICS_APIS.updateGradeTemplate(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getGradeTemplates = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getGradeTemplates(queryParams);
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

    const getGradeTemplateById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getGradeTemplateById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteGradeTemplate = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteGradeTemplate(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getGradeTemplates(setData, queryParams, setPagination);
        }
    }
    const createAcademicStatus = async (body: AcademicStatusDTO) => {
        const response = await ACADEMICS_APIS.createAcademicStatus(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAcademicStatus = async (id: number, body: AcademicStatusDTO) => {
        const response = await ACADEMICS_APIS.updateAcademicStatus(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getAcademicStatuses = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getAcademicStatuses(queryParams);
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

    const getAcademicStatusById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getAcademicStatusById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAcademicStatus = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteAcademicStatus(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicStatuses(setData, queryParams, setPagination);
        }
    }
    const createTemplateCourse = async (body: TemplateCourseDTO) => {
        const response = await ACADEMICS_APIS.createTemplateCourse(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateTemplateCourse = async (id: number, body: TemplateCourseDTO) => {
        const response = await ACADEMICS_APIS.updateTemplateCourse(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getTemplateCourses = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getTemplateCourses(queryParams);
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

    const getTemplateCourseById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getTemplateCourseById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteTemplateCourse = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteTemplateCourse(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getTemplateCourses(setData, queryParams, setPagination);
        }
    }
    const createStudentStatus = async (body: StudentStatusDTO) => {
        const response = await ACADEMICS_APIS.createStudentStatus(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateStudentStatus = async (id: number, body: StudentStatusDTO) => {
        const response = await ACADEMICS_APIS.updateStudentStatus(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getStudentStatuses = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getStudentStatuses(queryParams);
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

    const getStudentStatusById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getStudentStatusById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteStudentStatus = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteStudentStatus(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getStudentStatuses(setData, queryParams, setPagination);
        }
    }
    const createAcademicSection = async (body: AcademicSectionDTO) => {
        const response = await ACADEMICS_APIS.createAcademicSection(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAcademicSection = async (id: number, body: AcademicSectionDTO) => {
        const response = await ACADEMICS_APIS.updateAcademicSection(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getAcademicSections = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getAcademicSections(queryParams);
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

    const getAcademicSectionById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getAcademicSectionById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAcademicSection = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteAcademicSection(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicSections(setData, queryParams, setPagination);
        }
    }
    const createStudentSpecialization = async (body: StudentSpecializationDTO) => {
        const response = await ACADEMICS_APIS.createStudentSpecialization(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateStudentSpecialization = async (id: number, body: StudentSpecializationDTO) => {
        const response = await ACADEMICS_APIS.updateStudentSpecialization(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(siteRoutes.studentSpecializationsListing);
        }
    }

    const getStudentSpecializations = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getStudentSpecializations(queryParams);
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

    const getStudentSpecializationById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getStudentSpecializationById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteStudentSpecialization = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteStudentSpecialization(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicSections(setData, queryParams, setPagination);
        }
    }
    const createAcademicSession = async (body: AcademicSessionDTO) => {
        const response = await ACADEMICS_APIS.createAcademicSession(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateAcademicSession = async (id: number, body: AcademicSessionDTO) => {
        const response = await ACADEMICS_APIS.updateAcademicSession(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getAcademicSessions = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getAcademicSessions(queryParams);
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

    const getAcademicSessionById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getAcademicSessionById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteAcademicSession = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteAcademicSession(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicSessions(setData, queryParams, setPagination);
        }
    }
    const createCourseType = async (body: CourseTypeDTO) => {
        const response = await ACADEMICS_APIS.createCourseType(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateCourseType = async (id: number, body: CourseTypeDTO) => {
        const response = await ACADEMICS_APIS.updateCourseType(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getCourseTypes = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getCourseTypes(queryParams);
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

    const getCourseTypeById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getCourseTypeById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteCourseType = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteCourseType(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicSessions(setData, queryParams, setPagination);
        }
    }
    const createTeachersTitle = async (body: CourseTypeDTO) => {
        const response = await ACADEMICS_APIS.createTeachersTitle(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updateTeachersTitle = async (id: number, body: CourseTypeDTO) => {
        const response = await ACADEMICS_APIS.updateTeachersTitle(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getTeachersTitles = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getTeachersTitles(queryParams);
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

    const getTeachersTitleById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getTeachersTitleById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deleteTeachersTitle = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deleteTeachersTitle(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getAcademicSessions(setData, queryParams, setPagination);
        }
    }
    const createPlanOfStudy = async (body: PlanOfStudyDTO) => {
        const response = await ACADEMICS_APIS.createPlanOfStudy(body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }
    const updatePlanOfStudy = async (id: number, body: PlanOfStudyDTO) => {
        const response = await ACADEMICS_APIS.updatePlanOfStudy(id, body);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            navigate(-1);
        }
    }

    const getPlanOfStudies = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getPlanOfStudies(queryParams);
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
    const getSessionAllocatedCourses = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getSessionAllocatedCourses(queryParams);
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
    const getTeachers = async (setData: Function, queryParams: any = { per_page: 'All' }, setPagination?: Function) => {
        const response = await ACADEMICS_APIS.getTeachers(queryParams);
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

    const getPlanOfStudyById = async (id: number, formData: any, setValue: Function, setFormData: Function) => {
        const response = await ACADEMICS_APIS.getPlanOfStudyById(id);
        const { response: data } = response || {};
        for (let key in formData) {
            formData[key] = data[key];
            setValue(key, formData[key]);
        }

        setFormData({ ...formData });
    }

    const deletePlanOfStudy = async (id: number, setData: Function, queryParams: any = { per_page: 10 }, setPagination: Function) => {
        const response = await ACADEMICS_APIS.deletePlanOfStudy(id);
        const { status, message } = response || {};
        if (status) {
            successToaster(message);
            getPlanOfStudies(setData, queryParams, setPagination);
        }
    }

    const addSessionCourse = async (body: any) => {
        const response = await ACADEMICS_APIS.addSessionCourse(body);
        const { response: status, message } = response || {};
        if (status) {
            successToaster(message);
            const { session_id } = getQueryParams();
            navigate(`${siteRoutes.academicSessionManagementListing}?session_id=${session_id}`);
        }
    }
    const addCourseTeacher = async (body: any, setOpen: Function) => {
        const response = await ACADEMICS_APIS.addCourseTeacher(body);
        const { response: status, message } = response || {};
        if (status) {
            successToaster(message);
            setOpen(false);
        }
    }
    const addCourseRoom = async (body: any, setOpen: Function) => {
        const response = await ACADEMICS_APIS.addCourseRoom(body);
        const { response: status, message } = response || {};
        if (status) {
            successToaster(message);
            setOpen(false);
        }
    }
    const addCourseSection = async (body: any, setOpen: Function) => {
        const response = await ACADEMICS_APIS.addCourseSection(body);
        const { response: status, message } = response || {};
        if (status) {
            successToaster(message);
            setOpen(false);
        }
    }

    return {
        createLetterGrade,
        addCourseSection,
        addCourseRoom,
        addCourseTeacher,
        addSessionCourse,
        updateLetterGrade,
        getLetterGradeById,
        getLetterGrades,
        deleteLetterGrade,
        createTemplateCourse,
        updateTemplateCourse,
        getTemplateCourseById,
        getTemplateCourses,
        deleteTemplateCourse,
        createCourseType,
        updateCourseType,
        getCourseTypeById,
        getCourseTypes,
        deleteCourseType,
        createGradeTemplate,
        updateGradeTemplate,
        getGradeTemplateById,
        getGradeTemplates,
        deleteGradeTemplate,
        createAcademicStatus,
        getSessionAllocatedCourses,
        getTeachers,
        updateAcademicStatus,
        getAcademicStatusById,
        getAcademicStatuses,
        deleteAcademicStatus,
        createStudentStatus,
        updateStudentStatus,
        getStudentStatusById,
        getStudentStatuses,
        deleteStudentStatus,
        createAcademicSection,
        updateAcademicSection,
        getAcademicSectionById,
        getAcademicSections,
        deleteAcademicSection,
        createStudentSpecialization,
        updateStudentSpecialization,
        getStudentSpecializationById,
        getStudentSpecializations,
        deleteStudentSpecialization,
        createAcademicSession,
        updateAcademicSession,
        getAcademicSessionById,
        getAcademicSessions,
        deleteAcademicSession,
        createPlanOfStudy,
        updatePlanOfStudy,
        getPlanOfStudyById,
        getPlanOfStudies,
        deletePlanOfStudy,
        createTeachersTitle,
        updateTeachersTitle,
        getTeachersTitleById,
        getTeachersTitles,
        deleteTeachersTitle,
    }
}

export default useAcademics;