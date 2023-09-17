import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NotAdverts from "../NotAdverts/NotAdverts";
import LoadMoreBtn from "../button/LoadMoreBtn/LoadMoreBtn";
import CarList from "../CarList/CarList";
import css from "./AdvertsSearch.module.scss";

const advertsPerPage = 8;

export default function AdvertsSearch({ data }) {
	const [model, setModel] = useState("");
	const [price, setPrice] = useState("");
	const [startMiles, setStartMiles] = useState("");
	const [endMiles, setEndMiles] = useState("");
	const [filteredCars, setFilteredCars] = useState([]);
	const [page, setPage] = useState(1);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showNotAdvertsMessage, setShowNotAdvertsMessage] = useState(false);

	useEffect(() => {
		setFilteredCars(data);
	}, [data]);

	function createArrayWithStep(number, step) {
		const resultArray = [];
		for (let i = step; i <= number; i += step) {
			resultArray.push(i.toString());
		}
		return resultArray;
	}

	const uniqueMakes = new Set();

	const modelOptions = filteredCars
		.filter(item => {
			const make = item.make;
			if (!uniqueMakes.has(make)) {
				uniqueMakes.add(make);
				return true;
			}
			return false;
		})
		.map(item => ({ label: item.make, value: item.make }));

	const minPrice = 30;
	const maxPrice = 500;
	const step = 10;
	const priceOptions = createArrayWithStep(maxPrice, step)
		.filter(item => item >= minPrice)
		.map(item => ({ label: item, value: item }));

	const search = () => {
		setShowNotAdvertsMessage(false);
		const isBrandValid = model => /^[a-zA-Z\s]+$/i.test(model);
		let arr = data.slice();

		if (model !== "") {
			if (!isBrandValid(model)) {
				toast.error("Please use only English letters for the car brand!");
				return;
			}
			if (!modelOptions.find(option => option.label.toLowerCase() === model.toLowerCase())) {
				toast.error(`The car brand "${model}" is not available with these parameters.`);
				return;
			}

			arr = arr.filter(({ make }) => make.toLowerCase() === model.toLowerCase());
		}

		if (price !== "") {
			if (Number(price) < minPrice) {
				toast.warn(`Price cannot be less than ${minPrice}!`);
				return;
			} else if (Number(price) > maxPrice) {
				toast.warn(`Price cannot be greater than ${maxPrice}!`);
				return;
			}
			arr = arr
				.filter(({ rentalPrice }) => Number(rentalPrice.substr(1)) <= Number(price))
				.sort((a, b) => a.rentalPrice - b.rentalPrice);
		}

		if (startMiles === "" && endMiles !== "")
			arr = arr.filter(({ mileage }) => mileage <= endMiles);

		if (startMiles !== "" && endMiles === "")
			arr = arr.filter(({ mileage }) => mileage >= startMiles);

		if (startMiles > endMiles && endMiles !== "") {
			toast.error("Mileage is incorrect!");
			return;
		}

		if (startMiles !== "" && endMiles !== "") {
			const startMilesInt = parseInt(startMiles, 10);
			const endMilesInt = parseInt(endMiles, 10);
			if (!Number.isInteger(startMilesInt) || !Number.isInteger(endMilesInt)) {
				toast.error("Mileage must be an integer without decimals, in the range from 1000 to 6620!");
				return;
			}
			if (startMilesInt < 1000 || endMilesInt > 6620) {
				toast.error("Mileage should be in the range of 1000 to 6620!");
				return;
			}
			arr = arr.filter(({ mileage }) => mileage >= startMilesInt && mileage <= endMilesInt);
		}
		arr.sort((a, b) => {
			const priceA = Number(a.rentalPrice.substr(1));
			const priceB = Number(b.rentalPrice.substr(1));

			if (priceA === priceB) {
				return a.mileage - b.mileage;
			}

			return priceA - priceB;
		});

		setFilteredCars(arr);
		if (model !== "" || price !== "" || startMiles !== "" || endMiles !== "") {
			if (arr.length === 0) {
				setShowNotAdvertsMessage(true);
				toast.info("No cars meet your search conditions.");
			}
		}
	};

	const reset = () => {
		setModel("");
		setPrice("");
		setStartMiles("");
		setEndMiles("");
		setFilteredCars(data);
		setShowNotAdvertsMessage(false);
	};

	const handleChangeModel = event => {
		setModel(event.target.value);
		setIsDropdownOpen(false);
		setPage(1);
	};
	const handleSelectModel = selectedModel => {
		setModel(selectedModel);
		setIsDropdownOpen(false);
	};

	const handleChangePrice = event => {
		setPrice(event.target.value);
		setPage(1);
	};
	const handleSelectPrice = selectedPrice => {
		setPrice(selectedPrice);
		setIsDropdownOpen(false);
	};

	const handleChangeStartMiles = event => {
		setStartMiles(event.target.value);
		setPage(1);
	};
	const handleChangeEndMiles = event => {
		setEndMiles(event.target.value);
		setPage(1);
	};

	const toggleDropdown = dropdownType => {
		if (isDropdownOpen === dropdownType) {
			setIsDropdownOpen(null);
		} else {
			setIsDropdownOpen(dropdownType);
		}
	};

	const handleInputKeyPress = (event, field) => {
		if (event.key === "Enter") {
			if (field === "model") {
				search();
			} else if (field === "price") {
				search();
			} else if (field === "mileage") {
				const startMilesInt = parseInt(startMiles, 10);
				const endMilesInt = parseInt(endMiles, 10);
				if (!Number.isInteger(startMilesInt) || !Number.isInteger(endMilesInt)) {
					toast.error(
						"Mileage must be an integer without decimals, in the range from 1000 to 6620!",
					);
					return;
				}

				if (startMilesInt < 1000 || endMilesInt > 6620) {
					toast.error("Mileage should be in the range of 1000 to 6620!");
					return;
				}

				search();
			}
		}
	};

	const paginatedCars = filteredCars.slice(0, page * advertsPerPage);

	const getPage = () => setPage(page + 1);
	const totalPages = Math.ceil(filteredCars.length / advertsPerPage);

	return (
		<div className={css.section}>
			<div className={css.inputsBlock}>
				<div className={css.inputBlock}>
					<label
						className={css.label}
						htmlFor="modelTitle"
					>
						Car brand
					</label>
					<input
						id="modelTitle"
						className={`${css.input} ${css.modelInput}`}
						placeholder="Enter the text"
						onChange={handleChangeModel}
						value={model}
						onKeyDown={event => handleInputKeyPress(event, "model")}
					/>
					<button
						className={`${css.inputBtn} ${css.modelInputBtn}`}
						type="button"
						onClick={() => toggleDropdown("model")}
					>
						{isDropdownOpen === "model" ? (
							<FiChevronUp className={css.arrowUp} />
						) : (
							<FiChevronDown className={css.arrowDown} />
						)}
					</button>
					{isDropdownOpen === "model" && (
						<div className={css.modelDropdown}>
							<ul className={css.optionList}>
								{modelOptions.map((option, idx) => (
									<li
										className={css.optionListItem}
										key={idx}
										onClick={() => handleSelectModel(option.value)}
									>
										{option.label}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className={css.inputBlock}>
					<label
						className={css.label}
						htmlFor="priceTitle"
					>
						Price/ 1 hour
					</label>
					<input
						id="priceTitle"
						className={`${css.input} ${css.modelPrice}`}
						placeholder="To $"
						onChange={handleChangePrice}
						value={price}
						onKeyDown={event => handleInputKeyPress(event, "price")}
					/>
					<button
						className={`${css.inputBtn} ${css.priceInputBtn}`}
						type="button"
						onClick={() => toggleDropdown("price")}
					>
						{isDropdownOpen === "price" ? (
							<FiChevronUp className={css.arrowUp} />
						) : (
							<FiChevronDown className={css.arrowDown} />
						)}
					</button>
					{isDropdownOpen === "price" && (
						<div className={css.priceDropdown}>
							<ul className={css.optionList}>
								{priceOptions.map((option, idx) => (
									<li
										className={css.optionListItem}
										key={idx}
										onClick={() => handleSelectPrice(option.value)}
									>
										{option.label}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className={css.inputBlock}>
					<label
						className={css.label}
						htmlFor="mileageTitle"
					>
						Car mileage / km
					</label>
					<div className={css.mileageInputWrapper}>
						<input
							id="mileageTitle"
							className={`${css.input} ${css.inputMileageFrom}`}
							placeholder="From"
							onChange={handleChangeStartMiles}
							value={startMiles}
							onKeyDown={event => handleInputKeyPress(event, "mileage")}
						/>
						<input
							type="number"
							className={`${css.input} ${css.inputMileageTo}`}
							value={endMiles}
							onChange={handleChangeEndMiles}
							placeholder="To"
							onKeyDown={event => handleInputKeyPress(event, "mileage")}
						/>
					</div>
				</div>
				<button
					className={css.searchBtn}
					type="button"
					onClick={search}
				>
					Search
				</button>
				<button
					className={css.undoBtn}
					type="button"
					onClick={reset}
				>
					Undo
				</button>
			</div>
			<CarList adverts={paginatedCars} />
			{filteredCars.length > 0
				? totalPages !== page && <LoadMoreBtn onClick={getPage} />
				: showNotAdvertsMessage && <NotAdverts />}
		</div>
	);
}

AdvertsSearch.propTypes = {
	data: PropTypes.array.isRequired,
};
