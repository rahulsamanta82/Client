import AcademicSessionListing from "containers/private/academics/academic-session/listing";
import CreateAcademicStatus from "containers/private/academics/academic-status/create";
import AcademicStatusListing from "containers/private/academics/academic-status/listing";
import CourseRoomsListing from "containers/private/academics/allocate-course-rooms/listing";
import ApprovedReceiptAcknowledgedListing from "containers/private/academics/approved-receipt-acknowledged/listing";
import ViewAwardList from "containers/private/academics/approved-receipt-acknowledged/view-award-list";
import CreateAcademicAuthorityUser from "containers/private/academics/authority-users/create";
import AcademicAuthorityUsersListing from "containers/private/academics/authority-users/listing";
import CreateAcademicAuthority from "containers/private/academics/authority/create";
import AcademicAuthorityListing from "containers/private/academics/authority/listing";
import CreateClearanceAuthority from "containers/private/academics/clearance-authorities/create";
import ClearanceAuthoritiesListing from "containers/private/academics/clearance-authorities/listing";
import CreateCommonCoursesPool from "containers/private/academics/common-courses-pools/create";
import CommonCoursesPoolsListing from "containers/private/academics/common-courses-pools/listing";
import ConsolidatedResultsListing from "containers/private/academics/consolidated-results/listing";
import SectionCoursesListing from "containers/private/academics/consolidated-results/section-courses";
import SubmittedCoursesListing from "containers/private/academics/consolidated-results/submitted-courses";
import CreateAcademicCourseGroup from "containers/private/academics/course-groups/create";
import AcademicCourseGroupsListing from "containers/private/academics/course-groups/listing";
import CreateAcademicCourse from "containers/private/academics/courses/create";
import AcademicCoursesListing from "containers/private/academics/courses/listing";
import AcademicEnrollmentsListing from "containers/private/academics/enrollments/listing";
import CreateAcademicExamType from "containers/private/academics/exam-types/create";
import AcademicExamTypeListing from "containers/private/academics/exam-types/listing";
import CreateAcademicExam from "containers/private/academics/exams/create";
import AcademicExamListing from "containers/private/academics/exams/listing";
import CreateAcademicFeePlan from "containers/private/academics/fee-plans/create";
import AcademicFeePlanListing from "containers/private/academics/fee-plans/listing";
import AcademicFeeTransactionsListing from "containers/private/academics/fee-transactions";
import AddAcademicFeeReceipt from "containers/private/academics/fee-transactions/add-fee-receipt";
import CreateFeeType from "containers/private/academics/fee-types/create";
import AcademicFeeTypeListing from "containers/private/academics/fee-types/listing";
import CreateFinanceAcademicSession from "containers/private/academics/finance-academic-session/create";
import FinanceSessionStudentsListing from "containers/private/academics/finance-academic-session/finance-session-students";
import FinanceAcademicSessionListing from "containers/private/academics/finance-academic-session/listing";
import GradeBooksListing from "containers/private/academics/grade-books";
import CreateAcademicGradeTemplate from "containers/private/academics/grade-templates/create";
import AcademicGradeTemplatesListing from "containers/private/academics/grade-templates/listing";
import CreateAcademicInvigilator from "containers/private/academics/invigilators/create";
import AcademicInvigilatorsListing from "containers/private/academics/invigilators/listing";
import AcademicSessionManagementListing from "containers/private/academics/manage-academic-sessions/listing";
import ManageAcademicFeePlanListing from "containers/private/academics/manage-fee-plan";
import ManageGradeTemplates from "containers/private/academics/manage-grade-templates";
import AcademicPaidVouchersListing from "containers/private/academics/paid-vouchers";
import EnrollPoolTeacher from "containers/private/academics/pool-teachers/enroll-teacher";
import PoolTeachersListing from "containers/private/academics/pool-teachers/listing";
import StudentClearence from "containers/private/academics/student-clearance";
import CreateAcademicSemesterType from "containers/private/academics/semester-types/create";
import AcademicSemesterTypeListing from "containers/private/academics/semester-types/listing";
import AcademicStudentFine from "containers/private/academics/student-fine";
import CreateStudentGroup from "containers/private/academics/student-groups/create";
import StudentGroupsListing from "containers/private/academics/student-groups/listing";
import AcademicDeafaulterStudent from "containers/private/academics/student-list";
import CreateStudentSpecialization from "containers/private/academics/student-specialization/create";
import StudentSpecializationsListing from "containers/private/academics/student-specialization/listing";
import CreateStudentStatus from "containers/private/academics/student-status/create";
import StudentStatusListing from "containers/private/academics/student-status/listing";
import AcademicStudent from "containers/private/academics/students";
import CreateProgram from "containers/private/organization/programs/create";
import ProgramsListing from "containers/private/organization/programs/listing";
import useUtils from "hooks/useUtils";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import CreateAcademicLetterGrade from "containers/private/academics/letter-grades/create";
import AcademicLetterGradesListing from "containers/private/academics/letter-grades/listing";
import CreateAcademicSection from "containers/private/academics/sections/create";
import AcademicSectionsListing from "containers/private/academics/sections/listing";
import CreateAcademicTemplateCourse from "containers/private/academics/template-courses/create";
import AcademicTemplateCoursesListing from "containers/private/academics/template-courses/listing";
import CreateAcademicInternship from "containers/private/academics/internships/create";
import AcademicInternshipsListing from "containers/private/academics/internships/listing";
import SectionRooms from "containers/private/academics/section-rooms";
import ManageExamIncharge from "containers/private/academics/manage-exam-incharge";
import ExamIncharge from "containers/private/academics/exam-incharge";
import SyncGradeTemplates from "containers/private/academics/sync-grade-templates";
import AcademicStudentClearanceListing from "containers/private/academics/student-clearance-list";
import PlanofStudiesListing from "containers/private/academics/plan-of-studies/listing";
import CreateStudyPlan from "containers/private/academics/plan-of-studies/create";
import CreateAcademicSession from "containers/private/academics/academic-session/create";
import StudyPlanCourseListing from "containers/private/academics/plan-of-study-course";
import StudyPlanStudentListing from "containers/private/academics/plan-of-study-student/listing";
import CreateTeachersTitle from "containers/private/academics/teachers-title/create";
import TeachersTitlesListing from "containers/private/academics/teachers-title/listing";
import CreateCourseType from "containers/private/academics/course-types/create";
import CourseTypesListing from "containers/private/academics/course-types/listing";

const AcademicsRoutes: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.academicSessionListing, true)}
        Component={AcademicSessionListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicCourseListing, true)}
        Component={AcademicCoursesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicCourse, true)}
        Component={CreateAcademicCourse}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicCourseGroupListing, true)}
        Component={AcademicCourseGroupsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicCourseGroup, true)}
        Component={CreateAcademicCourseGroup}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.commonCoursesPoolsListing, true)}
        Component={CommonCoursesPoolsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createCommonCoursesPools, true)}
        Component={CreateCommonCoursesPool}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.academicSessionManagementListing,
          true
        )}
        Component={AcademicSessionManagementListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicEnrollmentsListing, true)}
        Component={AcademicEnrollmentsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.allocateCourseRoomListing, true)}
        Component={CourseRoomsListing}
      />
      <Route path="programs/create-program" Component={CreateProgram} />
      <Route path="programs/programs-listing" Component={ProgramsListing} />
      <Route
        path={getPathToSetRoute(siteRoutes.academicGradeBookListing, true)}
        Component={GradeBooksListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.approvedReceiptAcknowledgedListing,
          true
        )}
        Component={ApprovedReceiptAcknowledgedListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.appRecAckViewAwardList, true)}
        Component={ViewAwardList}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.poolTeachersListing, true)}
        Component={PoolTeachersListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.enrollPoolTeacher, true)}
        Component={EnrollPoolTeacher}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.consolidatedResultsListing, true)}
        Component={ConsolidatedResultsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.sectionCoursesListing, true)}
        Component={SectionCoursesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.submittedCoursesListing, true)}
        Component={SubmittedCoursesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.financeAcademicSessionListing, true)}
        Component={FinanceAcademicSessionListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createFinanceAcademicSession, true)}
        Component={CreateFinanceAcademicSession}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.financeSessionStudentsListing, true)}
        Component={FinanceSessionStudentsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicStudent, true)}
        Component={AcademicStudent}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicStudentFine, true)}
        Component={AcademicStudentFine}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicDefaulterStudent, true)}
        Component={AcademicDeafaulterStudent}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicFeeTypeListing, true)}
        Component={AcademicFeeTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicFeeType, true)}
        Component={CreateFeeType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicFeePlansListing, true)}
        Component={AcademicFeePlanListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicFeePlan, true)}
        Component={CreateAcademicFeePlan}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicManageFeePlanListing, true)}
        Component={ManageAcademicFeePlanListing}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.academicFeeTransactionsListing,
          true
        )}
        Component={AcademicFeeTransactionsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicFeeReceipt, true)}
        Component={AddAcademicFeeReceipt}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicPaidVouchersListing)}
        Component={AcademicPaidVouchersListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicExamTypeListing, true)}
        Component={AcademicExamTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicExamType, true)}
        Component={CreateAcademicExamType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicStudentClearence)}
        Component={StudentClearence}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicExamsListing, true)}
        Component={AcademicExamListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicExam, true)}
        Component={CreateAcademicExam}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicInvigilatorsListing, true)}
        Component={AcademicInvigilatorsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicInvigilator, true)}
        Component={CreateAcademicInvigilator}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicAuthorityListing, true)}
        Component={AcademicAuthorityListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicAuthority, true)}
        Component={CreateAcademicAuthority}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicAuthorityUsersListing, true)}
        Component={AcademicAuthorityUsersListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicAuthorityUser, true)}
        Component={CreateAcademicAuthorityUser}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicGradeTemplatesListing, true)}
        Component={AcademicGradeTemplatesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicGradeTemplate, true)}
        Component={CreateAcademicGradeTemplate}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.manageGradeTemplates)}
        Component={ManageGradeTemplates}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicStatus, true)}
        Component={CreateAcademicStatus}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicStatusListing, true)}
        Component={AcademicStatusListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createClearanceAuthority, true)}
        Component={CreateClearanceAuthority}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.clearanceAuthoritiesListing, true)}
        Component={ClearanceAuthoritiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createStudentStatus, true)}
        Component={CreateStudentStatus}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.studentStatusListing, true)}
        Component={StudentStatusListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createStudentGroup, true)}
        Component={CreateStudentGroup}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.studentGroupListing, true)}
        Component={StudentGroupsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createStudentSpecialization, true)}
        Component={CreateStudentSpecialization}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.studentSpecializationsListing, true)}
        Component={StudentSpecializationsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicSemesterType, true)}
        Component={CreateAcademicSemesterType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicSemesterTypesListing, true)}
        Component={AcademicSemesterTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicLetterGrade, true)}
        Component={CreateAcademicLetterGrade}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicLetterGradesListing, true)}
        Component={AcademicLetterGradesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicSection, true)}
        Component={CreateAcademicSection}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicSectionsListing, true)}
        Component={AcademicSectionsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicTemplateCourse, true)}
        Component={CreateAcademicTemplateCourse}
      />
      <Route
        path={getPathToSetRoute(
          siteRoutes.academicTemplateCoursesListing,
          true
        )}
        Component={AcademicTemplateCoursesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicInternship, true)}
        Component={CreateAcademicInternship}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicInternshipsListing, true)}
        Component={AcademicInternshipsListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicSectionRoomsListing, true)}
        Component={SectionRooms}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicManageExamIncharge, true)}
        Component={ManageExamIncharge}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicExamIncharge, true)}
        Component={ExamIncharge}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicSyncGradeTemplates, true)}
        Component={SyncGradeTemplates}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.studentClearenceListing, true)}
        Component={AcademicStudentClearanceListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.academicPlanofStudies, true)}
        Component={PlanofStudiesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createStudyPlans, true)}
        Component={CreateStudyPlan}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createAcademicSession, true)}
        Component={CreateAcademicSession}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.planOfStudyCourseListing, true)}
        Component={StudyPlanCourseListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.planOfStudyStudentListing, true)}
        Component={StudyPlanStudentListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createTeachersTitle, true)}
        Component={CreateTeachersTitle}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.teachersTitlesListing, true)}
        Component={TeachersTitlesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createCourseType, true)}
        Component={CreateCourseType}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.courseTypesListing, true)}
        Component={CourseTypesListing}
      />
    </Routes>
  );
};

export default AcademicsRoutes;
