import { Component, h } from "preact";
import { ToggleButton } from "../toggle-button/toggleButton";
const styles = require("./style.scss");

type Props = {
    resourceName: string;
    devices: object[];
    onChooseDevice: (device: object) => void;
    isOn: boolean;
    selected: any;
    onClose: () => void;
    onToggleChange: (isOn: boolean) => void;
};

type State = {
    isOn: boolean;
    selectedDevice: any;
};

/**
 * Component to play the recorded record, uses v3 player.
 */
export class SettingsDevices extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOn: props.isOn,
            selectedDevice: props.selected
        };
    }

    handleItemClick = (item: any) => {
        this.props.onChooseDevice(item);
        this.setState({ selectedDevice: item });
    };

    handleToggleClick = (isOn: boolean) => {
        if (this.props.onToggleChange) {
            this.props.onToggleChange(isOn);
        }
        this.setState({ isOn: isOn });
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { resourceName, devices } = this.props;
        const { isOn, selectedDevice } = this.state;

        const resourcesList = devices.map((item: any, index: number) => {
            let selectedClass = "not-selected-device";
            if (selectedDevice && item.label === selectedDevice.label) {
                selectedClass = "selected-device";
            }
            return (
                <li
                    key={index.toString()}
                    onClick={() => this.handleItemClick(item)}
                    className={
                        styles[selectedClass] + " " + styles["resource-label"]
                    }
                >
                    <span>{item.label}</span>
                </li>
            );
        });
        return (
            <div className={styles["settings-devices__box"]}>
                <div
                    className={styles["arrow-left"]}
                    onClick={this.handleClose}
                />
                <ToggleButton
                    id={resourceName}
                    text={resourceName}
                    onClick={this.handleToggleClick}
                    isToggleOn={isOn}
                />
                <hr className={styles["settings-line"]} />
                <ul className={styles["devices-list"]}>{resourcesList}</ul>
            </div>
        );
    }
}
