import * as React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

export const Home = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <G stroke="#71717A" strokeWidth={1.5} clipPath="url(#a)">
                <Path
                    strokeLinecap="round"
                    d="M12.5 14.166A4.067 4.067 0 0 1 10 15a4.067 4.067 0 0 1-2.5-.834"
                />
                <Path
                    strokeLinejoin="round"
                    d="M1.96 11.011c-.294-1.914-.441-2.871-.08-3.72.362-.849 1.165-1.43 2.771-2.59l1.2-.868c1.998-1.444 2.997-2.167 4.15-2.167 1.152 0 2.15.723 4.149 2.167l1.2.868c1.605 1.16 2.408 1.741 2.77 2.59.362.849.215 1.806-.08 3.72l-.25 1.633c-.417 2.713-.626 4.07-1.599 4.88-.973.81-2.396.81-5.242.81H9.051c-2.845 0-4.268 0-5.242-.81-.973-.81-1.181-2.167-1.598-4.88L1.96 11.01Z"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h20v20H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export const HomeActive = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#F5F5F4"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M12.5 14.166A4.067 4.067 0 0 1 10 15a4.067 4.067 0 0 1-2.5-.834"
            />
            <Path
                stroke="#F5F5F4"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M1.96 11.011c-.294-1.914-.441-2.871-.08-3.72.362-.849 1.165-1.43 2.771-2.59l1.2-.868c1.998-1.444 2.997-2.167 4.15-2.167 1.152 0 2.15.723 4.149 2.167l1.2.868c1.605 1.16 2.408 1.741 2.77 2.59.362.849.215 1.806-.08 3.72l-.25 1.633c-.417 2.713-.626 4.07-1.599 4.88-.973.81-2.396.81-5.242.81H9.051c-2.845 0-4.268 0-5.242-.81-.973-.81-1.181-2.167-1.598-4.88L1.96 11.01Z"
            />
        </Svg>
    )
}

export const Search = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#71717A"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.584 17.5a7.917 7.917 0 1 0 0-15.833 7.917 7.917 0 0 0 0 15.833ZM18.334 18.333l-1.667-1.666"
            />
        </Svg>
    );
};

export const SearchActive = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#F5F5F4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.584 17.5a7.917 7.917 0 1 0 0-15.833 7.917 7.917 0 0 0 0 15.833ZM18.334 18.333l-1.667-1.666"
            />
        </Svg>
    )
};

export const Heart = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#71717A"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.517 17.342c-.283.1-.75.1-1.033 0-2.417-.825-7.817-4.267-7.817-10.1 0-2.575 2.075-4.659 4.633-4.659 1.517 0 2.859.734 3.7 1.867a4.608 4.608 0 0 1 3.7-1.867c2.559 0 4.634 2.084 4.634 4.659 0 5.833-5.4 9.275-7.817 10.1Z"
            />
        </Svg>
    );
};

export const HeartActive = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#F5F5F4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.517 17.342c-.283.1-.75.1-1.033 0-2.417-.825-7.817-4.267-7.817-10.1 0-2.575 2.075-4.659 4.633-4.659 1.517 0 2.859.734 3.7 1.867a4.608 4.608 0 0 1 3.7-1.867c2.559 0 4.634 2.084 4.634 4.659 0 5.833-5.4 9.275-7.817 10.1Z"
            />
        </Svg>
    )
};

export const User = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#71717A"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.961}
                strokeWidth={1.5}
                d="M10 10a4.167 4.167 0 1 0 0-8.333A4.167 4.167 0 0 0 10 10ZM17.159 18.333c0-3.225-3.209-5.833-7.159-5.833-3.95 0-7.158 2.608-7.158 5.833"
            />
        </Svg>
    );
};

export const UserActive = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#F5F5F4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={0.961}
                strokeWidth={1.5}
                d="M10 10a4.167 4.167 0 1 0 0-8.333A4.167 4.167 0 0 0 10 10ZM17.159 18.333c0-3.225-3.209-5.833-7.159-5.833-3.95 0-7.158 2.608-7.158 5.833"
            />
        </Svg>
    )
};

export const Back = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#52525B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m7 17-6-7m0 0 6-7m-6 7h18"
            />
        </Svg>
    );
};

export const Close = (props: SvgProps) => {
    return (
        <Svg
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#52525B"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="m3 3 14 14m0-14L3 17"
            />
        </Svg>
    );
};

export const Add = React.forwardRef((props: SvgProps, ref) => {
    return (
        <Svg
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            {...props}
        >
            <G
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                data-name="add"
            >
                <Path d="M12 19V5M5 12h14" />
            </G>
        </Svg>
    )
});

export const Check = React.forwardRef((props: SvgProps, ref) => {
    return (
        <Svg
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            {...props}
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 12.611 8.923 17.5 20 6.5"
            />
        </Svg>
    )
});

export const Share = (props: SvgProps) => {
    return (
        // <Svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     width={24}
        //     height={24}
        //     {...props}
        // >
        //     <Path
        //         fill="#fff"
        //         fillRule="evenodd"
        //         d="M1 18.509c0-5.341 3.902-9.738 9-10.663V5.511c0-1.872 2.153-2.925 3.631-1.776l8.343 6.489a2.25 2.25 0 0 1 0 3.552l-8.343 6.489C12.153 21.415 10 20.36 10 18.489v-1.97c-2.259.434-4.037 1.597-5.072 3.165-.596.902-1.622 1.09-2.368.88C1.805 20.35 1 19.63 1 18.509ZM12.403 5.314A.25.25 0 0 0 12 5.51v3.906c0 .138-.113.25-.25.253-3.66.098-6.772 2.341-8.084 5.496A8.66 8.66 0 0 0 3 18.509c0 .135.184.186.258.073l.05-.073a8.549 8.549 0 0 1 1.122-1.341c.285-.277.59-.537.913-.777 1.716-1.275 3.943-2.009 6.407-2.055.138-.003.25.11.25.247v3.906c0 .208.24.325.403.197l8.343-6.489a.25.25 0 0 0 0-.394l-8.343-6.49Z"
        //         clipRule="evenodd"
        //     />
        // </Svg>
        <Svg
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m8.59 13.51 6.83 3.98m-.01-10.98-6.82 3.98M21 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </Svg>
    )
};

export const Download = (props: SvgProps) => {
    return (
        // <Svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="#fff"
        //     viewBox="0 0 24 24"
        //     width={24}
        //     height={24}
        //     {...props}
        // >
        //     <Path d="M4 20h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2Zm8-18a1 1 0 0 0-1 1v11.586l-2.293-2.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 .325.216.986.986 0 0 0 .764 0 1 1 0 0 0 .325-.216l4-4a1 1 0 0 0-1.414-1.414L13 14.586V3a1 1 0 0 0-1-1Z" />
        // </Svg>
        <Svg
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21H3m15-10-6 6m0 0-6-6m6 6V3"
            />
        </Svg>
    )
};

