import { useState } from "react";

export function useDialog<T>() {
	const [showDialog, setShowDialog] = useState<T | null>(null);
	const [mountedDialog, setMountedDialog] = useState(false);

	function close() {
		setShowDialog(null);
		setTimeout(() => {
			setMountedDialog(false);
		}, 300);
	}

	function show(value: T) {
		setShowDialog(value);
		setMountedDialog(true);
	}

	return {
		close,
		show,
		mounted: mountedDialog,
		value: showDialog,
	};
}
