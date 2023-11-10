import { useEffect, useRef, useState } from "react"
import { Modal } from "./Modal"
import { getTableData } from "../api"
import Dropdown from "./Dropdown"

export default function SampleTable() {

    const [data, setData] = useState([])
    const [page, setPage] = useState(null)
    const [pages, setPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const [activeId, tooglActiveId] = useState(null)
    const modalRef = useRef()

    const changePage = (number) => setPage(number)

    const setOpen = (id) => {
        modalRef.current.showModal()
        tooglActiveId(id)
    }

    const getData = (query) => {
        setLoading(true)
        getTableData(query)
            .then((response) => {
                setLoading(false)
                setData(response.data.results)
                !query ? setPage(response.data.page) : setPages(Math.ceil(response.data.count / response.data.pagesize))
            })
    }

    const updateTable = (item) => setData(data => data.map(i => i.id === item.id ? item : i))

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (!page) return
        getData(`?page=${page}`)
    }, [page])

    return <>
        {loading ? <p className="w-screen flex justify-center">Loading...</p> :
            <div className="w-screen min-h-screen">
                <div className="flex items-center flex-wrap">
                    <Dropdown setData={setData} setPages={setPages} />
                </div>

                <Modal id={activeId} modalRef={modalRef} updateTable={updateTable} />

                {data.length === 0 ? <div className="min-h-screen">Not found</div> : <>
                    <div className="overflow-x-auto">
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>purchased</th>
                                    <th>event_date</th>
                                    <th>event_name</th>
                                    <th>section</th>
                                    <th>quantity</th>
                                    <th>profit</th>
                                    <th>row</th>
                                    <th>total</th>
                                    <th>total_cost</th>
                                    <th>updated_by</th>
                                    <th>venue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 &&
                                    data.map(item => {
                                        return (
                                            <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setOpen(item.id)}>
                                                <th>{item.id.toString()}</th>
                                                <td>{item.purchased.toString()}</td>
                                                <td>{item.event_date.toString()}</td>
                                                <td>{item.event_name.toString()}</td>
                                                <td>{item.section.toString()}</td>
                                                <td>{item.quantity.toString()}</td>
                                                <td>{item.profit.toString()}</td>
                                                <td>{item.row.toString()}</td>
                                                <td>{item.total.toString()}</td>
                                                <td>{item.total_cost.toString()}</td>
                                                <td>{item.updated_by.toString()}</td>
                                                <td>{item.venue.toString()}</td>

                                            </tr>
                                        )
                                    })}

                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-center join mt-2">
                        {pages > 0 && Array.from(Array(pages).keys()).map((item) =>
                            <button key={item} className={`join-item btn ${item === page - 1 ? "btn-active" : ""}`} onClick={() => changePage(item + 1)}>{item + 1}</button>
                        )}
                    </div>
                </>}
            </div>}
    </>
}