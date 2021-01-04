// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./Utils.sol";
import "./SafeMath.sol";

abstract contract UserStorage {
    
    uint public customerCount;
    uint public employeeCount;
    uint public roleCount;
    uint public payModelCount;
    uint public paymentCount;
    
    mapping(address => Customer) public customer;
    mapping(uint => Customer) public customers;
    mapping(address => Employee) public employee;
    mapping(uint => Employee) public employees;
    mapping(uint => Role) public role;
    mapping(uint => PayModel) public paymodel;
    mapping(uint => PayStub) public paystub;
    
    mapping(address => bool) public admin;
    mapping(address => bool) public cashier;
    mapping(address => bool) public customerAccess;
    mapping(address => bool) public manager;

    
    struct Customer {
        uint id;
        address addr;
        string firstName;
        string lastName;
        string dob;
        string licenseNumber;
        string email;
        string phone;
        uint[] purchaseIds;
        bool isRegistered;
    }
    
    struct Employee {
        uint id;
        address addr;
        uint payModelId;
        uint roleId;
        string firstName;
        string lastName;
        string title;
        string startDate;
        string inactivatedDate;
        bool isActive;
    }
    
    struct Role {
        uint id;
        string name;
    }
    
    struct PayModel {
        uint id;
        address addr;
        uint employeeId;
        string title;
        string payScheduleName;
        uint totalAnnualPay;
        uint payScheduleId;
    }

    struct PayStub {
        uint paymentId;
        uint employeeId;
        uint paymentAmount;
        uint taxRate;
        uint taxesPaid;
        string dateTime;
        
    }
    
    function addToAdmins(address _addr) public {
        require(admin[msg.sender] == true);
        admin[_addr] = true;
    }

    function addToManagers(address _addr) public {
        require(admin[msg.sender] == true);
        manager[_addr] = true;
    }

    function addToCashiers(address _addr) public {
        require(admin[msg.sender] == true || manager[msg.sender] == true);
        cashier[_addr] = true;
    }

    function createCustomer(string memory _firstName, string memory _lastName, string memory _dob, string memory _licenseNumber, string memory _email, string memory _phone) public {
        
        require(bytes(_firstName).length > 0, 'first name is a required field');
        require(bytes(_lastName).length > 0, 'last name is a required field');
        require(bytes(_email).length > 0, 'email is a required field');
        require(bytes(_phone).length > 0, 'mobile phone is a required field');
        
        customerCount++;
        
        customers[customerCount] = Customer(customerCount, msg.sender, _firstName, _lastName, _dob, _licenseNumber, _email, _phone, new uint[](0), true);
        customer[msg.sender] = Customer(customerCount, msg.sender, _firstName, _lastName, _dob, _licenseNumber, _email, _phone, new uint[](0), true);
        
        customerAccess[msg.sender] = true;
        
    }

    function createPayStub(uint _paymentId, uint _employeeId, uint _paymentAmount, uint _taxRate, uint _taxPayment, string memory _dateTime) public {
        
        paystub[_paymentId] = PayStub(_paymentId, _employeeId, _paymentAmount, _taxRate, _taxPayment, _dateTime);
        
    }
    
    function createRole(string memory _roleName) public {
        
        require(admin[msg.sender] = true);
        
        roleCount++;
        
        role[roleCount] = Role(roleCount, _roleName);
        
    }
    
    function createEmployee(address payable _address, uint _roleId, string memory _firstName, string memory _lastName, string memory _title, string memory _payScheduleName, string memory _startDate, bool _isActive, uint _totalAnnualPay, uint _payScheduleId) public {
        
        require(bytes(_firstName).length > 0, 'first name is a required field');
        require(bytes(_lastName).length > 0, 'last name is a required field');
        require(bytes(_title).length > 0, 'title is a required field');
        require(_roleId != 0, 'role ID is a required field');
        
        employeeCount++;
        
        uint payModelId = createPayModel(_address, employeeCount, _title, _payScheduleName, _totalAnnualPay, _payScheduleId);
        
        employees[employeeCount] = Employee(employeeCount, _address, payModelId, _roleId, _firstName, _lastName, _title, _startDate, '', _isActive);
        employee[_address] = Employee(employeeCount, _address, payModelId, _roleId, _firstName, _lastName, _title, _startDate, '', _isActive);
        
    }
    
    function createPayModel(address payable _addr, uint _employeeId, string memory _title, string memory _payScheduleName, uint _totalAnnualPay, uint _payScheduleId) public returns (uint _payModelId) {
        
        payModelCount++;
        
        paymodel[payModelCount] = PayModel(payModelCount, _addr, _employeeId, _payScheduleName, _title, _totalAnnualPay, _payScheduleId);
        
        _payModelId = payModelCount;
    }
    
    function getRoleId(string memory _roleName) private view returns (uint _roleId) {
        
        uint i = 1;
        
        for(i; i < roleCount; i++) {
            if(Utils.compareStrings(_roleName, role[i].name)) {
                _roleId = role[i].id;
            }
            else {
                return 0;
            }
        }
    }
    
    function getPaymentAmount(uint _employeeId) public view returns (uint _paymentAmount) {
        
        _paymentAmount = SafeMath.div(paymodel[_employeeId].totalAnnualPay, 26);
    }
    
    function updateEmployee(address payable _addr, uint _roleId, string memory _lastName, string memory _title, string memory _inactivatedDate, bool _isActive) public {
        
        if(_isActive == false) {
            require(bytes(_inactivatedDate). length > 0);
        }
        
        Employee memory _employee = employee[_addr];
        
        _employee.roleId = _roleId;
        _employee.lastName = _lastName;
        _employee.title = _title;
        
        if(bytes(_inactivatedDate).length > 0 && _isActive == false) {
            _employee.inactivatedDate = _inactivatedDate;
            _employee.isActive = _isActive;
        }
        
        employee[_addr] = _employee;
        employees[employee[_addr].id] = _employee;
        
    }
}
