import { FC, useEffect, useState } from "react";
import { Step, StepCircle, StepperMain } from "./style";

interface StepperProps {
    steps: any[];
    currentStep: number;
    setCurrentStep: Function;
    invalidStep?: number | undefined;
}

const Stepper: FC<StepperProps> = ({ steps: stepsArray, currentStep, setCurrentStep, invalidStep }) => {
    const [steps, setSteps] = useState(stepsArray);


    useEffect(() => {
        steps[currentStep - 1].active = true;
        if (currentStep > 1) steps[currentStep - 2].completed = true;
        setSteps([...steps]);
    }, [currentStep]);



    const handleChangeStep = (index: number) => {
        const step = steps[index];
        if (step.completed) {
            if (step > 1) {
                if (!steps[index - 1].completed) return;
            }
            setCurrentStep(index + 1);
        }
    }

    const validSteps = (): number => {
        return steps.filter((step: any) => step.completed).length;
    }

    return (
        <StepperMain>
            {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Step
                        key={index}
                        isLast={index === steps.length - 1}
                        title={item.title}
                        active={item.active}
                        completed={item.completed}
                        step={index + 1}
                        validSteps={validSteps()}
                        // onClick={() => handleChangeStep(index)}
                        steps={steps.length}
                    >
                        <div className="step-circle">
                            <StepCircle active={item.active} completed={item.completed}>
                                <Icon className="icon" />
                            </StepCircle>
                        </div>
                        <span className="step-border"></span>
                    </Step>
                );
            })}
        </StepperMain>
    );
};
export default Stepper;
