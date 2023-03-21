import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';

const width = Dimensions.get('window').width;
const heigth = Dimensions.get('window').height;
interface Props {
  hideModal: () => void;
  hideCloseButton?: boolean;
}
export default function AttendanceModal({
  children,
  ...props
}: Props & Partial<ModalProps>) {
  return (
    <View>
      <Modal {...props} style={styles.modal}>
        <View>{children}</View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    // position: 'absolute',
    top: heigth / 2 - 60,
    left: width / 2 - 169,
    width: 300,
    borderRadius: 20,
  },
});
