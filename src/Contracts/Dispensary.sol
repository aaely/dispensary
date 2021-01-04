//SPDX-License-Identifier: MIT

pragma solidity >0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

import {ProductStorage} from "./ProductStorage.sol";
import {UserStorage} from "./UserStorage.sol";



contract Dispensary is ProductStorage {
    
    address payable owner;

    constructor() {
        owner = msg.sender;
        
        UserStorage.createRole("admin");
        //UserStorage.createRole("cashier");
        //UserStorage.createRole("manager");
        
        ProductStorage.createCategory("Flower", "Pure organic flower");
        ProductStorage.createCategory("Butane Concentrates", "Extracted with butane");
        ProductStorage.createCategory("CO2 Concentrates", "Extracted with CO2");
        
        UserStorage.createCustomer("aaron", "ely", "March 18 1989", "123LicNum456", "aaron.ely@hotmail.com", "913-547-2476");
        ProductStorage.createLocation(15,"Henderson", "9480 S Eastern Ave #185", "Las Vegas", "NV", "89123");
        ProductStorage.createLocation(15,"Las Vegas", "2550 S Rainbow Blvd #8", "Las Vegas", "NV", "89146");
        UserStorage.createEmployee(0xBcA3320e93C54513A467Bb517dC25f9Eba15e779, 1, "Aaron", "Ely", "Blockchain Dev", "Bi-Weekly", "Dec 21 2020", true, 100000, 1);
        //UserStorage.createEmployee(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 2, "Aaron", "Ely", "Cashier", "Bi-Weekly", "December 11 2020", true, 70000, 2);
        UserStorage.addToAdmins(0xBcA3320e93C54513A467Bb517dC25f9Eba15e779);
        ProductStorage.createCannabinoid("THC", "Main psychoactive ingredient in cannabis. Largely responsible for the altered perception experienced.");
        ProductStorage.createCannabinoid("CBD", "Calming with anti inflammatory and general well being benefits.");
        ProductStorage.createTerpene("pinene",  "Pine like aroma with a vicks vapor rub like scent", "Expands larynx and opens lungs");
        ProductStorage.createTerpene("limonene", "Citrus like fragrance", "Promotes a euphoric and relaxed vibe");
        //createProduct("Pineapple Express", 1, 13, 907, [1,2], [1,2], [1,2], [7,15], [8,25]);
        //createProduct("Lemon Kush", 1, 10, 907, [1,2], [1,2], [1,2], [6,4], [27,12]);
        //createProduct("OG Wax", 2, 60, 72, [1,2], [1,2], [1,2], [7,15], [82,25]);
        
    }
    
    function getReceipts(address _addr) public view returns (uint[] memory purchaseIds) {
        purchaseIds = UserStorage.customer[_addr].purchaseIds;
    }

    
    function getCategoryName(uint _categoryId) public view returns (string memory _categoryName) {
        return (ProductStorage.category[_categoryId].name);
    }
    
    function fetchProduct(uint _productId) public view returns (string memory name, string memory categoryName, uint256 productCost, uint quantity, uint[] memory locations, ProductProfile memory productProfile) {
        
        name = ProductStorage.product[_productId].name;
        categoryName = getCategoryName(ProductStorage.product[_productId].categoryId);
        productCost = ProductStorage.product[_productId].cost;
        quantity = ProductStorage.product[_productId].quantity;
        locations = ProductStorage.product[_productId].locations;
        productProfile = ProductStorage.productprofile[_productId];
        
    }

    function fetchReceipt(uint _purchaseId) public view returns (PurchaseReceipt memory receipt) {
        
        receipt = ProductStorage.purchase[_purchaseId];

    }
    
}