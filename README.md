# react-native-reanimated-toggle

React native toggle component built with react-native-reanimated and react-native-gesture-handler

- [x] Built with Reanimated
- [x] Customizable
- [x] Support for gestures

## Installation
For this component to work you need to have installed [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) packages.
```sh
yarn add react-native-reanimated-toggle
```
```sh
npm install react-native-reanimated-toggle
```
## Usage

### Default component
```jsx
import { View } from 'react-native';
import Toggle from 'react-native-reanimated-toggle';

const App = () => {
  const [toggled, setToggled] = useState(false);
  return <View>
    <Toggle toggled={toggled} onChange={setToggled} />
  </View>
}
```
### Customize design
```jsx
import { View } from 'react-native';
import Toggle from 'react-native-reanimated-toggle';

const App = () => {
  const [toggled, setToggled] = useState(false);
  return <Toggle
    toggled={toggled}
    onChange={setToggled}
    thumbOffset={2}
    thumbSize={32}
    containerStyle={{ height: 36, width: 72, borderRadius: 32 }}
    activeTrackColor="black"
  />
}
```
For more examples check out expo project in [/example](/example) folder.



## License

MIT


Project bootstrapped with [react-native-builder-bob](https://github.com/callstack/react-native-builder-bob)
