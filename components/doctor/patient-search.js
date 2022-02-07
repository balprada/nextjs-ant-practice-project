import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  filterPatientsByMedicines,
  filterPatientsByName,
  filterPatientsBySymptoms,
} from "../../store/slice";
import { Input, Space } from "antd";

function PatientSearch() {
  const { Search } = Input;
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
    <Space style={{padding: "0.5em", width: "100%", backgroundColor: "##e1e2e5"}}>
      <Search 
        placeholder="Search By Name"
        allowClear
        enterButton="Search"
        onSearch={handleSearchByNameClick}
      />
      <Search
        placeholder="Search By Symptoms"
        allowClear
        enterButton="Search"
        // size="small"
        onSearch={handleSearchBySymptomsClick}
      />
      <Search
        placeholder="Search By Medicine"
        allowClear
        enterButton="Search"
        // size="small"
        onSearch={handleSearchByMedicineClick}
      />
    </Space>
  );
}

export default PatientSearch;
