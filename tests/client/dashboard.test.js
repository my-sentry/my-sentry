import 'react-native';
import React from 'react';
import MySentry from '../../src/app.js';
import {mount, shallow, render} from 'enzyme';
import ReactDOM from 'react-dom';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('app.js', function() {
  var app;
  it('renders correctly', () => {
    app = shallow( <MySentry /> );
  });
});



