// Source: stackoverflow.com/questions/44949030/print-all-possible-permutations-of-r-elements-in-a-given-integer-array-of-size-n

// helper function that swaps a.get(i) and a.get(j)
function swap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// a is the original array
// n is the array size
// k is the number of elements in each permutation
// allPermutations is all different permutations
function enumerate(a, n, k, allPermutations) {
  if (k == 0) {
    singlePermutation = [];
    for (var i = n; i < a.length; i++) {
      singlePermutation.push(a[i]);
    }
    allPermutations.push(singlePermutation);
    return;
  }

  for (var i = 0; i < n; i++) {
    swap(a, i, n - 1);
    enumerate(a, n - 1, k - 1, allPermutations);
    swap(a, i, n - 1);
  }
}

// Print all possible permutations of k elements in a given array a
// - a is the original array
// - k is the number of elements in each permutation
function permutate(a, k) {
  allPermutations = [];
  enumerate(a, a.length, k, allPermutations);
  return allPermutations;
}
module.exports = permutate;
