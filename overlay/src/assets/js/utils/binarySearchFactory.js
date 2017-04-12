app.factory('binarySearch', function () {
    return {
        byId: function(array, id) {
            var minIndex = 0;
            var maxIndex = array.length - 1;
            var currentIndex;
            var currentElement;

            while (minIndex <= maxIndex) {
                currentIndex = (minIndex + maxIndex) / 2 | 0;
                currentElement = array[currentIndex];

                if (currentElement.id < id) {
                    minIndex = currentIndex + 1;
                }
                else if (currentElement.id > id) {
                    maxIndex = currentIndex - 1;
                }
                else {
                    console.log(array[currentIndex]);
                    return currentIndex;
                }
            }

            return -1;
        }
    }
});