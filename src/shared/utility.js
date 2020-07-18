export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const ObjectIding = (object) => {
    const fetchedObject = [];

    for ( let key in object ) {
        fetchedObject.push( {
            ...object[key],
            id: key
        })
    }

    return fetchedObject;
}