import * as sinon from 'sinon';
import {expect} from 'chai';

import * as Mutable from '../../src';
import * as builders from './builders';
import {ERROR_KEY_MISMATCH_IN_MAP_METHOD, ERROR_VALUE_MISMATCH_IN_MAP_METHOD} from '../../test-kit/test-drivers/reports'

describe('Map with string key type', function() {
    it('reports correct error in bad parameter type to get method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(() => map.get(true)).to
            .report(ERROR_KEY_MISMATCH_IN_MAP_METHOD('get', "Map<" + "string, number>", '<string>', 'boolean'));
    });
    it('reports correct error in bad parameter type to delete method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(() => map.delete(true)).to
            .report(ERROR_KEY_MISMATCH_IN_MAP_METHOD('delete', "Map<" + "string, number>", '<string>', 'boolean'));
    });
    it('reports correct error in bad parameter type to has method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(() => map.has(true)).to
            .report(ERROR_KEY_MISMATCH_IN_MAP_METHOD('has', "Map<" + "string, number>", '<string>', 'boolean'));
    });
    it('reports correct error in bad key parameter type to set method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(() => map.set(true, 3)).to
            .report(ERROR_KEY_MISMATCH_IN_MAP_METHOD('set', "Map<" + "string, number>", '<string>', 'boolean'));
    });
    it('reports correct error in bad value parameter type to set method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(() => map.set('foo', true)).to
            .report(ERROR_VALUE_MISMATCH_IN_MAP_METHOD('set', "Map<" + "string, number>", '<number>', 'boolean'));
    });
    it('supports empty string as key in constructor', function() {
        let map = builders.aNumberMap({ '': 5 });
        expect(map.get('')).to.eql(5);
    });
    it('supports empty string as key in get method', function() {
        let map = builders.aNumberMap({ 'foo': 5 });
        expect(map.get('')).to.eql(undefined);
    });
});
