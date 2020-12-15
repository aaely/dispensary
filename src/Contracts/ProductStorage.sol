//SPDX-License-Identifier: MIT

pragma solidity >0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "./UserStorage.sol";
import "./SafeMath.sol";

abstract contract ProductStorage is UserStorage {
    
    uint public productCount;
    uint public locationCount;
    uint public terpeneCount;
    uint public cannabinoidCount;
    uint public categoryCount;
    uint public cannabinoidProfileCount;
    uint public transactionCount;
    uint public purchaseCount;
    
    mapping(uint => Product) public product;
    mapping(uint => Category) public category;
    mapping(uint => Location) public location;
    mapping(uint => Terpene) public terpene;
    mapping(uint => ProductProfile) public productprofile;
    mapping(uint => Cannabinoid) public cannabinoid;
    mapping(uint => PurchaseReceipt) public purchase;

    struct Product {
        uint id;
        string name;
        uint categoryId;
        uint cost;
        uint quantity;
        uint[] locations;
        uint prouctProfileId;
    }
    
    struct Category {
        uint id;
        string name;
        string desc;
    }

    struct Location {
        uint id;
        uint taxRate;
        string nickname;
        string street;
        string city;
        string state;
        string zip;
    }
    
    struct Terpene {
        uint id;
        string name;
        string flavorDesc;
        string effectDesc;
        
    }
    
    struct Cannabinoid {
        uint id;
        string name;
        string effectDesc;
    }
    
    struct ProductProfile {
        uint productId;
        uint[] terpenes;
        uint[] cannabinoids;
        uint[] terpeneConcentrations;
        uint[] cannabinoidConcentrations;
    }
    
    struct PurchaseReceipt {
        uint id;
        address purchaser;
        uint[] products;
        uint[] quantities;
        uint amountTotal;
        uint amountTax;
        uint taxRate;
        uint rawTotal;
        uint customerId;
        uint locationId;
        //string dateTime;
    }
    
    
    function createLocation(uint _taxRate, string memory _nickname, string memory _street, string memory _city, string memory _state, string memory _zip) public {
        
        require(_taxRate != 0, 'Yo, everywhere has taxes, what are you talking about 0!');
        require(bytes(_street).length > 0, 'street address is a required field');
        require(bytes(_city).length > 0, 'city is a required field');
        require(bytes(_state).length > 0, 'state is a required field');
        require(bytes(_zip).length > 0, 'zip is a required field');
        
        locationCount++;
        
        location[locationCount] = Location(locationCount, _taxRate, _nickname, _street, _city, _state, _zip);
        
    }
    
    function createTerpene(string memory _name, string memory _flavorDesc, string memory _effectDesc) public {
        
        require(UserStorage.admin[msg.sender] == true || UserStorage.manager[msg.sender] == true);
        
        terpeneCount++;
        
        terpene[terpeneCount] = Terpene(terpeneCount, _name, _flavorDesc, _effectDesc);
    }
    
    function createCannabinoid(string memory _name, string memory _effectDesc) public {
        
        require(UserStorage.admin[msg.sender] == true || UserStorage.manager[msg.sender] == true);
        
        cannabinoidCount++;
        
        cannabinoid[cannabinoidCount] = Cannabinoid(cannabinoidCount, _name, _effectDesc);
    }
    
    function createProductProfile(uint[] memory _terpenes, uint[] memory _cannabinoids, uint[] memory _terpeneConcentrations, uint[] memory _cannabinoidConcentrations) private {
        
        productprofile[productCount] = ProductProfile(productCount, _terpenes, _cannabinoids, _terpeneConcentrations, _cannabinoidConcentrations);
        
    }
    
    function createCategory(string memory _name, string memory _desc) public {
        
        require(bytes(_name).length > 0);
        require(bytes(_desc).length > 0);
        
        categoryCount++;
        
        category[categoryCount] = Category(categoryCount, _name, _desc);
        
    }
    
    function createProduct(string memory _name, uint _categoryId, uint256 _cost, uint _quantity, uint[] memory _locations, uint[] memory _terpenes, uint[] memory _cannabinoids, uint[] memory _terpeneConcentrations, uint[] memory _cannabinoidConcentrations) public {
        
        require(UserStorage.admin[msg.sender] == true || UserStorage.manager[msg.sender] == true);
        
        productCount++;
        
        createProductProfile( _terpenes, _cannabinoids, _terpeneConcentrations, _cannabinoidConcentrations);
        
        product[productCount] = Product(productCount, _name, _categoryId, _cost, _quantity, _locations, productCount);
        
    }

    function purchaseProducts(uint[] memory _productIds, uint[] memory _quantities, uint _locationId) public payable returns (uint _rawTotal, uint _taxAmount, uint _cost) {
        
        require(_productIds.length == _quantities.length, 'Mismatch of number of products to amounts');
        require(UserStorage.customerAccess[msg.sender] == true, 'Register as a customer first');
        
        for(uint i = 0; i < _productIds.length; i++) {
            
            Product memory _product = product[_productIds[i]];
            _rawTotal = _rawTotal + _product.cost * _quantities[i];
            _product.quantity = _product.quantity - _quantities[i];
            product[_productIds[i]] = _product;
        }
        
        _taxAmount = SafeMath.div((_rawTotal*100) * location[_locationId].taxRate, 100);
        
        _cost = _taxAmount + _rawTotal;
        
        require(msg.value >= _cost);
        
        purchaseCount++;
        
        purchase[purchaseCount] = PurchaseReceipt(purchaseCount, msg.sender, _productIds, _quantities, _cost, _taxAmount, location[_locationId].taxRate, _rawTotal, UserStorage.customer[msg.sender].id, _locationId);
        
        
    }

    
}