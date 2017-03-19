import React from "react";

export default class Computations {
    constructor(computersMark, placements) {
        this.corners = [[0,0], [0,2], [2,2], [2,0]];
        this.surrounding = [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
        this.computersMark = computersMark;
        this.playersMark = computersMark === "x" ? "o" : "x";
        this.placements = placements;
    }

    updatePlacements(placements) {
        this.placements = placements;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getFreeCorner() {
        let freeCorners = this.corners.filter((corner) => this.placements[corner[0]][corner[1]] === "");
        if (freeCorners.length > 0) {
            let randomIndex = this.getRandomInt(0, freeCorners.length-1);
            return freeCorners[randomIndex];
        }
    }

    getFreePlacements() {
        let freePlacements = []
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.placements[row][col] === "")
                    freePlacements.push([row, col]);
            }
        }
        if (freePlacements.length > 0) return freePlacements;
    }

    getFreeRandomPlacement() {
        let freePlacements = this.getFreePlacements();
        if (freePlacements.length > 0) {
            let randomIndex = this.getRandomInt(0, freePlacements.length-1);
            return freePlacements[randomIndex];
        }
    }

    isInBounds(row, col)
    {
        return (row >= 0 && row <= 2 && col >= 0 && col <= 2);
    }

    getAllNeighbours(row, col) {
        let mark = this.placements[row][col];
        let neighbours = this.surrounding.filter((neighbour) => {

            let inBounds = this.isInBounds(row + neighbour[0], col + neighbour[1])
            if (!inBounds) return false; // fail early if the checked position is out of bounds

            let markDoesMatch = (this.placements[row + neighbour[0]][col + neighbour[1]] === mark)
            if (!markDoesMatch) return false;

            return true;
        })
        if (neighbours.length > 0)
            return neighbours.map((neighbour) => [row + neighbour[0], col + neighbour[1]]);
    }

    isTrio(trio) { // trio is a triplet e.g. [[row,col], [row,col], [row,col]]  // TODO check if trio's items are unique
        let rows = [trio[0][0], trio[1][0], trio[2][0]]
        let rowsSetSize = new Set(rows).size
        let allRowsEqual = rowsSetSize === 1;  // for every item in trio, all rows (index = 0) are equal
        
        let cols = [trio[0][1], trio[1][1], trio[2][1]]
        let colsSetSize = new Set(cols).size
        let allColsEqual = colsSetSize === 1;  // for every item in trio, all cols (index = 1) are equal
        
        let noColsAndNoRowsEual =  (rowsSetSize === 3) && (colsSetSize === 3)  // only if all rows/cols are different from each other, the sets will have a size of 3

        if (allRowsEqual || allColsEqual || noColsAndNoRowsEual)
            return true;
        return false;
    }

    getMissingLink(mark) {
        // missing link in row
        for(let row = 0; row < 3; row++) {
            if (this.placements[row][0] === mark && this.placements[row][1] === "" && this.placements[row][2] === mark)
                return [row,1];
        }
        // missing link in col
        for(let col = 0; col < 3; col++) {
            if (this.placements[0][col] === mark && this.placements[1][col] === "" && this.placements[2][col] === mark)
                return [1,col];
        }
        // missing link in diagonal 
        if (this.placements[0][0] === mark && this.placements[1][1] === "" && this.placements[2][2] === mark)
            return [1,1];
        // missing link in anti-diagonal 
        if (this.placements[2][0] === mark && this.placements[1][1] === "" && this.placements[0][2] === mark)
            return [1,1];
    }


    getMissingPlacementForTrio(mark) { // returns the first position that would allow the player with mark to complete the game
        let duos = this.getAllDuos(mark);
        if (duos) {
            for(let duo of duos) { // we have to check all duos to make sure that there is no duo that the player with mark cant append to
                for(let position of duo) {  // no we check the surrounding for both positions of the duo
                    for(let neighbourOffset of this.surrounding) {  // 3x for loop performance hell :-) thank god n is small
                        let neighbour = [position[0] + neighbourOffset[0], position[1] + neighbourOffset[1]]; // lets calculate the absolute neighbour position
                        if (this.isInBounds(neighbour[0], neighbour[1]) && 
                            this.placements[neighbour[0]][neighbour[1]] === "") { // we only check for trio if the inspected neighbour position is still empty and within bounds 
                        let possibleTrio = [[duo[0][0], duo[0][1]], [duo[1][0], duo[1][1]], [neighbour[0], neighbour[1]]]
                            if (this.isTrio(possibleTrio))
                                return [neighbour[0], neighbour[1]];
                        }
                    }
                }
            }
        }

        let missingLink = this.getMissingLink(mark);
        if (missingLink) return missingLink;
    }

    allFieldAreOccupied() {
        let freePlacements = this.getFreePlacements();
        return !freePlacements
    }

    allRowsInCol(col, mark) { // check rows for the supplied col
        for (let row = 0; row < 3; row++) {
            if (this.placements[row][col] !== mark)
                return undefined;
        }
        return [[0,col],[1,col],[2,col]];
    }

    allColsInRow(row, mark) { // check cols for the supplied row
        for (let col = 0; col < 3; col++) {
            if (this.placements[row][col] !== mark)
                return undefined;
        }
        return [[row,0],[row,1],[row,2]];
    }

    allInDiagonal(mark) {
        for(let i = 0; i < 3; i++){
            if(this.placements[i][i] != mark)
                return undefined;
        }
        return [[0,0],[1,1],[2,2]];
    }

    allInAntiDiagonal(mark) {
        for(let i = 0; i < 3; i++){
            if(this.placements[i][2-i] != mark)
                return undefined;
        }
        return [[2,0],[1,1],[0,2]];
    }

    hasWon(row, col, mark) { // checks if last row,col placement resulted in a win for player with mark
        let allColsInRow = this.allColsInRow(row, mark);
        if (allColsInRow) return allColsInRow;

        let allRowsInCol = this.allRowsInCol(col, mark);
        if (allRowsInCol) return allRowsInCol;
        
        let allInDiagonal = this.allInDiagonal(mark);
        if (allInDiagonal) return allInDiagonal;
        
        let allInAntiDiagonal =  this.allInAntiDiagonal(mark);
        if (allInAntiDiagonal) return allInAntiDiagonal;
    }

    getAllDuos(mark) {
        let allNeighbours = []
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.placements[row][col] === mark) {
                    let neighbours = this.getAllNeighbours(row, col)
                    if (neighbours)
                        neighbours.forEach((neighbour) => allNeighbours.push([[row,col], neighbour]));
                }
            }
        }
        if (allNeighbours.length > 0)
            return allNeighbours;
    }


    getNextComputerPlacement() {
        // complete a trio
        let trioCompletionMove = this.getMissingPlacementForTrio(this.computersMark);
        if (trioCompletionMove) return trioCompletionMove;

        // try to prevent a trio
        let trioPreventionMove = this.getMissingPlacementForTrio(this.playersMark);
        if (trioPreventionMove) return trioPreventionMove;

        // try to get a corner
        let freeCorner = this.getFreeCorner(this.placements);
        if (freeCorner) return freeCorner;

        // choose a free random placement
        let freeRandomPlacement = this.getFreeRandomPlacement();
        return freeRandomPlacement;
    }

}