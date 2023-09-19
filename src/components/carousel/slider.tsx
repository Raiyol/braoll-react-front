import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slide, SliderCSS, SliderContent, Arrow } from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './slider.scss';
import Dots from './dots';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

type Props = {
  slides: {
    id: number;
    url: string;
    name: string;
    summary: string;
    img: string;
  }[];
  autoPlay: number;
};

const getWidth = () => {
  const vw = window.innerWidth;
  if (vw > 1600) return vw * 0.75;
  else if (vw > 1024) return vw * 0.85;
  else if (vw > 768) return vw * 0.95;
  else return vw - 32;
};

/**
 * @function Slider
 */
export default function Slider(props: Props) {
  const matchesIpad = useMediaQuery('(max-width:767px)');
  const { slides } = props;

  const slideOrder = slides.map((_s, i) => {
    if (i <= Math.floor(slides.length / 2)) return i;
    return i - slides.length;
  });
  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth() * Math.floor((slides.length - 1) / 2),
    transition: 0.5,
    orders: slideOrder,
  });
  const [isTransition, setTransition] = useState(false);
  const { activeSlide, translate, transition, orders } = state;

  const autoPlayRef = useRef<VoidFunction>();
  const transitionRef = useRef<VoidFunction>();
  const resizeRef = useRef<VoidFunction>();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });
  useEffect(() => {
    const play = () => {
      autoPlayRef.current!();
    };
    const smooth = () => {
      transitionRef.current!();
    };
    const resize = () => {
      resizeRef.current!();
    };
    let isMounted = true;
    let interval = setInterval(play, props.autoPlay * 1000);
    const transitionEnd: any = window.addEventListener('transitionend', () => {
      if (isMounted) {
        setTransition(false);
        smooth();
        clearInterval(interval);
        interval = setInterval(play, props.autoPlay * 1000);
      }
    });
    const onResize: any = window.addEventListener('resize', () => {
      if (isMounted) {
        setTransition(false);
        resize();
      }
    });
    return () => {
      clearInterval(interval);
      window.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);
      isMounted = false;
    };
  }, [props.autoPlay]);

  useEffect(() => {
    if (transition === 0)
      setState((s) => {
        let temp = Object.assign({}, s);
        temp.transition = 0.5;
        return temp;
      });
  }, [transition]);
  const handleResize = () => {
    let temp = Object.assign({}, state);
    temp.transition = 0;
    temp.translate = getWidth() * 2;
    setState(temp);
  };
  const nextSlide = () => {
    if (!isTransition) {
      setTransition(true);
      setState((s) => {
        let temp = Object.assign({}, s);
        temp.translate += getWidth();
        temp.activeSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
        return temp;
      });
    }
  };

  const prevSlide = () => {
    if (!isTransition) {
      setTransition(true);
      let temp = Object.assign({}, state);
      temp.translate -= getWidth();
      temp.activeSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
      setState(temp);
    }
  };
  const dotsSlideJump = (dotIndex: number) => {
    if (!isTransition && dotIndex !== activeSlide) {
      setTransition(true);
      let temp = Object.assign({}, state);
      temp.translate += getWidth() * orders[dotIndex];
      temp.activeSlide = dotIndex;
      setState(temp);
    }
  };
  const smoothTransition = () => {
    let _orders = slideOrder;
    for (let i = 0; i < activeSlide; i++) {
      _orders.unshift(_orders.pop()!);
    }
    let temp = Object.assign({}, state);
    temp.orders = _orders;
    temp.transition = 0;
    temp.translate = getWidth() * Math.floor((slides.length - 1) / 2);
    setState(temp);
  };
  return (
    <div className="carousel">
      <SliderCSS>
        <SliderContent translation={translate} transition={transition} width={getWidth() * slides.length}>
          {slides.map((slide, i) => (
            <Slide className="slide" key={i} width={getWidth()} order={orders[i]}>
              {slide && (
                <>
                  <Link className="img" id={slide.url} to={`/novels/${slide.url}`}>
                    <img src={process.env.PUBLIC_URL + `/media/novel/${slide.img}`} alt={`${slide.name}`} />
                  </Link>
                  <h3>
                    <Link id={slide.url} to={`/novels/${slide.url}`}>
                      {slide.name}
                    </Link>
                  </h3>
                  {!matchesIpad && (
                    <div className="content">
                      {slide.summary.split('\n').map((item, key) => (
                        <p key={key}>
                          {item}
                          <br />
                        </p>
                      ))}
                    </div>
                  )}
                </>
              )}
            </Slide>
          ))}
        </SliderContent>
        <Arrow direction="left" onClick={prevSlide}>
          <IconButton color="primary">
            <ChevronLeft />
          </IconButton>
        </Arrow>
        <Arrow direction="right" onClick={nextSlide}>
          <IconButton color="primary">
            <ChevronRight />
          </IconButton>
        </Arrow>
        <Dots slides={slides} activeIndex={activeSlide} handleClick={dotsSlideJump} />
      </SliderCSS>
    </div>
  );
}
