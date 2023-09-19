import { useState } from 'react';

type Props = {
  content: string;
  type: 'text' | 'paragraph' | 'text_para';
  limit: number;
};

export default function HiddenText({ content, type, limit }: Props) {
  const [show, setShow] = useState(false);

  const showMore = () => (
    <span className="show_more" onClick={() => setShow(!show)}>
      ...more&gt;&gt;
    </span>
  );

  const text = () => {
    const formattedContent = content.slice(0, show ? content.length : limit);
    return (
      <>
        {formattedContent}
        {showMore()}
      </>
    );
  };

  const textPara = () => {
    const formattedContent = content.slice(0, show ? content.length : limit);
    const paragraphs = formattedContent.split('\n').slice(0, show ? undefined : Math.round(limit / 100));
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i}>
            {p}
            {paragraphs.length - 1 === i && content.length > limit && !show && showMore()}
          </p>
        ))}
      </>
    );
  };

  const para = () => {
    const paragraphs = content.split('\n');
    const formattedContent = paragraphs.slice(0, show ? content.length : limit);
    return (
      <>
        {formattedContent.map((p, i) => (
          <p key={i}>
            {p}
            {formattedContent.length - 1 === i && limit < paragraphs.length && !show && showMore()}
          </p>
        ))}
      </>
    );
  };

  switch (type) {
    case 'paragraph':
      return para();
    case 'text':
      return text();
    case 'text_para':
      return textPara();
    default:
      return <></>;
  }
}
