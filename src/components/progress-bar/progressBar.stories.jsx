import { h } from "preact";
import { storiesOf } from "@storybook/react";
import { ProgressBar } from "./progressBar";



storiesOf("Progress bar", module)
	.add("render a progress bar", () => {
		return <ProgressBar loaded={50} total={100}/>
	} );