import React, { createContext } from 'react';
import useAxiosGet from '../axios/useAxiosGet';

export const FilterContext = createContext();

export const FilterProvider = (props) => {
	const optionsPositions = [];
	const optionsType = [];
	const optionsCompany = [];
	const optionsLocation = [];

	const { data: Companies } = useAxiosGet('https://localhost:44318/api/Filter/Company');
	const { data: Types } = useAxiosGet('https://localhost:44318/api/Filter/Type');
	const { data: Positions } = useAxiosGet('https://localhost:44318/api/Filter/Title');
	const { data: Locations } = useAxiosGet('https://localhost:44318/api/Filter/Location');

	if (Companies !== null && Types !== null && Positions !== null && Locations !== null) {
		Positions.map((position) =>
			optionsPositions.push({
				value: position,
			})
		);

		Types.map((type) =>
			optionsType.push({
				value: type,
			})
		);

		Companies.map((company) =>
			optionsCompany.push({
				value: company,
			})
		);

		Locations.map((location) =>
			optionsLocation.push({
				value: location,
			})
		);
	}

	return (
		<FilterContext.Provider
			value={{
				optionsPositions,
				optionsType,
				optionsCompany,
				optionsLocation,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};

export default FilterProvider;
