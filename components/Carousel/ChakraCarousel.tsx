import React, {
    useLayoutEffect,
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef,
    ReactElement
} from "react";

import {
    useMediaQuery,
    useTheme,
    VStack,
    Button,
    Flex,
    Box
} from "@chakra-ui/react";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { motion, useAnimation, useMotionValue } from "framer-motion";
import useBoundingRect from "../../hooks/useBoundingRect";

const MotionFlex = motion(Flex);

const transitionProps = {
    stiffness: 400,
    type: "spring",
    damping: 60,
    mass: 3
};

interface Props {
    children?: any,
    gap?: any,
    setTrackIsActive?: any,
    initSliderWidth?: any,
    setActiveItem?: any,
    activeItem?: any,
    constraint?: any,
    itemWidth?: any,
    positions?: any,
    trackIsActive?: any,
    multiplier?: any,
    index?: any
}

function ChakraCarousel({ children, gap }: Props): ReactElement {
    const [trackIsActive, setTrackIsActive] = useState(false);
    const [multiplier, setMultiplier] = useState(0.35);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [activeItem, setActiveItem] = useState(0);
    const [constraint, setConstraint] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    const initSliderWidth = useCallback((width) => setSliderWidth(width), []);

    const positions = useMemo(
        () => children.map((_: any, index: number) => -Math.abs((itemWidth + gap) * index)),
        [children, itemWidth, gap]
    );

    const { breakpoints } = useTheme();

    const [isBetweenBaseAndMd] = useMediaQuery(
        `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`
    );

    const [isBetweenMdAndXl] = useMediaQuery(
        `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`
    );

    const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

    useEffect(() => {
        if (isBetweenBaseAndMd) {
            setItemWidth(sliderWidth - gap);
            setMultiplier(0.65);
            setConstraint(1);
        }
        if (isBetweenMdAndXl) {
            setItemWidth(sliderWidth / 2 - gap);
            setMultiplier(0.5);
            setConstraint(2);
        }
        if (isGreaterThanXL) {
            setItemWidth(sliderWidth / 3 - gap);
            setMultiplier(0.35);
            setConstraint(3);
        }
    }, [isBetweenBaseAndMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap]);

    const sliderProps = {
        setTrackIsActive,
        initSliderWidth,
        setActiveItem,
        activeItem,
        constraint,
        itemWidth,
        positions,
        gap
    };

    const trackProps = {
        setTrackIsActive,
        trackIsActive,
        setActiveItem,
        sliderWidth,
        activeItem,
        constraint,
        multiplier,
        itemWidth,
        positions,
        gap
    };

    const itemProps = {
        setTrackIsActive,
        trackIsActive,
        setActiveItem,
        activeItem,
        constraint,
        itemWidth,
        positions,
        gap
    };

    return (
        <Slider {...sliderProps}>
            <Track {...trackProps}>
                {children.map((child: any, index: number) => (
                    <Item {...itemProps} index={index} key={index}>
                        {child}
                    </Item>
                ))}
            </Track>
        </Slider>
    );
}

const Slider = ({
    setTrackIsActive,
    initSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    positions,
    children,
    gap
}: Props): ReactElement => {
    //@ts-ignore
    const [ref, { width }] = useBoundingRect();

    useLayoutEffect(() => initSliderWidth(Math.round(width)), [
        width,
        initSliderWidth
    ]);

    const handleFocus = () => setTrackIsActive(true);

    const handleDecrementClick = () => {
        setTrackIsActive(true);
        !(activeItem === positions.length - positions.length) &&
            setActiveItem((prev: number) => prev - 1);
    };

    const handleIncrementClick = () => {
        setTrackIsActive(true);
        !(activeItem === positions.length - constraint) &&
            setActiveItem((prev: any) => prev + 1);
    };

    return (
        <>
            <Box
                //@ts-ignore
                ref={ref}
                w={{ base: "100%", md: `calc(100% + ${gap}px)` }}
                ml={{ base: 0, md: `-${gap / 2}px` }}
                px={`${gap / 2}px`}
                position="relative"
                overflow="hidden"
                _before={{
                    bgGradient: "linear(to-r, base.d400, transparent)",
                    position: "absolute",
                    w: `${gap / 2}px`,
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    left: 0,
                    top: 0
                }}
                _after={{
                    bgGradient: "linear(to-l, base.d400, transparent)",
                    position: "absolute",
                    w: `${gap / 2}px`,
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    right: 0,
                    top: 0
                }}
            >
                <div className="flex flex-row items-center relative">
                    <div
                        onClick={handleDecrementClick}
                        className="z-30 absolute -left-4 bg-white p-2 rounded-full border border-gray-300 cursor-pointer opacity-70 hover:opacity-100 mb-8"
                    >
                        <ChevronLeftIcon height={24} width={24} />
                    </div>
                    {children}
                    <div
                        onClick={handleIncrementClick}
                        className="z-30 absolute -right-4 bg-white p-2 rounded-full border border-gray-300 cursor-pointer opacity-70 hover:opacity-100 mb-8"
                    >
                        <ChevronRightIcon height={24} width={24} />
                    </div>
                </div>
            </Box>
        </>
    );
};

const Track = ({
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    children
}: Props): ReactElement => {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const node = useRef(null);

    const handleDragStart = () => setDragStartPosition(positions[activeItem]);

    const handleDragEnd = (_: any, info: { offset: { x: any; }; velocity: { x: number; }; }) => {
        console.log(info);
        const distance = info.offset.x;
        const velocity = info.velocity.x * multiplier;
        const direction = velocity < 0 || distance < 0 ? 1 : -1;

        const extrapolatedPosition =
            dragStartPosition +
            (direction === 1
                ? Math.min(velocity, distance)
                : Math.max(velocity, distance));

        const closestPosition = positions.reduce((prev: number, curr: number) => {
            return Math.abs(curr - extrapolatedPosition) <
                Math.abs(prev - extrapolatedPosition)
                ? curr
                : prev;
        }, 0);

        if (!(closestPosition < positions[positions.length - constraint])) {
            setActiveItem(positions.indexOf(closestPosition));
            controls.start({
                x: closestPosition,
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        } else {
            setActiveItem(positions.length - constraint);
            controls.start({
                x: positions[positions.length - constraint],
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        }
    };

    const handleResize = useCallback(
        () =>
            controls.start({
                x: positions[activeItem],
                transition: {
                    ...transitionProps
                }
            }),
        [activeItem, controls, positions]
    );

    const handleClick = useCallback(
        (event) =>
            //@ts-ignore
            node?.current?.contains(event.target)
                ? setTrackIsActive(true)
                : setTrackIsActive(false),
        [setTrackIsActive]
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (trackIsActive) {
                if (activeItem < positions.length - constraint) {
                    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                        event.preventDefault();
                        setActiveItem((prev: number) => prev + 1);
                    }
                }
                if (activeItem > positions.length - positions.length) {
                    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                        event.preventDefault();
                        setActiveItem((prev: number) => prev - 1);
                    }
                }
            }
        },
        [trackIsActive, setActiveItem, activeItem, constraint, positions.length]
    );

    useEffect(() => {
        //@ts-ignore
        handleResize(positions);

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick, handleResize, handleKeyDown, positions]);

    return (
        <>
            {itemWidth && (
                <VStack ref={node} spacing={5} alignItems="stretch">
                    <MotionFlex
                        dragConstraints={node}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        drag="x"
                        _active={{ cursor: "grabbing" }}
                        minWidth="min-content"
                        flexWrap="nowrap"
                        cursor="grab"
                    >
                        {children}
                    </MotionFlex>
                </VStack>
            )}
        </>
    );
};

const Item = ({
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    children,
    index,
    gap
}: Props): ReactElement => {
    const [userDidTab, setUserDidTab] = useState(false);

    const handleFocus = () => setTrackIsActive(true);

    const handleBlur = () => {
        userDidTab && index + 1 === positions.length && setTrackIsActive(false);
        setUserDidTab(false);
    };

    const handleKeyUp = (event: any) =>
        event.key === "Tab" &&
        !(activeItem === positions.length - constraint) &&
        setActiveItem(index);

    const handleKeyDown = (event: any) => event.key === "Tab" && setUserDidTab(true);

    return (
        <Flex
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            w={`${itemWidth}px`}
            _notLast={{
                mr: `${gap}px`
            }}
            py="4px"
        >
            {children}
        </Flex>
    );
};

export default ChakraCarousel
