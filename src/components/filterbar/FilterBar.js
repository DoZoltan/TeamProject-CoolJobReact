import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Input, AutoComplete, Button } from 'antd';
import styled from 'styled-components';
import { TheContext } from '../../Contexts/TheContext';
import { GetDataFromFavorites } from '../../hook/GetDataFromFavorites';
import useAxiosGet from '../../axios/useAxiosGet';

const StyledMenu = styled(Menu)`
	width: 215px;
`;

const MenuItem = styled(Menu.Item)`
	height: 50px !important;
`;
export const FilterBar = () => {
	const [inputTypeValue, setInputTypeValue] = useState('');
	const [inputPositionValue, setInputPositionValue] = useState('');
	const [inputLocationValue, setInputLocationValue] = useState('');
	const [inputCompanyValue, setInputCompanyValue] = useState('');
	const { axiosData, setFilteredJobs, AxiosGet } = useContext(TheContext);

	AxiosGet('https://localhost:44318/api/Jobs');

	useEffect(() => {
		setFilteredJobs(axiosData);
	}, [setFilteredJobs, axiosData]);

	const typeFilter = document.getElementById('typeFilter');
	const locationFilter = document.getElementById('locationFilter');
	const companyFilter = document.getElementById('companyFilter');
	const positionFilter = document.getElementById('positionFilter');
	const { data: uniqueCompanies } = useAxiosGet('https://localhost:44318/api/Filter/Company');
	const { data: uniqueTypes } = useAxiosGet('https://localhost:44318/api/Filter/Type');
	const { data: uniquePositions } = useAxiosGet('https://localhost:44318/api/Filter/Title');
	const { data: uniqueLocations } = useAxiosGet('https://localhost:44318/api/Filter/Location');

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
		else {
			resetFilters();
		}
	};

	const changeCardListByLocation = async (e) => {
		setInputLocationValue(e);
		inputFiltersToEmpty(locationFilter.id);

		if (e.length > 0) {
			const theTrueFilteredJobs = await GetDataFromFavorites(
				`https://localhost:44318/api/Filter/Location/${e}/1`
			); // 1 --> page number (have to be dynamic)
			setFilteredJobs(theTrueFilteredJobs.data);
		} else {
			resetFilters();
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
		} else {
			resetFilters();
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
		} else {
			resetFilters();
		}
	};

	function resetFilters() {
		setFilteredJobs(axiosData);

		setInputPositionValue('');
		setInputTypeValue('');
		setInputCompanyValue('');
		setInputLocationValue('');
	}

	return (
		<StyledMenu>
			<MenuItem key='1'>
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
			</MenuItem>
			<MenuItem key='2'>
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
			</MenuItem>
			<MenuItem key='3'>
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
			</MenuItem>
			<MenuItem key='4'>
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
			</MenuItem>

			<MenuItem key='5'>
				<Button id={'resetFilterButton'} onClick={resetFilters}>
					Reset Filters
				</Button>
			</MenuItem>
		</StyledMenu>
	);
};

export default FilterBar;
