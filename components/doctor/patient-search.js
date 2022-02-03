import { useRef } from "react";
import { useDispatch } from "react-redux";
import { filterPatientsByMedicines, filterPatientsByName, filterPatientsBySymptoms } from "../../store/slice";

function PatientSearch() {
  const searchByNameRef = useRef();
  const searchBySymptomsRef = useRef();
  const searchByMedicineRef = useRef();

  const dispatch = useDispatch();

  function handleSearchByNameClick() {
    let searchTerm = searchByNameRef.current.value;

    // if (searchTerm !== "") {
      dispatch(filterPatientsByName({ searchTerm: searchTerm }));
    // }
  }
  
  function handleSearchBySymptomsClick() {
    let searchTerm = searchBySymptomsRef.current.value;

    // if (searchTerm !== "") {
      dispatch(filterPatientsBySymptoms({ searchTerm: searchTerm }));
    // }
  }
  
  function handleSearchByMedicineClick() {
    let searchTerm = searchByMedicineRef.current.value;

    // if (searchTerm !== "") {
      dispatch(filterPatientsByMedicines({ searchTerm: searchTerm }));
    // }
  }
  return (
    <div>
      <div>
        <label>Search By Name: </label>
        <input type="text" ref={searchByNameRef} />
        <button onClick={handleSearchByNameClick}>Enter</button>
      </div>
      <div>
        <label>Search By Symptoms: </label>
        <input type="text" ref={searchBySymptomsRef} />
        <button onClick={handleSearchBySymptomsClick}>Enter</button>
      </div>
      <div>
        <label>Search By Medicine: </label>
        <input type="text" ref={searchByMedicineRef} />
        <button onClick={handleSearchByMedicineClick}>Enter</button>
      </div>
    </div>
  );
}

export default PatientSearch;
