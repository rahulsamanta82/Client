import { FC, useState } from "react";
import { AddParticularToChallanMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { AccSlotInstallmentParticular } from "utils/helpers/models/finance/acc-slot-installment-particular.dto";
import useFinance from "containers/private/finance/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";

interface EditTemplateBody {
  setOpen: Function;
  particularSlot: AccSlotInstallmentParticular;
  particularSlots: AccSlotInstallmentParticular[];
  setParticularSlots: Function;
}

const EditTemplateBody: FC<EditTemplateBody> = ({ setOpen, particularSlot, particularSlots, setParticularSlots }) => {
  const [formData, setFormData] = useState<AccSlotInstallmentParticular>(particularSlot);
  const { updateAccSlotInstallmentParticular } = useFinance();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const onSubmit = () => {
    if (formData.amount) {
      updateAccSlotInstallmentParticular(formData.id, formData, setOpen, particularSlots, setParticularSlots);
    } else {
      warningToaster('Please add valid amount');
    }
  }

  return (
    <AddParticularToChallanMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Amount Slots Installment Particular</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Amount</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" value={formData.amount} onChange={handleChange} name="amount" />
                  </div>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <div className="buttons">
                <button
                  className="lg-rounded-btn gray"
                  type="reset"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>

                <button
                  className="lg-rounded-btn"
                  type="button"
                  onClick={onSubmit}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </ContentWrapper>
      </Container>
    </AddParticularToChallanMain>
  );
};

export default EditTemplateBody;
