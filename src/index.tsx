import { h, render, Component } from "preact";
import { ExpressRecorder, ExpressRecorderProps } from "./components/app/expressRecorder";

export const create = (
    elementId: string,
    props: ExpressRecorderProps
): { destroy: () => void; instance: ExpressRecorder } => {
    const parent = document.getElementById(elementId);

    if (!parent) {
        throw new Error(`cannot find element with id '${elementId}'`);
    }

    let instance: any;
    let ref = (c: any) => {
        instance = c;
    };

    const child = render(<ExpressRecorder ref={ref} {...props} />, parent);

    return {
        destroy: () => {
            render(null, parent, child);
        },
        instance
    };
};
