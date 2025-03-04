import { FC, useEffect, useState } from "react";
import { SelectCampusMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import useAcademics from "containers/private/academics/useHooks";
import useOrganization from "containers/private/organization/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";

interface AddAllocateSectionProps {
  setOpen: Function;
  selectedCourses: number[];
}

const SelectCampus: FC<AddAllocateSectionProps> = ({ setOpen, selectedCourses }) => {
  const [orgStructures, setOrgStructures] = useState<any[]>([]);
  const [campusId, setCampusId] = useState<any>();
  const { getOrgStructures } = useOrganization();
  const { addSessionCourse } = useAcademics();
  const { getQueryParams } = useUtils();
  const { session_id } = getQueryParams();

  const onSubmit = () => {
    if (campusId) {
      addSessionCourse({ tc_id: selectedCourses, campus_id: campusId, session_id });
    } else {
      warningToaster('Please select campus');
    }
  }

  useEffect(() => {
    getOrgStructures(setOrgStructures);
  }, [])

  return (
    <SelectCampusMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Select Campus</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Campus</label>
                <div className="field-wrap">
                  <div className="field">
                    <select onChange={e => setCampusId(e.target.value)} value={campusId}>
                      <option value="">Select Campus</option>
                      {orgStructures.map((structure, index) => {
                        return <option value={structure.id} key={index}>{structure.title}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button className="lg-rounded-btn" onClick={onSubmit} type="button">Save & Close</button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </SelectCampusMain>
  );
};

export default SelectCampus;
