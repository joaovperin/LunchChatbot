// It has no dependencies, unlike you, fucking alchoholic bastard :D

// Exports the module
module.exports = (() => {

    var arrAll = ['Perin', 'Jonas', 'Narnia', 'Spaniol', 'Vini', 'Xissum'];
    var arr = ['Perin'];

    // Returns public functions
    return {
        list: () => arr,
        listAll: () => arrAll,
        allContains: (p) => arrAll.indexOf(p) !== -1,
        contains: (p) => arr.indexOf(p) !== -1,
        add: (p) => arr.push(p),
        remove: (p) => arr = arr.filter((e) => e !== p)
    };
})();