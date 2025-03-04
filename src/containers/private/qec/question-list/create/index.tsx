import { FC, useState } from "react";
import {
  CreateQuestionTop,
  CreateQuestionSection,
  CreateQuestionMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { TableGreenEyeSvg } from "assets/images/common/svgs";

const CreateQuestion: FC = () => {
  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Survey Types /", path: siteRoutes.surveyTypeListing },
    { title: "Question List /", path: siteRoutes.questionListing },
    { title: "Add Question", path: siteRoutes.createQuestion },
  ];
  return (
    <CreateQuestionMain>
      <CreateQuestionTop>
        <div className="heading">
          <span className="page-heading">Add Questions </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateQuestionTop>

      <CreateQuestionSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Enter Question</label>
            <div className="field-wrap">
              <textarea name="" id=""></textarea>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateQuestionSection>
    </CreateQuestionMain>
  );
};

export default CreateQuestion;
