import { useCallback, useState } from 'react';


const AutoInput = ({ options, value, onOptionSelect, onInputChange, placeholder, handleValueNotInOption }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = useCallback(async (event) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);
        await onInputChange(inputValue);
    }, [onInputChange]);

    const handleOptionClick = (option) => {
        onOptionSelect(option);
        setInputValue(option.name);
        setShowOptions(false);
        setIsSelected(true);
    };
    
    const handleInputBlur = () => {
        setShowOptions(false);
        if (!value && !isSelected) {
            setIsSelected(false);
            handleValueNotInOption(inputValue);
        }
    };

    return (
        <div className="relative">
            <input
                placeholder={placeholder || 'Type to search...'}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowOptions(true)}
                onBlur={handleInputBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />

            {showOptions && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            onMouseDown={(e) => e.preventDefault()} 
                        >
                            {option?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoInput;
