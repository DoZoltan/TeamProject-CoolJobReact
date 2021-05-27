import React, { createContext, useState } from 'react';

export const DisplayFilterBarContext = createContext();

export const DisplayFilterBarProvider = (props) => {
	const [showFilterBar, setShowFilterBar] = useState(false);

	const setShowFilterBarReverse = () => {
		if (showFilterBar === false) {
			setShowFilterBar(true);
		} else {
			setShowFilterBar(false);
		}
	};

	return (
		<DisplayFilterBarContext.Provider
			value={{
				showFilterBar,
				setShowFilterBarReverse,
			}}
		>
			{props.children}
		</DisplayFilterBarContext.Provider>
	);
};

export default DisplayFilterBarProvider;
