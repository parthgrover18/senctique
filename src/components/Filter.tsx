import React, {useState} from 'react';
import styles from '../styles/Filter.module.css';
import {PRODUCT_URL} from '../utils/api';
import {Product} from '../models/Product';

interface FilterProps {
    setFilteredProducts: (products: Product[]) => void;
}

const Filter: React.FC<FilterProps> = ({setFilteredProducts}) => {
    const [price, setPrice] = useState(0);
    const [selectedConcentration, setSelectedConcentration] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string[]>([]);
    const [selectedFragranceType, setSelectedFragranceType] = useState<string[]>([]);
    const [selectedSillage, setSelectedSillage] = useState<string[]>([]);

    const concentrations = ["Eau Fraîche", "Eau de Toilette", "Parfum", "Eau de Cologne", "Eau de Parfum"];
    const sizes = ["100 ml", "90 ml", "80 ml", "125 ml", "75 ml", "50 ml"];
    const fragranceTypes = ["Woody", "Oriental", "Aquatic", "Floral", "Fruity", "Citrus", "Spicy", "Gourmand", "Fougere", "Chypre"];
    const sillageLevels = ["Strong", "Intense", "Moderate", "Soft"];

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const {value, checked} = event.target;
        const updateState = (selectedItems: string[]) => {
            if (checked) {
                return [...selectedItems, value];
            }
            return selectedItems.filter(item => item !== value);
        };

        switch (type) {
            case 'concentration':
                setSelectedConcentration(updateState(selectedConcentration));
                break;
            case 'size':
                setSelectedSize(updateState(selectedSize));
                break;
            case 'fragranceType':
                setSelectedFragranceType(updateState(selectedFragranceType));
                break;
            case 'sillage':
                setSelectedSillage(updateState(selectedSillage));
                break;
            default:
                break;
        }
    };

    const clearFilters = () => {
        setPrice(0);
        setSelectedConcentration([]);
        setSelectedSize([]);
        setSelectedFragranceType([]);
        setSelectedSillage([]);

        fetch(`${PRODUCT_URL}/findAll`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setFilteredProducts(data);
            })
            .catch(err => {
                console.error("Error fetching all products:", err);
            });
    };


    const saveFilters = () => {
        const params = new URLSearchParams();

        if (price > 0) {
            params.append("minPrice", "0");
            params.append("maxPrice", price.toString());
        }
        selectedConcentration.forEach(item => params.append("concentration", item));
        selectedSize.forEach(item => params.append("size", item));
        selectedFragranceType.forEach(item => params.append("fragranceType", item));
        selectedSillage.forEach(item => params.append("sillage", item));

        fetch(`${PRODUCT_URL}/filter?${params.toString()}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setFilteredProducts(data);
            })
            .catch(err => {
                console.error("Error fetching filtered products:", err);
            });
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.selectedFilters}>
                <div><strong>Price:</strong> {price ? `£1 - £${price}` : 'All'}</div>

                <div><strong>Concentration:</strong> {selectedConcentration.join(', ') || 'All'}</div>
                <div><strong>Size:</strong> {selectedSize.join(', ') || 'All'}</div>
                <div><strong>Fragrance Type:</strong> {selectedFragranceType.join(', ') || 'All'}</div>
                <div><strong>Sillage:</strong> {selectedSillage.join(', ') || 'All'}</div>
            </div>

            <div className={styles.filterGroup}>
                <label>Price</label>
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={price}
                    onChange={handlePriceChange}
                    className={styles.slider}
                />
                <span>£ {price}</span>
            </div>

            {[{
                label: "Concentration",
                items: concentrations,
                selected: selectedConcentration,
                state: selectedConcentration,
                type: "concentration"
            },
                {label: "Size", items: sizes, selected: selectedSize, state: selectedSize, type: "size"},
                {
                    label: "Fragrance Type",
                    items: fragranceTypes,
                    selected: selectedFragranceType,
                    state: selectedFragranceType,
                    type: "fragranceType"
                },
                {
                    label: "Sillage",
                    items: sillageLevels,
                    selected: selectedSillage,
                    state: selectedSillage,
                    type: "sillage"
                }]
                .map(({label, items, type, state}) => (
                    <div className={styles.filterGroup} key={type}>
                        <label>{label}</label>
                        <div className={styles.Content}>
                            {items.map(item => (
                                <label key={item}>
                                    <input
                                        type="checkbox"
                                        value={item}
                                        onChange={(e) => handleCheckboxChange(e, type)}
                                        checked={state.includes(item)}
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

            <div className={styles.buttonGroup}>
                <button onClick={saveFilters} className={styles.saveButton}>Save Filters</button>
                <button onClick={clearFilters} className={styles.clearButton}>Clear Filters</button>
            </div>
        </div>
    );
};

export default Filter;
