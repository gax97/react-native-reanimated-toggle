import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { withSpring } from 'react-native-reanimated';
import Toggle from 'react-native-reanimated-toggle';
import { ExampleItem } from './example-item';

export default function App() {
  const [toggled, setToggled] = useState(false);
  const [toggled2, setToggled2] = useState(false);
  const [toggled3, setToggled3] = useState(false);
  const [toggled4, setToggled4] = useState(false);
  const [toggled5, setToggled5] = useState(false);
  const [toggled6, setToggled6] = useState(false);
  const [toggled7, setToggled7] = useState(false);
  return (
    <View style={styles.container}>
      <ExampleItem title="Default component">
        <Toggle toggled={toggled} onChange={setToggled} />
      </ExampleItem>
      <ExampleItem title={'Custom Design - example 1'}>
        <Toggle
          toggled={toggled2}
          onChange={setToggled2}
          activeTrackColor="orange"
          containerStyle={{ height: 28, width: 48, borderRadius: 6 }}
          thumbSize={20}
          thumbStyle={{ borderRadius: 6 }}
        />
      </ExampleItem>

      <ExampleItem title={'Custom Design - example 2'}>
        <Toggle
          toggled={toggled3}
          onChange={setToggled3}
          thumbOffset={2}
          thumbSize={32}
          containerStyle={{ height: 36, width: 72, borderRadius: 32 }}
          activeTrackColor="black"
          inActiveTrackColor="rgb(200, 200, 200)"
        />
      </ExampleItem>
      <ExampleItem title={'Custom Design - example 3'}>
        <Toggle
          toggled={toggled4}
          onChange={setToggled4}
          thumbOffset={-10}
          thumbSize={22}
          thumbStyle={{ borderWidth: 1, borderColor: 'gray' }}
          containerStyle={{ height: 14, width: 32, borderRadius: 32 }}
          activeTrackColor="rgb(87, 64, 248)"
          inActiveTrackColor="rgb(200, 200, 200)"
        />
      </ExampleItem>
      <ExampleItem title={'Custom Design - example 4'}>
        <Toggle
          toggled={toggled5}
          onChange={setToggled5}
          thumbOffset={0}
          thumbSize={32}
          thumbStyle={{
            borderWidth: 2,
            borderColor: 'rgb(87, 64, 248)',
          }}
          containerStyle={{ height: 28, width: 56, borderRadius: 32 }}
          activeTrackColor="rgb(87, 64, 248)"
          inActiveTrackColor="rgb(200, 200, 200)"
          activeThumbColor={'rgb(56,30,227)'}
        />
      </ExampleItem>
      <ExampleItem title="Disabled">
        <Toggle
          toggled={false}
          onChange={console.log}
          activeTrackColor="orange"
          containerStyle={{ height: 30, width: 48 }}
          thumbSize={20}
          disabled
          disabledContainerStyle={{ opacity: 0.5 }}
        />
      </ExampleItem>
      <ExampleItem title="Customize animation">
        <Toggle
          toggled={toggled6}
          onChange={setToggled6}
          toggleAnimation={(toggled, min, max) =>
            withSpring(toggled ? min : max, { mass: 0.1, damping: 2 })
          }
        />
      </ExampleItem>
      <ExampleItem title="Gestures support">
        <Toggle
          toggled={toggled7}
          onChange={setToggled7}
          enableGestures
          containerStyle={{ height: 30, width: 48 }}
        />
      </ExampleItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
