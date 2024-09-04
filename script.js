// object literal syntax
const object = {
    property: 'Value.',
    otherProperty: 77,
    "obnoxious property": function(){
        //do stuff
    }
};

// Way 1 to get value from 
console.log(object.property);

console.log(object['obnoxious property']);

const variable = 'property';

console.log(object[variable]);

