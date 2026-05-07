// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title AgriTrust
 * @dev Supply chain tracking contract for agricultural products on Polygon
 */
contract AgriTrust {
    struct Batch {
        string batchId;
        address producer;
        string productType;
        uint256 timestamp;
        string originLocation;
        string currentStatus;
    }

    mapping(string => Batch) public batches;
    mapping(string => address[]) public batchJourney;

    event BatchCreated(string batchId, address producer, uint256 timestamp);
    event StatusUpdated(string batchId, string newStatus, address updater);

    function createBatch(
        string memory _batchId, 
        string memory _productType, 
        string memory _originLocation
    ) public {
        require(batches[_batchId].producer == address(0), "Batch already exists");
        
        batches[_batchId] = Batch({
            batchId: _batchId,
            producer: msg.sender,
            productType: _productType,
            timestamp: block.timestamp,
            originLocation: _originLocation,
            currentStatus: "Harvested"
        });
        
        batchJourney[_batchId].push(msg.sender);
        
        emit BatchCreated(_batchId, msg.sender, block.timestamp);
    }

    function updateBatchStatus(string memory _batchId, string memory _newStatus) public {
        require(batches[_batchId].producer != address(0), "Batch does not exist");
        
        batches[_batchId].currentStatus = _newStatus;
        batchJourney[_batchId].push(msg.sender);
        
        emit StatusUpdated(_batchId, _newStatus, msg.sender);
    }
    
    function getBatchData(string memory _batchId) public view returns (Batch memory) {
        return batches[_batchId];
    }
}
