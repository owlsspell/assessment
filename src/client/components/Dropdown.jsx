import { useRef, useState } from "react"
import ModalFilter from "./ModalFilter"
import { getTableData } from "../services/api";

export default function Dropdown({ setData, setPages }) {
    const [filterOptions, setFilterOptions] = useState({
        row: null,
        event_name: null
    })
    const [option, setOption] = useState()
    const filterModalRef = useRef()

    const rowSearch = () => {
        setOption("row")
        filterModalRef.current.showModal()
    }
    const eventSearch = () => {
        setOption("event_name")
        filterModalRef.current.showModal()
    }
    const search = () => {
        let isNotNull = Object.keys(filterOptions).filter(key => filterOptions[key])
        let string = isNotNull.map(key => `${key}=${filterOptions[key]}`).join('&')

        getTableData(`?${string}`).then((response) => {
            setData(response.data.results)
            setPages(Math.ceil(response.data.count / response.data.pagesize))
        })
    }

    const deletFilter = (key) => setFilterOptions({ ...filterOptions, [key]: null })


    return (
        <>
            <div className="dropdown dropdown-bottom mr-2">
                <label tabIndex={0} className="btn m-1">Choose search/filter options</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={rowSearch}><a>Row</a></li>
                    <li onClick={eventSearch}> <a>Event Name</a></li>
                </ul>
            </div >
            <button className="btn mr-2" onClick={search}>OK</button>
            {Object.keys(filterOptions).map(key => filterOptions[key] && <div key={filterOptions[key]} className="badge badge-neutral m-2" onClick={() => deletFilter(key)}>{key}: {filterOptions[key]} X</div>)}
            <ModalFilter filterModalRef={filterModalRef} option={option} query={filterOptions} setQuery={setFilterOptions} />
        </>
    )
}