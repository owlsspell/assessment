import { useEffect, useState } from "react"
import { getTableData, tooglePurchase } from "../api"

export const Modal = ({ id, modalRef, updateTable }) => {

    const [data, setData] = useState(null)
    const [input, setInput] = useState('')

    const getData = () => {
        getTableData(`?id=${id}`)
            .then((res) => {
                setData(res.data.results[0])
                updateTable(res.data.results[0])
            })
    }

    const purchase = async (isPurchase) => {
        await tooglePurchase(data.id, input, isPurchase)
        getData()
    }

    const hanleInput = (e) => setInput(e.target.value)


    useEffect(() => {
        if (!id) return
        getData()
    }, [id])

    return (<>
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle w-screen overflow-x-hidden">
            {data && <div className="modal-box">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map(key => {
                                return <tr key={key}>
                                    <th>{key}</th>
                                    <td>{data[key].toString()}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="modal-action">
                    <form method="dialog" className="flex justify-between w-full">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <button className="btn">Close</button>
                    </form>
                    <input type="text" placeholder="Type name here" className="mr-2 input input-bordered w-full max-w-xs" value={input} onChange={hanleInput} />
                    <div className="btn mr-2" onClick={() => purchase(true)} disabled={input.trim().length === 0}>Purchase</div>
                    <div className="btn mr-2" onClick={() => purchase(false)}>Revert</div>
                </div>
            </div >}
        </dialog >
    </>)
}