import { useState } from "react"

export default function ModalFilter({ filterModalRef, option, query, setQuery }) {
    const [input, setInput] = useState('')

    const hanleInput = (e) => setInput(e.target.value)

    const search = () => {
        setQuery({ ...query, [option]: input })
        setInput('')
    }
    return (<>

        <dialog ref={filterModalRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">{option}</h3>
                    <input placeholder="" type={option === 'row' ? 'number' : 'text'} className="my-4 input input-bordered w-full max-w-xs" value={input} onChange={hanleInput} />
                    <button className="btn ml-2" onClick={search}>OK</button>
                </form>

            </div>
        </dialog>
    </>
    )
}