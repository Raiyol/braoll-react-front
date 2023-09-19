import { Brightness2, Brightness7 } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root{
        --color-bg: ${(props: any) => (props.night ? 'black' : 'white')};
        --primary: ${(props: any) => (props.night ? '#1e1e1e' : '#6202EE')};
        --color-text: ${(props: any) => (props.night ? 'rgba(255,255,255,0.87)' : '#24292e')};
        --color-border: ${(props: any) => (props.night ? '#6f6f6f' : '#a1a1a1')};
        --color-box: ${(props: any) => (props.night ? '#2d2d2d' : '#D8D8D8')};
    }
    .MuiSkeleton-root {
      background-color: ${(props: any) => (props.night ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.11)')};;
    }
`;

export default function ThemeSwitch() {
  const [night, setNight]: any = useState(localStorage.getItem('night'));
  useEffect(() => {
    function LocalNight() {
      if (isNaN(night) || night === null || (Number(night) !== 0 && Number(night) !== 1)) {
        localStorage.setItem('night', '0');
        setNight(0);
      } else {
        if (Number(localStorage.getItem('night')) !== Number(night)) {
          localStorage.setItem('night', night);
        }
      }
    }
    LocalNight();
  }, [night, setNight]);

  return (
    <>
      <GlobalStyle night={Number(night)} />
      <label>
        <Switch
          checked={Number(night) === 1 ? true : false}
          onChange={() => setNight(Number(night) === 1 ? 0 : 1)}
          height={23}
          width={46}
          onColor="#888"
          offColor="#a1a1a1"
          uncheckedIcon={<Brightness2 style={{ paddingLeft: '0.25rem', fontSize: '1rem' }} />}
          checkedIcon={<Brightness7 style={{ paddingLeft: '0.25rem', fontSize: '1rem' }} />}
        />
      </label>
    </>
  );
}
