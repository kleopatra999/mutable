import {expect} from 'chai';

import * as Mutable from '../src';
import {aDataTypeWithSpec} from '../test-kit/test-drivers';

describe('Boolean Type', function() {

    var Boolean = Mutable.Boolean;

    describe('js value is strictly boolean', function() {

        var BooleanValues = aDataTypeWithSpec({
            yes: Mutable.Boolean.withDefault(true),
            no: Mutable.Boolean.withDefault(false),
            default: Mutable.Boolean
        }, 'BooleanValues');

        var booleans;
        before(() => booleans = new BooleanValues());

        it('should resolve to javascript boolean', function() {
            expect(booleans.yes).to.be.a('boolean');
            expect(booleans.no).to.be.a('boolean');
            expect(booleans.default).to.be.a('boolean');
        });


        it('should resolve to javascript boolean with the right value', function() {
            // equals means ===
            expect(booleans.yes).to.equals(true);
            expect(booleans.no).to.equals(false);
            expect(booleans.default).to.equals(false);
        });

    });

    xdescribe('lenient input', function() {

        var BooleanValues;
        var booleans;
        before(() => {
            BooleanValues = aDataTypeWithSpec({
                yes: Mutable.Boolean.withDefault(1),
                no: Mutable.Boolean.withDefault(0)
            }, 'BooleanValues');

            booleans = new BooleanValues()
        });

        it('should resolve to javascript boolean', function() {
            expect(booleans.yes).to.be.a('boolean');
            expect(booleans.no).to.be.a('boolean');
        });

        it('should resolve to javascript boolean with the right value', function() {
            // equals means ===
            expect(booleans.yes).to.equals(true);
            expect(booleans.no).to.equals(false);
        });

        it('should be equal to different creation methods', function() {
            // equals means ===
            expect(booleans).to.eql(new BooleanValues({ yes: true, no: false }));
            expect(booleans).to.eql(new BooleanValues({ yes: 'fff', no: '' }));
        });
    });
});
