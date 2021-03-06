import { Component, h } from "preact";
import StopIcon from "./Stop.svg";
const styles = require("./style.scss");

type Props = {
    onButtonClick: () => void;
    maxRecordingTime?: number;
};

type State = {
    currentTime: number; // in seconds
    clickedOnce: boolean;
};

/**
 * Handle the timer button while recording
 */
export class RecordingTimer extends Component<Props, State> {
    interval: number | undefined;

    constructor(props: Props) {
        super(props);
        this.state = { currentTime: 0, clickedOnce: false };
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        const int: any = setInterval(() => {
            this.update();
        }, 1000);
        this.interval = int as number;
    }

    update() {
        const { maxRecordingTime } = this.props;
        if (maxRecordingTime && maxRecordingTime <= this.state.currentTime) {
            this.clickHandler();
            return;
        }
        this.setState({ currentTime: this.state.currentTime + 1 });
    }

    clickHandler() {
        if (this.state.clickedOnce) {
            return;
        }

        clearInterval(this.interval);
        this.setState({ clickedOnce: true }, () => {
            if (this.props.onButtonClick) {
                this.props.onButtonClick();
            }
        });
    }

    render(props: Props, state: State) {
        const { currentTime } = state;
        const hours = Math.floor(currentTime / 3600);
        const minutes = Math.floor((currentTime - hours * 3600) / 60);
        const seconds = currentTime - hours * 3600 - minutes * 60;
        let timeString = hours > 0 ? hours + ":" : "";
        timeString += minutes < 10 ? "0" + minutes : minutes;
        timeString += ":" + (seconds < 10 ? "0" + seconds : seconds);

        return (
            <div className={`xr_timer ${styles["timer"]}`}>
                <button
                    type={"button"}
                    className={`xr_timer-button ${styles["timer-button"]}`}
                    onClick={this.clickHandler}
                    tabIndex={0}
                >
                    <StopIcon />
                    <span>{timeString}</span>
                </button>
            </div>
        );
    }
}
