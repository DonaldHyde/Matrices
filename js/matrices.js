
var matrixA = [
	[ 3, 4, 5, 6, 7 ],
	[ 1, 2, 3, 4, 5 ],
	[ 9, 8, 7, 6, 5 ]
];

var matrixB = [
	[ 3, 4, 5, 6, 7 ],
	[ 1, 2, 3, 4 ],
	[ 9, 8, 7, 6, 5 ]
];

var matrixC = [
	[ 3, 4, 5, 6, 7 ],
	[ 1, 2, 3, 4, 'b' ],
	[ 9, 8, 7, 6, 5 ]
];

// var matrixB = [
// 	[ 3,   3.5 ],
// 	[ 3.2, 'a' ]
// ];

// var matrixC = [
// 	[ 3,   3.5 ],
// 	[ 3.2 ]
// ];

// var matrixD = [
// 	[ 118.4,   135.2 ]
// ];

function isMatrixValid(matrix) {
	var rowLen = undefined;

	for (var row=0,len=matrix.length;row<len;row++) {

		// First time through store the row length
		if (rowLen === undefined) {
			rowLen = matrix[row].length;
		}
		else {
			if (matrix[row].length !== rowLen) {
				return false;
			}
		}

		for (var col=0;col<rowLen;col++) {
			if (typeof matrix[row][col] !== 'number') {
				return false;
			}
		}

	}

	return true;

}

function Matrix(w, h) {

	this.data = [];
	this.height = 0;
	this.width = 0;

	// if there is data
	if (typeof w === 'object') {
		
		this.setData(w);

		// this.height = this.data.l;

	} else {
		if (typeof w === 'number' && 
			typeof h === 'number' && 
			w >= 1 &&
			h >= 1 &&
			Math.round(w) === w &&
			Math.round(h) === h
		) {
			this.height = h;
			this.width = w;
			for (var x=0;x<w;x++) {
				this.data[x] = [];
				for (var y=0;y<w;y++) {
					this.data[x].push(0);
				}
			}
		}
	}

}

Matrix.prototype = {

	setData: function(data) {

		// Validate the data
		if (isMatrixValid(data)) {

			this.data = data;
			this.height = this.data.length;
			this.width = this.data[0].length;

		}

	},

	canAddTo: function(matrix) {

		if (this.length !== matrix.length) {
			return false;
		}

		for (var row=0;row<this.length;row++) {

			if (this.data[row].length !== matrix[row].length) {
				return false;
			}

			for (var col=0;col<this.data[row].length;col++) {

				if (typeof matrix[row][col] !== 'number') {
					return false;
				}

			}

		}

		return true;

	},

	addTo: function(matrix) {

		if (isMatrixValid(matrix)) {

			return new Matrix(this.add(this.data, matrix));

		}

	},

	add: function(mA, mB) {
		var sumMatrix = [];

		try {

			if (mA.length !== mB.length) {
				throw new Error('Matrix contain different numbers of rows');
			}

			for (var row=0;row<mA.length;row++) {

				if (mA[row].length !== mB[row].length) {
					throw new Error('Matrix contains insufficient data in row ' + row);
				}

				sumMatrix[row] = [];

				for (var col=0;col<mA[row].length;col++) {

					if (typeof mA[row][col] !== 'number' || typeof mB[row][col] !== 'number') {
						throw new Error('Matrix contains non-number elements');
					}

					sumMatrix[row].push(mA[row][col] + mB[row][col]);

				}

			}

		}
		catch(e) {
			console.error('Addition Error:', e.message);

			return undefined;
		}

		return sumMatrix;

	},

	multiply: function () {},

	inverse: function() {},

	divide: function() {}

};

var newMatrix = new Matrix(matrixA);
