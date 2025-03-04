import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import SurveyListing from "containers/private/qec/survey/listing";

import CreateSurvey from "containers/private/qec/survey/create";
import SurveyTypeListing from "containers/private/qec/survey-types/listing";
import CreateSurveyTypes from "containers/private/qec/survey-types/create";
import QuestionList from "containers/private/qec/question-list/listing";
import CreateQuestion from "containers/private/qec/question-list/create";

import ReportCategoriesListing from "containers/private/qec/report-categories/listing";
import CreateReportCategories from "containers/private/qec/report-categories/create";
import ManageReportListing from "containers/private/qec/manage-reports/listing";
import CreateManageReport from "containers/private/qec/manage-reports/create";
import SurveyReportListing from "containers/private/qec/survey-reports/listing";
import CreateSurveyReport from "containers/private/qec/survey-reports/create";

const QEC: FC = () => {
  const { getPathToSetRoute } = useUtils();
  return (
    <Routes>
      <Route
        path={getPathToSetRoute(siteRoutes.surveyListing, true)}
        Component={SurveyListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createSurvey, true)}
        Component={CreateSurvey}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.surveyTypeListing, true)}
        Component={SurveyTypeListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createSurveyType, true)}
        Component={CreateSurveyTypes}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.questionListing, true)}
        Component={QuestionList}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createQuestion, true)}
        Component={CreateQuestion}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.reportCategoriesList, true)}
        Component={ReportCategoriesListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createreportCategories, true)}
        Component={CreateReportCategories}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.qecReportManagelist, true)}
        Component={ManageReportListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createQecReportManage, true)}
        Component={CreateManageReport}
      />

      <Route
        path={getPathToSetRoute(siteRoutes.qecSurveyReportlist, true)}
        Component={SurveyReportListing}
      />
      <Route
        path={getPathToSetRoute(siteRoutes.createQecSurveyReport, true)}
        Component={CreateSurveyReport}
      />
    </Routes>
  );
};

export default QEC;
