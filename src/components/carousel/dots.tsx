import styled from 'styled-components';

interface IDot {
  active: boolean;
}

type Props = {
  slides: {
    id: number;
    url: string;
    name: string;
    summary: string;
    img: string;
  }[];
  activeIndex: number;
  handleClick: (dotIndex: number) => void;
};

export default function Dots({ slides, activeIndex, handleClick }: Props) {
  return (
    <DotsStyle>
      {slides.map((_slide, i) => (
        <Dot
          key={i}
          active={activeIndex === i}
          onClick={() => {
            handleClick(i);
          }}
        ></Dot>
      ))}
    </DotsStyle>
  );
}

const Dot = styled.span`
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props: IDot) => (props.active ? 'var(--color-text)' : 'var(--color-bg)')};
  border: 1px solid var(--color-text);
`;

const DotsStyle = styled.div`
  position: absolute;
  bottom: 1px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
