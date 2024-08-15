import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gen = () => {
    const [charLength, setCharLength] = useState("4");
    const [password, setPassword] = useState(`${charLength} length password will be Generated`);
    const [includeAll, setIncludeAll] = useState(false);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const handlecheckbox = (e) => {
        const { name, checked } = e.target;
        switch (name) {
            case "uppercase":
                setIncludeUppercase(checked);
                break;
            case "lowercase":
                setIncludeLowercase(checked);
                break;
            case "numbers":
                setIncludeNumbers(checked);
                break;
            case "symbols":
                setIncludeSymbols(checked);
                break;
            case "all":
                checkall()
                // setIncludeAll(checked);
                break;
            default:
                break;
        }

        function checkall() {
            setIncludeAll(checked);
            setIncludeUppercase(checked);
            setIncludeLowercase(checked);
            setIncludeNumbers(checked);
            setIncludeSymbols(checked);
        }
    }

    const genratepassword = () => {
        let validChars = ""
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+=";
        if (includeAll) {
            validChars += upperCase + lowerCase + numbers + symbols;
        } else {
            if (includeUppercase) validChars += upperCase;
            if (includeLowercase) validChars += lowerCase;
            if (includeNumbers) validChars += numbers;
            if (includeSymbols) validChars += symbols;
        }
        if (validChars === "") {
            toast.error('Please select atleast one option');
            return;
        }

        let password = "";
        for (let i = 0; i < charLength; i++) {
            password += validChars.charAt(Math.floor(Math.random() * validChars.length));
        }
        setPassword(password);
        toast.success('Password Generated');
    }

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(password)
            .then(() => {
                toast.success('Password Copied to Clipboard');
            })
            .catch((err) => {
                toast.error('Failed to Copy', err);
            });
    }

    const handleLengthChange = (e) => {
        const length = parseInt(e.target.value);
        setCharLength(length);
        setPassword(`${length} length password will be Generated`);
    }

    return (
        <div>
            <ToastContainer />
            <div className="flex gap-10 pt-10">
                <input
                    name="password"
                    type="text"
                    // placeholder={`${charLength} length password will be Generated`}
                    value={`${password}`}
                    readOnly
                    className="text-center w-full p-3 text-slate-400 text-4xl font-bold"
                />

            </div>
            <div className="flex mt-10">
                <p className="mx-4 text-xl font-semibold">MIN</p>
                <input
                    type="range"
                    min="4"
                    max="20"
                    value={charLength}
                    onChange={handleLengthChange}
                    className="w-full"
                />
                <p className="mx-4 text-xl font-semibold">MAX</p>
            </div>

            <div className="flex flex-col mt-10 text-left font-bold text-xl gap-1">
                <p className="text-3xl">Select Attributes to include in Password</p>
                <label className="hover:text-yellow-400 w-fit">
                    <input
                        className="mr-2 appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        type="checkbox"
                        name="all"
                        checked={includeAll}
                        onChange={handlecheckbox}
                    />
                    Include All
                </label>
                <label className="hover:text-green-500 w-fit">
                    <input
                        className="mr-2 appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        type="checkbox"
                        name="uppercase"
                        checked={includeUppercase}
                        onChange={handlecheckbox}
                    />
                    Include Uppercase
                </label>
                <label className="hover:text-green-500 w-fit">
                    <input
                        className="mr-2 appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300 "
                        type="checkbox"
                        name="lowercase"
                        checked={includeLowercase}
                        onChange={handlecheckbox}
                    />
                    Include Lowercase
                </label>
                <label className="hover:text-green-500 w-fit">
                    <input
                        className="mr-2 appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        type="checkbox"
                        name="numbers"
                        checked={includeNumbers}
                        onChange={handlecheckbox}
                    />
                    Include Numbers
                </label>
                <label className="hover:text-green-500 w-fit">
                    <input
                        className="mr-2 appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                        type="checkbox"
                        name="symbols"
                        checked={includeSymbols}
                        onChange={handlecheckbox}
                    />
                    Include Symbols
                </label>
                <div className="flex gap-1 w-full flex-col">
                    <button
                        onClick={genratepassword}
                        className="bg-blue-500  hover:bg-blue-700 text-white text-xl font-bold rounded mt-4 p-3"
                    >
                        Generate Password
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold rounded p-3 mt-4"
                    >
                        Copy
                    </button>



                </div>
            </div>
        </div>
    )
}

export default Gen