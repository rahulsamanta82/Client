import styled from "styled-components";

interface StepProps {
    isLast: boolean
    title: string
    active: boolean
    completed: boolean
    step: number
    validSteps: number
    steps: number;
}

export const StepperMain = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Step = styled.div<StepProps>`
    display: flex;
    width: ${({ isLast, steps }) => !isLast && `calc(100% / ${steps})`};
    cursor: pointer;

    .step-circle{
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        position: relative;
        &::after{
            content: ${({ title }) => `"${title}"`};
            position: absolute;
            z-index: 2;
            top: 60px;
            font-size: 16px;
            font-weight: 500;
            display: block;
            color:  ${({ completed, step, validSteps, active }) => (completed && validSteps >= step) ? 'var(--spring-green)' : active ? 'var(--primary)' : 'var(--black-text)'};
            min-width: 200px;
            white-space: nowrap;
            text-align: center;

            @media screen and (max-width: 1080px){
                display: none;
            }
        }
    }
    .step-border{
        display: ${({ isLast }) => isLast && 'none'};
        width: 100%;
        border-top: 2px solid ${({ completed, step, validSteps }) => (completed && validSteps > step) ? 'var(--spring-green)' : completed ? 'var(--primary)' : 'var(--gray-light)'};
        margin-top: 1.5em;
    }
`;

export const StepCircle = styled.div<{ active: boolean, completed: boolean }>`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid ${({ active, completed }) => {
        return completed ? 'var(--spring-green)' : active ? 'var(--primary)' : 'var(--gray-light)'
    }};

    .icon path{
        fill: ${({ active, completed }) => completed ? 'var(--spring-green)' : active ? 'var(--primary)' : 'var(--gray-light)'};
    }
`;