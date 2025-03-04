import { createGlobalStyle } from "styled-components";

const AnimationStyles = createGlobalStyle`

//toaster animation
@keyframes slideInBottom {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
} 

// rounded simple loader animation
@keyframes loader{
    0%{
        rotate: -360deg;
    }100%{
        rotate: 360deg;
    }
}
`;

export default AnimationStyles;
