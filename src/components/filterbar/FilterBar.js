import React, { useContext, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Menu, Input, AutoComplete, Button } from 'antd';
import styled from 'styled-components';
import { TheContext } from '../../Contexts/TheContext';
import UseSimpleGetAxios from '../../axios/useSimpleGetAxios';
import { DisplayFilterBarContext } from '../../Contexts/DisplayFilterBarContext';

const HorizontalMenuItem = styled(Menu.Item)`
	vertical-alignment: center;
	width: 19%;
	margin: 0px 4px !important;
`;

const HorizontalAutoComplete = styled(AutoComplete)`
	width: 100%;
`;

const VerticalMenuItem = styled(Menu.Item)`
	height: 50px !important;
	width: 100%;
`;

const TwoLineMenuItem = styled.div`
	margin: 10px 4px 0px 4px;
`;

const OneLineMenuItem = styled.div`
	margin: 10px 4px 0px 4px;
`;

const FilterBar = (props) => {
	const { showFilterBar } = useContext(DisplayFilterBarContext);
	const [inputTypeValue, setInputTypeValue] = useState('');
	const [inputPositionValue, setInputPositionValue] = useState('');
	const [inputLocationValue, setInputLocationValue] = useState('');
	const [inputCompanyValue, setInputCompanyValue] = useState('');
	const { AxiosGet, axiosData, setFilteredJobs } = useContext(TheContext);

	AxiosGet('https://localhost:44318/api/Jobs');

	useEffect(() => {
		setFilteredJobs(axiosData);
	}, [setFilteredJobs, axiosData]);

	const typeFilter = document.getElementById('typeFilter');
	const locationFilter = document.getElementById('locationFilter');
	const companyFilter = document.getElementById('companyFilter');
	const positionFilter = document.getElementById('positionFilter');

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
			const theTrueFilteredJobs = await UseSimpleGetAxios(
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
			const theTrueFilteredJobs = await UseSimpleGetAxios(
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
			const theTrueFilteredJobs = await UseSimpleGetAxios(
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
			const theTrueFilteredJobs = await UseSimpleGetAxios(
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
		<div className='filter-context'>
			<div className='verticalFilterBar'>
				<Menu mode='vertical'>
					<VerticalMenuItem key='1'>
						<AutoComplete
							style={{ width: '100% !important' }}
							value={inputTypeValue}
							id={'typeFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsType}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByType}
						>
							<Input.Search size='large' placeholder='Type' />
						</AutoComplete>
					</VerticalMenuItem>
					<VerticalMenuItem key='2'>
						<AutoComplete
							value={inputLocationValue}
							id={'locationFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsLocation}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByLocation}
						>
							<Input.Search
								id={'locationInput'}
								size='large'
								placeholder='Location'
							/>
						</AutoComplete>
					</VerticalMenuItem>
					<VerticalMenuItem key='3'>
						<AutoComplete
							value={inputCompanyValue}
							id={'companyFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsCompany}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByCompany}
						>
							<Input.Search size='large' placeholder='Company' />
						</AutoComplete>
					</VerticalMenuItem>
					<VerticalMenuItem key='4'>
						<AutoComplete
							value={inputPositionValue}
							id={'positionFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={800}
							options={props.optionsPositions}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByPositions}
						>
							<Input.Search size='large' placeholder='Position' />
						</AutoComplete>
					</VerticalMenuItem>

					<VerticalMenuItem key='5'>
						<Button id={'resetFilterButton'} onClick={resetFilters}>
							Reset Filters
						</Button>
					</VerticalMenuItem>
				</Menu>
			</div>
			<div style={{ display: showFilterBar ? 'block' : 'none' }}>
				<div className='horizontalFilterBar'>
					<Menu mode='horizontal' style={{ height: '100%' }}>
						<HorizontalMenuItem key='1'>
							<HorizontalAutoComplete
								value={inputTypeValue}
								id={'typeFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsType}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByType}
							>
								<Input.Search size='large' placeholder='Type' />
							</HorizontalAutoComplete>
						</HorizontalMenuItem>
						<HorizontalMenuItem key='2'>
							<HorizontalAutoComplete
								value={inputLocationValue}
								id={'locationFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsLocation}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByLocation}
							>
								<Input.Search
									id={'locationInput'}
									size='large'
									placeholder='Location'
								/>
							</HorizontalAutoComplete>
						</HorizontalMenuItem>
						<HorizontalMenuItem key='3'>
							<HorizontalAutoComplete
								value={inputCompanyValue}
								id={'companyFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsCompany}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByCompany}
							>
								<Input.Search size='large' placeholder='Company' />
							</HorizontalAutoComplete>
						</HorizontalMenuItem>
						<HorizontalMenuItem key='4'>
							<HorizontalAutoComplete
								value={inputPositionValue}
								id={'positionFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={800}
								options={props.optionsPositions}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByPositions}
							>
								<Input.Search size='large' placeholder='Position' />
							</HorizontalAutoComplete>
						</HorizontalMenuItem>

						<HorizontalMenuItem key='5' style={{ textAlign: 'right' }}>
							<Button id={'resetFilterButton'} onClick={resetFilters}>
								Reset Filters
							</Button>
						</HorizontalMenuItem>
					</Menu>
				</div>
				<div className='twoLineFilterBar'>
					<div style={{ width: '80%' }}>
						<TwoLineMenuItem className='col'>
							<HorizontalAutoComplete
								value={inputTypeValue}
								id={'typeFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsType}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByType}
							>
								<Input.Search size='large' placeholder='Type' />
							</HorizontalAutoComplete>
						</TwoLineMenuItem>
						<TwoLineMenuItem className='col'>
							<HorizontalAutoComplete
								value={inputLocationValue}
								id={'locationFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsLocation}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByLocation}
							>
								<Input.Search
									id={'locationInput'}
									size='large'
									placeholder='Location'
								/>
							</HorizontalAutoComplete>
						</TwoLineMenuItem>
						<TwoLineMenuItem className='col'>
							<HorizontalAutoComplete
								value={inputCompanyValue}
								id={'companyFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={300}
								options={props.optionsCompany}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByCompany}
							>
								<Input.Search size='large' placeholder='Company' />
							</HorizontalAutoComplete>
						</TwoLineMenuItem>
						<TwoLineMenuItem
							className='col'
							style={{ display: showFilterBar ? 'block' : 'none' }}
						>
							<HorizontalAutoComplete
								value={inputPositionValue}
								id={'positionFilter'}
								dropdownClassName='certain-category-search-dropdown'
								dropdownMatchSelectWidth={800}
								options={props.optionsPositions}
								filterOption={(inputValue, option) =>
									option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onChange={changeCardListByPositions}
							>
								<Input.Search size='large' placeholder='Position' />
							</HorizontalAutoComplete>
						</TwoLineMenuItem>
					</div>
					<div
						style={{
							width: '19%',
							float: 'right',
							textAlign: 'center',
							height: '50%',
							marginTop: '-40px',
							marginRight: '5px',
						}}
					>
						<TwoLineMenuItem>
							<Button
								id={'resetFilterButton'}
								onClick={resetFilters}
								style={{ height: '70px' }}
							>
								Reset Filters
							</Button>
						</TwoLineMenuItem>
					</div>
				</div>
				<div className='oneLineFilterBar'>
					<OneLineMenuItem>
						<HorizontalAutoComplete
							value={inputTypeValue}
							id={'typeFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsType}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByType}
						>
							<Input.Search size='large' placeholder='Type' />
						</HorizontalAutoComplete>
					</OneLineMenuItem>
					<OneLineMenuItem>
						<HorizontalAutoComplete
							value={inputLocationValue}
							id={'locationFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsLocation}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByLocation}
						>
							<Input.Search
								id={'locationInput'}
								size='large'
								placeholder='Location'
							/>
						</HorizontalAutoComplete>
					</OneLineMenuItem>
					<OneLineMenuItem>
						<HorizontalAutoComplete
							value={inputCompanyValue}
							id={'companyFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={300}
							options={props.optionsCompany}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByCompany}
						>
							<Input.Search size='large' placeholder='Company' />
						</HorizontalAutoComplete>
					</OneLineMenuItem>
					<OneLineMenuItem>
						<HorizontalAutoComplete
							value={inputPositionValue}
							id={'positionFilter'}
							dropdownClassName='certain-category-search-dropdown'
							dropdownMatchSelectWidth={800}
							options={props.optionsPositions}
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
							onChange={changeCardListByPositions}
						>
							<Input.Search size='large' placeholder='Position' />
						</HorizontalAutoComplete>
					</OneLineMenuItem>
					<OneLineMenuItem>
						<Button
							id={'resetFilterButton'}
							onClick={resetFilters}
							style={{ width: '100%' }}
						>
							Reset Filters
						</Button>
					</OneLineMenuItem>
				</div>
			</div>
		</div>
	);
};

export default FilterBar;
