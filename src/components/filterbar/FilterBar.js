import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Menu, Input, AutoComplete } from 'antd';
import styled from 'styled-components';
import { FilteredJobContext } from '../../Contexts/FilteredJobsContext';
import { JobContext } from '../../Contexts/JobContext';
import { GetApiData } from '../../hook/GetApiData';
import { GetDataFromFavorites } from '../../hook/GetDataFromFavorites';

const StyledMenu = styled(Menu)`
	width: 200px;
`;

const Div = styled.div`
	padding: 10px;
`;

export const FilterBar = React.memo(() => {
	const { jobs } = useContext(JobContext); //get all job
	const { setFilteredJobs } = useContext(FilteredJobContext);

	useEffect(() => {
		setFilteredJobs(jobs); //set all job to filtered jobs at render, and never again
	}, []);

	let optionsPositions = [];
	let optionsType = [];
	let optionsCompany = [];
	let optionsLocation = [];

	let [uniqueCompanies] = GetApiData('https://localhost:44318/api/Filter/Company');
	let [uniqueTypes] = GetApiData('https://localhost:44318/api/Filter/Type');
	let [uniquePositions] = GetApiData('https://localhost:44318/api/Filter/Title');
	let [uniqueLocations] = GetApiData('https://localhost:44318/api/Filter/Location');

	uniquePositions.map((position) =>
		optionsPositions.push({
			value: position,
		})
	);

	uniqueTypes.map((type) =>
		optionsType.push({
			value: type,
		})
	);

	uniqueCompanies.map((company) =>
		optionsCompany.push({
			value: company,
		})
	);

	uniqueLocations.map((location) =>
		optionsLocation.push({
			value: location,
		})
	);


	const changeCardListByType = async (e) => {
		const theTrueFilteredJobs = await GetDataFromFavorites(
			`https://localhost:44318/api/Filter/Type/${e}/1`
		); // 1 --> page number (have to be dynamic)
		setFilteredJobs(theTrueFilteredJobs.data);
	};

	const changeCardListByLocation = async (e) => {
		const theTrueFilteredJobs = await GetDataFromFavorites(
			`https://localhost:44318/api/Filter/Location/${e}/1`
		); // 1 --> page number (have to be dynamic)
		setFilteredJobs(theTrueFilteredJobs.data);
	};

	const changeCardListByCompany = async (e) => {
		const theTrueFilteredJobs = await GetDataFromFavorites(
			`https://localhost:44318/api/Filter/Company/${e}/1`
		); // 1 --> page number (have to be dynamic)
		setFilteredJobs(theTrueFilteredJobs.data);
	};

	const changeCardListByPositions = async (e) => {
		const theTrueFilteredJobs = await GetDataFromFavorites(
			`https://localhost:44318/api/Filter/Title/${e}/1`
		); // 1 --> page number (have to be dynamic)
		setFilteredJobs(theTrueFilteredJobs.data);
	};

	function resetFilters() {
		setFilteredJobs(jobs);
	}
	return (
		<StyledMenu>
			<Div>
				<AutoComplete
					id={'typeFilter'}
					dropdownClassName='certain-category-search-dropdown'
					dropdownMatchSelectWidth={300}
					style={{
						width: 180,
					}}
					options={optionsType}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
					onChange={changeCardListByType}
				>
					<Input.Search size='large' placeholder='Type' />
				</AutoComplete>
			</Div>
			<Div>
				<AutoComplete
					id={'locationFilter'}
					dropdownClassName='certain-category-search-dropdown'
					dropdownMatchSelectWidth={300}
					style={{
						width: 180,
					}}
					options={optionsLocation}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
					onChange={changeCardListByLocation}
				>
					<Input.Search size='large' placeholder='Location' />
				</AutoComplete>
			</Div>
			<Div>
				<AutoComplete
					id={'companyFilter'}
					dropdownClassName='certain-category-search-dropdown'
					dropdownMatchSelectWidth={300}
					style={{
						width: 180,
					}}
					options={optionsCompany}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
					onChange={changeCardListByCompany}
				>
					<Input.Search size='large' placeholder='Company' />
				</AutoComplete>
			</Div>
			<Div>
				<AutoComplete
					id={'positionFilter'}
					dropdownClassName='certain-category-search-dropdown'
					dropdownMatchSelectWidth={800}
					style={{
						width: 180,
					}}
					options={optionsPositions}
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
					onChange={changeCardListByPositions}
				>
					<Input.Search size='large' placeholder='Position' />
				</AutoComplete>
			</Div>
			<div>
				<button
					id={'resetFilterButton'}
					style={{
						width: 100,
						height: 25,
						marginLeft: 10,
					}}
					onClick={resetFilters}
				>
					Reset Filters
				</button>
			</div>
		</StyledMenu>
	);
});

export default FilterBar;
