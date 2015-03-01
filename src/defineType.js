import _ from "lodash"
import * as defineTypeUtils from "./defineTypeUtils"
import BaseType from "./BaseType"

export default function(displayName, typeDefinition, TypeConstructor){
    TypeConstructor = TypeConstructor || function Type(value, isReadOnly){
        if(!(this instanceof TypeConstructor)){ return new TypeConstructor(value, isReadOnly)}
        BaseType.call(this, value, isReadOnly);
    };

    TypeConstructor.displayName           = displayName;
    TypeConstructor.type                  = TypeConstructor;
    TypeConstructor.test                  = defineTypeUtils.generateTest();
    TypeConstructor.withDefault           = defineTypeUtils.generateWithDefault();
    TypeConstructor.defaults              = defineTypeUtils.generateGetDefaultValue();

    TypeConstructor.prototype             = Object.create(BaseType.prototype);
    TypeConstructor.prototype.constructor = TypeConstructor;

    TypeConstructor.getFieldsSpec         = typeDefinition.spec.bind(null, TypeConstructor);
    TypeConstructor._spec                 = typeDefinition.spec(TypeConstructor);

    defineTypeUtils.generateFieldsOn(TypeConstructor.prototype, TypeConstructor._spec);

    return TypeConstructor;
};

