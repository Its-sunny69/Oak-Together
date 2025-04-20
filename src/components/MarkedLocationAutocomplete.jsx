import { faLocationDot, faSortDown, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from "react-paginate";
import { getLocationsByFilterPagination } from '../features/locationSlice';
import { useDebounce } from '../hooks'

function MarkedLocationAutocomplete({ selectedLocationObj, setSelectedLocationObj, containerStyleClasses, labelStyleClasses, inputStyleClasses }) {

    const [paramsObj, setParamsObj] = useState({
        search: "",
        page: 0,
        size: 5,
        sortOrder: "ASC",
        filterObj: {
            type: "BARREN"
        }
    });
    const debouncedSearchTerm = useDebounce(paramsObj.search, 1000);
    const showSuggestions = paramsObj.search && !selectedLocationObj;

    const dispatch = useDispatch();
    const { locationsByFilterPagination: locationList, totalPages } = useSelector((state) => state.location);


    useEffect(() => {
        if (!paramsObj.search) return;

        dispatch(getLocationsByFilterPagination(paramsObj)).unwrap()
            .catch((error) => console.log(error));
        
    }, [debouncedSearchTerm, paramsObj.page]);


    return (
        <div className={"relative " + containerStyleClasses}>
            <label htmlFor="markedLocations" className={labelStyleClasses}>Select from Marked Locations:</label>
            <div className="relative">
                <input
                    className={inputStyleClasses}
                    id="markedLocations"
                    name="markedLocations"
                    type="text"
                    value={paramsObj.search}
                    onChange={(e) => {
                        setParamsObj({ ...paramsObj, search: e.target.value.trim() });
                        setSelectedLocationObj(null);
                    }}
                    style={{
                        backgroundColor: selectedLocationObj ? "#E2E2E2" : ""
                    }}
                />
                <FontAwesomeIcon icon={faSortDown} className="absolute top-3 right-4 text-sm text-[#60D6D9]" />
                {
                    paramsObj.search &&
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="absolute top-3 right-10 text-base text-[#D20000] cursor-pointer"
                        onClick={() => {
                            setSelectedLocationObj(null);
                            setParamsObj({ ...paramsObj, search: "" });
                        }}
                    />
                }
            </div>
            {
                showSuggestions &&
                <div className="absolute top-[4.2rem] flex flex-col gap-2 w-full border-[1px] border-gray-400 bg-white z-10">
                    <ul className="flex flex-col items-center ">
                        {locationList?.map((locationObj) =>
                            <li
                                key={locationObj.id}
                                className="flex items-center gap-2 p-2 border-t-[0.5px] border-gray-400 hover:bg-gray-100 w-full transition-all cursor-pointer"
                                onClick={() => {
                                    setSelectedLocationObj(locationObj);
                                    setParamsObj({ ...paramsObj, search: locationObj.name })
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-lg text-gray-400"
                                />
                                <div className="flex items-center gap-1 text-sm w-[90%] font-bold truncate text-ellipsis">
                                    <p>{locationObj.name ?? "Location"}</p>
                                    <span className="text-xs text-gray-300 overflow-hidden text-ellipsis ">
                                        {locationObj.position?.address ?? "Address"}
                                    </span>
                                </div>
                            </li>
                        )}
                    </ul>

                    <div className="flex flex-col justify-center items-center rounded-b-lg">
                        <div className="w-[80%] h-0 border-t-[0.2px] border-t-black"></div>
                        <ReactPaginate
                            nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
                            onPageChange={
                                (event) => {
                                    console.log("YOHOHOHO")
                                    console.log(event.selected);
                                    console.log(paramsObj);
                                    setParamsObj({
                                        ...paramsObj,
                                        page: event.selected
                                    });
                                }
                            }
                            forcePage={paramsObj.page}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={Math.max(totalPages, 1)}
                            previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
                            previousClassName={`page-item ${paramsObj.page === 0 ? "opacity-50 pointer-events-none" : ""
                                }`}
                            nextClassName={`page-item ${paramsObj.page === totalPages - 1
                                ? "opacity-50 pointer-events-none"
                                : ""
                                }`}
                            pageLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination flex justify-center items-center my-1 w-full"
                            pageClassName="page-item px-3 py-1 border border-[#60d6d9] rounded-full mx-1"
                            activeClassName="active bg-[#60d6d9] text-white"
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default MarkedLocationAutocomplete;