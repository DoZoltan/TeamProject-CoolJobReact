import React, { useContext, useEffect, useState } from 'react';
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
export const FilterBar = () => {
	const [inputTypeValue, setInputTypeValue] = useState('');
	const [inputPositionValue, setInputPositionValue] = useState('');
	const [inputLocationValue, setInputLocationValue] = useState('');
	const [inputCompanyValue, setInputCompanyValue] = useState('');
	const { jobs } = useContext(JobContext);
	const { setFilteredJobs } = useContext(FilteredJobContext);

	useEffect(() => {
		setFilteredJobs(jobs);
	}, [setFilteredJobs, jobs]);

	const typeFilter = document.getElementById('typeFilter');
	const locationFilter = document.getElementById('locationFilter');
	const companyFilter = document.getElementById('companyFilter');
	const positionFilter = document.getElementById('positionFilter');
	const [fetchCompany] = GetApiData('https://localhost:44318/api/Filter/Company');
	const uniqueCompanies = fetchCompany;
	const [fetchType] = GetApiData('https://localhost:44318/api/Filter/Type');
	const uniqueTypes = fetchType;
	const [fetchTitle] = GetApiData('https://localhost:44318/api/Filter/Title');
	const uniquePositions = fetchTitle;
	const [fetchLocation] = GetApiData('https://localhost:44318/api/Filter/Location');
	const uniqueLocations = fetchLocation;

	const optionsPositions = [];
	const optionsType = [];
	const optionsCompany = [];
	const optionsLocation = [];

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

	const inputFiltersToEmpty = (usingFilter) => {
		if (usingFilter === typeFilter.id) {
			setInputPositionValue('');
			setInputLocationValue('');
			setInputCompanyValue('');
		} else if (usingFilter === companyFilter.id) {
			setInputPositionValue('');
			setInputLocationValue('');
			setInputTypeValue('');
		} else if (usingFilter === positionFilter.id) {
			setInputLocationValue('');
			setInputTypeValue('');
			setInputCompanyValue('');
		} else if (usingFilter === locationFilter.id) {
			setInputPositionValue('');
			setInputTypeValue('');
			setInputCompanyValue('');
		}
	};

	const changeCardListByType = async (e) => {
		setInputTypeValue(e);
		inputFiltersToEmpty(typeFilter.id);
		if (e.length > 0) {
			const theTrueFilteredJobs = await GetDataFromFavorites(
				`https://localhost:44318/api/Filter/Type/${e}/1`
			);
			setFilteredJobs(theTrueFilteredJobs.data);
		} // 1 --> page number (have to be dynamic)
	};

	const changeCardListByLocation = async (e) => {
		setInputLocationValue(e);
		inputFiltersToEmpty(locationFilter.id);

		if (e.length > 0) {
			const theTrueFilteredJobs = await GetDataFromFavorites(
				`https://localhost:44318/api/Filter/Location/${e}/1`
			); // 1 --> page number (have to be dynamic)
			setFilteredJobs(theTrueFilteredJobs.data);
		}
	};

	const changeCardListByCompany = async (e) => {
		setInputCompanyValue(e);
		inputFiltersToEmpty(companyFilter.id);

		if (e.length > 0) {
			const theTrueFilteredJobs = await GetDataFromFavorites(
				`https://localhost:44318/api/Filter/Company/${e}/1`
			); // 1 --> page number (have to be dynamic)
			setFilteredJobs(theTrueFilteredJobs.data);
		}
	};

	const changeCardListByPositions = async (e) => {
		setInputPositionValue(e);
		inputFiltersToEmpty(positionFilter.id);
		if (e.length > 0) {
			const theTrueFilteredJobs = await GetDataFromFavorites(
				`https://localhost:44318/api/Filter/Title/${e}/1`
			); // 1 --> page number (have to be dynamic)
			setFilteredJobs(theTrueFilteredJobs.data);
		}
	};

	function resetFilters() {
		setFilteredJobs(jobs);
	}

	return (
		<StyledMenu>
			<Div>
				<AutoComplete
					value={inputTypeValue}
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
					value={inputLocationValue}
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
					<Input.Search id={'locationInput'} size='large' placeholder='Location' />
				</AutoComplete>
			</Div>
			<Div>
				<AutoComplete
					value={inputCompanyValue}
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
					value={inputPositionValue}
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
};

export default FilterBar;
