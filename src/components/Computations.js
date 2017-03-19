import React from "react";

export default class Computations {
    constructor(computersMark, placements) {
        this.corners = [[0,0], [0,2], [2,2], [2,0]];
        this.computersMark = computersMark;
        this.playersMark = computersMark === "x" ? "o" : "x";
        this.placements = placements;
    }

    updatePlacements(placements) {
        this.placements = placements;
    }

    getFreeCorner() {
        return this.corners.find((corner) => this.placements[corner[0]][corner[1]] === "");
    }

    isInBounds(row, col)
    {
        return (row >= 0 && row <= 2 && col >= 0 && col <= 2);
    }

    getFirstNeighbour(row, col) {
        let surrounding = [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
        let mark = this.placements[row][col];
        let offset = surrounding.find((neighbour) => {

            let inBounds = this.isInBounds(row + neighbour[0], col + neighbour[1])
            if (!inBounds) return false; // fail early if checked place is not in bounds

            let markDoesMatch = (this.placements[row + neighbour[0]][col + neighbour[1]] === mark)
            if (!markDoesMatch) return false;

            return true;
        })
        if (offset)
            return [row + offset[0], col + offset[1]];
    }

    isTrio(trio) { // trio is a triplet e.g. [[row,col], [row,col], [row,col]]  // TODO check if trios items are unique
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




    getAllNeighbours(row, col, range) {
        
    }

    preventTrio() {
        let duos = getAllDuos(mark)
    }

    getAllDuos(mark) {

    }

    getFirstDuo(mark) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.placements[row][col] === mark) {
                    let neighbour = this.getFirstNeighbour(row, col)
                    if (neighbour) {
                        return [[row,col], neighbour];
                    }
                }
            }
        }
    }

    getTrio() {

    }

    getNextComputerPlacement(placements) {
        let freeCorner = this.getFreeCorner(placements);
        console.log(freeCorner);
    }

}