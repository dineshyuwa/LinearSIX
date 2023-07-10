function objectProjection(sourceObject, prototypeObject) {
    const projectedObject = {};

    for (let prop in prototypeObject) {
        if (sourceObject.hasOwnProperty(prop)) {
            projectedObject[prop] = sourceObject[prop];
        }
    }

    return projectedObject;
}

const sourceObject = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
};

const prototypeObject = {
    name: '',
    email: ''
};

const projectedObject = objectProjection(sourceObject, prototypeObject);
console.log(projectedObject);
