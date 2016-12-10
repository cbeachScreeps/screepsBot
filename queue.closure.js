
/**
 * Enqueues the `element` at the priority queue and returns its new size.
 *
 * @param {Object} element
 * @return {Number}
 * @api public
 */
PriorityQueue.prototype.enq = function(element) {
  var size = this._elements.push(element);
  var current = size - 1;

  while (current > 0) {
    var parent = Math.floor((current - 1) / 2);

    if (this._compare(current, parent) <= 0) break;

    this._swap(parent, current);
    current = parent;
  }

  return size;
};

/**
 * Returns the size of the priority queue.
 *
 * @return {Number}
 * @api public
 */
PriorityQueue.prototype.size = function() {
  return this._elements.length;
};

/**
 *  Iterates over queue elements
 *
 *  @param {Function} fn
 */
PriorityQueue.prototype.forEach = function(fn) {
  return this._elements.forEach(fn);
};

/**
 * Compares the values at position `a` and `b` in the priority queue using its
 * comparator function.
 *
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @api private
 */
PriorityQueue.prototype._compare = function(a, b) {
  return this._comparator(this._elements[a], this._elements[b]);
};

/**
 * Swaps the values at position `a` and `b` in the priority queue.
 *
 * @param {Number} a
 * @param {Number} b
 * @api private
 */
PriorityQueue.prototype._swap = function(a, b) {
  var aux = this._elements[a];
  this._elements[a] = this._elements[b];
  this._elements[b] = aux;
};

module.exports = function(comparator) {
    comparator = !comparator ? defaultComparator : comparator;

    let elements = [];

    function defaultComparator(a, b) {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else {
            a = a.toString();
            b = b.toString();
            if (a == b) {
                return 0;
            }
            return (a > b) ? 1 : -1;
        }
    };
    function peek() {
        if (this.isEmpty()) throw new Error('PriorityQueue is empty');
        return this._elements[0];
    };
    function deq() {
        var first = this.peek();
        var last = this._elements.pop();
        var size = this.size();

        if (size === 0) return first;

        elements[0] = last;
        var current = 0;

        while (current < size) {
            var largest = current;
            var left = (2 * current) + 1;
            var right = (2 * current) + 2;

            if (left < size && this._compare(left, largest) >= 0) {
                largest = left;
            }
            if (right < size && this._compare(right, largest) >= 0) {
                largest = right;
            }
            if (largest === current) {
                break;
            }
            swap(largest, current);
            current = largest;
        }

        return first;
    };

    return {
        getData: () => {
            return elements;
        },
        setData: (data) => {
            elements = data;
        },
        isEmpty: () => {
            return elements.length === 0;
        },
        peek,
    };
};
