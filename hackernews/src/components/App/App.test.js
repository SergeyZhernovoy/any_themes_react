import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
    <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
});
