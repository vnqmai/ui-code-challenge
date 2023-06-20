import { Col, Container, Form, Row } from 'react-bootstrap';
import godfatherLogo from './assets/_logo/the-godfather.svg';
import './assets/styles/main.scss';
import './App.scss';
import { EMPLOYEES_DATA } from './data/EmployeeData';
import { useRef, useState } from 'react';
import { useOutside } from './hooks/useClickOutside';
import InputRange from './components/commons/InputRange/InputRange';

function App() {
  const [currentEmployee, setCurrentEmployee] = useState(EMPLOYEES_DATA.employees[0]);
  const [employees, setEmployees] = useState(EMPLOYEES_DATA.employees);
  const [mobileShowSidebar, setMobileShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  useOutside(sidebarRef, () => setMobileShowSidebar(false))

  const handleClickEmployee = (employee) => {
    setCurrentEmployee(employee);
  };

  const updateCurrentEmployeePopularity = (value) => {
    const employee = { ...currentEmployee };
    employee.popularity = value;
    setCurrentEmployee(employee);
    return employee;
  }

  const updateEmployeeListByEmployee = (employee) => {
    const employeesList = [...employees].map(emp => {
      if (emp.name === employee.name) {
        return employee;
      }
      return emp;
    });
    setEmployees(employeesList);
  }

  const handleChangePopularity = (e) => {
    const value = e.target.value;
    const updatedEmployee = updateCurrentEmployeePopularity(value);
    updateEmployeeListByEmployee(updatedEmployee);
  }

  return (
    <div className="App">
      <div ref={sidebarRef} className={`godfather-sidebar ${mobileShowSidebar ? 'mobile-show' : ''}`}>
        <div className='godfather-sidebar-logo'>
          <img src={godfatherLogo}  alt='godfather logo'/>
        </div>
        <div className='godfather-sidebar-employees'>
          {
            employees.map(employee => {
              const isActive = currentEmployee.name === employee.name ? 'active' : '';
              const isInteracted = currentEmployee.colleagues.includes(employee.name) ? 'interact' : '';
              return (
                <div
                  key={employee.name}
                  className={`godfather-sidebar-employee-item ${isActive} ${isInteracted}`}
                  style={{fontSize: `${employee.popularity*0.1+0.7}rem`}}
                  onClick={() => handleClickEmployee(employee)}
                >
                  {employee.name}
                </div>
              )
            })
          }
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className='godfather-header'></div>
          </Col>
        </Row>
        <Row className='godfather-content-wrapper'>
          <Col md={12} className='godfather-content-block'>
            <div className='godfather-content'>
              <div className='godfather-content-image'>
                <img alt={currentEmployee.name} src={`./assets/images/Profile pics/${currentEmployee.image}`}/>
              </div>
              <div>
                <div className='godfather-content-name'>{currentEmployee.name}</div>
                <div className='godfather-content-popularity'>
                  <div className='godfather-content-title'>Popularity: </div>
                  <InputRange
                    value={currentEmployee.popularity}
                    min={1}
                    max={30}
                    onChange={handleChangePopularity}
                  />
                </div>
                <div className='godfather-content-biography'>
                  <div className='godfather-content-title'>Biography</div>
                  <div>{currentEmployee.biography}</div>
                </div>
                {
                  !mobileShowSidebar &&
                  <div className='sidebar-toggle' onClick={() => setMobileShowSidebar(!mobileShowSidebar)}>
                    Show/hide sidebar
                  </div>
                }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
