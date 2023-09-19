import styled from 'styled-components';

interface ISlide {
  width: number;
  order: number;
}
export const Slide = styled.div`
  height: 100%;
  width: calc(${(props: ISlide) => (props.width ? `${props.width}px` : '100%')} - 80px);
  padding-left: 40px;
  padding-right: 40px;
  order: ${(props: ISlide) => (props.order ? props.order : 0)};
`;

export const SliderCSS = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 1rem;
  margin: 0 auto;
  overflow: hidden;
`;

interface ISliderContent {
  translation: number;
  transition: number;
  width: number;
}
export const SliderContent = styled.div`
  transform: translateX(-${(props: ISliderContent) => props.translation}px);
  transition: transform ease-out ${(props: ISliderContent) => props.transition}s;
  height: 100%;
  width: ${(props: ISliderContent) => props.width}px;
  display: flex;
`;

interface IArrow {
  direction: string;
}
export const Arrow = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  ${(props: IArrow) => `${props.direction}: 0px`};
  ${(props: IArrow) => `margin-${props.direction}: -0.25rem`};
  height: 50px;
  width: 40px;
  justify-content: ${(props: IArrow) => (props.direction === 'right' ? `flex-end` : `flex-start`)};
  cursor: pointer;
  align-items: center;
  svg {
    color: var(--color-text);
  }
`;
