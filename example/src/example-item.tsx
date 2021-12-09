import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20, alignItems: 'center' },
  title: { marginBottom: 12 },
});
export const ExampleItem: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};
