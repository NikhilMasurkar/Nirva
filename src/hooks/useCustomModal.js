import { useState, useCallback } from 'react';

const useCustomModal = () => {
  const [modalState, setModalState] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'information-outline',
    buttons: [],
    showCloseButton: true,
    onBackdropPress: null,
  });

  const showModal = useCallback(config => {
    setModalState({
      visible: true,
      title: '',
      message: '',
      type: 'information-outline',
      buttons: [],
      showCloseButton: true,
      onBackdropPress: null,
      ...config,
    });
  }, []);

  const hideModal = useCallback(() => {
    setModalState(prev => ({ ...prev, visible: false }));
  }, []);

  // Predefined modal types
  const showInfo = useCallback(
    (title, message, buttons = []) => {
      showModal({
        title,
        message,
        type: 'information-outline',
        buttons: buttons.length > 0 ? buttons : [{ text: 'OK' }],
      });
    },
    [showModal],
  );

  const showSuccess = useCallback(
    (title, message, buttons = []) => {
      showModal({
        title,
        message,
        type: 'success',
        buttons: buttons.length > 0 ? buttons : [{ text: 'OK' }],
      });
    },
    [showModal],
  );

  const showWarning = useCallback(
    (title, message, buttons = []) => {
      showModal({
        title,
        message,
        type: 'warning',
        buttons: buttons.length > 0 ? buttons : [{ text: 'OK' }],
      });
    },
    [showModal],
  );

  const showError = useCallback(
    (title, message, buttons = []) => {
      showModal({
        title,
        message,
        type: 'error',
        buttons: buttons.length > 0 ? buttons : [{ text: 'OK' }],
      });
    },
    [showModal],
  );

  const showConfirm = useCallback(
    (title, message, onConfirm, onCancel) => {
      showModal({
        title,
        message,
        type: 'confirm',
        buttons: [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: onCancel,
          },
          {
            text: 'Confirm',
            onPress: onConfirm,
          },
        ],
      });
    },
    [showModal],
  );

  const showAlert = useCallback(
    (title, message, onOk) => {
      showModal({
        title,
        message,
        type: 'information-outline',
        buttons: [
          {
            text: 'OK',
            onPress: onOk,
          },
        ],
      });
    },
    [showModal],
  );

  // Replace Alert.alert functionality
  const alert = useCallback(
    (title, message, buttons = []) => {
      if (typeof buttons === 'function') {
        // Handle Alert.alert(title, message, callback) format
        showModal({
          title,
          message,
          type: 'info',
          buttons: [
            {
              text: 'OK',
              onPress: buttons,
            },
          ],
        });
      } else if (Array.isArray(buttons)) {
        // Handle Alert.alert(title, message, buttons) format
        showModal({
          title,
          message,
          type: 'info',
          buttons: buttons.map(button => ({
            text: button.text,
            style: button.style,
            onPress: button.onPress,
          })),
        });
      } else {
        // Handle Alert.alert(title, message) format
        showModal({
          title,
          message,
          type: 'info',
          buttons: [{ text: 'OK' }],
        });
      }
    },
    [showModal],
  );

  return {
    // State
    modalState,

    // Actions
    showModal,
    hideModal,

    // Predefined methods
    showInfo,
    showSuccess,
    showWarning,
    showError,
    showConfirm,
    showAlert,

    // Alert replacement
    alert,
  };
};

export default useCustomModal;
