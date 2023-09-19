import { ClickAwayListener, IconButton, Tooltip, withStyles } from '@material-ui/core';
import { NoteAddOutlined, Remove, ReportOutlined, RotateLeft, TextFormat, Add } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decreaseFontSize, increateFontSize, resetFontSize, setFontSize, setLangs } from '../../store/actions/text.actions';
import { LOCALSTORAGE_ITEM } from '../../utils/constant';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.175)',
  },
  arrow: {
    color: 'var(--color-text)',
    opacity: 0.5,
  },
}))(Tooltip);

const langs = [LOCALSTORAGE_ITEM.EN, LOCALSTORAGE_ITEM.CN];

export default function ActionsButtons() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openTooltip, setOpenTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const language = (text: string) => {
      const lang = localStorage.getItem(text);
      if (!lang) {
        localStorage.setItem(text, '1');
        setSelected((prev) => [...prev, text]);
      } else if (lang === '1') {
        setSelected((prev) => [...prev, text]);
      }
    };
    const fontSize = Number(localStorage.getItem(LOCALSTORAGE_ITEM.FONTSIZE));
    if (isNaN(fontSize) && fontSize < 2 && fontSize > 10) {
      localStorage.setItem(LOCALSTORAGE_ITEM.FONTSIZE, '4');
    } else {
      setFontSize(dispatch, fontSize);
    }
    language(LOCALSTORAGE_ITEM.EN);
    language(LOCALSTORAGE_ITEM.CN);
  }, [dispatch]);

  useEffect(() => {
    setLangs(dispatch, { en: selected.includes(LOCALSTORAGE_ITEM.EN), cn: selected.includes(LOCALSTORAGE_ITEM.CN) });
  }, [selected, dispatch]);

  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setSelected(newFormats);
    langs.forEach((lang) => localStorage.setItem(lang, '0'));
    newFormats.forEach((format) => {
      localStorage.setItem(format, '1');
    });
  };

  return (
    <div className="chapter_actions">
      <IconButton title="Add Glossary">
        <NoteAddOutlined />
      </IconButton>
      <IconButton color="secondary" title="Report Chapter">
        <ReportOutlined />
      </IconButton>
      <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
        <HtmlTooltip
          title={
            <div className="fontSize">
              <IconButton title="Reset fontsize" onClick={() => resetFontSize(dispatch)}>
                <RotateLeft />
              </IconButton>
              <IconButton title="Decrease fontsize" onClick={() => decreaseFontSize(dispatch)}>
                <Remove />
              </IconButton>
              <IconButton title="Increase fontsize" onClick={() => increateFontSize(dispatch)}>
                <Add />
              </IconButton>
            </div>
          }
          interactive
          arrow
          placement="top"
          open={openTooltip}
        >
          <IconButton color="primary" onClick={() => setOpenTooltip((prev) => !prev)}>
            <TextFormat />
          </IconButton>
        </HtmlTooltip>
      </ClickAwayListener>
      <ToggleButtonGroup value={selected} onChange={handleFormat} className="toggle">
        <ToggleButton value="cn" title="Chinese Text" aria-label="chinese">
          中文
        </ToggleButton>
        <ToggleButton value="en" title="English Text" aria-label="english">
          EN
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
