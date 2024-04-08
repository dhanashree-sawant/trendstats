import connection from "@/components/connection"
const bcrypt = require('bcrypt');

export default function hashtext(unhashPass){
    return bcrypt.hash(unhashPass,10).then(function(hash){
        return hash;
    })
}

export default function hashcompare(unhashPass,hasPass){
    return bcrypt.compare(unhashPass,hasPass).then(function(result){
        return result;
    })
}